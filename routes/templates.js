const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Templates = require('../model/template')
const authenticate =require('../middlewares/authenticate');
const ObjectId = require('mongoose').Types.ObjectId;

router.get("/", authenticate, async (req, res) => {
    const templates = await Templates.find({ user: new ObjectId(req.user.id) });
    res.status(200).send(templates);
});

router.post('/', authenticate,async (req, res) => {
  const user = await User.findOne({username: req.user.username});
  const {data} = req.body;
  try{
      await Templates.create({title:data.title, body: data.body, user: user._id});
      res.status(200).send({message: 'Template Saved successfully'});
  } catch(er){
      res.status(500).send(er.message);
  }
})



module.exports = router;
