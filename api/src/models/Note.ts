"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EImportance, INote } from "../types/note-types";

module.exports = (sequelize: any, DataTypes: any) => {
  class Note extends Model<INote> implements INote {
    title?: string | undefined;
    theme?: string | undefined;
    comment!: string;
    importance?: EImportance | undefined;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Note.belongsTo(models.User);
    }
  }
  Note.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
