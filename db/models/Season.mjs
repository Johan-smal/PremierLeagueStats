export default (sequelize, type) => {
  return sequelize.define('season', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    season: type.STRING,
    start: type.INTEGER,
    end: type.INTEGER
  });
};