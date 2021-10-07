const express = require("express")
const knex = require('../database/db')
const router = express.Router()
router.use(express.json())

//// This is a get all api
router.get('/all',(req, res) => {
    knex.select('*').from('google').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a get by id api
router.get('/get/:id', (req, res) => {
    knex.select('*').from('google').where({'id':req.params.id}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//// This is a change by id api
router.put('/change/:id', (req, res) => {
    knex('google')
    .where({id : req.params.id})
    .update(req.body).then((data) => {
        res.send({'message' : 'change data'})
    }).catch((err) => {
        res.send(err.message)
    })
})

//// This is a delete by id api
router.delete('/delete/:id', (req, res) => {
    knex('google').where({id : req.params.id}).del().then((data) => {
        res.send("Your data deleted..")
    }).catch((err) => {
        res.send(err.message)
    })
})

module.exports = router