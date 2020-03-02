module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        businessType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    });

    return User;
};
