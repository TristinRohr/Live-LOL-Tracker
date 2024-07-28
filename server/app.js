const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));