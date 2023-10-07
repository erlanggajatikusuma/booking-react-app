import {
  PickerItemProps,
  Picker as PickerRN,
  PickerProps as PickerRNProps,
} from '@react-native-picker/picker';
import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

const HEIGHT: TextStyle = {
  height: 42,
  width: 100,
};

interface PickerProps extends PickerRNProps {
  items: PickerItemProps[];
  styles?: StyleProp<ViewStyle>;
}

export const Picker: React.FC<PickerProps> = React.memo(
  ({items, selectedValue, onValueChange, styles, ...rest}) => {
    return (
      <PickerRN
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles, HEIGHT]}
        itemStyle={HEIGHT}
        {...rest}>
        {items.map((item, index) => (
          <PickerRN.Item
            key={index}
            label={item.label}
            value={item.value}
            style={HEIGHT}
          />
        ))}
      </PickerRN>
    );
  },
  (prevProps, nextProps) => {
    // Memoization function to prevent re-renders when props don't change
    return (
      prevProps.selectedValue === nextProps.selectedValue &&
      prevProps.items.length === nextProps.items.length &&
      prevProps.items.every((item, index) => item === nextProps.items[index])
    );
  },
);
