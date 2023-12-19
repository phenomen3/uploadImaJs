const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('fileInput'), (req, res) => {
    res.send('Imagen subida correctamente');
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
