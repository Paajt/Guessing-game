# The Word Guessing-game

**Wordle look-alike guessing game built with React, Vite, Bootstrap, Express and MongoDB.**  
For full project description and technical information, see [INFO.md](./INFO.md)

This project also includes a Jest-tested custom-built feedback algorithm used to evaluate each guess.  
For more information see: [https://github.com/Paajt/Tested-Wordle-Algorithm](https://github.com/Paajt/Tested-Wordle-Algorithm)

## Requirements

- Node.js (v18 or later)
- MongoDB (running locally)

## Instructions

1. **Clone repository**

```
git clone https://github.com/Paajt/Guessing-game.git
cd Guessing-game
```

2. **Install dependencies**

```
npm install
```

> This will also automatically build the frontend with Vite.

3. **MongoDB**

   **_❗_** **_Important:_** **MongoDB must be running before starting the server.**

   If you're using MongoDB Compass or another GUI, make sure the database is available at:

```
mongodb://localhost:27017/guessing-game
```

4. **Start the server**

```
npm start
```

5. **Visit the app at:**

[http://localhost:5080](http://localhost:5080)

**Run tests with:**

```
npm test
```
