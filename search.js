import * as youtube from 'youtube-search-api';

export async function getList(keywords) {
    const list = await youtube.GetListByKeyword(keywords);
    return list && list.items;
}