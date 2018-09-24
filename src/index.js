import composeApp from './components/compose';

const inboxsdkId = 'sdk_gmail-template_204d0b281c';

try {
    InboxSDK
        .load(2, inboxsdkId)
        .then(composeApp);
} catch (e) {
    // eslint-disable-next-line
    console.info(e);
}
