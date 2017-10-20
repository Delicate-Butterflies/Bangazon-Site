# BANGAZON WEBSITE
## BANGAZON WEB APPLICATION

This system allows users to view, create, edit, and delete a list of: users, products, product types, orders, order items, and payment types.

## Table of Contents
1. [Software Requirements](#software-requirements)
1. [Insallation](#installation)
1. [Get Started](#get-started)
1. [Helper Applications](#helper-applications)
1. [Third Party Libraries](#third-party-libraries)
1. [Usage Directions](#usage-directions)
1. [Credits](#credits)
1. [Contribute to Website](#contribute-to-website)

## Software Requirements
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Installation
- To clone the project down, run  ```git clone [repo link]```
- Run ```npm install``` from the root of the directory to install all of the dependencies

## Get Started
- Set up the database using ```npm run db:reset``` command in terminal
- Run ```npm start``` from the terminal

## Helper Applications
- [PostgreSQL](http://www.postgresapp.com)

## Third Party Libraries
- [express](https://www.expressjs.com)
- [pug](https://www.pugjs.org)
- [sequelize](https://www.docs.sequelizejs.com)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [bootstrap](https://www.getbootstrap.com)
- [popper.js](https://www.popperjs.org)
- [chai](https://www.chaijs.com)
- [mocha](https://www.mochajs.org)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsdoc](https://www.usejsdoc.org)

## Usage Directions

## Credits
### Project Manager
- [Jufe Brown-Tsai](https://github.com/Jufebrown)

### Bangazon Website Developers
- [Megan Brown](https://github.com/megbrown)
- [Arwa Kuterwadliwala](https://github.com/Arwask)
- [Jon Roberts](https://github.com/thejonroberts)
- [Sam Baker](https://github.com/SamBDev)
- [Josh Lloyd](https://github.com/joshualloyd)

## Contribute to Website
- Fork - issue tickets and pull requests are welcome
- Follow the template for PR requests
- Tab size 2

### Contributing

#### Sequelize config.json:
You may need to add your psql username and password the the development database in the /config/config.json file.  For this reason, it has been .gitignored.  There is, however, a config.json.example. Copy all from the .example file, paste into a new config.json file in the /config folder, and try as is before adding your user/password to the development config info.

#### Note on Model/Migration creation:
We are using camelCase for our database attribute names.  By default, sequelize uses camelCase, which comes into play for the auto-generated updatedAt and createdAt attributes. This should cause less issues.

<p align="center">&copy; 2017 Delicate-Butterflys</p>