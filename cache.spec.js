const Cache = require('./cache').Cache;

describe('cache', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2000-01-01T01:00:00Z').getTime());
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('should set/get values', () => {
        const cachemoney = new Cache();

        cachemoney.set('foo', 'bar');
        cachemoney.set('obj', {light: 'on', works: true, cost: 100});
        cachemoney.set(1, 2);

        expect(cachemoney.get('foo')).toStrictEqual('bar');
        expect(cachemoney.get('obj')).toStrictEqual({light: 'on', works: true, cost: 100});
        expect(cachemoney.get(1)).toStrictEqual(2);
    });

    it('should clear out expired keys', () => {
        const cachemoney = new Cache({ttl: 1000});
        cachemoney.set('foo', 'bar');

        jest.advanceTimersByTime(2000);
        
        expect(cachemoney.get('foo')).toBeUndefined();
    });
});