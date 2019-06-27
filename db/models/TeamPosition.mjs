export default (sequelize, type) => {
  return sequelize.define('team_position', {
    position: type.INTEGER,
    points: type.INTEGER
  });
};