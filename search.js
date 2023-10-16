const youtube = require('youtube-search-api');

async function getList(keywords) {
    const list = await youtube.GetListByKeyword(keywords);
    return list && list.items;
}

module.exports = {getList};