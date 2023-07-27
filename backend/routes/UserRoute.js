import express from "express"
import { getUsers, getUserById, createUser } from "../controllers/UserController.js"

const router = express.Router()



router.get('/users', getUsers)
router.get('/users', getUserById) 
router.post('/users', createUser)

export default router
