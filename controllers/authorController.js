var Author = require('../models/author');

// Express Validator 
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Display list of all Authors.
exports.author_list = async(req, res) => {
    
    const AuthorsQuery = Author.find();
    const authors = await AuthorsQuery;

    res.render('authors', {authors: authors});
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res) {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.render('author_form', {title: 'Add Author'});
};

// Handle Author create on POST.
exports.author_create_post = [

    // Validation
    body('name', 'Name must not be empty').trim().isLength({min: 1}),
    body('family_name', 'Family Name must not be empty').trim().isLength({min:1}),

    // Sanitize fields (using wildcard).
    body('*').escape(),

    (req, res) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var author = new Author(
          { first_name: req.body.name,
            family_name: req.body.family_name
           });

        console.log(author);

        if (!errors.isEmpty()) {
            console.log('error');
            res.render('author_form', { title: 'Add Author', author: author, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Save author.
            console.log('success', author);
            
            author.save();
        }
    }
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};