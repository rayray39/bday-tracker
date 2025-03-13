# Bday Tracker
A simple tool to track all your friends' birthdays in one place, so you will never forget to wish them a happy birthday.  

The project was built using Vite as the build tool, TypeScript, ReactJS and Express.JS.

# Getting Started
## clone the repository
1. `git clone https://github.com/rayray39/bday-tracker.git`  
2. `cd <your-project-folder>`

## install all dependencies
1. `npm install`

## run the project
1. run `npm run build`
2. add `start` command into `package.json` under `scripts` if not already added.  
```
"scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "start": "node src/server.cjs",
    "lint": "eslint .",
    "preview": "vite preview"
},
```
3. run `npm start`