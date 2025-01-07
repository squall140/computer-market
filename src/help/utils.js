import _ from 'lodash';
import {api} from './requestAPI';
// import {fetchFeatureToggles} from '../features/app/actions';
// import {featureToggle} from './toggle';

export const generateApiUrl = (key, params = {}) => {
    const query = [];
    const prefix = '/api';
    params['lang'] = window.sessionStorage.getItem('lang');
    for(let key in params){
        if(params[key]){
            const str = key + '=' + params[key];
            query.push(str);
        }
    }
    return _.isEmpty(query) ? prefix + api[key] : prefix + api[key] + '?' + query.join('&');
}

export const getBrowserLocal = () => {
    let lCode = '', cCode = '';
    const cAndL = (window.navigator.language || window.navigator.userLanguage).split('-');
    if (cAndL.length === 1) {
        cCode = 'US';
    } else {
        lCode = cAndL[0] ? cAndL[0] : 'en';
        cCode = cAndL[1] ? cAndL[1] : 'US';
    }
    return {countryCode: cCode, languageCode: lCode}
}

export const loadMessages = () => {
    return {
        en: {
            "SEARCH": "Search",
            // 其他英文翻译...
        },
        zh: {
            "SEARCH": "搜索",
            // 其他中文翻译...
        }
    };
}

export const getLocaleMessages = (languageCode) => {
    const messages = loadMessages();
    return messages[languageCode];
}

export const getParamsFromUrl = (url) => {
    const search = _.get(url.split('?'), '1');
    const obj = {};
    _.forEach(search.split('&'), str => {
        const [key, value] = str.split('=');
        obj[key] = value;
    })
    return obj;
}

export const structuralTransformation = (obj) => {
    let data = [];
    const order = ['Good', 'Better', 'Best'];
    for(let group in obj){
        let rs = {
            group,
            lists: []
        };
        for(let level in obj[group]){
            const orderIndex = order.indexOf(level);
            const product = obj[group][level];
            rs.lists = _.concat(rs.lists, {...product, level, orderIndex});
        }
        rs.lists.sort((a, b) => a.orderIndex - b.orderIndex);
        data = _.concat(data, rs);
    }
    return data;
}

export const structuralTransformationSoftwareLists = (obj) => {
    let data = [];
    for(let group in obj){
        data.push({
            group,
            lists: obj[group]
        })
    }
    return data;
}

// export const initFeatureToggle = (store) => {
//   return fetchFeatureToggles()(store.dispatch, store.getState)
//     .then(() => {
//       featureToggle.setStore(store);
//     });
// };