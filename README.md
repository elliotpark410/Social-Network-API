# Social-Network-API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A REST API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The app uses Express.js for defining routes, Mongoose for Object Data Modeling, and MongoDB as the NoSQL backend. 


<br>


## GIF of Application

<img src="Images\Social Network API Part 1.gif" title="Social Network API gif Part 1" width = 368px>

<br>

<img src="Images\Social Network API Part 2.gif" title="Social Network API gif Part 2" width = 368px>

<br>


## Links


<!-- [Deployed App on Heroku](https://desolate-atoll-11549.herokuapp.com/)

<br> -->

[GIF of Application Part 1](https://drive.google.com/file/d/1ujDLhCHu7S_Z2fy6JaPBoQSyGIfAvxco/view)

<br>

[GIF of Application Part 2](https://drive.google.com/file/d/1OJXlKbEWhxF56xBDuoU5Mp2qZEXWdF5h/view)

<br>

[Github Repository](https://github.com/elliotpark410/Social-Network-API)

<br>


## Table of Contents
  * [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Technologies Used](#technologies-used)
  * [Contribution Guidelines](#contribution-guidelines)
  * [Cloning Guidelines](#cloning-guidelines)
  * [Screenshot](#screenshot)
  * [Code Snippets](#code-snippets)
  * [Learning Points](#learning-points)
  * [Authors](#authors)
  * [License and Acknowledgements](#license-and-acknowledgements)
  * [Contact](#Contact)

<br>


## Getting Started

To begin the application, use the following in command line:

`
nodemon index.js
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

4. Additionally, you can download MongoDB database to store and access data:

[Download MongoDB](https://www.mongodb.com/try/download/community)

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
* [Mongoose ODM](https://www.npmjs.com/package/mongoose) 
* [MongoDB](https://www.mongodb.com/try/download/community)
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
>https://github.com/elliotpark410/Social-Network-API

<br>


## Screenshot

Insomnia: Get Route request to retrieve All Users with Thoughts and Reactions
<img src="Images\Insomnia - My Collection – Get All Users.png" title="All Users with Thoughts and Reactions screenshot" width = 800px>

<br>
<br>


## Code Snippets

This code snippet shows how you can use Express routes and Mongoose ORM to create the controllers for a delete route for Reactions (i.e. comments)

* findOneAndUpdate() function in Mongoose finds the first document that matches a give filter, applies an update, and returns the document 

* The filter we give findOneAndUpdate is "{_id: req.params.thoughtId}". For this app, we include the req.params.thoughtId in the URL

* $pull operator is used to remove all instances of a value from an existing array. In this case, we are going into a nested object to retrieve "req.params.reactionId"

* {new: true} will have the findOneAndUpdate() function return the object after the update was applied. The default is to return the object before the update was applied

* You'll notice a "?" and the following line has a ":" which is a ternary oeprator and has the form of "condition ? value-if-true : value-if-false"

```
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {new: true})
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
```

 <br>


## Learning Points

* How to use Mongoose ODM

* How to connect to MongoDB

* How to create NoSQL schemas and models 

* How to create REST API routes with Express

* How to use Insomnia for testing API routes


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



 
  

 



 



