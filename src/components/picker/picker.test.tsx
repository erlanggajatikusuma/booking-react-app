import React from 'react';
import renderer from 'react-test-renderer';
import {Picker} from './Picker';

describe('Picker Component', () => {
  it('renders correctly', () => {
    const items = [
      {label: 'Option 1', value: 'value1'},
      {label: 'Option 2', value: 'value2'},
    ];

    const tree = renderer
      .create(
        <Picker
          items={items}
          selectedValue={'value1'}
          onValueChange={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
