// Models 
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookInstance');

var mongoose = require('mongoose');

// Express Validator 
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.index = function(req, res) {

    let result;

    // This would return the number of data using this Model?
    // async function bookCount() {
    //     try {
    //         // result = await Book.countDocuments({});
    //         Book.count({type: "books"}, function (err, count) {
    //             result = count;
    //             if(err) {
    //                 console.log(err)
    //             } else {
    //                 console.log(count)
    //             }
    //         });
           
    //     } catch (err) {
    //         console.log(err);
    //     }

    // This is what we want to return eventually
    // book_count: function(callback) {
    //     Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    // },
    // book_instance_count: function(callback) {
    //     BookInstance.countDocuments({}, callback);
    // },
    // book_instance_available_count: function(callback) {
    //     BookInstance.countDocuments({status:'Available'}, callback);
    // },
    // author_count: function(callback) {
    //     Author.countDocuments({}, callback);
    // },
    // genre_count: function(callback) {
    //     Genre.countDocuments({}, callback);
    // }
    // }

    
    // bookCount();
    
    
    res.render('index', { title: 'Local Library Home' , data: result });
    


    // async.parallel({
    //     book_count: function(callback) {
    //         Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    //     },
    //     book_instance_count: function(callback) {
    //         BookInstance.countDocuments({}, callback);
    //     },
    //     book_instance_available_count: function(callback) {
    //         BookInstance.countDocuments({status:'Available'}, callback);
    //     },
    //     author_count: function(callback) {
    //         Author.countDocuments({}, callback);
    //     },
    //     genre_count: function(callback) {
    //         Genre.countDocuments({}, callback);
    //     }
    // }, function(err, results) {
    //     res.render('index', { title: 'Local Library Home', error: err, data: results });
    // });
    // res.render('index', { title: 'Local Library Home', error: err, data: results });
};

// Display list of all books.
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
    //  authors: results.authors, genres: results.genres 
    res.render('book_form', { title: 'Create Book' });
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
            genre: req.body.genre
           });

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

            console.log('success', book);
            
            book.save();
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
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};