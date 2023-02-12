# Social-Network-API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A REST API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The app uses Express.js for defining routes, Mongoose for Object Data Modeling, and MongoDB as the NoSQL backend. 


<br>


## GIF of Application

<img src="Images\Social Network API Part 1.gif" title="Social Network API gif Part 1" width = 368px>

[Part 1](https://drive.google.com/file/d/1ujDLhCHu7S_Z2fy6JaPBoQSyGIfAvxco/view)

<br>

<img src="Images\Social Network API Part 2.gif" title="Social Network API gif Part 2" width = 368px>

[Part 2](https://drive.google.com/file/d/1OJXlKbEWhxF56xBDuoU5Mp2qZEXWdF5h/view)

<br>

## Table of Contents
  * [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Technologies Used](#technologies-used)
  * [Screenshot](#screenshot)
  * [Code Snippets](#code-snippets)
  * [Learning Points](#learning-points)
  * [Author](#author)

<br>


## Getting Started

To begin the application, use the following in command line:

`
nodemon index.js
`
<br>


## Prerequisites

1. [Download Node.js](https://nodejs.org/en/download/)

<br>

2. Install node package manager (npm)

`npm install -g npm`

<br>

3. Install dependencies inquirer, console.table, and mysql2

`npm install`

<br>

4. [Download MongoDB](https://www.mongodb.com/try/download/community)

<br>

5. [Download Insomnia](https://insomnia.rest/download)

<br>


## Technologies Used

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/) 
* [Express](https://www.npmjs.com/package/express) 
* [Mongoose ODM](https://www.npmjs.com/package/mongoose) 
* [MongoDB](https://www.mongodb.com/try/download/community)
* [Insomnia](https://insomnia.rest/download)


<br>

## Screenshot

Insomnia: Get Route request to retrieve All Users with Thoughts and Reactions
<img src="Images\Insomnia - My Collection – Get All Users.png" title="All Users with Thoughts and Reactions screenshot" width = 800px>

<br>


## Code Snippets

This code snippet shows how you can use Express routes and Mongoose ORM to create controllers for a Reactions (i.e. comments) delete route

* findOneAndUpdate() function in Mongoose finds the first document that matches a given filter, applies an update, and returns the document 

* The filter we give findOneAndUpdate is "{_id: req.params.thoughtId}". For this app, the user includes the req.params.thoughtId in the URL

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


## Author
 **Elliot Park** 

[Github](https://github.com/elliotpark410)

<br>

[LinkedIn](https://www.linkedin.com/in/elliot-park/)

<br>

[Email](mailto:elliotpark410@gmail.com)

<br>





