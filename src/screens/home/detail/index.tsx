import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Button, RadioButton, Screen} from '../../../components';
import {useStoreContext} from '../../../context/store-context';
import {color} from '../../../theme';

const CONTENT: ViewStyle = {
  paddingHorizontal: 12,
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderColor: color.borderGray,
};

const LABEL: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
};

const HOTEL_LABEL: TextStyle = {
  color: color.blue,
  fontWeight: '500',
};

const HOTEL: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  borderRadius: 8,
  marginVertical: 10,
  borderWidth: 1,
  borderColor: color.borderGray,
};

const THUMBNAIL: ImageStyle = {
  width: 64,
  height: 64,
  borderRadius: 8,
  backgroundColor: 'gray',
  marginRight: 12,
};

const FLEX_ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
};

const FLEX_ALIGN: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const ITEM_CONTENT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.borderGray,
  padding: 12,
  borderRadius: 6,
  marginVertical: 6,
};

const SEPARATOR: ViewStyle = {
  height: 8,
};

const REFUND: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: 12,
};

const ICON: ImageStyle = {
  width: 18,
  height: 18,
  marginRight: 12,
  tintColor: color.lightOrange,
};

const USER: ImageStyle = {
  width: 14,
  height: 14,
  marginRight: 8,
};

const BULLET: ViewStyle = {
  width: 3,
  height: 3,
  borderRadius: 3 / 2,
  backgroundColor: color.darkGray,
  marginHorizontal: 6,
};

const iconRefund = require('../../../assets/icon/refund.png');

type ItemProps = {
  item: any;
};

const Item = React.memo(({item}: ItemProps) => {
  const img = require('../../../assets/icon/user.png');
  return (
    <View key={item.id} style={ITEM_CONTENT}>
      <Image source={img} style={USER} />
      <Text>{`${item.gender}. ${item.name}`}</Text>
    </View>
  );
});

export const DetailScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation, route} = props;

  const {state} = useStoreContext();

  const guests = useMemo(() => state.guests, [state.guests]);
  const hotel = useMemo(() => {
    const data = route.params;
    return data;
  }, [route.params]);

  const image = useMemo(() => {
    const img = {uri: hotel?.chosen_hotel_detail?.images[7]?.thumbnail};
    return img;
  }, [hotel]);

  const stay = useMemo(() => {
    const data = hotel?.chosen_hotel_params;
    const dateIn = new Date(data.check_in);
    const dateOut = new Date(data.check_out);
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    const checkin = dateIn.toLocaleDateString('id-ID', options);
    const checkout = dateOut.toLocaleDateString('id-ID', options);
    return {checkin, checkout};
  }, [hotel]);

  const [selectedOption, setSelectedOption] = useState<number | null>(
    guests.length !== 0 ? 2 : 1,
  );

  const isGuest = useMemo(() => selectedOption === 2, [selectedOption]);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  const handleNavigate = () => navigation.navigate('App.Home.Detail.Guest');

  const renderItem: ListRenderItem<ItemT> = info => {
    const {item} = info;
    return <Item item={item} />;
  };

  return (
    <Screen preset="scroll" statusBar="light-content">
      <View style={CONTENT}>
        <Text style={LABEL}>Detail Pesanan</Text>
        <View style={HOTEL}>
          <Image source={image} style={THUMBNAIL} />
          <View>
            <Text style={HOTEL_LABEL}>
              {hotel.chosen_hotel_detail?.hotel_name}
            </Text>
            <Text
              numberOfLines={3}
              style={{color: color.darkGray}}
              ellipsizeMode="tail">
              {hotel?.chosen_hotel_room?.room_name}
            </Text>
            <View style={FLEX_ALIGN}>
              <Text ellipsizeMode="tail" style={{color: color.darkGray}}>
                {hotel?.chosen_hotel_params?.total_room} kamar
              </Text>
              <View style={BULLET} />
              <Text ellipsizeMode="tail" style={{color: color.darkGray}}>
                {hotel?.chosen_hotel_params?.guest_adult} tamu
              </Text>
            </View>
          </View>
        </View>
        <View style={FLEX_ROW}>
          <Text style={LABEL}>Check-In</Text>
          <Text style={{color: color.darkGray}}>{stay.checkin}</Text>
        </View>
        <View style={FLEX_ROW}>
          <Text style={LABEL}>Check-Out</Text>
          <Text style={{color: color.darkGray}}>{stay.checkout}</Text>
        </View>
        {hotel?.chosen_hotel_prices?.is_refundable && (
          <View style={REFUND}>
            <Image source={iconRefund} style={ICON} />
            <Text style={{color: color.lightOrange, fontWeight: '500'}}>
              Dapat direfund jika dibatalkan
            </Text>
          </View>
        )}
      </View>

      <View style={CONTENT}>
        <Text style={LABEL}>Detail Pemesan</Text>
        <View
          style={[HOTEL, {justifyContent: 'space-between', marginBottom: 16}]}>
          <View>
            <Text style={LABEL}>Tn Andreas</Text>
            <Text style={{color: color.borderGray}}>
              andreasanandreas@gmail.com
            </Text>
            <Text style={{color: color.borderGray}}>+6282214222225</Text>
          </View>
          <Button preset="link" label="Ubah" />
        </View>
        <RadioButton
          label="Saya memesan untuk diri sendiri"
          value={1}
          selected={selectedOption === 1}
          onSelect={handleOptionSelect}
        />
        <View style={SEPARATOR} />
        <RadioButton
          label="Saya memesan untuk orang lain"
          value={2}
          selected={selectedOption === 2}
          onSelect={handleOptionSelect}
        />

        {isGuest && (
          <FlatList
            data={guests}
            renderItem={renderItem}
            scrollEnabled={false}
            ListHeaderComponent={<Text style={LABEL}>Data Tamu</Text>}
            ListHeaderComponentStyle={{marginTop: 12, marginBottom: 6}}
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
        )}
      </View>
    </Screen>
  );
};
