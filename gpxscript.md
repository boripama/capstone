So, how do our users get their activities on our site?

Ideally we would have used something like the Garmin API, but we weren't interested in the $5000 pricetag to use it.

So we settled on importing GPX files--which is a standard format for GPS activities-- but we also didn't want to have to store them on our server.

Our solution was to send the GPX file over HTTP and then parse and store the information in our Postgres database.

GPX file are just a massive collection of "trackpoints," which have a coordinate pair and a timestamp. In order to avoid storing huge arrays of data, our server converts this data to a polyline string, as you can see here, as well as calculates relevant metadata like center point, start/end time, pace and distance.

Getting that data allows us to easily display the activites, and is also critical to making friend recommendations.
