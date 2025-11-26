const {createReadStream} = require('fs')

const stream = createReadStream('../content/big.txt', { 
    highWaterMark: 1000, 
    encoding: 'utf8'
})

let counter = 0

stream.on('data', (result) => {
    counter++
    console.log(result)
})

stream.on('end', () => {
    console.log(`Number of chunks received: ${counter}`)
})

stream.on('error', (error) => {
    console.log('There was an error reading the stream: ', error)    
})