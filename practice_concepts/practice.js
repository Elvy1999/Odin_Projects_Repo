// learning factory functions

const playerFactory = (name,age,str) =>{
    const welcomePlayer = () => console.log(`Hello ${name}, your quest has just started at ${age} years old`);
    const playerStr = () => console.log(`${name} your current strength is ${str}`);
    return{welcomePlayer, playerStr}; // these are the attibutes that can be accessed 
    // when a player object is created. name,age, and str cannot be accessed becasue they
    // are not in the return statement, so one benefit of factory functions is that they  
    // provide closure to your code which means that you can create private variables and 
    // functions. If I wanted name,age, or str to be accessible I would just have to
    // put them in the return statement.
    // Private functions are functions that are used in the workings of our objects 
    //that are not intended to be used elsewhere in our program.
}
// The factory function below is inheriting 2 methods from the playerFactory function.
// all of the methods of the playerFactory function are being passed to PlayerVoiceLines
// by utilizing the Object.assign method in the return statement, I have to read up more on this 
// later to better understand what it is doing.
const playerVoiceLines = (name,age, str) =>
{
    const prototype = playerFactory(name, age, str);
    const line1 = ()=> {console.log("Hahahahah, Victory is mine")};
    const line2 = ()=> {console.log("This shall be your end");}
    return Object.assign({}, prototype, {line1}, {line2});
}

player1 = playerFactory("Elvy",23,45);
player1.welcomePlayer();
player1.playerStr();
console.log();
player2 = playerVoiceLines("John", 23, 56);
player2.line1();
player2.line2();
player2.welcomePlayer();
player2.playerStr();