const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        const first = await readFile('./content/first.txt', 'utf8')
        const second = await readFile('./content/second.txt', 'utf8')
        const third = await readFile('./content/third.txt', 'utf8')
        await writeFile('./content/temp.txt', 
            `THIS IS AWESOME ${first}\n${second}\n${third}\n`, {flag: 'a'})
    } catch(error) {
        console.log(error)
    }
}

// writer()

const reader = async () => {
    try {
        const temp = await readFile('./content/temp.txt', 'utf8')
        console.log(temp)
    } catch (error) {
        console.log('Problem reading temp.txt file.', error)
    }   
}

// reader()

const readWrite = async ()=> {
    try {
        await writer()
        await reader()
    } catch (error) {
        console.log('Problem either calling the writer function or the reader function: ', error)
    }
}

readWrite()