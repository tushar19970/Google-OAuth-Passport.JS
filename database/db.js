require('dotenv').config()
const knex = require('knex')({
    client : "mysql", 
    connection : {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS, 
        database : process.env.DB_NAME
    }
})

knex.schema.createTable('google', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('image_url')
}).then(() => {
    console.log("Your Google table has created successfuly..");
}).catch((err) => {
    console.log('Your Google table has already created..')
})


module.exports = knex
