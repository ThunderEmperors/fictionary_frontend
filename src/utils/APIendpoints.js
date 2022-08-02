const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8000'

const ENDPOINTS = {
    GH_LOGIN: BASE_URL + '/accounts/github/login/',
    QUESTION: BASE_URL + '/api/question/',
    ANSWER: BASE_URL + '/api/answer/',
    CLUE: BASE_URL + '/api/clue/'
}

export default ENDPOINTS;