import composeApp from '..';
import React from 'react';

describe('composeApp', () => {
    describe('On instatiation', () => {
        let composeView;
        let compose;
        let registerComposeViewHandler;

        beforeEach(() => {
            composeView = {
                addButton: jest.fn(),
            };
            registerComposeViewHandler = jest.fn(cb => cb(composeView));
            compose = {
                Compose: {
                    registerComposeViewHandler,
                },
            };

            composeApp(compose);
        });

        it('register the view handler', () => {
            expect(registerComposeViewHandler).toHaveBeenCalled();
        });

        it('attach the button to the view', () => {
            expect(composeView.addButton).toHaveBeenCalledWith(expect.objectContaining({
                title: 'Chrome Extension Gmail Snippets',
                iconUrl: 'https://image.flaticon.com/icons/svg/1001/1001371.svg',
                iconClass: 'button',
                hasDropdown: true,
                onClick: expect.any(Function),
            }));
        });
    });
});
