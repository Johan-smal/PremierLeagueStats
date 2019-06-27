import Sequelize from 'sequelize';
import TeamModel from './models/Team';
import SeasonModel from './models/Season';
import TeamPositionModel from './models/TeamPosition';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
});

const TeamPosition = TeamPositionModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Season = SeasonModel(sequelize, Sequelize);

Season.belongsToMany(Team, { through: TeamPosition });
Team.belongsToMany(Season, { through: TeamPosition });

if (process.env.DUMP) {
  sequelize.sync({ force: true })
    .then(() => {
      console.log(`Database & tables created!`)
    });
}


export {
  sequelize,
  Team,
  Season,
  TeamPosition
};