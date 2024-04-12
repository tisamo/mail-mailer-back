const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Recipient = require('../model/recipients')
const encrypt = require('../helpers/encrypt');
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwtUtils');
const authenticate =require('../middlewares/authenticate');


router.post('/create', async (req, res) => {
    const user = req.body.data;
    user.password = await encrypt.hashPassword(user.password);
    try {
        let newUser = new User(user);
        await newUser.save();
        newUser = newUser.toObject();
        delete newUser.password;
        res.status(200).send(newUser);
    } catch (e) {
       if(e.code === 11000){
           res.status(500).send({error: 'User already registered'});
       } else{
           res.status(500).send(e);
       }
    }
})


router.post('/login', async (req, res) => {
    const {data} = req.body;
    const userDatas = await User.findOne({username: data.username});
    if (!userDatas) {
        res.status(400).send('Username or password is not correct');
        return;
    }
    const validPassword = await bcrypt.compare(data.password, userDatas.password);
    if (validPassword) {
        const token = jwt.generateToken(userDatas);
        res.status(200).send(token)
    } else{
        res.status(400).send('Email or password is not correct');

    }
})

router.post('/recipient', authenticate, async (req, res) => {
    const {email} = req.body.data;
    const {username} = req.user;
    const  userDatas = await User.findOne({username});
    let recipient;
    try{
        recipient = await Recipient.create({email, user: userDatas})
        await User.updateOne({ _id: userDatas._id }, { $push: { recipients: recipient._id } });
    } catch (er){
        res.status(500).send(er);
    }

    res.status(200).send(recipient);


})

router.get('/recipient', authenticate, async (req, res) => {
    const {username} = req.user;
    try{
        const {recipients} = await User.findOne({username}).populate('recipients');
        res.status(200).send(recipients);
    } catch (e){
      res.status(500).send(e.message);
    }


})

router.get('/authenticate', authenticate,  async (req, res) => {
    res.status(200).send(req.user);
})


module.exports = router;
