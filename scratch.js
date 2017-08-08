let t = `a dog`;

console.log(~t.indexOf('dog'));
console.log(Boolean(!~t.indexOf('cat')) === true);

/*
*
*
* ~
*   (value * -1) + -1
*
* */
