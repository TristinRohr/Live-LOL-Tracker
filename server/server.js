require('dotenv').config();
const app = require('./app');
const config = require('./config/config');

const PORT = config.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});