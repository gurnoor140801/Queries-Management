setInterval(async function(){
    await one();
    await two();
    await three();
    await four();
    await five();
}, 100)

console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");
console.log("bye bye");

setInterval(function(){
    console.log("hi how ");
}, 1000)


function one(){
    return new Promise(function(res, rej){
        console.log(1);
        res();
    })
}
function two(){
    return new Promise(function(res, rej){
        console.log(2);
        res();
    })
}function three(){
    return new Promise(function(res, rej){
        console.log(3);
        res();
    })
}function four(){
    return new Promise(function(res, rej){
        console.log(4);
        res();
    })
}function five(){
    return new Promise(function(res, rej){
        console.log(5);
        res();
    })
}