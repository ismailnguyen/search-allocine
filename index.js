const express = require('express');
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

app.use(ignoreFavicon);

routes.registerRoutes(app);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});