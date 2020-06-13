var Genre = require('../models/genre');

// Express Validator 
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form.ejs', {title: 'Add Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [

    // Validation
    body('name', 'Genre must not be empty').trim().isLength({min: 3}),

    // Sanitize fields (using wildcard).
    body('*').escape(),

    (req, res) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var genre = new Genre(
          { name: req.body.name });

        console.log(genre);

        if (!errors.isEmpty()) {
            console.log('error');
            res.render('genre_form', { title: 'Add Genre', author: author, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Save author.
            console.log('success', genre);
            
            genre.save();
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};