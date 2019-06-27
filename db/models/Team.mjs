export default (sequelize, type) => {
  return sequelize.define('team', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    web_id: type.INTEGER
  })
}