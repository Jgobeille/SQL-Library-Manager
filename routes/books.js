const express = require('express');
const { Book } = require('../models');
// creates mini express server
const router = express.Router();

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

/* GET books listing. */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [['createdAt', 'DESC']] });
    res.render('books/index', { books, title: 'Books' });
  })
);

/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render('books/new-book', { book: {}, title: 'New Book' });
});

/* POST create book. */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    let book;

    try {
      console.log(req.body);
      book = await Book.create(req.body);

      res.redirect(`/books/${book.id}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // return unsaved model instance
        book = await Book.build(req.body);
        res.render('books/new-book', {
          book,
          errors: error.errors,
          title: 'New Book',
        });
      } else {
        throw error;
      }
    }
  })
);

/* GET individual book. */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render('books/update-book', { book });
    } else {
      res.sendStatus(404);
    }
  })
);

/* Update book. */
router.post(
  '/:id',
  asyncHandler(async (req, res) => {
    let book;
    try {
      // get book from database based on params.id
      book = await Book.findByPk(req.params.id);
      // update the book info by passing in the new req.body data
      if (book) {
        await book.update(req.body);
        // redirect to the updated book page
        res.redirect(`/books/${book.id}`);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        book = await Book.build(req.body);
        book.id = req.params.id; // make sure correct book gets updated
        res.render('books/update-book', {
          book,
          errors: error.errors,
          title: book.title,
        });
      } else {
        throw error;
      }
    }
  })
);

/* Delete individual book. */
router.post(
  '/:id/delete',
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      // delete book
      await book.destroy();
      res.redirect('/books');
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
