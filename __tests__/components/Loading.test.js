import Loading from '../../src/client/components/Loading';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Loading />', () => {
    test('should be rendered correctly', () => {
        const component = renderer.create(<Loading />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
