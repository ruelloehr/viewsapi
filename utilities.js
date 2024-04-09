const axios = require('axios');

module.exports = {
    /**
     * Given an integer value for month, return a strong formatted to indicate the first and last day.  Throws an error if the month is invalid
     * @param {*} month 
     * @returns String in format of YYYYMMDD/YYYYMMDD 
     */
    getFormattedDateRange: function getFormattedDateRange(month) {

        if (!this.isValidMonth(month))
            throw new Error('The value ' + month + ' is not a valid month');

        const year = new Date().getFullYear(); // Get current year
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0); // 0 index day to get last day of month

        // Format dates
        const formattedFirstDay = `${firstDayOfMonth.getFullYear()}${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
        const formattedLastDay = `${lastDayOfMonth.getFullYear()}${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}${lastDayOfMonth.getDate().toString().padStart(2, '0')}`;

        return formattedFirstDay + '/' + formattedLastDay;

    },

    /**
     * Validate that a given value is valid number representation of a month
     * @param {*} month 
     * @returns bollean
     */
    isValidMonth: function isValidMonth(month) {

        //validate that the month is indeed an integer between 1 and 12
        if (!Number.isInteger(month) || month < 1 || month > 12) {
            return false;
        }

        return true;
    },

    /**
     * Retrieve a remote url and return the response of that request
     * @param {*} url 
     * @returns Object
     */
    fetchUrl: async function fetchUrl(url) {
        const response = await axios.get(url);
        return response.data;
    }

};
