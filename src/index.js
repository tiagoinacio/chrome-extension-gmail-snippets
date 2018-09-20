import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
    <div>App!!!</div>
);

InboxSDK.load(2, 'sdk_gmail-template_204d0b281c').then(({Compose}) => {

  Compose.registerComposeViewHandler((composeView) => {

    composeView.addButton({
      title: "My Nifty Button!",
      iconUrl: 'https://example.com/foo.png',
      hasDropdown: true,
      onClick(event) {
        ReactDOM.render(<App />, event.dropdown.el);

        event.dropdown.once('destroy', () => (
          ReactDOM.unmountComponentAtNode(event.dropdown.el)
        ));
      }
    });

  });

});
