"use strict";

/**
 * Migración que crea la tabla "items" con sus respectivas columnas y características.
 * 
 * @param {import('sequelize-cli').Migration} queryInterface - Interfaz para ejecutar las consultas.
 * @param {import('sequelize').Sequelize} Sequelize - La instancia de Sequelize que define los tipos de datos.
 * @returns {Promise<void>}
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
   * Método que se ejecuta cuando la migración se aplica (creación de la tabla "items").
   *
   * @param {object} queryInterface - Objeto para interactuar con la base de datos.
   * @param {object} Sequelize - Objeto que define los tipos de datos de Sequelize.
   * @returns {Promise<void>} - Promesa que resuelve cuando la tabla "items" ha sido creada.
   */
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
  /**
   * Método que se ejecuta cuando se revierte la migración (eliminación de la tabla "items").
   *
   * @param {object} queryInterface - Objeto para interactuar con la base de datos.
   * @param {object} Sequelize - Objeto que define los tipos de datos de Sequelize.
   * @returns {Promise<void>} - Promesa que resuelve cuando la tabla "items" ha sido eliminada.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("items");
  },
};
