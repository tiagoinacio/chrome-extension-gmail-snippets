const hosts = 'https://email-snippets.herokuapp.com';

// update content security policy headers with new script-src, style-src and frame-src
// so we can load content from external domains
const getUpdatedHeaders = (details) => {
    for (let i = 0; i < details.responseHeaders.length; i += 1) {
        const isCSPHeader = /content-security-policy/i.test(details.responseHeaders[i].name);

        if (isCSPHeader) {
            let csp = details.responseHeaders[i].value;
            csp = csp.replace('script-src', `script-src ${hosts}`);
            csp = csp.replace('style-src', `style-src ${hosts}`);
            csp = csp.replace('frame-src', `frame-src ${hosts}`);

            // eslint-disable-next-line no-param-reassign
            details.responseHeaders[i].value = csp;
        }
    }

    return {
        responseHeaders: details.responseHeaders,
    };
};

const urls = {
    urls: ['https://mail.google.com/*', 'https://inbox.google.com/*'],
    types: ['main_frame'],
};

const options = ['blocking', 'responseHeaders'];

chrome
    .webRequest
    .onHeadersReceived
    .addListener(getUpdatedHeaders, urls, options);
