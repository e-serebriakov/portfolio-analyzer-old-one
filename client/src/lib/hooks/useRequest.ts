import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type State<E, T> = {
  data: T;
  error: E | null;
  isLoading: boolean;
};

enum ActionType {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
};

type Action<E, T> = 
| { type: ActionType.FETCH_INIT }
| { type: ActionType.FETCH_SUCCESS, payload: T }
| { type: ActionType.FETCH_FAILURE, payload: E };

type ReducerType<T> = (state: State<string, T>, action: Action<string, T>) => State<string, T>;

const dataFetchReducer = <E, T>(state: State<E, T>, action: Action<E, T>): State<E, T> => {
  switch (action.type) {
    case ActionType.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ActionType.FETCH_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case ActionType.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export const useRequest = <T>(options: AxiosRequestConfig, initialData: T): [State<string, T>] => {
  const [state, dispatch] = React.useReducer<ReducerType<T>>(dataFetchReducer, {
    isLoading: false,
    error: null,
    data: initialData,
  });

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: ActionType.FETCH_INIT });
 
      try {
        const response = await axios.request<T>({
          baseURL: `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`,
          ...options
        });

        if (!didCancel) {
          dispatch({ type: ActionType.FETCH_SUCCESS, payload: response.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ActionType.FETCH_FAILURE, payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return [state];
}