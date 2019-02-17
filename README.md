# liri-node-app
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies through specific console commands.

Before the program is run, packages must be installed by typing: npm install <program>
The packages included are:
* [Node.js] (https://nodejs.org/en/)
* [Node-File-System] (https://nodejs.org/api/fs.html)
* [Axios] (https://www.npmjs.com/package/axios)
* [DotEnv] (https://www.npmjs.com/package/dotenv)
* [JavaScript] (https://www.javascript.com/)
* [Moment.js] (https://www.npmjs.com/package/moment)
* [OMDB-API] (http://www.omdbapi.com)
* [Bandsintown-API] (http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)
  
After navigating to the root folder of the program, one can run console commands to start the program.
Any console command must be prefixed with node liri.js <command> 

Below are demos of commands and explanations of what they are doing.

*  `node liri.js concert-this <artist/band name here>` will search the Bands in Town Artist Events API.

![Concert img](screenshots/image.jpg)
