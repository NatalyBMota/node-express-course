const { writeFile } = require('fs')
const line1 = "This is the first line."
const line2 = "This is the second line."
const line3 = "This is the third line."

console.log('start')

writeFile(
    './temporary/fileB.txt', 
    `${line1}\n${line2}\n${line3}`,       
    (err, result) => {
        if(err) {
            console.log("This error happened:", err)
            return
        }
        console.log('done with this task')
    }
)



console.log('starting the next one')