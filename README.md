# Coffee Note
A minimalist coffee enthusiast app for honing brew methods

[Deployed App](https://coffee-note.herokuapp.com/)

[User Stories](https://github.com/alwat91/coffee_note/blob/master/Planning/user_stories.txt)

[User Stories-Reach](https://github.com/alwat91/coffee_note/blob/master/Planning/user_stories_REACH.txt)

# Overview
Coffee node is a simple CRUD application designed with the coffee connisuer in mind. Once registered, users can record details each time they make a cup, sort of like a lab journal. It allows for different brew methods, records the date a brew was made, and many other paramaters that help a user make the perfect cup. Under the hood, it uses mongo, express, and node.js. 

# Features coming soon
* Display current user logged in and conditionally display log in and log out buttons
* Home should go to show page when logged in
* Enhanced autherization for all routes
* Utilize flash messaging package for incorrect inputs
* Public/private brews
* Implement units
* Ability to change password and login info

# Reach goals
* Add intro information and public brews access for unregistered users
* Add a voting system for public brews
* Add personal equipment lists for users
* Add option for unit (metric/imperial) preferences
* Summary stats 
  * Favorite brew method
  * Average satisfaction rating
  * Favorite beans
  
# Approach
When designing this app, I decided that users would have brews stored as embedded documents. Unfortunately, this created unforseen difficulty when it came to updating since there is no mongoose method to update embedded documents. If I had to do it over, I would create brews as their own documents rather than as subdocuments. Other than that, the design is pretty standard for a CRUD application.
