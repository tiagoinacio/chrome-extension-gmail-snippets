import { mount } from 'enzyme';
import App from '..';
import React from 'react';

describe('App', () => {
    let composeView;
    let app;

    beforeEach(() => {
        global.window.removeEventListener = jest.fn();
        global.window.addEventListener = jest.fn();

        composeView = {
            insertTextIntoBodyAtCursor: jest.fn(),
        };

        app = mount(
            <App composeView={ composeView }/>,
        );
    });

    describe('while iframe is not loaded', () => {
        it('should render the loader', () => {
            expect(app).toMatchSnapshot();
        });
    });

    describe('when iframe is loaded', () => {
        it('should not render the loader', () => {
            // See this issue: https://github.com/airbnb/enzyme/issues/566
            app.findWhere(node => node.getDOMNode() === app.instance().iframe).simulate('load');

            expect(app).toMatchSnapshot();
        });
    });

    describe('#componentDidMount', () => {
        it('should add the event listener "message"', () => {
            expect(global.window.addEventListener).toHaveBeenCalledWith(
                'message',
                expect.any(Function),
                false,
            );
        });

        describe('on message received', () => {
            describe('when origin matches our webserver', () => {
                beforeEach(() => {
                    global.window.addEventListener = jest.fn((_, cb) => cb({
                        origin: 'https://email-snippets.herokuapp.com',
                        data: {
                            template: 'Test template',
                        },
                    }));

                    app = mount(
                        <App composeView={ composeView }/>,
                    );
                });

                it('should insert the template into the view', () => {
                    expect(composeView.insertTextIntoBodyAtCursor).toHaveBeenCalledWith('Test template');
                });
            });

            describe('when origin does not match our webserver', () => {
                beforeEach(() => {
                    global.window.addEventListener = jest.fn((_, cb) => cb({
                        origin: 'https://google.com',
                        data: {
                            template: 'Test template',
                        },
                    }));

                    app = mount(
                        <App composeView={ composeView }/>,
                    );
                });

                it('should not insert the template into the view', () => {
                    expect(composeView.insertTextIntoBodyAtCursor).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('#componentWillUnmount', () => {
        beforeEach(() => {
            global.window.addEventListener = jest.fn((_, cb) => cb({
                origin: 'https://email-snippets.herokuapp.com',
                data: {
                    template: 'Test template',
                },
            }));

            app = mount(
                <App composeView={ composeView }/>,
            );

            app.unmount();
        });

        it('should remove the event listener "message"', () => {
            expect(global.window.removeEventListener).toHaveBeenCalledWith(
                'message',
                expect.any(Function),
            );
        });
    });
});
