const { Router } = require('express')
const ShowcaseModel = require("../models/ShowcaseModel");
const UserModel = require("../models/UserModel");
const {memoryStorage} = require("multer");
const multer = require("multer");


const router = Router()

router.get('/', async (req, res) => {
    try {
      const name = req.query.name
      const showcase = await ShowcaseModel.findOne({name: name})
      if (!showcase) {
        res.status(404).json({ message: "Showcase not found" })
      } else {
        const actualUsers = []
        for (let userId in showcase.users){
          let user = await UserModel.findById(showcase.users[userId])
          actualUsers.push(user)
        }

        showcase.users = actualUsers

        console.log('get req?')

        // showcase.users = []
        res.status(200).json(showcase)
      }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get-all', async (req, res) => {
    try {
      const allShowcases = await ShowcaseModel.find()

      for (let showcaseIndex in allShowcases) {
        const actualUsers = []
        const showcase = allShowcases[showcaseIndex]
        for (let userId in showcase.users){
          let user = await UserModel.findById(showcase.users[userId])
          actualUsers.push(user)
        }
        showcase.users = actualUsers
      }
      res.status(200).json(allShowcases)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
  try {

    const { name, contents, createdAt, usernames, textPreview } = req.body;
    const existingShowcase = await ShowcaseModel.findOne({ name });
    if (existingShowcase) {
      return res.json({ message: "Showcase already exists" });
    }
    const users = []
    const mainUser = await UserModel.findOne( { username: usernames[0]})
    users.push(mainUser)
    const showcase = await ShowcaseModel.create({
        name: name, contents: contents,createdAt: createdAt,users: users,textPreview: textPreview});
    res
      .status(201)
      .json({showcase: showcase });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }})

// Configure Multer
const storage = memoryStorage();
const upload = multer({ storage: storage });

router.patch('/update', upload.single('img'),async (req, res) => {
    console.log('asd')
    try {
      const name = req.body.name
      const contents = req.body.contents
        const textPreview = req.body.textPreview
        if (req.file) {
            const img = req.file
            const showcase = await ShowcaseModel.findOneAndUpdate({name: name}, {
                contents: contents, image: {
                    filename: img.originalname,
                    contentType: img.mimetype,
                    imageBase64: img.buffer.toString('base64')
                }, textPreview: textPreview
            })
        }
        else {
            const showcase = await ShowcaseModel.findOneAndUpdate({name: name}, {
                contents: contents, textPreview: textPreview})
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
