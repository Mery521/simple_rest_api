module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "user", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return User
};