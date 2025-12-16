const { writeFile, readFile } = require("fs").promises;

let first = "Hello this is the first text line."
let second = "Hello this is the second text line."
let third = "Hello this is the third text line."

writeFile('./content/temp.txt', 
            `${first}\n`, {flag: 'a'})
            .then(() => {
                return writeFile('./content/temp.txt', 
                    `${second}\n`, {flag: 'a'})
            })
            .then(() => {
                return writeFile('./content/temp.txt',
                    `${third}\n`, {flag: 'a'}
                )
            })
            .then(() => {
                return readFile('./content/temp.txt', 'utf8')
            })
            .then((result) => {
                console.log(result)
            })
            .catch(error => console.log(error))