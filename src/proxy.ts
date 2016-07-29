const INJECTION = Symbol();

// Proxy the getter of injected properties
function proxyGetter(
    proto: any,
    key: string,
    resolve: () => any
) {
    function getter() {
        if (!Reflect.hasMetadata(INJECTION, this, key)) {
            Reflect.defineMetadata(INJECTION, resolve(), this, key);
        }
        return Reflect.getMetadata(INJECTION, this, key);
    }

    function setter(newVal: any) {
        Reflect.defineMetadata(INJECTION, newVal, this, key);
    }

    Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: getter,
        set: setter
    });
}

export default proxyGetter;