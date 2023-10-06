import React, {createContext, useContext, useReducer, ReactNode} from 'react';

interface Guest {
  id: number;
  name: string;
  gender: 'Mr' | 'Mrs';
}

interface StoreState {
  guests: Guest[];
}

// type StoreAction =
//   | UserAction
//   | ProductsAction
//   | TokenAction
//   | WishlistAction
//   | CartAction;

// const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
//   return {
//     userState: userReducer(state.userState, action),
//     productsState: productsReducer(state.productsState, action),
//     tokenState: tokenReducer(state.tokenState, action),
//     wishlistState: wishlistReducer(state.wishlistState, action),
//     cartState: cartReducer(state.cartState, action),
//   };
// };

type StoreAction =
  | {type: 'ADD_GUEST'; payload: Guest}
  | {type: 'REMOVE_GUEST'; payload: number};

// Initial state for storeState
const initialState: StoreState = {
  guests: [],
};

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'ADD_GUEST':
      return {...state, guests: [...state.guests, action.payload]};
    case 'REMOVE_GUEST':
      return {
        ...state,
        guests: state.guests.filter(guest => guest.id !== action.payload),
      };
    default:
      return state;
  }
};

interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{children: ReactNode}> = ({children}) => {
  //   const [state, dispatch] = useReducer(storeReducer, {
  //     userState: {user: null},
  //     productsState: {products: []},
  //     tokenState: {token: null},
  //     wishlistState: {wishlist: []},
  //     cartState: {cart: []},
  //   });
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
