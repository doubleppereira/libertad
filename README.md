# Libertad
Context-free dependency injection for redux applications. Libertad is powered by [InversifyJS](https://github.com/inversify/InversifyJS).

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

> **WIP** SORRY WE ARE NOT READY FOR INSTALLATION!

## How to use it?

The libertad API provides you with some decorators but before you can use these
decorators you are required to create them using a factory named `getDecorators`.

The `getDecorators` factory needs an instance of the Redux `Store` and 
an instance of InversifyJS `Kernel` to be provided.

After creating the InversifyJS `Kernel` we configured it. 
We created a dictionary that maps a type identifier with a Class or Value. 
The dictionary entries are known as “type bindings”.

In this case, we use a binding to:

- Map the identifier `"ActionsTypeIdentifier"` to the `actions` value.
- Map the identifier `"SomeOtherDependencyIdentifier"` to the `SomeOtherDependency` Class.

Please refer to the InversifyJS [docs](https://github.com/inversify/InversifyJS) if you need additional information.

```ts
import "reflect-metadata";
import getDecorators from "libertad";
import Store from "redux";
import { Kernel } from "inversify";
import * as actions from "../../actions/actions";
import SomeOtherDependency from "../../x/y";

let store = new Store();

let kernel = new Kernel();

kernel.bind<ActionsTypeIdentifier>("ActionsTypeIdentifier").toConstantValue(actions);
kernel.bind<SomeOtherDependencyIdentifier>("SomeOtherDependencyIdentifier").to(SomeOtherDependency);

let { 
  injectProps,
  injectActions,
  pInject, pInjectNamed,
  pInjectTagged,
  pMultiInject
} = getDecorators(kernel, store);

export {
  injectProps,
  injectActions,
  pInject,
  pInjectNamed,
  pInjectTagged,
  pMultiInject
};
```

At the end of this process we have the following decorators ready to be consumed:

- The `@injectProps` decorator can be used to inject props mapped from the Redux state.
- The `@injectActions` decorator can be used to inject actions creators after binding them to dispatch.
- The `@pInject` decorator can be used to inject any other kind of dependency.
- The `@pInjectNamed` decorator can be used to inject any other kind of dependency with "name" metadata.
- The `@pInjectTagged` decorator can be used to inject any other kind of dependency with custom metadata.
- The `@pMultiInject` decorator can be used to multi-inject any other kind of dependency (with multiple bindings).
- 
You can apply these decorators to properties in your components:

```ts
import { injectProps, injectActions, pInject } from "./app/decorators";
import React from "react";

function mapStateToProps(state) {
  return {
    title: state.title
  };
}

class SomeComponent extends React.Component {

    // Inject props mapped from the Redux state
    @injectProps(mapStateToProps)
    private props: any;

    // Inject actions creators after binding them to dispatch
    @injectActions("ActionsTypeIdentifier")
    private actions: any;
    
    // Inject any other kind of dependency
    @pInject("SomeOtherDependencyIdentifier")
    private other: any;

    public render() {
        return (<a onClick={this.actions.onLick}>{this.props.title}</a>);
    }

}

export default SomeComponent;
```

You might be wondering how is this going to free our application from
the usage of context?

Libertad uses InversifyJS under the hood not context and with these 
decorators you don't need the `connect` function or the `<Provider>` 
component provided by [react-redux](https://github.com/reactjs/react-redux) 
anymore.

> The famous connect function and the Provider there use the context.

Once you remove them `@connect` and `<Provider>` from your application it 
becomes free of the usage context.

## About the library name
The main motivation behind this project was to implement a 
context-free dependency injection solution for redux applications.

For this reason I though that a name related with the word "freedom"
would be cool. Since I'm Spanish I ended up naming it **"Libertad"**,
which is the Spanish word for "freedom".

## License

License under the MIT License (MIT)

Copyright © 2016 [Remo H. Jansen](http://www.remojansen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
