const names = require('./04-names')
const sayHi = require("./05-utils").default
const data = require("./06-alternative-flavor")
require('./07-mind-grenade')

sayHi('Susan')
console.log(names)
console.log(`Items: ${data.items}`)
console.log(`Single Person: ${data.singlePerson}`)
console.log(`Single Person's Name: ${data.singlePerson.name}`)
