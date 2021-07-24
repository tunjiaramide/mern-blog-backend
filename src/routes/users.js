const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


//Register
router.put('/:id', async(req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findOneAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            return res.status(200).json(updatedUser)
        }catch(err){
            return res.status(500).json(err)
        }
    } else {
        return res.status(401).json('You cant update this account')
    }
})

//Delete
router.delete('/:id', async(req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username})
                await User.findByIdAndDelete(req.params.id)
                return res.status(200).res.json('User has been deleted')
            }catch(err){
                return res.status(500).json(err)
            }

        }catch(err) {
            return res.status(404).json('User not found')
        }
    } else {
        return res.status(401).json('You cant delete this account')
    }
})

//get user 

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;


