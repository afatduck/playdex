import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import getMe from './requests/getMe';

type UserAction =
  | { type: 'LOGIN'; payload: AuthResponse }
  | { type: 'LOGOUT' }
  | { type: 'ADD_FAVORITE'; payload: number }
  | { type: 'REMOVE_FAVORITE'; payload: number };

function userReducer(
  state: UserState | null,
  action: UserAction,
): UserState | null {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem('jwt', action.payload.jwt);
      return {
        ...action.payload.user,
        favorites: action.payload.user.favorites.map(f => f.game_id),
      };
    }

    case 'LOGOUT': {
      localStorage.removeItem('jwt');
      return null;
    }

    case 'ADD_FAVORITE': {
      if (state == null) {
        return null;
      }
      const new_fav = [...state.favorites];
      if (!new_fav.includes(action.payload)) {
        new_fav.push(action.payload);
      }

      return {
        ...state,
        favorites: new_fav,
      };
    }

    case 'REMOVE_FAVORITE':
      if (state == null) {
        return null;
      }

      return {
        ...state,
        favorites: state.favorites.filter(x => x != action.payload),
      };

    default:
      return state;
  }
}

const UserStateContext = createContext<UserState | null | undefined>(undefined);
const UserDispatchContext = createContext<
  React.Dispatch<UserAction> | undefined
>(undefined);

const userLS = localStorage.getItem('user');
const init = userLS ? JSON.parse(userLS) : null;

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, init);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      getMe().then(res => {
        if (res.success) {
          dispatch({
            type: 'LOGIN',
            payload: res.data,
          });
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state));
  }, [state]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}
