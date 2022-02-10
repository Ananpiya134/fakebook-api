'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.createTable('friends', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      request_from_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      request_to_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('friends');
  }
};