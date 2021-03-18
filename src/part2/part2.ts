import * as R from "ramda";

const stringToArray = R.split("");


const isVowel:(letter : string) => boolean = (letter : string):boolean => 
{
    const letterArr : string[] = stringToArray(letter);
    const vowelArr : string[] = ["a","A","e","E","i","I","o","O","u","U"];
    // check weather the letter appears in the vowel array
    return letterArr.filter(function(elem){
        return vowelArr.indexOf(elem) > -1;
    }).length > 0;
}


/* Question 1 */
export const countVowels : (str : string) => number = (str : string):number => 
{
    const arrOfString : string[] = stringToArray(str);
    const arrOfVowels : string[] = R.filter(isVowel,arrOfString);
    return arrOfVowels.length;
}
console.log(countVowels("This is SOME TextoO"));

// helper function to question 2

const compressString : (input : string[],output : string,lastLetter : string, counter : number,index : number) =>  string = 
       (input : string[],output : string,lastLetter : string, counter : number,index : number) : string => 
{
    if(index == input.length) // if we reached the end of the string
    {
        // if there are more than 1 consecutive chars then we need to add the number of chars , otherwise just add the char
        const toAddToString = counter > 1 ? lastLetter+counter : lastLetter;  
        return R.concat(output,toAddToString);
    }
    if(lastLetter === input[index]) // if we have the same letter then we just increase the counter
    {
        return compressString(input,output,lastLetter,counter+1,index+1);
    }
    // if we don't have the same letter then we need to conat the letter and its amount of appearences and move on to the next letter
    const toAddToString : string = counter > 1 ? lastLetter + counter : lastLetter;
    const toReturn : string = R.concat(output,toAddToString);
    return compressString(input,toReturn,input[index],1,index+1);
}

/* Question 2 */
export const runLengthEncoding : (str : string) => string = (str : string) : string => {
    if(str === "")
        return str;
    return compressString(stringToArray(str), "",str.charAt(0),0,0);
}

console.log(runLengthEncoding("aaaabbbccdaa"));


const isPairedRec : (input : string[] , index : number, parentheses : string) => boolean = 
    (input : string[] , index : number, parentheses : string) : boolean =>
{
    const openingParentheses : string[] = ["[","(","{"];
    if(index == input.length)
    {
        return parentheses.length == 0;
    }
    const nextLetter : string[] = [input[index]];
    const isOpen : boolean = nextLetter.filter(function(elem) {
        return openingParentheses.indexOf(elem) > -1;
    }).length > 0;
    if(isOpen)
    {
        const newParentheses : string = parentheses + input[index];
        return isPairedRec(input,index+1,newParentheses);
    }
    switch(input[index])
    {
        case ")" :{
            return parentheses.charAt(parentheses.length-1) == "(" ? isPairedRec(input, index+1, parentheses.substring(0, parentheses.length-1)) : false;
        }
        case "]":{
            return parentheses.charAt(parentheses.length-1) == "[" ? isPairedRec(input, index+1, parentheses.substring(0, parentheses.length-1)) : false;
        }
        case "}":{
            return parentheses.charAt(parentheses.length-1) == "{" ? isPairedRec(input, index+1, parentheses.substring(0, parentheses.length-1)) : false;
        }
        default :{
            return isPairedRec(input,index+1,parentheses);
        }
    }

}

/* Question 3 */
export const isPaired : (str : string) => boolean = (str : string) : boolean =>{
    return isPairedRec(stringToArray(str),0,"");
}

console.log(isPaired("This is ]some[ (text)"));