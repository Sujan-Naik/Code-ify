const { Router } = require('express')
const User = require('../../models/user')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const userList = await User.find()
        if (!userList) throw new Error('No user found')
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save()
        if (!user) throw new Error('Something went wrong saving the user')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const userList = await User.find({
            username: username
        })
        if (!userList) throw new Error('No user found')
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await User.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
