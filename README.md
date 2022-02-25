# Social-Network-API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list


OLD README.MD. MUST UPDATE!!!


A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package to store session data.


<br>


## GIF of Application

<img src="Images\Tech Blog.gif" title="Tech Blog gif" width = 368px>

<br>


## Links


<!-- [Deployed App on Heroku](https://desolate-atoll-11549.herokuapp.com/)

<br> -->

[GIF of Application](https://drive.google.com/file/d/1XiuC8I3lHTCWGRM8otS_M1hiaoDsPoU5/view)

<br>

[Github Repository](https://github.com/elliotpark410/Tech-Blog)

<br>


## Table of Contents
  * [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Technologies Used](#technologies-used)
  * [Contribution Guidelines](#contribution-guidelines)
  * [Cloning Guidelines](#cloning-guidelines)
  * [Screenshots](#screenshots)
  * [Code Snippets](#code-snippets)
  * [Learning Points](#learning-points)
  * [Authors](#authors)
  * [License and Acknowledgements](#license-and-acknowledgements)
  * [Contact](#Contact)

<br>


## Getting Started

To begin the application, use the following in command line:

`
node server.js
`
<br>


## Installation

To run this application, you will need Node and other dependencies: 

1. You will need to install Node.js. Here is a link below:

[Download Node](https://nodejs.org/en/download/)

<br>

2. Once you have downloaded Node.js, you will want to download node package manager (npm). In command line, you can enter:

`npm install -g npm
`

<br>

3. Next, install all the dependencies in the package.json. In command line, you can enter:

`npm install 
`

4. Additionally, you can download mysql database to store and access data:

[Download MySQL](https://www.mysql.com/downloads/)

<br>


5. Lastly, you will need to download Insomnia for testing API routes:

[Download Insomnia](https://insomnia.rest/download)

<br>


<!-- ## Prerequisites
Requires node.js, npm inquirer, and npm jest (optional)

<br> -->


<!-- ## Test-Instructions

To test the API, I recommend downloading [Insomnia's API Platform](https://insomnia.rest/) and enter the following in Insomnia's URL:

>GET http://localhost:3000/api/notes

<br>

>POST http://localhost:3000/api/notes

Example POST body: 
```bash
{
  "title":"Notes Title",
  "text":"notes text content"
}
```
*id is automatically generated so you do not need to enter id

<br>
<br>

>DELETE http://localhost:3000/api/notes/:id

<br>

Example DELETE: The API request below will delete note with id = "1"
>DELETE http://localhost:3000/api/notes/1

<br> -->


## Technologies Used

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/) 
* [Express](https://www.npmjs.com/package/express) 
* [Express Session](https://www.npmjs.com/package/express-session) 
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars) 
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize) 
* [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize) 
* [dotEnv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt) 
* [MySQL](https://www.mysql.com/downloads/)
* [Insomnia](https://insomnia.rest/download)


<br>


## Contribution Guidelines
To contribute, please follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<br>


## Cloning Guidelines

To install this code, please use [Github's guidlines to clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

<br>

Github repository:
>https://github.com/elliotpark410/Tech-Blog

<br>


## Screenshots 

<br>
Homepage
<img src="Images\Homepage screenshot.png" title="Homepage screenshot" width = 700px>

<br>
<br>
Sign Up
<img src="Images\Sign Up screenshot.png" title="Sign Up screenshot" width = 700px>

<br>
<br>
Dashboard
<img src="Images\Dashboard screenshot.png" title="Dashbooard screenshot" width = 700px>

<br>
<br>
Submit a Comment
<img src="Images\Submit a Comment screenshot.png" title="Submit a Comment screenshot" width = 700px>

<br>
<br>
Edit Post
<img src="Images\Edit Post screenshot.png" title="Edit Post screenshot" width = 700px>

<br>
<br>


## Code Snippets

This code snippet shows how you can use Express routes, Sequelize ORM, and JavaScript to create a get route for the hompaage so users can have access to all blog post data

* router.get('filepath') to request data from a specified source e.g. blog data post

* try/catch statement for error handling 

* async/await to for asynchronous promise-based behavior

* Sequelize .findAll() method to read the whole table from the database

* .map function to create a new array with a callback function for every array element. In this case, we wanted to use it to return a plain object

* res.render ('template.handlebars') to render a view with data 

```
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id',],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
    });
  } catch (err) {
   (Internal Server Error)
    res.status(500).json(err);
  }
});
```

 <br>


## Learning Points

* How to use Sequelize ORM

* How to create handlebar templates

* How to deploy on Heroku with MySQL

* How to create API routes and models 

* How to create sessions to capture cookies and user information

* How to use MySQL Workbench and Insomnia for testing API routes


<br>


## Authors
 **1. Elliot Park** 

[Github](https://github.com/elliotpark410)
<br>

[LinkedIn](https://www.linkedin.com/in/elliot-park/)

<br>


## License and Acknowledgements

This project is licensed under the MIT license via UC Berkeley's Extension Program

<br>

Big acknowledgements and thank you to Jerome Chenette, Manuel Nunes, Vince Lee, and Hannah Folk for their support and guidance!

<br>


## Contact
If you'd like to learn more about my projects, check out my Github profile: [https://github.com/elliotpark410](https://github.com/elliotpark410)

<br>

If you have any questions, please don't hesitate to email me at [elliotpark410@gmail.com](mailto:elliotpark410@gmail.com)

<br>
Copyright (c) 2022 Elliot Park



 
  

 



 



