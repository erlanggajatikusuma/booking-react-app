import React, {useCallback} from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle, View} from 'react-native';
import {color} from '../../theme';

interface RadioButtonProps {
  label: string;
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const RADIO: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
};

const RADIO_INNER: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: color.darkBlue,
};

const LABEL: TextStyle = {
  marginLeft: 8,
  fontSize: 16,
};

export const RadioButton: React.FC<RadioButtonProps> = React.memo(
  ({label, value, selected, onSelect, style, labelStyle}) => {
    const handlePress = useCallback(() => {
      onSelect(value);
    }, [onSelect, value]);

    return (
      <TouchableOpacity onPress={handlePress} style={[CONTAINER, style]}>
        <View
          style={[
            RADIO,
            {
              borderColor: selected ? color.darkBlue : 'gray',
            },
          ]}>
          {selected && <View style={RADIO_INNER} />}
        </View>
        <Text style={[LABEL, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  },
);
