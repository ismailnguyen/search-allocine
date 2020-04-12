const app = require('./app');
const { PORT } = require('./server.config');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
