"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Animal);
            User.hasMany(models.Note);
        }
    }
    User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profile_img: {
            type: DataTypes.STRING,
            defaultValue: "https://thumbs.dreamstime.com/t/farmer-icon-badge-style-one-farm-collection-icon-can-be-used-ui-ux-farmer-icon-badge-style-one-farm-collection-124009969.jpg",
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
