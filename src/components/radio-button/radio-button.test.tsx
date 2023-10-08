import React from 'react';
import renderer from 'react-test-renderer';
import {RadioButton} from './radio-button';

describe('RadioButton Component', () => {
  it('renders correctly with label and unselected state', () => {
    const tree = renderer
      .create(
        <RadioButton
          label="Option 1"
          value={1}
          selected={false}
          onSelect={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with label and selected state', () => {
    const tree = renderer
      .create(
        <RadioButton
          label="Option 2"
          value={2}
          selected={true}
          onSelect={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls onSelect when pressed', () => {
    const onSelectMock = jest.fn();
    const tree = renderer.create(
      <RadioButton
        label="Option 3"
        value={3}
        selected={false}
        onSelect={onSelectMock}
      />,
    );

    // Find the radio button element by its testID
    const radioOuterElement = tree.root.findByProps({testID: 'radio-outer'});

    // Simulate a button press on the radio button
    radioOuterElement.props.onPress();

    expect(onSelectMock).toHaveBeenCalledWith(3);
  });
});
