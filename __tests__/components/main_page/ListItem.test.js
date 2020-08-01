import React from 'react';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../src/client/redux/store/initialState';
import ListItem from '../../../src/client/components/main_page/ListItem';
import thunk from 'redux-thunk';
import history from '../../../src/client/history';
import { shallow, render, mount } from 'enzyme';

const mockStore = configureMockStore([thunk]);

describe('<ListItem/>', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('should be rendered correctly', () => {
        const repository = {
            name: 'name',
            stargazers_count: 1,
            pushed_at: '2005-08-09T18:31:42',
            html_url: 'http://localhost:3000',
        };
        const wrapper = shallow(
            <ListItem repository={repository} store={store} history={history} />
        );
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should change repository correctly', () => {
        const repository = {
            name: 'name',
            stargazers_count: 1,
            pushed_at: '2005-08-09T18:31:42',
            html_url: 'http://localhost:3000',
        };
        const wrapper = mount(<ListItem repository={repository} store={store} history={history} />);
        wrapper.find('.list-item').simulate('click');
        expect(wrapper.props().history.location.pathname).toEqual(`/repos/${repository.name}`);
        expect(wrapper.props().store.getActions()[0].payload.repository).toEqual(repository);
    });
});
