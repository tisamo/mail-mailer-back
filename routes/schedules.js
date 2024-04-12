const express = require('express');
const router = express.Router();
const Schedule = require('../model/schedule');

router.get("/", async (req, res) => {
    const schedules = await Schedule.find();
    res.send(schedules);
});

router.post('/create', async (req, res)=>{
 const event = req.body;
    try {
        let newUser = await Schedule.create(event);
        newUser = newUser.toObject();
        res.status(200).send(newUser);
    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;
