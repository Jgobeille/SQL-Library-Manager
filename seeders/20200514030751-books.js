module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        Genre: 'Non Fiction',
        year: 1988,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Harry Potter and the Philosopher's Stone'",
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 1997,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 1998,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 1999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Goblet of Fire',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 2003,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Half-Blood Prince',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 2005,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harry Potter and the Deathly Hallows',
        author: 'JK Rowling',
        Genre: 'Fantasy',
        year: 2007,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.destroy({
      where: {
        genre: 'Non Fiction',
      },
    });
  },
};
