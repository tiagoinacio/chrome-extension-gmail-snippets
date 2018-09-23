import '..';
import * as compose from '../components/compose';

jest.mock('../components/compose');

describe('On Instatiation', () => {
    it('should configure InboxSDK with version 2 and correct ID', () => {
        expect(global.InboxSDK.load).toHaveBeenCalledWith(2, 'sdk_gmail-template_204d0b281c');
    });

    it('should instatiate the application', () => {
        expect(compose.default).toHaveBeenCalled();
    });
});
