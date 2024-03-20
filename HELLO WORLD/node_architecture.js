const fs = require('fs')

// Blocking Code - Thread Pool - Min - 4 - Max?
const os = require('os')
console.log("max number of threads in my cpu : ",os.cpus().length);

console.log('1');
// Blocking Code
const result = fs.readFileSync('./test.txt','utf-8')
console.log(result);
console.log('2');
console.log('3');

console.log('1');
//NON-Blocking Code
fs.readFile('./test.txt','utf-8',(err,result)=>{
        console.log(result);
})
console.log('2');
console.log('3');