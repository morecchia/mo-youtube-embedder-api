const youtube = require('youtube-search-api');
const videoInfoName = 'videoSecondaryInfoRenderer';
const descriptionKeyName = 'attributedDescription';

async function getList(keywords) {
  const list = await youtube.GetListByKeyword(keywords);
  const items = list && list.items;
  return items && items.filter(v => v.channelTitle)
}

async function getDescription(videoId) {
  if (!videoId) {
    return null;
  }
  
  const details = await youtube.GetVideoDetails(videoId);

  if (details.hasOwnProperty('description')) {
    return details;
  }

  const contents = details && details.contents;
  const info = contents && contents.find(o => Object.keys(o).indexOf(videoInfoName) > -1)
  const description = info && info[videoInfoName][descriptionKeyName];

  return {
    description: description && description.content
  };
}

module.exports = {getList, getDescription};