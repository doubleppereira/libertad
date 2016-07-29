import { bindActionCreators } from "redux";
import proxyGetter from "./proxy";

function getDecorators(kernel, store) {

    kernel.bind(store).toSelf();

    // Decorator used to inject props mapped from the state into a class property
    let injectProps = (mapStateToProps) => {
        return function(proto: any, key: string): void {
            let state = store.getState();
            let props = mapStateToProps(state);
            let resolve = () => { return props; };
            proxyGetter(proto, key, resolve);
        };
    };

    // Decorator used to bind action creators and inject them into a class property
    let injectActions = (actionCreatorsIdentifier) => {
        return function(proto: any, key: string): void {
            let dispatch = store.dispatch;
            let actionCreators = kernel.get(actionCreatorsIdentifier);
            let boundActionCreators = bindActionCreators(actionCreators, dispatch);
            let resolve = () => { return kernel.get(actionCreatorsIdentifier); };
            proxyGetter(proto, key, resolve);
        }
    };

    return { injectProps, injectActions };

}

 export default getDecorators;