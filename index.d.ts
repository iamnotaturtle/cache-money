declare module 'cache-money' {
    export class Cache {
        stats: {
			hits: number,
			misses: number,
            keys: number,
            values: number,
        }
        
        constructor(config?: {
            ttl: number;
            maxKeys: number;
        })
        get(key: string): any;
        set(key: string, value: any);
    }
}