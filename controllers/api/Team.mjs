import express from 'express'
import Sequelize from 'sequelize'
import { Team } from '../../db/database'
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
          const result = teamPositions.map((season) => {
            const values = {
              x: season.end,
              y: season.team_position.position
            }
            return values
          })
          res.send(result)
        })
    })
})

export default router