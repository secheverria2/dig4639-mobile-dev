<<<<<<< HEAD
console.log("Hello World"); 

=======
var x = 0;
console.log("Test");
>>>>>>> 41965ee10b08e77bdb004c683fe44186a129778b
function scopeDemo() {
    console.log(x)
    let a = 3, b = 4, c = 5;
    console.log(a);
    console.log(b);
    console.log(c);
    var x = 2;
    if(true) {
        var x = 0;
    }
}

function runOnLoad()
{
    // console.log(x);
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click",onClick);
    var submitButton = document.getElementById("");
}
var a = 0;
a = 10;
console.log(a);
function onClick() {
    console.log("clicked!");
}
window.addEventListener("DOMContentLoaded", runOnLoad);