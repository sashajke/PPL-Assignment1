import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue = (x : number) : State<Queue,number | undefined> => {
    const state : State<Queue,number | undefined> =  (queue : Queue) : [Queue,number | undefined] => {
        const newQueue : Queue = R.concat(queue,[x]);
        return [newQueue,undefined];
    }
    return state;
}

export const dequeue : State<Queue,number> = (queue : Queue) : [Queue,number] => {
    const numberToReturn : number = queue[0];
    const newQueue : Queue = queue.slice(1,queue.length);
    return [newQueue,numberToReturn];
}


export const queueManip : State<Queue,number|undefined> = (queue : Queue) : [Queue,number|undefined] =>{
    const func = bind(dequeue,num => bind(enqueue(num*2),num1 => bind(enqueue(num/3),num2 => dequeue)));
    return func(queue);
}