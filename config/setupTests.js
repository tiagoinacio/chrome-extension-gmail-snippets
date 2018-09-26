const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

global.chrome = {
    webRequest: {
        onHeadersReceived: {
            addListener: jest.fn(cb => cb),
        },
    },
};

global.InboxSDK = {
    load: jest
        .fn()
        .mockReturnValue({
            then: cb => cb(),
        }),
};
