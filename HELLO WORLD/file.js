const fs = require('fs')

//Sync...
// fs.writeFileSync("./test.txt","Hello World Sync")

//Async
// fs.writeFile('./test.txt','Hello PSA Async ',(err)=>{})

// fs.appendFileSync('./contacts.txt',"Amulya: +-<3")

//Read
// const result = fs.readFileSync('./contacts.txt','utf-8')
// console.log(result);

fs.appendFileSync('./contacts.txt',`\n${Date.now()} RUN TIME`)

fs.readFile('./contacts.txt','utf-8',(err,result)=>{
    if (err){
        console.log("Error is ",err);
    }
    else{
        console.log(result);
    }
})

// //copying a file
// fs.cpSync('./contacts.txt','./copy.txt')

// //delete a file
// fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./contacts.txt'))

// fs.mkdirSync('mydocs')
fs.mkdirSync("my-docs2/a/b",{ recursive: true });


