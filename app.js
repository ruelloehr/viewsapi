const express = require('express');
const utilities = require('./utilities');

const app = express();
const port = 3000;
const URLPREFIX = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/';
const URLFREQ = '/monthly/'
const APIPREFIX = '/views';


/**
 * Route for retrieving data from wikipedia
 */
app.get(APIPREFIX + '/:ARTICLENAME/:MONTH', async (req, res, next) => {

    //Remove spaces and replace with underscore and url encode the article name
    let encodedName = req.params.ARTICLENAME.replace(' ', '_');
    encodedName = encodeURIComponent(encodedName);

    //validate the month the user passed in
    const MONTHOFYEAR = parseInt(req.params.MONTH);

    //validate that the second parameter is a integer between 1-12 inclusive
    //we specifically validate this here so that we can give the user a friendly error response
    if (!utilities.isValidMonth(MONTHOFYEAR))
        return res.status(400).json({ detail: req.params.MONTH + ' is an invalid value for month' });

    //in the real world we'd use a real logging system.     These
    console.debug('Month  of year: ' + MONTHOFYEAR);
    console.debug('Encoded name is: ' + encodedName);


    try {

        //create a url request in the format:  https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/Barack_Obama/monthly/20240101/20240131
        //add the api page here
        let apiURL = URLPREFIX + encodedName + URLFREQ + utilities.getFormattedDateRange(MONTHOFYEAR);

        console.debug('Requesting data from wikipedia URL: ' + apiURL);
        const result = await utilities.fetchUrl(apiURL);
        res.json(result.items);
    } catch (error) {

        //the axios library by default thows errors for non 200 responses, we want to just ship those back to the user
        if (error.response && error.response.data) {
            console.warn("A non 200 error code was received for the request: " + error.response.data.uri);
            res.status(error.response.status);
            res.send(error.response.data);
        } else {
            console.error('An unexpected error occurred.' + error);
            res.status(500);
            res.send('{ detail: ' + error + '}');
        }

        next(error);

    }

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}` + APIPREFIX +
        `\nSample request format:    http://localhost:${port}` + APIPREFIX + '/articleName/monthofyear');
});


