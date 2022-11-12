"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Note extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Note.belongsTo(models.User);
        }
    }
    Note.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: [1, 50],
            },
        },
        theme: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        importance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Note",
    });
    return Note;
};
