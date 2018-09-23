import { getUpdatedHeaders, urls, options } from '../background';

describe('Background', () => {
    /*
    describe('#getUpdatedHeaders', () => {
        it('should update the content security policy header', () => {
            const details = {
                responseHeaders: [
                    {
                        name: 'content-security-policy',
                        value: 'script-src "self" https://mail.google.com; frame-src "self" https://mail.google.com; object-src "self"',
                    },
                    {
                        name: 'Accept-Encoding',
                        value: 'gzip, deflate',
                    },
                ],
            };
            const updatedDetails = {
                responseHeaders: [
                    {
                        name: 'content-security-policy',
                        value: 'script-src https://email-snippets.herokuapp.com "self" https://mail.google.com; frame-src https://email-snippets.herokuapp.com "self" https://mail.google.com; object-src "self"',
                    },
                    {
                        name: 'Accept-Encoding',
                        value: 'gzip, deflate',
                    },
                ],
            };

            expect(getUpdatedHeaders(details)).toEqual(updatedDetails);
        });
    });

    describe('#urls', () => {
        it('should have the correct configuration', () => {
            expect(urls).toEqual({
                urls: ['https://mail.google.com/*', 'https://inbox.google.com/*'],
                types: ['main_frame'],
            });
        });
    });

    describe('#options', () => {
        it('should have the blocking and responseHeaders options', () => {
            expect(options).toEqual(['blocking', 'responseHeaders']);
        });
    });
    */
    describe('On headers received', () => {
        it('should call the listener', () => {
            expect(chrome.webRequest.onHeadersReceived.addListener)
                .toHaveBeenCalledWith(
                    expect.any(Function),
                    {
                        urls: ['https://mail.google.com/*', 'https://inbox.google.com/*'],
                        types: ['main_frame'],
                    },
                    [
                        'blocking',
                        'responseHeaders',
                    ],
                );
        });
    });
});
