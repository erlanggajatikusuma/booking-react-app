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
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {Button, Picker, Screen} from '../../../../components';
import {useStoreContext} from '../../../../context/store-context';

const SELECTED_OPTION: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  //   borderWidth: 1,
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
  handleValueChange?: (itemValue: T, itemIndex: number, id: number) => void;
  onChangeText?: ((id: number, text: string) => void) | undefined;
  onDelete?: (id: number) => void;
  item: any;
};

function arePropsEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.name === nextProps.item.name &&
    prevProps.item.gender === nextProps.item.gender
  );
}

const Item = React.memo(
  ({item, handleValueChange, onChangeText, onDelete}: ItemProps) => {
    console.log('Render Item ==> ', item.gender);
    const items = [
      {label: 'Mr', value: 'Mr'},
      {label: 'Mrs', value: 'Mrs'},
    ];

    return (
      <View style={SELECTED_OPTION}>
        <View>
          <Picker
            items={items}
            selectedValue={item.gender}
            onValueChange={(itemValue, itemIndex) =>
              handleValueChange(itemValue, itemIndex, item.id)
            }
          />
        </View>
        <TextInput
          value={item.name}
          onChangeText={text => onChangeText(item.id, text)}
          style={INPUT}
        />
        <Button preset="link" onPress={() => onDelete(item.id)}>
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

  const isDisabled = useMemo(() => {
    const disable =
      guests.length === 0 ||
      guests.some(guest => guest.name === '' || guest.gender === '');
    return disable;
  }, [guests]);

  const handleValueChange = (itemValue: T, itemIndex: number, id: number) => {
    setGuests(prevState =>
      prevState.map(guest =>
        guest.id === id ? {...guest, gender: itemValue} : guest,
      ),
    );
  };

  const handleChangeText = useCallback((id: number, text: string) => {
    setGuests(prevState =>
      prevState.map(guest =>
        guest.id === id ? {...guest, name: text} : guest,
      ),
    );
  }, []);

  const handleDelete = (id: number) => {
    setGuests(prevState => prevState.filter(guest => guest.id !== id));
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
    const {item} = info;

    return (
      <Item
        item={item}
        handleValueChange={handleValueChange}
        onChangeText={handleChangeText}
        onDelete={handleDelete}
      />
    );
  };

  console.log('button disable ===>  ', isDisabled);

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
