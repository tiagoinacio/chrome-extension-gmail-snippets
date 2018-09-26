import composeApp from '..';
import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({
    render: jest.fn(),
    unmountComponentAtNode: jest.fn(),
}));

describe('composeApp', () => {
    describe('On instatiation', () => {
        let composeView;
        let compose;
        let registerComposeViewHandler;

        beforeEach(() => {
            composeView = {
                addButton: jest.fn(button => button),
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

        describe('#onClick', () => {
            let button;
            let once;

            beforeEach(() => {
                [[button]] = composeView.addButton.mock.calls;
                once = jest.fn((_, cb) => cb());

                button.onClick({
                    dropdown: {
                        el: 'button',
                        once,
                    },
                });
            });

            it('should render the <App /> component', () => {
                expect(ReactDOM.render).toHaveBeenCalledWith(
                    expect.any(Object),
                    'button',
                );
            });

            it('should register the "destroy" event', () => {
                expect(once).toHaveBeenCalledWith(
                    'destroy',
                    expect.any(Function),
                );
            });

            describe('onDestroy', () => {
                it('should unmount the component', () => {
                    expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith('button');
                });
            });
        });
    });
});
