const express =require('express');
const path = require('path');
const app = express();
const { readFromFile, readAndAppend } = require('./helpers/fsUtils')
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

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const{title, text } = req.body;

    if (req.body){
        const newNote = {
            title,
            text,
        }
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    }else{
        res.errored('Error in adding tip');
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);