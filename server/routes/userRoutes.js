const { Router } = require('express')
const {Signup} = require("../controllers/AuthController");
const UserModel = require("../models/UserModel");
const ShowcaseModel = require("../models/ShowcaseModel");


const router = Router()

router.get('/', async (req, res) => {
    try {
        if (!req.params.length === 0 ) {

            const user = await UserModel.findOne({
                username: username
            })

            if (!user) {
                req.status(404).json({ message: "User not found" })
            } else {
                res.status(200).json(user)
            }
        } else {
            console.log(req.params)
        const userList = await UserModel.find()
        if (!userList) throw new Error('No user found')
        res.status(200).json(userList)
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/showcase/update', async (req, res) => {
    try {
      const name = req.body.name
        const username = req.body.username
      const showcase = await ShowcaseModel.findOne({name: name})
      if (!showcase) {
        res.status(404).json({message: "Showcase not found"})
      } else {
          const user = await UserModel.findOne({username: username})
            if (!user) {
                req.status(404).json({ message: "User not found" })
            } else {
                const showcases = user["showcases"]
                showcases.push(showcase["_id"])
                console.log(showcases)
                await UserModel.findOneAndUpdate({username: username}, {showcases: showcases})
            }
      }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/showcase/get-all', async (req, res) => {
    try {
        const username = req.query.username
          const user = await UserModel.findOne({username: username})
            if (!user) {
                req.status(404).json({ message: "User not found" })
            } else {
                const showcaseIdArray = user["showcases"]
                const showcases = []
                for (let showcaseIndex in showcaseIdArray){
                  let showcase = await ShowcaseModel.findById(showcaseIdArray[showcaseIndex])
                    if (showcase) {
                        showcases.push(showcase)
                    }
                }
                res.status(200).json(showcases)
            }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/', Signup);

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
