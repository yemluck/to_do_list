const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET all todo lists

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM todo';
    pool.query(queryText).then(result => {
        // sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting todo', error);
            res.sendStatus(500)
        });
});


// POST for todo 
// Add a new task
router.post('/', (req,res) => {
    console.log('new task to be added', req.body);
    let queryText = `INSERT INTO todo ("date", "task", "priority")
                    VALUES ($1, $2, $3);`
    let queryParams = [
        req.body.date,
        req.body.task,
        req.body.priority
    ];
    pool.query(queryText, queryParams)
    .then(result => {
        res.sendStatus(201)
    })
    .catch(error => {
        console.log('error adding new task', error);
        res.sendStatus(500);
        
    })
})




// PUT ... update a task to show it has been completed




// DELETE ... Remove a task when delete button is pressed after completion





module.exports = router