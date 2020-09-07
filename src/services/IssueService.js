import constants from '../config/Constants';

export default {
    getIssues: (page, per_page) => {
        return fetch(`${constants.API_URL}${constants.REACT_ISSUES}?&per_page=${per_page}&page=${page}`).then(response => response.json());
    }
}