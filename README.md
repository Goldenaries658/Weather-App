# Weather App

## Demo
https://goldenaries658.github.io/Weather-App/

## Summary
A simple weather forecasting webapp, it allows a user to search locations and receive up to 5 days forecast for the location. It also features an editable history.

## Main Features
- [Dashboard](#dashboard)
  1. [Search Box](#search-box)
  2. [Current Weather Info](#current-weather-info)
  3. [Forecast Info](#forecast-info)
- [History](#history)

## Dashboard
### Search Box
A text input for the user to enter their query, this hides automatically when searching and displays a search button that makes it visible again. When a user searches for an item the query is evaluated against the existing history and saved if not already present. It then loads both current and forecasted weather data.

### Current Weather Info
This displays the users last search or a selected history item on page load. If none are present then the earch box will be displayed. When a search is passed to this display the text is updated to reflect current info, it also then has a button to toggle the forecast info. The UV Index info was retreived from a different URL using Lat & Lon values retreived from the current weather data

### Forecast Info
This is the 5 day forecast, it functions the same as the current info but using a different query URL

## History
On page load this fills out a table with all the history entries in it. Clicking on an entry will search for it on the dashboard. If a user clicks on the trash icon it will remove the relating entry from the table and then delete the history entry by moving the entries following it up one place.
