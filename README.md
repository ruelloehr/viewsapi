# Description
This application is a wrapper around the wikipedia API for retrieving page view counts.   
The details of that API can be viewed at: [https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews](https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews)

## Pre Requisites
The project requires node and npm to be present.


## Instructions for executing the application for development
     
        git clone x
        cd x
        npm install
        npm test
        npm start


## Instructions for executing built docker image:



## Usage:

Once the application is started a single endpoint will be served at:

http://localhost:3000/views/articlename/month


articlename is the name of a wikipedia article.
month is an integer value between 1-12

This application will modify the article by replacing spaces with underscores and url encoding the article name.   It will validate that the month is an integer between 1 and 12.  The wikipedia api is then invoked with those values.   The return object will retain the same format as that returned by the wikipedia api.  An example of that is:

                [
                    {
                        "project": "en.wikipedia",
                        "article": "Barack_Obama",
                        "granularity": "monthly",
                        "timestamp": "2024010100",
                        "access": "all-access",
                        "agent": "all-agents",
                        "views": 788846
                    }
                ]


Example api calls:
* http://localhost:3000/views/so;;u bp u asdfasd a/1
* http://localhost:3000/views/Barack Obama/1
* http://localhost:3000/views/Barack Obama/10
* http://localhost:3000/views/Weezer/1