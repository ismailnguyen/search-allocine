const axios = require('axios');
const express = require('express');
const app = express();

const URLROOT = "http://api.allocine.fr/rest/v3/search";
const USER_AGENT = "Mozilla/5.0 (Linux; U; Android $v; en-gb) AppleWebKit/999+ (KHTML, like Gecko) Safari/9$b.$a";
const PARTNER_KEY = "YW5kcm9pZC12M3M";
const SECRET_KEY = "29d185d98c984a359e6e6f26a0474269";

function buildParams(search, page) {
    let b = "";

    b += "partner=" + PARTNER_KEY;
    b += "&q=" + encode(search);
    if (page !== undefined)
        b += "&page=" + page;
    b += "&format=json&filter=movie";
    b += "&sed=" + today();

    return b;
}

function encrypt(content) {
    return Buffer.from(content).toString('base64');
}

function encode(content) {
    return encodeURI(content);
}

function today() {
    var d = new Date();
    const year = d.getFullYear() // 2019
    const date = d.getDate() // 23
    const month = d.getMonth();
    return `${year}${month}${date}`;
}

async function callWebService(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': USER_AGENT
            }
        });

        return response.data.feed.movie;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function search(filmName, page = '1') {
    const params = buildParams(filmName, page);
    const sig = encrypt(SECRET_KEY + params);
    const url = `${URLROOT}?${params}&sig=${sig}`;

    return await callWebService(url);
}

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({
            nope: true
        });
    } else {
        next();
    }
}

app.use(ignoreFavicon);

app.get("/:film", async (request, response, next) => {
    const filmInfo = await search(request.params.film);

    response.json(filmInfo);
});

app.get("/:film/:page", async (request, response, next) => {
    const filmInfo = await search(request.params.film, request.params.page);

    response.json(filmInfo);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});