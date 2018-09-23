import App from '..';

describe('index', () => {
    it('should export the default component', () => {
        expect(typeof App).toEqual('function');
    });
});
