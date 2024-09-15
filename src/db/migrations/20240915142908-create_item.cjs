"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        comment: "Unique identifier for each item",
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          len: [1, 64],
        },
        comment: "Name of the item, must be between 1 and 64 characters",
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          min: 0.01,
        },
        comment: "Price of the Item, must be greater than 0.",
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        comment: "Logical deletion flag for the item, used for soft deletes",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp of when the item was created",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp of the last update of the item",
      },
      deleteAt: {
        type: Sequelize.DATE,
        comment: "Timestamp of when the item was deleted",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("items");
  },
};
