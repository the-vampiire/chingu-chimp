
let data = 'https://www.freecodecamp.org/fccUserName/front-end-certification';
let rawCertificateString = data.slice(data.lastIndexOf('/')+1).split('-').map(e => e = `${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(' ');
console.log(rawCertificateString);