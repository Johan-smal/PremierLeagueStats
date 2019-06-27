import express from 'express'
const router = express.Router()

import TeamRoutes from './Team'

router.use('/team', TeamRoutes)

export default router