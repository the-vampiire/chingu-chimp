/**
 * Created by Vampiire on 7/5/17.
 */

const t = { test : [{testkey : 'test value'}]};

// console.log(t);
// console.log(t.test[0].testkey);
// console.log(t.test[0].hasOwnProperty('testkey'));

try {
    t.aaahasOwnProperty('test2key');
    console.log('worked');
} catch(e){
    console.log(e);
}

