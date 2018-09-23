import composeApp from './components/compose';

const inboxsdkId = 'sdk_gmail-template_204d0b281c';

InboxSDK
    .load(2, inboxsdkId)
    .then(composeApp);
