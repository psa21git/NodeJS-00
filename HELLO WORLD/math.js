// Creating a math module

function add(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}

module.exports = {
    add,
    sub
}

// or

// exports.add1 = (a,b) => a+b;
// exports.sub2 = (a,b) => a-b;