const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize(`postgres://postgres:123456@localhost:5432/`, {dialect: "postgres"});

    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err);
    });

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model') (sequelize, DataTypes);
db.workspace = require('./workspace.model') (sequelize, DataTypes);
db.channel = require('./channel.model') (sequelize, DataTypes);
module.exports = db;