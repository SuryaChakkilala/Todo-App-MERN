const express = require('express');
const router = express.Router()
const {Task} = require('../models/Task')

router.get('/', async (req, res)=>{
    const taskList = await Task.find()

    if(!taskList){
        return res.status(500).json({success: false, message: 'Tasks not found'})
    }

    res.status(201).send(taskList)
})

router.post('/', async (req, res)=>{
    let newTask = new Task({
        task: req.body.task,
        isComplete: req.body.isComplete
    })

    newTask = await newTask.save()

    if(!newTask) {
        return res.status(404).json({success: false, message: 'Task not added'})
    }
    res.status(200).send(newTask)
})

router.delete('/:id', async (req, res)=>{
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!task) {
        return res.status(201).json({message: `The json object with reference object id: ${req.params.id} not found`})
    } else {
        return res.status(404).json({message: `The task ${task.task} is deleted successfully`})
    }
})

router.delete('/index/:index', async (req, res)=>{
    const task = await Task.find()
    if(!task) {
        res.status(404).json({message: 'The json object with reference object not found'})
    }
    const deletedTask = await Task.findByIdAndDelete(task[req.params.index]._id)
    if(!deletedTask) {
        return res.status(500).json({success: false})
    }
    res.status(200).json({success: true})
})

router.put('/:id', async (req, res)=>{
    const task = await Task.findByIdAndUpdate(req.params.id, {
        task: req.body.task,
        isComplete: req.body.isComplete
    },
    {
        new: true
    })

    if(!task) {
        return res.status(404).json({message: `The task ${task.task} is not found`})
    }

    return res.status(200).send(task)
})

router.put('/mark/:index', async(req, res)=> {
    const taskList = await Task.find()
    const updatedTask = await Task.findByIdAndUpdate(taskList[req.params.index], {
        task: req.body.task,
        isComplete: req.body.isComplete
    },
    {new:true})

    if(!updatedTask) {
        res.status(404).json({message: `The task ${task.task} is not updated`})
    }
    res.status(201).send(updatedTask)
})

module.exports = router