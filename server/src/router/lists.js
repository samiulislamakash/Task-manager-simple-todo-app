const express = require('express')
const ListRoute = express.Router()
const Authenticate = require('../middlware/middlware')

// load in mongoose model
const List = require('../db/models/list.model')

/**
 * GET /lists
 * purpose: Get all lists
 */

ListRoute.get('/lists', Authenticate, async (req, res) => {
    // we went to return an arry of all the lists in the database
    try {
        const list = await List.find({
            _userid:req.user._id
        })
        if (!list) {
            res.status(404).send()
        }
        res.status(200).send(list)
    } catch (e) {
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

/**
 * GET /lists/:id
 * purpose: get spacific list object
 */

 ListRoute.get('/lists/:id',Authenticate ,async(req, res)=>{
     try{
        const list = await List.findOne({
            _id: req.params.id, 
            _userid: req.user._id
        })

        if(!list){
            res.status(404).send({error:"Bad Request, Id is not mataching"})
        }

        res.status(200).send(list)

     }catch(e){
        res.status(500).send({ error: 'Internal Server Problem' })
     }
 })

/**
 * POST /lists
 * purpose: Create lists
 */
ListRoute.post('/lists', Authenticate, async (req, res) => {
    // we went to create a new list and return the new list document back to the user
    // the list information will be passed via the json request body
    try {
        
        let title = req.body.title;
        if (!title) {
            res.status(400).send()
        }
        let newList = new List({ title , _userid: req.user._id})
        await newList.save()

        res.status(200).send(newList)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Internal Server Problem' })
    }
})

/**
 * PATCH /lists/:id
 * purpose: Update a spacificed list
 */
ListRoute.patch('/lists/:id', Authenticate, (req, res) => {
    // we went to update spacified list whth new values in the json body request
    List.findOneAndUpdate({ _id: req.params.id, _userid:req.user._id }, {
        $set: req.body
    }).then(() => {
        res.status(200).send()
    }).catch((e) => {
        res.status(400).send(e)
    })

})

/**
 * DELETE /lists/:id
 * purpose: Delete a spacified list
 */
ListRoute.delete('/lists/:id', Authenticate, (req, res) => {
    // wet went to delete a spacified list
    List.findOneAndRemove({_id:req.params.id , _userid:req.user._id}).then((deleteData)=>{
        res.status(200).send(deleteData)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})


module.exports = ListRoute