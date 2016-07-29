# Libertad
Context-free dependency injection for redux applications

## Motivation
Based on the React docs, we should try to avoid using context:

>Context is an advanced and experimental feature. The API is likely to change in future releases.
>
>Most applications will never need to use context. Especially if you are just getting started with React, you likely do not want to use context. Using context will make your code harder to understand because it makes the data flow less clear. It is similar to using global variables to pass state through your application.
>
>**If you have to use context, use it sparingly.**
>
>Regardless of whether you’re building an application or a library, try to isolate your use of context to a small area and avoid using the context API directly when possible so that it’s easier to upgrade when the API changes.

However, acording to ["React in patterns"](https://github.com/krasimir/react-in-patterns) most of the solutions for dependency injection in React components are based on context:

> Most of the solutions for dependency injection in React components are based on context. I think that it’s good to know what happens under the hood. As the time of this writing one of the most popular ways for building React apps involves Redux. The famous connect function and the Provider there use the context.

Libertad provides a context-free dependency injection for redux applications. Libertad offers a context-free alternative to the `connect` function and the `Provider` component from [react-redux](https://github.com/reactjs/react-redux).


## Installation
todo

## Basic example
```ts
import "reflect-metadata";
import provide from "inversify-redux";
import Store from "redux";
import { Kernel, makePropertyInjectDecorator } from "inversify";
import * as actions from "../../actions/actions";
import SomeOtherDependency from "../../x/y";

let store = new Store();

let kernel - new Kernel();
let pInject = makePropertyInjectDecorator(kernel);
kernel.bind<ActionsTypeIdentifier>("ActionsTypeIdentifier").toConstantValue(actions);
kernel.bind<SomeOtherDependencyIdentifier>("SomeOtherDependencyIdentifier").to(SomeOtherDependency);

let { injectProps, injectActions } = provide(kernel, store);
let pInject = makePropertyInjectDecorator(kernel);

export { injectProps, injectActions, pInject };
```

```ts
import { injectProps, injectActions, pInject } from "./app/decorators";
import React from "react";

function mapStateToProps(state) {
  return {
    title: state.title
  };
}

class SomeComponent extends React.Component {

    @injectProps(mapStateToProps)
    private _props: any;

    @injectActions("ActionsTypeIdentifier")
    private _actions: any;
    
    @pInject("SomeOtherDependencyIdentifier")
    private _other: any;

    public render() {
        return (<a onClick={this._actions.onLick}>{this.props.title}</a>);
    }

}
```

## License

License under the MIT License (MIT)

Copyright © 2016 [Remo H. Jansen](http://www.remojansen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
