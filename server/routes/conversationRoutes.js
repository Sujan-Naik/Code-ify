const { Router } = require('express')
const ConversationModel = require("../models/ConversationModel");
const UserModel = require("../models/UserModel");


const router = Router()

router.post('/', async (req, res) => {
  try {
    const usernames = req.query.usernames

    const users = []
      for (let userIndex in usernames){
          const mainUser = await UserModel.findOne( { username: usernames[userIndex]})
          users.push(mainUser)
      }

    const conversation = await ConversationModel.create({ name, contents, createdAt, users });

    res
      .status(201)
      .json({ message: "Conversation created successfully", success: true, conversation: conversation });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }})


router.patch('/update', async (req, res) => {
    try {
      const name = req.body.name
      const contents = req.body.contents

      const conversation = await ConversationModel.findOneAndUpdate({name: name}, {contents: contents})
      if (!conversation) {
        res.status(404).json({message: "Conversation not found"})
      }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// router.get('/*', async (req, res) => {
//     try {
//         const { username } = req.query
//         console.log(username)
//         const user = await UserModel.findOne({
//             username: username
//         })
//
//         if (!user) {
//             req.status(404).json({ message: "User not found" })
//         } else {
//             res.status(200).json(user)
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.delete('/', async (req, res) => {
//     const { id } = req.params
//     try {
//         const removed = await UserModel.findByIdAndDelete(id)
//         if (!removed) throw Error('Something went wrong ')
//         res.status(200).json(removed)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

module.exports = router
