declare module 'cache-money' {
    export default class Cache {
        constructor(config: {ttl: number, maxKeys: number})
        get(key: string): any;
        set(key: string, value: any);
    }
}