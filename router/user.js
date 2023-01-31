const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const authenticateToken = require('../middleware/authorization')

router.post('/', async (req, res) => {
    try {
        const { name, phoneNumber, password, role = 'admin', status = true } = req.body;
    const user = await User.findOne({where: {phoneNumber:phoneNumber}});
    if (user) {
        return res.status(400).send({ message: 'User already exists' })  
    }
    const pass = await bcrypt.hash(password, 10);
    const newUser = new User({
        name : name, 
        phoneNumber : phoneNumber, 
        password : pass, 
        role : role, 
        status : status
    });
    await newUser.save();
    res.status(200).send({id:newUser.id, name:newUser.name, pohneNumber:newUser.phoneNumber});
    } catch (error) {
        res.send({error : error.message});
    }   
})

router.get('/',authenticateToken, async(req,res)=>{
    try {
        const user = await User.findAll();
        res.send(user);
        
    } catch (error) {
        res.send(error.message);
    }
    
    
})



module.exports = router;
 