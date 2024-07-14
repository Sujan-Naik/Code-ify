const { Router } = require('express')
const {Signup} = require("../controllers/AuthController");
const UserModel = require("../models/UserModel");


const router = Router()

router.get('/', async (req, res) => {
    try {
        console.log(req.params)
        const userList = await UserModel.find()
        if (!userList) throw new Error('No user found')
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', Signup);

router.get('/*', async (req, res) => {
    try {
        const { username } = req.query
        console.log(username)
        const user = await UserModel.findOne({
            username: username
        })

        if (!user) {
            req.status(404).json({ message: "User not found" })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/', async (req, res) => {
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
