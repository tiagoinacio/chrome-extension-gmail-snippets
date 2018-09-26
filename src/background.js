const hosts = 'https://email-snippets.herokuapp.com';

// update content security policy headers with new script-src, style-src and frame-src
// so we can load content from external domains
/* istanbul ignore next line */
const getUpdatedHeaders = details => ({
    responseHeaders: details
        .responseHeaders
        .map((header) => {
            const isCSPHeader = /content-security-policy/i.test(header.name);

            if (isCSPHeader) {
                let csp = header.value;

                csp = csp.replace('script-src', `script-src ${hosts}`);
                csp = csp.replace('style-src', `style-src ${hosts}`);
                csp = csp.replace('frame-src', `frame-src ${hosts}`);

                // eslint-disable-next-line no-param-reassign
                header.value = csp;
            }

            return header;
        }),
});

const urls = {
    urls: ['https://mail.google.com/*', 'https://inbox.google.com/*'],
    types: ['main_frame'],
};

const options = ['blocking', 'responseHeaders'];

chrome
    .webRequest
    .onHeadersReceived
    .addListener(getUpdatedHeaders, urls, options);
