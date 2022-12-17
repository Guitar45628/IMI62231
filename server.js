const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const mysql = require("mysql2")

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "imi62231"

})

db.connect((err) => {
    if (err) { err }
    console.log("MySQL connected")
})

app.get('/', (req, res) => {
    res.send("Hello")
})

/* ข้อ a */
app.get('/getUsers', (req, res) => {
    db.query("SELECT * FROM users", (error, results, fields) => {
        if (error) throw error
        if (results.length == 0 || results === undefined)
            message = "Table users is emty !"
        else
            message = "Get users succesfuly.";
        res.status(200).send({ error: false, data: results, msg: message })
    })
})

/* ข้อ b */
app.get('/getUser/:searchID', (req, res) => {
    const { params } = req;
    const searchID = params.searchID
    var sql = "SELECT * FROM users WHERE userID = " + mysql.escape(searchID)
    db.query(sql, (error, results, fields) => {
        if (error) throw error
        if (results.length == 0 || results === undefined)
            message = "Table users is emty !"
        else
            message = "Get users succesfuly.";
        res.status(200).send({ error: false, data: results, msg: message })
    })
})

/* ข้อ c */
app.get('/checkUsername/:username', (req, res) => {
    const { params } = req;
    const username = params.username
    var sql = "SELECT username FROM users WHERE username = " + mysql.escape(username)
    db.query(sql, (error, results, fields) => {
        if (error) throw error
        if (results.length == 0 || results === undefined)
            message = "0"
        else
            message = "1";
        res.status(200).send({ msg: message })
    })
})

/* ข้อ d */
app.post('/createUser', async (req, res) => {
    const object = req.body;
    db.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO users (username, password, fname, lname, autority, activeflag) VALUES (?)";
        var values = [
            object['username'],
            object['password'],
            object['fname'],
            object['lname'],
            object['autority'],
            object['activeflag']
        ];
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    })
})

/* ข้อ e */
app.put('/updateUser', async (req, res) => {
    const object = req.body;
    const id = object._id;
    db.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "UPDATE users SET userID = "+ id
        sql += " (username, password, fname, lname, autority, activeflag) VALUES (?)";
        var values = [
            object['username'],
            object['password'],
            object['fname'],
            object['lname'],
            object['autority'],
            object['activeflag']
        ];
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    })
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})


