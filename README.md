# Community Calendar!

A rather not-so-simple project made for class, in React. Basically, it's a calendar that has events (which it uses MongoDB for). Any user can add or delete events, which I'm sure won't backfire at all. Well, it won't, given that it's just a demo.

Live demo: https://toni-calendar.herokuapp.com/

## To run locally

Clone the repo, clone the backend. `NPM install` to install the dependencies and `NPM start` to run. You can also use `nodemon start` since this has nodemon by default.

The URL for fetching from the database is saved in `crud.js` and you'll want to change that to something local if you want to use your own DB. Remember, just say no to SQL.

## Backend

https://github.com/ToniHalmetoja/calendar-backend
