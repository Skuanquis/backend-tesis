require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');  
const historiaRoutes = require('./routes/historiaRoutes');  
const userRoutes = require('./routes/userRoutes');  

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api', pacienteRoutes);
app.use('/api', historiaRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});