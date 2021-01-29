const express = require('express')
const TaskRoute = express.Router()
const Authenticate = require('../../middleware/middlware')

const Task = require('./task.model')
const List = require('../list/list.model')

TaskRoute.get('/:listId/tasks/all', Authenticate, async (req, res) => {
    try {
        const taskList = await Task.find({ _listId: req.params.listId })
        if (!taskList) {
            res.status(404).send({ success: false, message: 'Bad Request' })
        }
        res.status(200).send({ success: true, message: 'Get all task successfull', data: taskList })

    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }
})

TaskRoute.get('/:listId/tasks/:taskId', Authenticate, async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User or List not found!!' })
        } else {
            Task.findOne({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((task) => {
                res.status(200).send({ success: true, message: 'Get task successfull', data: task })
            }).catch((e) => {
                res.status(404).send({ success: false, message: 'Bad Request' })
            })
        }
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Problem' })
    }

})

TaskRoute.post('/:listId/task/create', Authenticate, async (req, res) => {
    try {

        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User or List not found!!' })
        } else {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            })
            await newTask.save().then((newTaskDoc) => {
                res.status(200).send({ success: true, message: 'Task Create Succesfull.', data: newTaskDoc })
            }).catch((e) => {
                res.status(400).send({ success: false, message: 'Bad Request' })
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

TaskRoute.patch('/:listId/tasks/update/:taskId', Authenticate, async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User or List not found!!' })
        } else {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }).then((t) => {
                res.status(200).send({ success: true, data: t, message: 'Task Updated Successfull' })
            }).catch(() => {
                res.status(400).send({ success: false, message: 'Bad Request' })
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

TaskRoute.delete('/:listId/tasks/delete/:taskId', Authenticate, async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        if (!list) {
            res.status(404).send({ success: false, message: 'User or List not found!!' })
        } else {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((delteTask) => {
                res.status(200).send({ success: true, message: 'Task Deleted Succ', data: delteTask })
            }).catch((e) => {
                res.status(404).send({ success: false, })
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})


module.exports = TaskRoute