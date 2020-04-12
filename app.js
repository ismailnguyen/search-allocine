const express = require('express');
const cors = require('cors');
const routes = require('./routes');

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

module.exports = app;