import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
    state = {
        isIframeReady: false,
    };

    render() {
        return (
            <Fragment>
                { !this.state.isIframeReady && <div className="loader"></div> }
                <iframe
                    ref={ (iframe) => { this.iframe = iframe; } }
                    onLoad={ this.onIframeReady }
                    className="iframe"
                    src='https://email-snippets.herokuapp.com'>
                    Your browser does not support iframes.
                </iframe>
            </Fragment>
        );
    }

    onIframeReady = () => {
        this.setState({
            isIframeReady: true,
        });
    }
}

export default App;
