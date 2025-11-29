require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const itemsRoutes = require('./routes/items.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (index.html, etc)
app.use(express.static(path.join(__dirname, '..')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/items', itemsRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
