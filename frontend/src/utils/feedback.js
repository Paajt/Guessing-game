/* This function takes two input words - a guessed word and the correct answer - and compares them letter by letter,
   and returns an array of result objects describing the feedback for each letter in the guess.
   Each object in the array contains:
   - letter: the guessed letter (uppercase)
   - result: 'correct', 'misplaced', or 'incorrect'.
   
   #Test numbers (#) are included as comments for easier tracking */

export default function feedback(guessWord, answer) {
    //#2 + #3 + #4
    const guessWordClean = guessWord.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();
    const answerClean = answer.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();

    //#8
    if (!guessWordClean || !answerClean) {
        return 'Words cannot be empty';
    }
    
    //#1
    if (guessWordClean.length !== answerClean.length) {
        return 'Words must have the same length';
    }

    //#5
    const guessWordLetters = guessWordClean.split('');
    const answerLetters = answerClean.split('');
    
    //Tracks used letters in answer
    const usedAnswerPositions = new Array(answerLetters.length).fill(false);

    const result = [];

    //#6 + 6a
    for (let i = 0; i < guessWordLetters.length; i++) {
        if (guessWordLetters[i] === answerLetters[i]) {
            result[i] = { letter: guessWordLetters[i], result: 'correct' };
            usedAnswerPositions[i] = true;
        } else {
            result[i] = { letter: guessWordLetters[i], result: null };
        }
    }

    //#6c + #6b + #7a + #7b
    for (let i = 0; i < guessWordLetters.length; i++) {
        if (result[i].result === null) {
            let found = false;
            for (let j = 0; j < answerLetters.length; j++) {
                if (!usedAnswerPositions[j] && guessWordLetters[i] === answerLetters[j]) {
                    result[i].result = 'misplaced';
                    usedAnswerPositions[j] = true;
                    found = true;
                    break;
                }
            }
            if (!found) {
                result[i].result = 'incorrect';
            }
        }
    }

    //#8 + #8a
    return result;
}