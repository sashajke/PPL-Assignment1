import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push = (x : number) : State<Stack,undefined> => {
    const state : State<Stack,undefined> =  (stack : Stack) : [Stack,undefined] => {
        const newStack : Stack = R.concat([x],stack);
        return [newStack,undefined];
    }
    return state;
}

export const pop : State<Stack,number> = (stack : Stack) : [Stack,number] => {
    const numberToReturn : number = stack[0];
    const newStack : Stack = stack.slice(1,stack.length);
    return [newStack,numberToReturn];
}
export const stackManip : State<Stack,undefined> = (stack : Stack) : [Stack,undefined] =>{
    const func = bind(pop,(x : number) => bind(push(x*x),(num1 : undefined) => bind(pop,(y : number) => push(x+y))));
    return func(stack);
}