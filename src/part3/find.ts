import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x : T) => boolean, a: T[]) : Result<T> => {
    const arr : T[] = a.filter(pred);
    if(arr.length === 0) // no object that passed the predicate check , need to return failure
    {
        return makeFailure("No object found in the array");
    }
    return makeOk(arr[0]);
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

const getSquareResult = (x : number) : Result<number> => {
    return {tag:"Ok",value : x*x};
}
const getSquare = (x : number) : number => x * x;
const ifFailure = (message : string) : number => -1;
const isEven = (x : number) : boolean => x % 2 == 0;

export const returnSquaredIfFoundEven_v2 = (a : number[]) : Result<number> => {
    const r : Result<number> = findResult(isEven,a);
    return bind(r,getSquareResult);
}

export const returnSquaredIfFoundEven_v3 = (a : number[]) : number => 
{
    const r : Result<number> = findResult(isEven, a);
    return either(r,getSquare,ifFailure);   
}