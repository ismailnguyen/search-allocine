const controller = require('./controller');

exports.registerRoutes = (app) => {
	app.route('/:film').get(controller.getFilm);
	
	app.route('/:film/:page').get(controller.getFilmWithPage);
}
