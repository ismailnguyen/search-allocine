const axios = require('axios');
const config = require('./api.config');

function buildParams(search, page) {
    let params = '';

    params += 'partner=' + config.PARTNER_KEY;
    params += '&q=' + encode(search);
    if (page !== undefined)
        params += '&page=' + page;
    params += '&format=json&filter=movie';
    params += '&sed=' + today();

    return params;
}

function encrypt(content) {
    return Buffer.from(content).toString('base64');
}

function encode(content) {
    return encodeURI(content);
}

function today() {
    const todayDate = new Date();
    const year = todayDate.getFullYear()
    const date = todayDate.getDate()
    const month = todayDate.getMonth();
	
    return `${year}${month}${date}`;
}

async function callWebService(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': config.USER_AGENT
            }
        });

        return response.data.feed.movie;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = async (filmName, page = config.DEFAULT_PAGE) => {
    const params = buildParams(filmName, page);
    const sig = encrypt(config.SECRET_KEY + params);
    const url = `${config.API_URL}?${params}&sig=${sig}`;

    return await callWebService(url);
}
