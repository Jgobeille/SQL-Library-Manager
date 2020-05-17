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
      next();
    }
  };
}

/* GET books listing. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    let { page } = req.query;
    // eslint-disable-next-line radix
    page = parseInt(page);
    const limit = 5;
    const offset = page * limit - limit;
    await Book.findAndCountAll({
      order: [['TITLE', 'ASC']],
      limit,
      offset,
    })
      .then((books) => {
        const numOfPages = Math.ceil(books.count / 5);
        if (page <= numOfPages) {
          res.render('books/', { books, title: 'Books' });
        } else {
          next();
        }
      })
      .catch((error) => {
        next(error);
      });
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
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render('books/update-book', { book, title: 'Update Book' });
    } else {
      next();
    }
  })
);

/* Update book. */
router.post(
  '/:id',
  asyncHandler(async (req, res, next) => {
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
        next();
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
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      // delete book
      await book.destroy();
      res.redirect('/books/?page=1');
    } else {
      next();
    }
  })
);

module.exports = router;
