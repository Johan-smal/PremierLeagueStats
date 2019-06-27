import express from 'express'
import Sequelize from 'sequelize'
import { Season } from '../db/database'
const router = express.Router()

router.get('/:seasonId', (req, res) => {
  const { seasonId } = req.params
  Season.findByPk(seasonId)
    .then(season => {
      if (season)
        res.send(season)
      else
        res.status(404).send('Season Id not found')
    })
})

router.get('/:seasonId/table', (req, res) => {
  const { seasonId } = req.params
  Season.findByPk(seasonId)
    .then(season => {
      season.getTeams({
        order: [
          [Sequelize.literal('team_position.position')]
        ]
      })
        .then(teams => res.send(teams))
    })
})

export default router