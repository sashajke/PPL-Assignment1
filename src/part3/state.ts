import { SSL_OP_ALL } from "node:constants";

export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S,A,B>(state : State<S,A>, f : (x : A) => State<S,B>) : State<S,B> => {
    const func = (s : S) : [S,B] => 
    {
        const a : A = state(s)[1];
        const s1 : S = state(s)[0];
        const newState : State<S,B> = f(a);
        const b : B = newState(s1)[1];
        const s2 : S = newState(s1)[0];
        return [s2,b];
    }
    return func;
}




