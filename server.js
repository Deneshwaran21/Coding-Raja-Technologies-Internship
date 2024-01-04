import express from "express";
import path from "path";
import fileupload from "express-fileupload";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "editor.html"));
});

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    
    let imagename = date.getDate() + date.getTime() + file.name;
    
    let path = 'public/uploads/' + imagename;

    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening.......');
})