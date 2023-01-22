module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define( "channel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        workspaceId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'workscpace',
              key: 'id'
            }
        },
    }, {timestamps: true}, )
    return Channel
}