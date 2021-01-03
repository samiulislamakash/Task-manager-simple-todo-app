const express = require('express')
const ListRoute = express.Router()
const Authenticate = require('../middlware/middlware')

// load in mongoose model
const List = require('../db/models/list.model')

ListRoute.get('/lists/all', Authenticate, async (req, res) => {
    try {
        const list = await List.find({
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User not found !!' })
        }
        res.status(200).send({ success: true, message: 'Get list data successfull.', data: list })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }
})

ListRoute.get('/lists/:id', Authenticate, async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.id,
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User not found !!' })
        }
        res.status(200).send({ success: true, message: 'Get list data successfull.', data: list })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }
})

ListRoute.post('/lists/create', Authenticate, async (req, res) => {
    try {
        let title = req.body.title;
        if (!title) {
            res.status(404).send({ success: false, message: 'Bad Request !!' });
        }
        let newList = new List({ title, _userid: req.user._id })
        await newList.save()
        res.status(200).send({ success: true, message: 'Get list data successfull.', data: newList });
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }
})

ListRoute.patch('/lists/update/:id', Authenticate, (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id, _userid: req.user._id }, {
        $set: req.body
    }).then(() => {
        res.status(200).send({ success: true, message: 'List Data is Updated.' })
    }).catch((e) => {
        res.status(400).send({ success: false, message: 'List Data Update Error' })
    })
})

ListRoute.delete('/lists/:id', Authenticate, (req, res) => {
    // wet went to delete a spacified list
    List.findOneAndRemove({ _id: req.params.id, _userid: req.user._id }).then((deleteData) => {
        res.status(200).send({ success: true, message: 'List Delete Successfull.', data: deleteData })
    }).catch((e) => {
        res.status(400).send({ success: false, message: 'List Data Delete Error' })
    })
})


module.exports = ListRoute