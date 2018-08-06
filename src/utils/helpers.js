import format from 'string-format';
import messages from '../messages';

export const handleError = (error) => {
    if (error.response) {
        return error.response.data
    } else {
        return { error: error.message }
    }
}

export const formatMessage = (search, ...args) => {
    if (messages[search]) {
        const formated = format(messages[search], ...args);
        return formated;
    }

    return format(search, ...args);
}