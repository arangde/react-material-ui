export const handleError = (error) => {
    if (error.response) {
        return error.response.data
    } else {
        return { error: error.message }
    }
}