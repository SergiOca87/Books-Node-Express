// Models 
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookInstance');

// Express Validator 
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const author = require('../models/author');

exports.index = async(req, res) => {

    let dbCount = [];

    try {

        const bookCount = await Book.countDocuments();
        const authorCount = await Author.countDocuments();
        const genreCount = await Genre.countDocuments();

       

        res.render('index', { title: 'Express - Mongo Library' , message: '', bookCount: bookCount, authorCount: authorCount, genreCount: genreCount});
    
    } catch(err) {
        res.render('index', { title: 'Local Library Home', message: 'There was a problem retrieving database data' });
    } 
};

// Display list of all books.
exports.book_list = async(req, res) => {

    // Handle errors, try/catch?
    const booksQuery = Book.find();
    const books = await booksQuery;

    res.render('books', {books: books});
};

// Display detail page for a specific book.
exports.book_detail = async(req, res) => {

    // Handle errors, try/catch?
    const bookId = `${req.params.id}`;

    const bookQuery = await Book.findById(bookId).populate('genre').populate('author');
    // const genreQuery = Genre.findById(bookId);
    // const authorQuery = Author.findById(bookId);

    const book = await bookQuery;
    // const genre = await genreQuery;
    // const author = await authorQuery;

    res.render('book_detail', {book: book});
};

// Display book create form on GET.
exports.book_create_get = async(req, res) => {

    // Handle errors try/catch?
    // Query for the existing Genres and pass them down to create a dropdown with existing genres.
    const genreQuery = Genre.find();
    const genres = await genreQuery;

    // Query for existing Authors
    const authorsQuery = Author.find();
    const authors = await authorsQuery;

    //Adding an empty book as ejs complains of undefined variable but if/else does not work...Check for posssible alternative
    const book = '';

    res.render('book_form', { title: 'Create Book', book: book, genres: genres, authors: authors });
};

// Handle book create on POST.
exports.book_create_post = [
    
    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),
  
    // Sanitize fields (using wildcard).
    body('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            rating: req.body.rating,
            genre: req.body.genre,
            finished: req.body.finished
           });

        // Genres.find({}, function(err, genres) {
        //     var genresMap = {};
        
        //     genres.forEach(function(user) {
        //         genresMap[genres._id] = genre;
        //     });
        
        //     res.send(genresMap);  
        // });

        console.log(book);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            // async.parallel({
            //     authors: function(callback) {
            //         Author.find(callback);
            //     },
            //     genres: function(callback) {
            //         Genre.find(callback);
            //     },
            // }, function(err, results) {
            //     if (err) { return next(err); }

            //     // Mark our selected genres as checked.
            //     for (let i = 0; i < results.genres.length; i++) {
            //         if (book.genre.indexOf(results.genres[i]._id) > -1) {
            //             results.genres[i].checked='true';
            //         }
            //     }
            //     res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
            // });
            console.log('error');
            res.render('book_form', { title: 'Create Book', book: book, errors: errors.array() });
            return;
        }
        else {

            // Data from form is valid. Save book.
            book.save(function (err) {
                if (err) { return next(err); }

                const bookId = book.id
                   
                res.redirect(book.url);
                });
        }
    }
];

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = async(req, res) => {

    // Fetch the Book by ID
    const bookId = `${req.params.id}`;

    // Query for existing Books
    const bookQuery = Book.findById(bookId);

    const authorsQuery = Author.find();

    // Query for existing Authors
    const genreQuery = Genre.find();
    
    
    const book = await bookQuery;
    const authors = await authorsQuery;
    const genres = await genreQuery;

    // Handle errors, try/catch?
    res.render('book_form', { title: 'Edit Book Entry', book: book, authors: authors, genres: genres });
};

// Handle book update on POST.
exports.book_update_post = [
    
    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),
  
    // Sanitize fields (using wildcard).
    body('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            rating: req.body.rating,
            genre: req.body.genre,
            finished: req.body.finished,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

           console.log(book);

        if (!errors.isEmpty()) {
            res.render('book_form', { title: 'Update Book Entry', book: book, errors: errors.array() });
            return;
        }
        else {

            // Data from form is valid. Save book.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err, book) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(`/catalog/book/${book.id}`);
                });
            // book.save(function (err) {
            //     if (err) { return next(err); }

            //     const bookId = book.id
                   
            //     res.redirect(`/catalog/book/${book.id}`);
            //     });
       }
    }
];