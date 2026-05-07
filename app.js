const express = require('express');
const app = express();
const port = 3000;

// Carpeta pública
app.use(express.static('public'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
