import { Creator, ActionCreator, TypedAction, FunctionWithParametersType, NotAllowedCheck, Props } from './models';
export declare function createAction<T extends string>(type: T): ActionCreator<T, () => TypedAction<T>>;
export declare function createAction<T extends string, P extends object>(type: T, config: Props<P> & NotAllowedCheck<P>): ActionCreator<T, (props: P & NotAllowedCheck<P>) => P & TypedAction<T>>;
export declare function createAction<T extends string, P extends any[], R extends object>(type: T, creator: Creator<P, R> & NotAllowedCheck<R>): FunctionWithParametersType<P, R & TypedAction<T>> & TypedAction<T>;
export declare function props<P extends object>(): Props<P>;
export declare function union<C extends {
    [key: string]: ActionCreator<string, Creator>;
}>(creators: C): ReturnType<C[keyof C]>;
