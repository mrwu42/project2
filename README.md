# Quarantine Pets
A group developed Full Stack application using the **MVC** design pattern.  

In our current hard times of Quarantine, people need a friend to interact with to escape.   Welcome to **Quarantine Pets!**  
A virtual pet to play with, love, and take care of in the way of the original *Tamagotchi*. 

# Authors 
> Justin Acosta, Helen Maschmeyer, Tim Shaffer, & Wayne Wu

## Contents
* [Tech Used](https://github.com/mrwu42/project2#tech-used)
* [Original Design Notes](https://github.com/mrwu42/project2#original-design-notes)

## Tech Used
* JavaScript
    * constructors
* Node.js
    * Express
        * get 
        * post
        * put
        * use
        * engine
        * set
    * Express  
    * bcrypt.js
    * mysql
    * mysql2
    * passport
    * sequelize
* HTML 
* CSS
    * SCSS
* Bootstrap
* jQuery
* MySQL
    * SQL 
        * CREATE DATABASE
        * USE DATABASE
        * CREATE TABLE
        * INSERT INTO
        * ALTER TABLE
        * SELECT 
        * UPDATE 

### MVC Directory Structure

```bash
├── project2
│   ├── config
|   │   ├── middleware
    │   │   └── isAuthenticated.js
│   │   ├── config.js
│   │   └── passport.js
│   ├── db
│   │   ├── schema.sql
│   │   └── seeds.sql
│   ├── models
│   │   ├── Character.js
│   │   ├── index.js
│   │   ├── Pets.js
│   │   └── User.js
│   ├── public
│   |    ├── images
│   │    |   └──  
│   |    ├── js
│   │    |   ├── index.js
│   │    |   ├── login.js
│   │    |   ├── members.js
│   │    |   └── signup.js
│   |    ├── styles
│   │    |   ├── loginSignup.css
│   │    |   ├── main.css
│   │    |   ├── scss.css
│   │    |   ├── scs.css.map
│   │    |   └── scss.scss
|   |    ├── login.html
|   |    ├── members.html
|   |    └── signup.html
│   ├── routes
│   │   ├── apiRoutes.js
│   │   └── htmlRoutes.js
│   └── test
│   │   └── canary.test.js
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .travis.yml
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Original Design Notes 
Tamagotchi (Covid Quarantine Pets)

1) Logins (passport) Tim
2) Tamagotchi choices
3) UI presents Tamagotchi to user.
3) Multiple choices to interact with the Tamagotchi.
    1) feed
    2) play
    3) put to sleep
    4) clean up after
    5) give it medicine
4) SCSS (new tech) Wayne 
5) Database
    1) Tamagotchi that can be used
    2) login timestamp
    3) Interaction timestamp
    4) Relational Database structure
    5) Data Dictionary


Create a virtual pet that the user can interact with. Store user/Tamagotchi interactions in MySQL. Utilize routes and apis for the different interactions. Use SCSS for the frontend UI. 


Button Interactions


1) Feed Button: Hunger bar goes down by random number between 5-10
                Sleepy bar goes up by random number between 5-10
                Love bar goes by 1
                Hunger bar under 30 Health bar goes down between 5-10
                *If hunger bar is over 100 Health bar goes down by random number between 5-10

2) Play Button: Play bar goes down by random number between 5-10 
                Hunger bar goes up by random number between 5-10
                Sleepy bar goes up by random number between 5-10
                Dirtyness bar goes up by random number between 10- 20
                Love bar goes by 2
                *If Play button clicked when playful bar is under 30 Love bar goes down by 1 and  Playfulness bar goes up by random number between 5-10

3) Sleep Button: Sleepy bar goes down by between 5-10
                 Play bar goes up by between 5-10
                 Hunger bar goes up by between 5-10
                 Love bar goes by 1
                 * If Sleepy bar below 30 then Love bar goes down by 2

4) Love Button: On click check the last time that is was pushed and if it is greater than 2 mins. 
                Loves goes up by random number between 5-10

5) Clean Button: Dirtyness bar goes down by random number between 5-10
                 Love bar goes up by 1
                 * If Dirty bar is under 30 Loves bar goes down by 2
                 If Dirty bar is over 100 Health bar goes down by random number between 5-10
                
6) Medicine Button: Health goes up by random number between 5-10
                    Love bar goes up by 1

Image interactions:

Hungry: If Hunger bar is above 80 "set the is hungry Boolean = TRUE" Use hunger image 1
Play: If Playfulness is above 80 Use Happy Image 1
Sleep: If Sleepyness is above 80 Use Tired Image 1
Love: If Lovefulness is above 80 Use Happy image 2
Clean: If Dirtyness is above 80 ??
Medicine: If Healthness is BELOW 25 Dead image 1