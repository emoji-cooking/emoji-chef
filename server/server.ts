import { Request, Response, NextFunction } from 'express';
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const emojis = require('./data/emojis.json');

// typescript define error object schema



// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// handle static file requests
// app.use(express.static());

// app.use('/combos',)

app.use((req, res) => res.status(200).send(emojis));

// global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred'}
    };
    const errorObject = Object.assign({}, defaultError, err);
    console.log("ERROR", errorObject.log);
    return res.status(errorObject.status).json(errorObject.message);
});

// listen port
app.listen(PORT, (): void => {
    console.log(`Server listening on port: ${PORT}`)
})

// empty export for 'process'
export {};