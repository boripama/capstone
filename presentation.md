# Presentation notes

## Roles

1. Driver: Pat
1. Intro: Matt

## Intro

* Matt: introduce self and team members
  * talk about name of project
  * talk about project impetus and approach
    * keep track of yours and your friends' activities
    * suggest people to run with based on stats

## Major Features

1. **Bond/Rick**: Social features (comments, likes, followers)
    * challenges: managing complex relationships between social features and displaying them properly
    * a lot of thought into relational database models in Postgres
    * carefully manage what's displayed on the page via React-Redux state on client side
1. **Rick**: Display GPS activities on map
    * challenge: get polyline to render
    * challenge: finding the right tool, google maps is more for displaying simple maps, markers, etc.
    * mapbox: complex geospatial functionality to display polyline
    * mapbox gave us more geographical tools that we could use in the future to implement features like heat maps
    * **zoom in on a map and play around with it**
1. **Matt**: Import GPX files
    * big challenge: couldn't use Garmin (and other) API
    * challenge: send/receive file information via HTTP without storing GPX files
    * get metadata like center, pace, start/end time, distance
    * parse data points to make polyline
    * **screencast of uploading an activity and then displaying it**
    * **screenshot of GPX file, then point to screenshot of activity files in database, then transition to recommendations**
1. **Pat**: Follower recommendations
    * big challenge: huge volume of data and how to optimize (time complexity)
    * **screenshot of database/size?**
    * challenge: how to compare two users
    * optimize by caching user activities and comparisons
    * **put diagram here**
    * comparing activities to one another (five factors: center, pace, distance, time of day, intersections)
    * **"live" example of user getting new recommendation**
