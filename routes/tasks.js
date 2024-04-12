const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Task = require('../model/task')
const Schedule = require('../model/schedule')
const mongoose = require("mongoose");
const authenticate = require('../middlewares/authenticate');

router.get("/", authenticate, async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).limit(10).populate('schedules');

    res.status(200).send(tasks);
});

router.post('/create', authenticate, async (req, res) => {
    const tokenInfos = req.user;
    const {data} = req.body;
    let user = await User.findOne({username: tokenInfos.username});
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const task = await Task.create([{title: data.title, body: data.body, user: user}], { session });

        const schedules = data.dates.map(s => ({
            task: task[0]._id,
            user: user._id,
            date: s
        }));

        const createdSchedules = await Schedule.create(schedules, { session });

        await Task.updateOne({ _id: task[0]._id }, { $push: { schedules: { $each: createdSchedules.map(cs => cs._id) } } }, { session });
        await Task.updateOne({ _id: task[0]._id }, { $push: { recipients: { $each: data.recipients } } }, { session });
        await User.updateOne({ _id: user._id }, { $push: { tasks: task[0]._id } }, { session });
        await session.commitTransaction();
        await session.endSession();

        res.status(200).send('Schedule created successfully');
    } catch (error) {
        await session.abortTransaction();
        await  session.endSession();

        console.error('Transaction aborted:', error);
        res.status(500).send('Failed to create schedule');
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    try{
        await Task.deleteOne({_id: id})
        res.status(200).status('Task deleted')
    } catch (e){
        res.status(500).send(e);
    }
})


module.exports = router;
