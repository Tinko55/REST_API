
const express = require('express');
const { Client } = require('pg')
const port = 3000



const app = express()


const db = new Client({
    user: 'Tinko',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432, // default PostgreSQL port
  });






app.get('/shipments/:id', async (req, res) => {

    const id = req.params.id;

     db.query(`SELECT * FROM SHIPMENTS WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
     })

        

})



app.get('/shipments/:status', (req, res) =>{
    const status = req.params.status

    db.query(`SELECT * FROM shipments WHERE status = ${status}`, (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    })
})


app.get('/shipments/dates/:first/:second', (req, res) => {
    const first = req.params.first
    const second = req.params.second

    db.query(`SELECT * FROM shipments WHERE date BETWEEN ${first} AND ${second}`, (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    })
})



app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });