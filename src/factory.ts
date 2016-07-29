import { bindActionCreators } from "redux";
import proxyGetter from "./proxy";
import {
  makePropertyInjectDecorator,
  makePropertyInjectNamedDecorator,
  makePropertyInjectTaggedDecorator,
  makePropertyMultiInjectDecorator
} from "inversify-inject-decorators";

function getDecorators(kernel: inversify.interfaces.Kernel, store: Redux.Store) {

    kernel.bind(store).toSelf();

    let lazyInject = makePropertyInjectDecorator(Kernel);
    let lazyInjectNamed = makePropertyInjectNamedDecorator(Kernel);
    let lazyInjectTagged = makePropertyInjectTaggedDecorator(Kernel);
    let lazyMultiInject = makePropertyMultiInjectDecorator(Kernel);

    // Decorator used to inject props mapped from the state into a class property
    let injectProps = (mapStateToProps: (state: any) => any) => {
        return function(proto: any, key: string): void {
            let state = store.getState();
            let props = mapStateToProps(state);
            let resolve = () => { return props; };
            proxyGetter(proto, key, resolve);
        };
    };

    // Decorator used to bind action creators and inject them into a class property
    let injectActions = (actionCreatorsIdentifier: inversify.interfaces.serviceIdentifier) => {
        return function(proto: any, key: string): void {
            let dispatch = store.dispatch;
            let actionCreators = kernel.get(actionCreatorsIdentifier);
            let boundActionCreators = bindActionCreators(actionCreators, dispatch);
            let resolve = () => { return kernel.get(actionCreatorsIdentifier); };
            proxyGetter(proto, key, resolve);
        }
    };

    return {
        injectProps,
        injectActions,
        lazyInject, 
        lazyInjectNamed,
        lazyInjectTagged,
        lazyMultiInject
    };

}

 export default getDecorators;
