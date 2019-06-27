import axios from 'axios'
import cheerio from 'cheerio'
import _ from 'lodash'

import { Team, Season } from './db/database'

const url = 'https://us.soccerway.com/national/england/premier-league/1901-1902/regular-season'
let links = []

axios(url)
  .then(response => {
    const $ = cheerio.load(response.data)
    const options = $('#season_id_selector option')

    options.each((e) => {
      links.push($(options[e]).val())
    })

    loopPages(links, 0)
  })

const loopPages = (urls, count) => {
  const new_count = count + 1
  if (count == urls.length)
    return
  else
    axios('https://us.soccerway.com' + urls[count])
      .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        addPage($)
        loopPages(urls, new_count)
      })
}

const addPage = ($) => {
  const seasonName = $('.leaf.current a').html()
  const years = seasonName.split('/')
  const seasonData = {
    season: seasonName,
    start: years[0],
    end: years[1]
  }
  Season
    .create(seasonData)
    .then(season => {
      const table = $('.detailed-table .team_rank')
      table.each((e) => {
        var id = $(table[e]).attr('id')
        var webId = $(table[e]).data('team_id')
        var name = $(`#${id} > .team > a`).attr('title')
        var position = parseInt($(`#${id} > .rank`).html())
        var points = parseInt($(`#${id} > .points`).html())
        /* TODO: replace with findOrCreate */
        Team.findOne({
          where: {
            web_id: web_id
          }
        }).then(team => {
          if (!_.isEmpty(team)) {
            season.addTeam(team, {
              through: {
                points: points,
                position: position
              }
            })
          } else {
            Team.create({
              web_id: webId,
              name: name
            }).then(new_team => {
              season.addTeam(new_team, {
                through: {
                  points: points,
                  position: position
                }
              })
            })
          }
        })
      })
    })
}

