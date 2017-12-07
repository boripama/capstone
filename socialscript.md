Thanks Matt, given how this is a social media website, it was fundamental that we had all of the essential social functionality one would expect in the typical web 2.0 application. We came to the conclusion that implementing a follower, comment, and like system best fit our goals for Ananda.

Let’s check out the commenting system first, as a user I can type a comment on an activity, submit it, and see it rendered in real time. Getting this to work however, was actually quite challenging.

Given the structure of our databases and its complexity, it was essential for us to retrieve these comments in an effective, optimized way. We neither wanted to retrieve too few comments, nor retrieve every single one unnecessary.  To handle the fine balance between the two, each one of our users and activities have a number id tied to them. Then by utilizing a join table, our comments both have a userId and an activityId associated with them along with the actual comment text itself. As each activity is accessed, the information is looked up, and by utilizing these id’s the correct information is displayed.

In summary, no matter if we were viewing a single activity, or multiple activities, our comments will be retrieved, displayed, and created in an optimized pattern. I’m now going to pass it off to Rick to tell us more about the complexities of our other social features.

---------

Thanks Matt. Ananda is fundamentally a social website, so we needed to have a solid foundation of features allowing users to interact with one another. Even though they may seem straightforward, features like comments, likes and followers became pretty complex to implement.

Because these aspects can be displayed in multiple different places and have many different owners, we had to be very deliberate with how we set up our relational Postgres database. By making use of scopes and eager loading, we were able to ensure that the right data was sent to our client. And by strategically configuring our store and components with React-Redux, we make sure that data is displayed responsively.

Rick's going to show this in action and talk a bit more about it.
