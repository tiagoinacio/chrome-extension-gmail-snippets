import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
    static propTypes = {
        composeView: PropTypes.object.isRequired,
    };

    state = {
        isIframeReady: false,
    };

    componentDidMount() {
        window.addEventListener('message', this.handleMessageReceived, false);
    }

    render() {
        return (
            <div className="container">
                { !this.state.isIframeReady && <div className="loader"></div> }
                <iframe
                    ref={(iframe) => { this.iframe = iframe; }}
                    onLoad={this.onIframeReady}
                    className="iframe"
                    src='https://email-snippets.herokuapp.com'>
                    Your browser does not support iframes.
                </iframe>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessageReceived);
    }

    handleMessageReceived = (message) => {
        const { composeView } = this.props;

        if (message.origin === 'https://email-snippets.herokuapp.com') {
            composeView.insertTextIntoBodyAtCursor(message.data.template);
        }
    }

    onIframeReady = () => {
        this.setState({
            isIframeReady: true,
        });
    }
}

export default App;
