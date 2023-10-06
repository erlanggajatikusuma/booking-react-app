import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

const BASE: ViewStyle = {
  backgroundColor: 'blue',
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
};

const LINK: ViewStyle = {
  backgroundColor: 'transparent', // Transparent background for link style
  justifyContent: 'center',
  paddingHorizontal: 0,
  paddingVertical: 0,
  alignItems: 'flex-start',
};

const BASE_LABEL: TextStyle = {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
  paddingHorizontal: 12,
};

const LINK_LABEL: TextStyle = {
  color: 'blue', // Blue text color for link style
  fontSize: 16,
  paddingHorizontal: 0,
  paddingVertical: 0,
  borderBottomWidth: 1, // ios not support
  borderColor: 'blue',
};

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  preset?: 'link' | 'base'; // Define the preset prop
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({label, children, style, labelStyle, preset = 'base', ...rest}) => {
    const buttonStyle = preset === 'link' ? LINK : BASE;
    const textLabelStyle = preset === 'link' ? LINK_LABEL : BASE_LABEL;

    const content = children || (
      <Text style={[textLabelStyle, labelStyle]}>{label}</Text>
    );
    return (
      <TouchableOpacity style={[buttonStyle, style]} {...rest}>
        {/* {label && <Text style={[textLabelStyle, labelStyle]}>{label}</Text>} */}
        {/* {children} */}
        {content}
      </TouchableOpacity>
    );
  },
);
