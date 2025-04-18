# The Word Guessing Game

## About this project

A fullstack word guessing game built with React, Vite, Bootstrap, custom-CSS, Express and MongoDB  
– custom-built and tested feedback algorithm, styled UI and a persistent leaderboard.

---

## How the Game Works

- This is a Wordle-inspired guessing game
- You choose:
  - Word length (2–10 letters)
  - Whether duplicate letters are allowed
- Words are selected randomly from a large English word list  
  see, [https://github.com/dwyl/english-words/tree/master](https://github.com/dwyl/english-words/tree/master)
- You guess by typing in a text field
- Each letter in guessed word is color-coded:

  - 🟩 Green: Correct position
  - 🟨 Yellow: Wrong position
  - ⬜ Gray: Not in the word

- When you guess the correct word, you can enter your name
- Your result is saved to a leaderboard

---

## How It’s Built

### Frontend (React)

- React + Vite
- React Bootstrap for UI components
- Custom CSS for game styling
- `fetch()` used for API calls (get word, send score)
- Game logic (feedback, state, UI) runs on client
- Vite is used in development and for bundling the React frontend

### Backend (Express)

- Express server running on port 5080
- Random word selection from filtered word list
- Highscores stored with Mongoose in MongoDB
- Leaderboard and info page rendered with Handlebars

---

## Technical Details

### Frontend

- Built in React with components for game, modal, and styling
- User chooses word length and duplicate settings via a form
- When the game starts:
  - Frontend sends a `GET` request to `/api/word?length=...&duplicates=...`
  - Backend responds with a filtered, random word
- Player enters guesses into a controlled text input
- Each guess is evaluated via a `feedback()` function that marks each letter
- When the correct word is guessed:
  - A timer (started on game start) is stopped
  - Player can enter their name to save the result
- Frontend sends a `POST` request to `/api/highscore` with:
  - Name
  - Time taken
  - Number of attempts
  - Word
  - Duplicate setting

### Backend

- Built with Express and serves both API and server-rendered views
- Handles:
  - `/api/word` – filters the word list and returns a valid word
  - `/api/highscore` – saves player result to the database
  - `/highscores` – server-side rendered leaderboard using Handlebars
  - `/info` – static info page
- Formats time (`MM:SS`) and date (`sv-SE`) before rendering
- Shares some logic (like time formatting) with frontend via utility functions

### Database

- MongoDB with Mongoose schema for HighScore
- Each saved score includes:
  - `name`, `time`, `attempts`, `targetWord`, `allowDuplicates`, `date`
- Leaderboard is sorted by time and attempts on backend
- Data is retrieved and mapped before rendering (including formatted fields)

---

## Other small (but awesome) details

- Input field for guesses dynamically reflects the chosen word length:
  - Shows how many letters are entered vs required
  - Icon changes from ⚠️ to ☑️ based on validity
- Only letters A–Z are allowed in the guess field – blocked via RegExp validation
- Feedback is animated via colored tiles styled with custom classes
- Result is measured in seconds and displayed as `MM:SS` on the leaderboard
- Submission date is formatted to local Swedish date & time
- Leaderboard and game board are scrollable – no layout breaking!
- Modal shows when the user wins, with inputs and action buttons
  - User must enter a name before saving to leaderboard
- All text and design match the rest of the game via shared styles and fonts

---
