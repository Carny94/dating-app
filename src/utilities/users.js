import sendRequest from './send-request';

const BASE_URL = 'api/users';

export function signUp () {
    return sendRequest (BASE_URL)
}
