const { Router } = require('express')
const {Signup} = require("../controllers/AuthController");
const {userVerification} = require("../middlewares/AuthMiddleware");
const UserModel = require("../models/UserModel");


const router = Router()

router.get('/', async (req, res) => {
    try {
        console.log('test')
        const userList = await UserModel.find()
        if (!userList) throw new Error('No user found')
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', Signup);

router.post('/home/', userVerification)

router.get('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await UserModel.findOne({
            username: username
        })
        if (!user) throw new Error('No user found')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await UserModel.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
