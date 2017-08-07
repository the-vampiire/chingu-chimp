// console.log(new Date(1501976018258));

const a = ['one', 'two', 'three'];
let found;
console.log(a.some( e => {
    if(e === 'seven') {
        found = e;
        return true
    }
}));

console.log(found);