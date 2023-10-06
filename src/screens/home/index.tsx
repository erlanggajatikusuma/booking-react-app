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
} from 'react-native';
import {Screen} from '../../components';
import {getBookingDetail} from '../../services';
import {useStoreContext} from '../../context/store-context';

const IMAGE: ImageStyle = {
  width: '100%',
  height: 150,
};

function arePropsEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.item.latitude === nextProps.item.latitude &&
    prevProps.item.longitude === nextProps.item.longitude
  );
}

const Item = React.memo(
  ({index, item, navigation}: {index: number; item: any; navigation?: any}) => {
    console.log('render Item ==> ', index);
    const name = item.hotel_name || 'Hotel';
    const image = {uri: item.images[0]?.thumbnail};

    const handleNavigate = () =>
      navigation.navigate('App.Home.Detail', {...item});

    return (
      <View key={index}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image source={image} style={IMAGE} />
          <Text>{name}</Text>
          <Text>{item.address}</Text>
        </TouchableOpacity>
      </View>
    );
  },
  arePropsEqual,
);

export const HomeScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;

  const {state, dispatch} = useStoreContext();

  const [hotel, setHotel] = useState<Array<any>>([]);

  useEffect(() => {
    getBookingDetail().then(result => {
      if (result.success) {
        const data = [result.data?.get_chosen_hotel?.chosen_hotel_detail];
        setHotel(data);
      }
    });
  }, []);

  const renderItem: ListRenderItem<ItemT> = info => {
    const {index, item} = info;
    return <Item index={index} item={item} navigation={navigation} />;
  };

  return (
    <Screen preset="fixed">
      <FlatList data={hotel} renderItem={renderItem} />
    </Screen>
  );
};
