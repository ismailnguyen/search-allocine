const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { PORT } = require('./config');

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({
            nope: true
        });
    } else {
        next();
    }
}

const app = express();

app.use(cors());
app.use(ignoreFavicon);

routes.registerRoutes(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});