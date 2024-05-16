const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1q2w3e4r",
    database:"test"
})


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello This is the backend");
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
        return res.json("book has been created successfully");
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been delete successfully");
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been update successfully");
    })
})



app.listen(4000,()=>{
    console.log("Connected to backend");
})