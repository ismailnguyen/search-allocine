const search = require('./search');

exports.getFilm = async (request, response) => {
	const filmInfo = await search(request.params.film);

	response.json(filmInfo);
}

exports.getFilmWithPage =  async (request, response) => {
	const filmInfo = await search(request.params.film, request.params.page);

	response.json(filmInfo);
}