import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Screen} from '../../components';
import {getBookingDetail} from '../../services';
import {color} from '../../theme';

const CONTAINER: ViewStyle = {
  paddingTop: 22,
};

const ITEM: ViewStyle = {
  borderWidth: 1,
  borderColor: color.borderGray,
  borderRadius: 12,
  padding: 16,
  marginHorizontal: 16,
  backgroundColor: color.white,
};

const IMAGE: ImageStyle = {
  width: '100%',
  height: 150,
  borderRadius: 12,
};

function arePropsEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.item.latitude === nextProps.item.latitude &&
    prevProps.item.longitude === nextProps.item.longitude
  );
}

const Item = React.memo(
  ({index, item, navigation}: {index: number; item: any; navigation?: any}) => {
    const name = item?.chosen_hotel_detail?.hotel_name || 'Hotel';
    const image = {uri: item?.chosen_hotel_detail?.images[0]?.thumbnail};

    const handleNavigate = () =>
      navigation.navigate('App.Home.Detail', {...item});

    return (
      <View key={index} style={ITEM}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image source={image} style={IMAGE} />
          <Text>{name}</Text>
          <Text>{item?.chosen_hotel_detail?.address}</Text>
        </TouchableOpacity>
      </View>
    );
  },
  arePropsEqual,
);

export const HomeScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;

  const [hotel, setHotel] = useState<Array<any>>([]);

  useEffect(() => {
    getBookingDetail().then(result => {
      if (result.success) {
        const data = [result.data.chosen_hotel.data.get_chosen_hotel];
        setHotel(data);
      }
    });
  }, []);

  const renderItem: ListRenderItem<any> = info => {
    const {index, item} = info;
    return <Item index={index} item={item} navigation={navigation} />;
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor="lightgray"
      backgroundBar="lightgray"
      statusBar="dark-content"
      style={CONTAINER}
      safeAreaEdges={['top', 'bottom']}>
      <FlatList data={hotel} renderItem={renderItem} scrollEnabled={false} />
    </Screen>
  );
};
