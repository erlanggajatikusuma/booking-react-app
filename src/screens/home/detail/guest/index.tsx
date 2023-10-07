import {CompositeScreenProps} from '@react-navigation/native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Button, Picker, Screen} from '../../../../components';
import {useStoreContext} from '../../../../context/store-context';
import {color} from '../../../../theme';

const CONTAINER: ViewStyle = {
  paddingTop: 20,
};

const LABEL: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
  color: color.blue,
  paddingHorizontal: 16,
  marginBottom: 10,
};

const ADD_BUTTON: ViewStyle = {
  alignItems: 'center',
  marginVertical: 14,
};

const SELECTED_OPTION: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 6,
  marginVertical: 4,
};

const INPUT: ViewStyle = {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderRadius: 6,
  paddingHorizontal: 12,
  borderColor: color.borderGray,
};

const ICON: ImageStyle = {
  width: 24,
  height: 24,
  tintColor: 'red',
};

const DELETE_BUTTON: ViewStyle = {
  marginLeft: 14,
};

const FOOTER: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 24,
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
    const items = [
      {label: 'Mr', value: 'Mr'},
      {label: 'Mrs', value: 'Mrs'},
    ];

    return (
      <View style={SELECTED_OPTION}>
        <Picker
          items={items}
          selectedValue={item.gender}
          onValueChange={(itemValue, itemIndex) =>
            handleValueChange(itemValue, itemIndex, item.id)
          }
        />
        <TextInput
          value={item.name}
          onChangeText={text => onChangeText(item.id, text)}
          style={INPUT}
        />
        <Button
          preset="link"
          style={DELETE_BUTTON}
          onPress={() => onDelete(item.id)}>
          <Image source={icon} style={ICON} />
        </Button>
      </View>
    );
  },
  arePropsEqual,
);

export const GuestScreen: FC<CompositeScreenProps<any, any>> = props => {
  const {navigation} = props;

  const {state, dispatch} = useStoreContext();

  const guestStore = useMemo(() => state.guests, [state.guests]);

  const [guests, setGuests] = useState<Array<any>>(guestStore);

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
    if (guestStore.length) {
      dispatch({
        type: 'REMOVE_GUEST',
        payload: id,
      });
    }
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

  const handleSave = () => {
    if (guestStore.length) {
      const data = guests.flatMap(guest =>
        guestStore.some(value => value.id === guest.id) ? [] : guest,
      );
      data.map(guest => {
        dispatch({
          type: 'ADD_GUEST',
          payload: guest,
        });
      });
    } else {
      guests.map(guest => {
        dispatch({
          type: 'ADD_GUEST',
          payload: guest,
        });
      });
    }
    navigation.goBack();
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

  return (
    <Screen preset="scroll" statusBar="light-content">
      <FlatList
        data={guests}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={CONTAINER}
        ListHeaderComponent={<Text style={LABEL}>Data Tamu</Text>}
        // ListEmptyComponent={<Text style={LABEL}>Belum ada data</Text>}
        ListFooterComponent={
          <Button
            preset="link"
            style={ADD_BUTTON}
            labelStyle={{color: color.lightOrange}}
            onPress={addingGuest}
            label="+ Tambah data tamu"
          />
        }
      />
      <View style={FOOTER}>
        <Button
          label="Simpan"
          style={{
            backgroundColor: isDisabled ? color.borderGray : color.orange,
          }}
          onPress={handleSave}
          disabled={isDisabled}
        />
      </View>
    </Screen>
  );
};
