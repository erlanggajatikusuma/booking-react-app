import {
  View,
  Text,
  TextInput,
  ViewStyle,
  Image,
  ImageStyle,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {Button, Screen} from '../../../../components';
import {useStoreContext} from '../../../../context/store-context';

const SELECTED_OPTION: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const INPUT: ViewStyle = {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderRadius: 6,
  paddingHorizontal: 12,
};

const ICON: ImageStyle = {
  width: 24,
  height: 24,
};

const icon = require('../../../../assets/icon/trash.png');

type ItemProps = {
  selectedOption?: string;
  onSelect?: (value: string) => void;
  onDelete?: (id: number) => void;
  item: any;
};

function arePropsEqual(prevProps: any, nextProps: any) {
  return prevProps.item.latitude === nextProps.item.id;
}

const Item = React.memo(
  ({item, selectedOption, onSelect, onDelete}: ItemProps) => {
    console.log('Render Item ==> ', item);
    const handleOptionSelect = useCallback(
      (value: string) => {
        onSelect(value);
      },
      [onSelect],
    );

    return (
      <View style={SELECTED_OPTION}>
        <TextInput style={INPUT} />
        <Button preset="link" onPress={() => onDelete(item?.id)}>
          <Image source={icon} style={ICON} />
        </Button>
      </View>
    );
  },
  arePropsEqual,
);

export const GuestScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;

  const {state} = useStoreContext();

  const [guests, setGuests] = useState<Array<any>>(state.guests);
  const [selectedOption, setSelectedOption] = useState<string>('Option 1');

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const addingGuest = () => {
    const id = new Date().getUTCMilliseconds();
    const guest = {
      id,
      gender: 'Mr',
      name: '',
    };
    setGuests(prevState => [...prevState, guest]);
  };

  const renderItem: ListRenderItem<ItemT> = info => {
    const {index, item} = info;
    console.log('Item ===> ', item);
    return (
      <Item item={item} selectedOption="Mr" onSelect={handleOptionSelect} />
    );
  };

  return (
    <Screen preset="scroll">
      <FlatList
        data={guests}
        renderItem={renderItem}
        scrollEnabled={false}
        ListHeaderComponent={<Text>Data Tamu</Text>}
        ListFooterComponent={
          <Button
            preset="link"
            onPress={addingGuest}
            label="Tambah data tamu"
          />
        }
      />
    </Screen>
  );
};
