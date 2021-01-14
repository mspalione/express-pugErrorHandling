const express = require('express');
const router = express.Router();
const { quotes } = require('../data');

/* GET quotes - render index template, passing it a title prop and the list of quotes */
router.get('/', (req, res, next) => {

  // Log out home route handler indication
  console.log('Home route called');

  res.render('index', { title: 'Code Quotes', quotes });
});

/* GET generated error route - create and throw 500 server error */
router.get('/error', (req, res, next) => {

  // Log out custom error handler indication
  console.log('Custom error route called');

  const err = new Error();
  err.message = `Custom 500 error thrown`
  err.status = 500;
  throw err;
});

/* GET individual quote route */
router.get('/:id', (req, res, next) => {
  console.log(`Quote ${req.params.id} route called`);

  /* TODO 3: Check if the requested quote exists 
      - If quote exists, render the 'quote' view with the quote
      - Else:
        * Create a new 404 error
        * Provide an error message
        * Forward the error to the global error handler
  */
  if(quotes[req.params.id]){
    console.log(`found quote`)
    res.render('quote', { title: 'Code Quote', quote: quotes[req.params.id] });
  } else {
    console.log(`quote not found`)
    const err = new Error()
    err.message = `That quote does not exist. Go back to the home page or try a number between 0 and 4`
    err.status = 404
    next(err)
  }
    
  
});

module.exports = router;
