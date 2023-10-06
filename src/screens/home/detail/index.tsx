import {
  View,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {RadioButton, Screen} from '../../../components';

const HEADER: ViewStyle = {
  paddingHorizontal: 12,
  paddingVertical: 16,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: 'gray',
};
const LABEL: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
};

const HOTEL: ViewStyle = {
  backgroundColor: 'yellow',
  flexDirection: 'row',
  padding: 10,
  borderRadius: 8,
  marginVertical: 10,
};

const THUMBNAIL: ImageStyle = {
  width: 64,
  height: 64,
  borderRadius: 8,
  backgroundColor: 'gray',
};

const FLEX_ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const REFUND: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

export const DetailScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation, route} = props;

  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const refundable = true;

  useEffect(() => {
    console.log('Pass Props ===> ', route.params);
  }, [route]);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <Screen preset="scroll">
      {/* HEADER */}
      <View style={HEADER}>
        <Text style={LABEL}>Detail Pesanan</Text>
        <View style={HOTEL}>
          <Image source={null} style={THUMBNAIL} />
          <View>
            <Text>Novotel Tangerang</Text>
            <Text numberOfLines={3} ellipsizeMode="tail">
              Executive Suit Room with breakfast
            </Text>
          </View>
        </View>
        <View style={FLEX_ROW}>
          <Text style={LABEL}>Check-In</Text>
          <Text>30 November 2020</Text>
        </View>
        <View style={FLEX_ROW}>
          <Text style={LABEL}>Check-Out</Text>
          <Text>30 December 2020</Text>
        </View>
        {refundable && (
          <View style={REFUND}>
            <Image
              source={null}
              width={24}
              height={24}
              style={{backgroundColor: 'gray'}}
            />
            <Text>Dapat direfund jika dibatalkan</Text>
          </View>
        )}
      </View>
      {/* CONTENT */}
      <RadioButton
        label="Saya memesan untuk diri sendiri"
        value={1}
        selected={selectedOption === 1}
        onSelect={handleOptionSelect}
      />
      <RadioButton
        label="Saya memesan untuk orang lain"
        value={2}
        selected={selectedOption === 2}
        onSelect={handleOptionSelect}
      />
    </Screen>
  );
};
