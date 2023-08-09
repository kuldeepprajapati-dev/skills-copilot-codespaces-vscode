// Create web server

const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const comments = require('./comments.json');
const moment = require('moment');
const { Console } = require('console');
const { get } = require('http');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

// app.get('/comments/:id', (req, res) => {
//     const id = req.params.id;
//     let found = comments.find(comment => {
//         return String(comment.id) === id;
//     });
//     if (found) {
//         res.json(found);
//     } else {
//         res.status(404).send('Comment not found');
//     }
// });

app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = comments.length;
    comment.timestamp = moment().unix();
    comments.push(comment);
    res.send('Comment added');
});

app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    let found = comments.find(comment => {
        return String(comment.id) === id;
    });
    if (found) {
        found.name = comment.name;
        found.comment = comment.comment;
        res.send('Comment updated');
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    let found = comments.find(comment => {
        return String(comment.id) === id;
    });
    if (found) {
        comments.splice(comments.indexOf(found), 1);
        res.send('Comment deleted');
    } else {
        res.status(404).send('Comment not found');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});