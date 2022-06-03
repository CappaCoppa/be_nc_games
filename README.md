# Northcoders House of Games
## Application Description

This Application programming interface-(API) is responsible for interacting with the database in the backend and providing information to the front end architecture. The inspiration for the programing process was taken from online web forums like 4-chan or Reddit. Using specific API requests users can either retrieve, alter, post or delete information from the database.

#### DATABASE

- DATABASE was created using a relational database management system called PostgreSQL

#### Main Dependencies

- Express framework - Implemented for API construction.
- Node-Postgres - Implemented for establishing a connection with the DATABASE
- Jest - Implemented for API request testing.

### Check out the hosted version of the API at - https://be-nc-games-heroku.herokuapp.com/
### With the '/api' endpoint you will be able to get access to the list of the endpoints' documentation.

---

## Forking and Cloning the project
To clone the project please visit the link to the GitHub repository https://github.com/northcoders/be-nc-games. There on the top left side of the screen, you will find a button called "Fork" between two other buttons "watch" and "Star". Click the button and copy the project to your GitHub repository. Afterwards, when you will be redirected to your GitHub repository there you will see a green button called "code" after pushing the button field will drop down. There you will be able to access your remote repository URL which is used for repository cloning. For this project, the HTTPS method will be described. After copying the URL open your terminal and navigate to the directory where you will be storing your Github project. After finding the location write inside the terminal "$git clone <HTTPS_URL_link>".
After the cloning process completion, you are ready to start working.

---

## Creating .env files

First of all, locate your directory by clicking on the top left corner File section and selecting an open folder. When you finally located your directory create two text files and name them accordingly to your coding environment inside the  '.env.<FILENAME>' '.env.<FILENAME>'. Usually, files are named 'test' for a testing environment and 'development' for development. When you created the files with assigned names write this code accordingly to which database you are targeting.
"PGDATABASE=<DATA_BASE_NAME>".

**Do not forget to install the Dotenv dependency otherwise it will not work.**

---

## Installing Dependencies 
locate and open your cloned GitHub repository thru the terminal. Afterwards, type in two code lines into your terminal.
1."npm install" - it installs necessary  node_modules.
2."npm init" - it creates your package.json file with all dependencies' metadata inside.

---

## How connecting to the DATABASE Seeding it and running on testing environment works.

Connection process:

Before seeding data to the database we have to make sure that the connection is established. There is a file inside /db directory called connection.js where the code is prewritten already, Using the "pg" dependency file is required in "Pool" which allows us later on export "new Pool()" with which it creates an instance of a connection. then the "dotenv" dependency file tells which DATABASE to target (See more information about how to create a ".env" file above). Afterwards, we are exporting the connection with the "module.exports = new Pool()".  

Seeding process:

Inside the /db directory there is file "seed.js" where pre-written code is responsible for the structure of the tables and passed information to the DATABASE. Another file inside the directory of /db "run-seed.js" is a file which works as an ignition point. There required files including (seed.js, connection.js, and devData files) are used inside of an arrow function called "runSeed" where within the function seed.js is invoked and passed in devData afterwards a callback function is declared where the file is closing the connection with the DATABASE. Now you just need to head to the package.json file where there are already pre-written scripts.
1. First write inside your terminal (npm run setup-dbs) to initiate the code for creating the databases.
2. Then type (npm run seed) in your terminal so that you could initiate the seeding process.

Jest testing environment process:

You can find the script for running the jest testing environment inside of the "package.json". Jest already has pre-built .env file environment variables functionality. When creating a ".env" file for the testing environment make sure that you will name it as follows: ".env.test". When you will run (npm run test) inside the terminal it will automatically read this file and direct you to the targeted DATABASE. Only one thing changes inside of the testing file in this case "/__tests__/app.test.js" in function beforeAll() we directly seed in the testData and in the function afterAll() we close the connection to the database.

---

## Dependencies version required.
- Node : =>12
- Node-Post : =>8.0.0













