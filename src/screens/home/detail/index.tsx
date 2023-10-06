import {
  View,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  ViewStyle,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {Button, RadioButton, Screen} from '../../../components';
import {useStoreContext} from '../../../context/store-context';

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
  const {state, dispatch} = useStoreContext();

  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const refundable = true;

  const isGuest = useMemo(() => selectedOption === 2, [selectedOption]);
  const guests = useMemo(() => state.guests, [state.guests]);

  useEffect(() => {
    console.log('Pass Props ===> ', route.params);
  }, [route]);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  const handleNavigate = () => navigation.navigate('App.Home.Detail.Guest');

  const renderItem: ListRenderItem<ItemT> = info => {
    const {index, item} = info;
    console.log('Render Item ==> ', info);
    return null;
  };

  return (
    <Screen preset="scroll" style={{flexGrow: 1}}>
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
      <View>
        <Text style={LABEL}>Detail Pemesan</Text>

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

        {/* GUEST */}
        {isGuest && (
          <View>
            <FlatList
              data={guests}
              renderItem={renderItem}
              scrollEnabled={false}
              ListHeaderComponent={<Text style={LABEL}>Data Tamu</Text>}
              ListEmptyComponent={<Text>Belum ada data tamu</Text>}
              ListFooterComponent={
                <Button
                  label="Ubah Data Tamu"
                  onPress={handleNavigate}
                  preset="link"
                  labelStyle={{alignSelf: 'flex-end'}}
                />
              }
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
