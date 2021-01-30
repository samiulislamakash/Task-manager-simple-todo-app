const express = require('express')
const ListRoute = express.Router()
const Authenticate = require('../../middleware/middlware')

const List = require('./list.model')

ListRoute.get('/all', Authenticate, async (req, res) => {
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

ListRoute.get('/:id', Authenticate, async (req, res) => {
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

ListRoute.post('/create', Authenticate, async (req, res) => {
    try {
        let title = req.body.title;
        if (!title) {
            res.status(404).send({ success: false, message: 'Bad Request !!' });
        }
        let newList = new List({ title, _userid: req.user._id })
        await newList.save()
        res.status(200).send({ success: true, message: 'List create successfull.', data: newList });
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }
})

ListRoute.patch('/update/:id', Authenticate, async (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id, _userid: req.user._id }, {
        $set: req.body
    }, { new: true }).then((l) => {
        res.status(200).send({ success: true, data: l, message: 'List Data is Updated.' })
    }).catch((e) => {
        res.status(400).send({ success: false, message: 'List Data Update Error' })
    })
})

ListRoute.delete('/delete/:id', Authenticate, (req, res) => {
    List.findOneAndRemove({ _id: req.params.id, _userid: req.user._id }).then((deleteData) => {
        res.status(200).send({ success: true, message: 'List Delete Successfull.', data: deleteData })
    }).catch((e) => {
        res.status(400).send({ success: false, message: 'List Data Delete Error' })
    })
})

module.exports = ListRoute