require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');  
const historiaRoutes = require('./routes/historiaRoutes');  
const simulacionRoutes = require('./routes/simulacionRoutes');
const userRoutes = require('./routes/userRoutes');
const casoRoutes = require('./routes/casoRoutes');  
const path = require('path');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api', pacienteRoutes);
app.use('/api', historiaRoutes);
app.use('/api', simulacionRoutes);
app.use('/api', casoRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});