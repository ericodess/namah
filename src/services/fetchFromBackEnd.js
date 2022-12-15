/**
 * Returns the response from a back-end fetching function.
 *
 * @param {string} fetchingEndPoint Target endpoint from the back-end.
 * @param {string} fetchingParam Target query string.
 * @param {Object} fetchingOptions Object wich contains the fetch options.
 * @param {string} fetchingBranch [fetchingBranch=v1] - Target back-end branch.
 * @returns {Promise} Promise object represents the fetch response.
 */
const fetchFromBackEnd = (
    fetchingEndPoint,
    fetchingParam,
    fetchingOptions,
    fetchingBranch = "v1"
) => {
    return new Promise((resolve, reject) => {
        fetch(
            `${process.env.REACT_APP_BACK_END_HOST}/api/${fetchingBranch}/${fetchingEndPoint}?${fetchingParam}`,
            fetchingOptions
        )
            .then((response) => {
                resolve(response.json());
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default fetchFromBackEnd;
