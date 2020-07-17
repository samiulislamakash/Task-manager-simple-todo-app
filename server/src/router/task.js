const express = require('express')
const TaskRoute = express.Router()
const Authenticate = require('../middlware/middlware')

// load in mongoose model
const Task = require('../db/models/task.model')
const List = require('../db/models/list.model')

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in spacific list
 */
TaskRoute.get('/lists/:listId/tasks', Authenticate, async (req, res) => {
    // we went to return all tasks that belong to a spacific list
    try {
        const taskList = await Task.find({ _listId: req.params.listId })
        if (!taskList) {
            res.status(404).send()
        }
        res.status(200).send(taskList)

    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

/**
 * GET /lists/:listId/tasks/:taskId
 * Purpose: Get an single spacific task 
 */
TaskRoute.get('/lists/:listId/tasks/:taskId', Authenticate, async (req, res) => {
    try {
        // find that list should belong to this user
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        // if that list not belong to this user that give 404 error
        if (!list) {
            res.status(404).send()
        } else {
            // we went to return a single spacific task that belong to a spcific list
            Task.findOne({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((task) => {
                res.status(200).send(task)
            }).catch((e) => {
                res.status(404).send()
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }

})

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in spacific list
 */
TaskRoute.post('/lists/:listId/tasks', Authenticate, async (req, res) => {
    // we went to create a new task in a spacific list
    try {

        // find that list should belong to this user
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        // if that list not belong to this user that give 404 error
        if (!list) {
            res.status(404).send()
        } else {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            })

            await newTask.save().then((newTaskDoc) => {
                res.status(200).send(newTaskDoc)
            }).catch((e) => {
                res.status(400).send(e)
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: update an existing task
 */
TaskRoute.patch('/lists/:listId/tasks/:taskId', Authenticate, async (req, res) => {

    try {
        // find that list should belong to this user
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        // if that list not belong to this user that give 404 error
        if (!list) {
            res.status(404).send()
        } else {

            // we went to update an existing task 
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }).then(() => {
                res.status(200).send({ message: 'Completed Successfull' })
            }).catch(() => {
                res.status(400).send()
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
TaskRoute.delete('/lists/:listId/tasks/:taskId', Authenticate, async (req, res) => {
    try {
        // find that list should belong to this user
        const list = await List.findOne({
            _id: req.params.listId,
            _userid: req.user._id
        })
        // if that list not belong to this user that give 404 error
        if (!list) {
            res.status(404).send()
        } else {
            // we went to delete a single spacific task
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((delteTask) => {
                res.status(200).send(delteTask)
            }).catch((e) => {
                res.status(404).send()
            })
        }
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})


module.exports = TaskRoute