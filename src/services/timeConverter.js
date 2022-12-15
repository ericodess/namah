//Services
import { translateMonth } from ".";

/**
 * Returns a detailed romanized object from a given date.
 *
 * @param {string} dateString Target date following the YYYY-MM-DD formatting.
 * @returns {Object} Object containing the romanized version from the date.
 */
const timeConverter = (dateString) => {
    const date = new Date(dateString);

    return {
        day: ("0" + date.getDate()).slice(-2),
        month: translateMonth(date.getMonth()),
        year: date.getFullYear(),
    };
};

export default timeConverter;
