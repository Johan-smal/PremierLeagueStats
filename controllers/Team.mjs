import express from 'express'
import Sequelize from 'sequelize'
import { Team } from '../db/database'
const router = express.Router()

router.get('/:teamId', (req, res) => {
  const { teamId } = req.params
  Team.findByPk(teamId)
    .then(team => {
      team.getSeasons({
        order: [
          [Sequelize.literal('team_position.seasonId'), 'DESC']
        ]
      })
        .then(teamPositions => {
          const result = {
            id: team.id,
            name: team.name,
            qualifies: teamPositions.length,
            history: teamPositions
          }
          res.render('team', { team: result })
        })
    })
})

router.get('/:teamId/history', (req, res) => {
  const { teamId } = req.params
  Team.findByPk(teamId)
    .then(team => {
      team.getSeasons({
        order: [
          [Sequelize.literal('team_position.position')]
        ]
      })
        .then(teamPositions => {
          const result = {
            id: team.id,
            name: team.name,
            qualifies: teamPositions.length,
            history: teamPositions
          }
          res.send(result)
        })
    })
})

export default router