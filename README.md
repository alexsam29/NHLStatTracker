# NHL Stat Tracker App 

## Development Technology
Ionic 5 using Angular for the user interface framework.  Cordova was used to emulate an Android Virtual Device (AVD) for debugging purposes.

Guide for installing Ionic: https://ionicframework.com/docs/intro/cli  
  
How to run and debug Ionic apps on Android emulators and devices using Capacitor or Cordova: https://ionicframework.com/docs/developing/android
  
how to run and debug Ionic apps on iOS simulators and devices using Capacitor or Cordova: https://ionicframework.com/docs/developing/ios
## Web Service Consumed
The web service used in this app is the official National Hockey League (NHL) API.  This is an undocumented, publicly accessible API used by the NHL for their own applications and web services. I discovered this API by inspecting the API calls the official NHL website makes when viewing player statistics.  
  
Since this is publicly accessible, there is no API key required to use it.  
  
However, there is an unofficial community made documentation to help with usage.  
Link to unofficial NHL API Documentation: https://gitlab.com/dword4/nhlapi

## Database Technology
This app stores the user’s favourite players locally in the SQLite database.  The table created in the database is a table of integers that stores only the player’s unique ID number.  This is the only column in the table and is a primary key, meaning that you can’t store the same player ID twice.  The app then uses the player IDs stored in the database to make calls to the API to get the most up-to-date information about those players and displays that information in the user’s favourites list.

## User Interface Guide
### Home page:
-	Search for a player.
     - Type in the name (first or last) of an active NHL player into the search bar.
          - Examples:
               - Search: “Auston Matthews” or “Auston” or “Matthews
               -	Search: “Sidney Crosby”
               -	Search: “Alex”
                    -	A list of players with first or last names containing “Alex” will be suggested.
               -	Search: “Connor”
                    -	A list of players with first or last names containing “Connor” will be suggested.  
-	The results will be suggestions that match what you type and will appear below the search bar.
     -	Tap to view additional player details.
-	Click “Favourites” button in the footer toolbar to view saved players.
     -	These are the players that are saved into the SQLite database on the device.
-	Click “Session History” button in the footer toolbar to view all players clicked on from the home page for the current session.  These are not saved.

### Player Details Page:
-	View a clicked player’s personal information, current season, and overall career statistics.
-	If player is not saved into the user’s favourites, a blue “Add to Favourites” button will appear at the top of the page.  Click to save the player into the favourites list for future reference.
     -	Player is added to the SQLite database on the device.
-	Personal information, current season stats and career stats are separated by cards.
-	The stat categories will change depending on if the player is a goalie or not.
-	“Current Totals” card has two buttons that do the following:
     -	“All Seasons”: View stats for all seasons that the player has played professionally or semi-professionally.
     -	“Playoffs”: View stats for all playoff years that the player has played in.
-	“Career Totals” card has one button:
     -	“View All Stats”: View all stat categories for the entire career of that player.

### Statistics Page:
-	Depending on the button click in the player details page, this page will show stats for a player’s career, season-by-season, or playoffs.
-	The stat categories shown will change depending on whether the player is a goalie or not.
-	When viewing “Career Statistics”
     -	One card will show s summary of stats for the player’s entire career.
     -	The other card will define abbreviations for all stats.
-	When viewing “Yearly Stats”:
     -	Each card will show stats for that player for a specific season.  The card will be titled with the league name, team name, and the season’s year.
-	When viewing “Playoff Statistics”:
     -	Each card will show stats for that player for a specific playoff year.  The card will be titled with the league name, team name, and season the playoffs took place.

### Favourites Page:
-	View a list of cards of all the players you’ve saved into your favourites
     -	These players were saved in the SQLite database on the device.
-	Each card contains a summary of the players information and current season stats.
-	Click the blue “Details” button to view additional information and stats for that player.
-	Click the red trash can button to remove a specific player from the favourites list.
-	Click the red “Delete All” button in the toolbar to remove all players from the favourites list.

### Session History:
-	View a list of cards of all the players you have clicked on from the search results in the current session.
     -	This list is not saved and will be lost after the current session ends
-	Each card contains a summary of the players information and current season stats.
-	Click the blue “Details” button to view additional information and stats for that player.
-	Click the green plus button to add a specific player to the favourites list.
-	Click the “Add All” button in the toolbar to add all players to the favourites list.


