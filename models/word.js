'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Word = loader.database.define('words', {
  wordId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  wordName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['createdBy']
      }
    ]
  });

module.exports = Word;
