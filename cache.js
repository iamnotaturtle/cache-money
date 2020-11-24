/** Time to live (ms) */
const TTL = 6000;

/** Max number of keys allowed */
const MAX_KEYS = 100;

class Cache {
    constructor({ttl, maxKeys} = {ttl: TTL, maxKeys: MAX_KEYS}) {
        this.ttl = ttl;
        this.maxKeys = maxKeys;
        this.store = {};
        this.stats = {
			hits: 0,
			misses: 0,
            keys: 0,
            values: 0,
        };

        this.monitorExpired();
    }

    get(key) {
        const data = this.store[key];
        if (!data) {
            this.stats.misses += 1;
            return;
        }

        this.stats.hits += 1;
        const {value} = data;
        return value;
    }

    set(key, value) {
        if (Object.keys(this.store).length > this.maxKeys) {
            throw new Error('Cache full!');
            return;
        }

        this.store[key] = {
            value,
            time: new Date().getTime()
        };

        this.stats.keys += 1;
        this.stats.values += 1;
    }

    monitorExpired() {
        this.intervalId = setInterval(() => {
            this.clearExpired();
        }, this.ttl)
    }

    clearExpired() {
        const now = new Date().getTime();
        for (const [key, val] of Object.entries(this.store)) {
            if (now - val.time > this.ttl) {
                delete this.store[key];
            }
        }
    }
}

module.exports = {Cache};
