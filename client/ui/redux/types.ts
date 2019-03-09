import { ActionCreator, AsyncActionCreators } from 'typescript-fsa';
import * as events from './actions/events';
import { reducerMap } from './reducers';
import { Dispatch } from 'redux';

type ExtractActionFromFSA<A> = A extends AsyncActionCreators<any, any, any>
  ? ReturnType<A['started']> | ReturnType<A['done']> | ReturnType<A['failed']>
  : A extends ActionCreator<any>
  ? ReturnType<A>
  : never;

type ScanActionsFromModule<
  M extends { [K: string]: any }
> = ExtractActionFromFSA<M[keyof M]>;

export type RootAction = ScanActionsFromModule<typeof events>;

export type RootState = {
  readonly [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
};

export type Dispatch = Dispatch<RootAction>;
export type Reducer<S> = (state: S | undefined, action: RootAction) => S;
