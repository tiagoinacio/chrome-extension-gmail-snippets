import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const inboxsdkId = 'sdk_gmail-template_204d0b281c';

const composeApp = ({ Compose }) => {
    Compose.registerComposeViewHandler((composeView) => {
        composeView.addButton({
            title: 'Chrome Extension Gmail Snippets',
            iconUrl: 'https://image.flaticon.com/icons/svg/1001/1001371.svg',
            iconClass: 'button',
            hasDropdown: true,
            onClick(event) {
                ReactDOM.render(<App />, event.dropdown.el);

                event.dropdown.once('destroy', () => (
                    ReactDOM.unmountComponentAtNode(event.dropdown.el)
                ));
            },
        });
    });
};

InboxSDK
    .load(2, inboxsdkId)
    .then(composeApp);
