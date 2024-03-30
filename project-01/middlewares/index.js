const fs = require('fs')

function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFile(
            'log.txt',
            `${Date.now()} ${req.method} ${req.path} ${req.userName}\n`,
            (err, data) => {
                next();
            })
    }
}

module.exports = {logReqRes}