import express from 'express'
const router = express.Router()
import { Team } from '../db/database'

import TeamRoutes from './Team'
import SeasonRoutes from './Season'
import ApiRoutes from './api'

router.get('/', (req, res, next) => {
  Team.findAll()
    .then(teams => res.render('index', { teams: teams }))
})

router.use('/team', TeamRoutes)
router.use('/season', SeasonRoutes)
router.use('/api', ApiRoutes)

export default router