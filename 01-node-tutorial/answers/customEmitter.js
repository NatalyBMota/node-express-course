const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    if (id) {
        console.log(`data received user ${name} with id: ${id}`)
    } else {
        console.log(`data received user ${name}`)
    }
    
})

customEmitter.emit('response', 'john', 34)
customEmitter.emit('response', 'tess', 20)
customEmitter.emit('response', 'lisa')