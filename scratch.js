test = (a = 0, b = 0, c) => {
    if(a) return `a: ${a}`;
    if(b) return `b: ${b}`;
    if(c) return `c: ${c}`;
};

console.log(test(c = 5)); // a : 5
console.log(test(5)); // a : 5