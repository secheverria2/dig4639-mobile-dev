<<<<<<< HEAD
console.log("Hello World"); 
var x = 1
var y = [1]
function scopeDemo(y1) {
    console.log(x)
=======
console.log("Hello World");
var x = [1];
function scopeDemo(x1) {
    console.log(x1);
    console.log(x);
>>>>>>> 41965ee10b08e77bdb004c683fe44186a129778b
    let a = 3, b = 4, c = 5;
    x1[0] = 500;
    console.log(a);
    console.log(b);
    console.log(c);
<<<<<<< HEAD
    console.log(y1);
    y1[0] = 500; 
    var x = 2;
=======
>>>>>>> 41965ee10b08e77bdb004c683fe44186a129778b
    if(true) {
        var x = 0;
    }
    return a;
}
<<<<<<< HEAD
x = scopeDemo(y1); 
console.log(y); 
console.log(0); 
=======
scopeDemo(x);
console.log(x);
>>>>>>> 41965ee10b08e77bdb004c683fe44186a129778b
