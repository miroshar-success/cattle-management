"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Animal extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Animal.belongsTo(models.User);
        }
    }
    Animal.init({
        id_senasa: {
            type: DataTypes.STRING(16),
            primaryKey: true,
            allowNull: false,
        },
        type_of_animal: {
            type: DataTypes.STRING,
            // type: DataTypes.ENUM("Novillo", "Toro", "Vaquillona"),
            // cuidado acá! También existe el ITypeOfAnimal que se utiliza. Cambiar ambos juntos.
            // type: DataTypes.ENUM(ITypeOfAnimal),
            allowNull: false,
        },
        breed_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        weight_kg: {
            //peso en kilogramos
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(200),
            defaultValue: "Sin nombre",
            allowNull: true,
            validate: {
                len: [1, 200],
            },
        },
        device_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        device_number: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
                len: [8, 8],
            },
        },
        comments: {
            type: DataTypes.STRING(3000),
            allowNull: true,
            validate: {
                len: [1, 3000],
            },
        },
        image_1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        is_pregnant: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        delivery_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Animal",
    });
    return Animal;
};
