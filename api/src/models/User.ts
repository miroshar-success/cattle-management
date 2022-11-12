"use strict";
import { Model } from "sequelize";
import { IUser } from "../types/user-types";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser> implements IUser {
    id!: string;
    name?: string;
    email!: string;
    profile_img?: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.hasMany(models.Animal);
      User.hasMany(models.Note);
    }
  }
  User.init(
    {
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
        defaultValue:
          "https://thumbs.dreamstime.com/t/farmer-icon-badge-style-one-farm-collection-icon-can-be-used-ui-ux-farmer-icon-badge-style-one-farm-collection-124009969.jpg",
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
