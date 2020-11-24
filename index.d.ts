declare module 'cache-money' {
    export class Cache {
        constructor(config?: {
            ttl: number;
            maxKeys: number;
        })
        get(key: string): any;
        set(key: string, value: any);
    }
}