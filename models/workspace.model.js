module.exports = (sequelize, DataTypes) => {
    const Workspace = sequelize.define( "workspace", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uniqueSlag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
        },
    }, {timestamps: true}, )
    return Workspace
}