import { mount, shallow } from 'enzyme';
import App from '..';
import React from 'react';

describe('App', () => {
    describe('while iframe is not loaded', () => {
        it('should render the loader', () => {
            const component = mount(<App />);

            expect(component).toMatchSnapshot();
        });
    });

    describe('when iframe is loaded', () => {
        it('should not render the loader', () => {
            const component = mount(<App />);

            // See this issue: https://github.com/airbnb/enzyme/issues/566
            component.findWhere(node => node.getDOMNode() === component.instance().iframe).simulate('load');

            expect(component).toMatchSnapshot();
        });
    });
});
