const express =require('express');
const path = require('path');
const notedata = require('./db/db.json');
const app = express();

const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "./public")))

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req , res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notedata));


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);