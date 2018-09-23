import Compose from '..';

describe('index', () => {
    it('should export the default component', () => {
        expect(typeof Compose).toEqual('function');
    });
});
