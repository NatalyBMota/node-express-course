const { readFileSync, writeFileSync } = require('fs')
console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
const third = readFileSync('./content/third.txt', 'utf8')

writeFileSync(
    './temporary/fileA.txt', 
    `Here is the result: ${first}, ${second}, ${third}`, 
    { flag: 'a' }
)

const fileA = readFileSync('./temporary/fileA.txt', 'utf8')
console.log(fileA)