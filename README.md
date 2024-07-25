# Live-LOL-Tracker
## League of Legends Overlay

A web application that displays League of Legends player statistics, live match information, and build widgets.

## Wireframe

The wireframe for the project includes the following elements:![alt text](<wireframe/Screenshot 2024-07-25 at 12.24.53 AM.png>)

- **White box**: Summoners spells/ultimate ability cooldown timers
- **Black box**: Champion splash art
- **Yellow box**: Ward trinket timer
- **Timer (white text)**: Jungle camp/dragon/baron timers

## Acceptance Criteria

- When a player opens the webpage, they are prompted to put in their username.
- When a player enters their username, they are directed to a page with their stats.
- When a player clicks "live match", they are directed to a page that dynamically displays in-game stats over a "League of Legends" mini map and suggested build and skill path for their picked champion.
- When a player finishes a match, they are directed to an after game stat review page.
- The mini map should update as the game plays out to show accurate timers.
- A user should be able to see timers tracking summoners spells and ultimate abilities of their teammates.
- A user should not have to reload the browser.
- A user should be able to log in.

## Example Web Page for User Stats

- [OP.GG](https://www.op.gg/summoners/na/RektTrashed-NA1)
- [League of Graphs](https://www.leagueofgraphs.com/summoner/na/RektTrashed-NA1#championsData-all)
- [U.GG](https://u.gg/lol/profile/na1/rekttrashed-na1)

## Research

- How do other overlay apps get their builds/win/matchup stats?
  - [Mobalytics Widgets GitHub](https://github.com/mobalyticshq/mobalytics-widgets)

## Technologies Used

### Frontend Technologies

1. **React.js**: A JavaScript library for building user interfaces.
2. **Axios**: A promise-based HTTP client for making API requests.
3. **Create React App**: A tool to set up a modern web app by running one command.
4. **HTML5**: Markup language for structuring the web content.
5. **CSS3**: Styling language for describing the presentation of web pages.
6. **JavaScript (ES6+)**: The programming language used for client-side scripting.

### Backend Technologies

1. **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
2. **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
3. **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
4. **node-fetch**: A lightweight module that brings `window.fetch` to Node.js.

### Development Tools

1. **Nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.
2. **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

### API Integration

1. **Riot Games API**: An API provided by Riot Games to fetch real-time game data and player statistics.

### Containerization and Deployment

1. **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.
2. **Docker Compose**: A tool for defining and running multi-container Docker applications.
3. **Vercel**: A platform for frontend frameworks and static sites, built to integrate with headless content, commerce, or database.

### Configuration and Environment Management

1. **dotenv**: To manage environment variables in Node.js applications.

### Description of Key Files and Directories

#### Client Side

1. **public/**:
   - **index.html**: The main HTML file for the React app.
   - **styles.css**: Global CSS styles for the app.
   - **assets/**: Directory for static assets like images.
     - **champion-splash.jpg**: Example splash art image.

2. **src/**:
   - **components/**: React components for different parts of the application.
     - **Login.js**: Component for user login.
     - **UserStats.js**: Component for displaying user statistics.
     - **LiveMatch.js**: Component for displaying live match information.
     - **MiniMap.js**: Component for displaying the in-game mini map.
     - **BuildWidget.js**: Component for displaying the build widget.
   - **App.js**: Main React component.
   - **App.css**: CSS for the main React component.
   - **index.js**: Entry point for the React app.
   - **.env**: Environment variables for the client.

3. **package.json**: Contains metadata about the client-side project and its dependencies.

#### Server Side

1. **controllers/**:
   - **gameDataController.js**: Handles logic for fetching and processing game data.

2. **routes/**:
   - **api.js**: Defines API endpoints for the server.

3. **services/**:
   - **riotApiService.js**: Functions for interacting with the Riot Games API.

4. **utils/**:
   - **errorHandler.js**: Middleware for handling errors.
   - **logger.js**: Utility for logging information and errors.

5. **server.js**: Entry point for the Node.js server.
6. **app.js**: Express app configuration.
7. **.env**: Environment variables for the server.

8. **package.json**: Contains metadata about the server-side project and its dependencies.

#### Root Level

1. **.gitignore**: Specifies files and directories to be ignored by Git.
2. **README.md**: Project description and setup instructions.
3. **League-Overlay-Wireframe.pdf**: The wireframe document for reference.