const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Book {}

  /**
   * The init() method takes two arguments
   * 1.) object literal that defines the model's attributes -- each attribute is a column of the table.
   * 2.) object literal that sets the model options
   */
  Book.init(
    //Arg1: model attributes
    {
      id: {
        type: Sequelize.INTEGER,
        //The ID acts as a 'primary key', or a unique indexable reference for each entry.
        primaryKey: true, // true intructs Sequelize to generate the primary key column using the property name defined in the model (in this case it's id, but it could be anything, like identifier). The ID should be a number, so its data type is INTEGER,
        autoIncrement: true, //true automatically generates an ID that increments by 1 for each new entry
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          },
          notNull: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          },
          notNull: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    //arg2: model options
    {
      sequelize, //same as {sequelize: sequelize}
    }
  );

  return Movie;
};
