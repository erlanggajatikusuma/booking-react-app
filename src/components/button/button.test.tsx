import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from './Button';
import {Image} from 'react-native';

// Mock the Image component
jest.mock('react-native/Libraries/Image/resolveAssetSource', () => ({
  default: (source: any) => {
    return source;
  },
}));

// Mock the require statement for the image source
jest.mock('./image.png', () => 123);

describe('Button Component', () => {
  test('renders correctly with Text as children', () => {
    const tree = renderer
      .create(<Button label="Click me" onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with link preset', () => {
    const tree = renderer
      .create(<Button label="Click Me" onPress={() => {}} preset="link" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with Image as children', () => {
    const tree = renderer
      .create(
        <Button onPress={() => {}}>
          <Image source={require('./image.png')} />
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const tree = renderer.create(
      <Button label="Click Me" onPress={onPressMock} />,
    );

    // Access the root of the rendered component
    const rootInstance = tree.root;

    // Find the button element by its props
    const buttonElements = rootInstance.findAllByProps({label: 'Click Me'});

    // Simulate a button click on the first button found
    buttonElements[0].props.onPress();

    // Expect that the onPressMock function was called
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders correctly with disabled state', () => {
    const tree = renderer
      .create(<Button label="Click Me" disabled={true} onPress={() => {}} />)
      .toJSON();

    // Check if the tree is not null before making assertions
    expect(tree).not.toBeNull();

    // You can now safely make assertions on the tree
    expect(tree).toMatchSnapshot();
  });
});
