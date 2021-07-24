const express = require('express');
const app = express();
const authRoute = require('../src/routes/auth');
const userRoute = require('../src/routes/users');
const postRoute = require('../src/routes/posts');
const catRoute = require('../src/routes/categories');
const multer = require('multer');

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, "images")
    },
    filename: (req, file, cb ) => {
        cb(null, req.body.name);
    }
})
const upload = multer({ storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json('file uploaded')
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', catRoute);


module.exports = app;