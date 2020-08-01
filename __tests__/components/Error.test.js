import React from 'react';
import Error from '../../src/client/components/Error';
import { initialState } from '../../src/client/redux/store/initialState';
import configureMockStore from 'redux-mock-store';
import { shallow, render } from 'enzyme';

const mockStore = configureMockStore();

describe('<Error />', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('should be rendered correctly with catchedError', () => {
        const mockingState = {
            appStatus: {
                catchedError: {
                    status: 403,
                    statusText: 'statusText',
                },
            },
        };
        store = mockStore({
            ...initialState,
            ...mockingState,
        });
        const wrapper = shallow(<Error store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should be rendered correctly without catchedError', () => {
        const wrapper = shallow(<Error store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
