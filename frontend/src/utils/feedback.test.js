/* Test strategy:
This test file is structured after numbered tasks (#) defined by me, based on specifications in the assignment.
This is built on TDD = code were implemented after a test demanded it.
Each test has a #number (and a letter sometimes) that can also be traced to the code in the function.

Tests cover:
Error handling.
Input validation.
Letter comparison.
Duplicate letters.
Feedback for each letter.
Edge cases (empty strings).
A full "integration-like" test that verifies that all rules work in combination.


Test #Number(Letter)
[x] #1 Check that both string inputs (guessed word and answer) have the same length.
    -if not, return error-message.
[x] #2 Convert guessed word and answer to uppercase.
[x] #3 Only use alphabetical characters (A-Ö) in guessWord, no special characters.
[x] #4 Only use alphabetical characters (A-Ö) in answer, no special characters.
[x] #5 Convert every letter to an array.
[x] #6 Compare each letter in guessed word to each letter in the answer.
    [x] #6a - if the letter is correct and on the correct slot, mark as 'correct'.
    [x] #6b - if the letter is incorrect, mark as 'incorrect'.
    [x] #6c - if the letter is correct but on the wrong slot, mark as 'misplaced'.
[x] #7 if guessed letter occur more times than in the answer.
    [x] #7a - mark correct amount of letter as 'correct' or 'misplaced'.
    [x] #7b - mark duplicate letters as 'incorrect'.
[x] Return an array of objects for every letter.
    - every object should have a result attribute.
[x] #8 Error-message in inputs are empty.
[x] Full "integration test" to incoporate all rules working together.  
    
    Example:    [
                    { letter: 'X', result: 'correct' },
                    { letter: 'Y', result: 'incorrect' },
                    { letter: 'Z', result: 'misplaced' } 
                ]
*/

import feedback from "./feedback";
import { describe, expect, test } from "@jest/globals";

describe("feedback()", () => {
  test("#1 Error message if guessed word and answer have different lengths", () => {
    const result = feedback("CYKLA", "CYKLADE");

    expect(result).toBe("Words must have the same length");
  });

  test("#2 Convert guessed word and answer to uppercase", () => {
    const result = feedback("cykla", "maska");
    const letters = result.map((item) => item.letter).join("");

    expect(letters).toBe("CYKLA");
  });

  test("#3 Remove invalid characters from guessWord", () => {
    const result = feedback("cykl#", "cykl");
    const letters = result.map((item) => item.letter).join("");

    expect(letters).toEqual("CYKL");
  });

  test("#4 Remove invalid characters from answer", () => {
    const result = feedback("cykla", "m@as!ka");
    const cleanedAnswer = "m@as!ka"
      .replace(/[^a-zA-ZåäöÅÄÖ]/g, "")
      .toUpperCase();

    expect(result.length).toBe(cleanedAnswer.length);
  });

  test("#5 Convert guessed word and answer to arrays", () => {
    const result = feedback("cykla", "maska");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    expect(result[0]).toHaveProperty("letter");
  });

  test("#6a Mark letters as correct when they match at the same position", () => {
    const result = feedback("CYKLA", "CIRKA");
    const correctLetters = result.filter((item) => item.result === "correct");

    expect(correctLetters.length).toBe(2);
    expect(correctLetters[0].letter).toBe("C");
    expect(correctLetters[1].letter).toBe("A");
  });

  test("#6b Mark letters as incorrect when not matched at all", () => {
    const result = feedback("XYZXYZ", "ABCDEF");
    const incorrectLetters = result.filter(
      (item) => item.result === "incorrect"
    );

    expect(incorrectLetters.length).toBe(6);
  });

  test("#6c Mark letters as misplaced if they exist in answer but on wrong position", () => {
    const result = feedback("AKLAA", "MASKA");
    const misplacedLetters = result.filter(
      (item) => item.result === "misplaced"
    );

    expect(misplacedLetters.length).toBeGreaterThan(0);
    expect(misplacedLetters.map((item) => item.letter)).toContain("A");
  });

  test("#7 Only mark letters as misplaced if they exists and not already used", () => {
    const result = feedback("AABBB", "ABABA");

    const expected = [
      { letter: "A", result: "correct" },
      { letter: "A", result: "misplaced" },
      { letter: "B", result: "misplaced" },
      { letter: "B", result: "correct" },
      { letter: "B", result: "incorrect" },
    ];

    expect(result).toEqual(expected);
  });

  test("#7b Mark duplicate guessed letters as incorrect if they appear more times than in the answer", () => {
    const result = feedback("AABAA", "ALARM");

    const expected = [
      { letter: "A", result: "correct" },
      { letter: "A", result: "misplaced" },
      { letter: "B", result: "incorrect" },
      { letter: "A", result: "incorrect" },
      { letter: "A", result: "incorrect" },
    ];

    expect(result).toEqual(expected);
  });

  test('#8 Edge case with empty inputs', () => {
    const result = feedback('','');
    expect(result).toBe('Words cannot be empty');

  });

});

describe('Full test of logic in feedback()', () => {
  test("Correct, incorrect, misplaced, duplicate, mixed lowercase and invalid characters", () => {
    const result = feedback("äåö#1hh!3A*Bc^DDF", "^¤åä1ögpAB*c^def!");

    const expected = [
      { letter: "Ä", result: "misplaced" },
      { letter: "Å", result: "misplaced" },
      { letter: "Ö", result: "correct" },
      { letter: "H", result: "incorrect" },
      { letter: "H", result: "incorrect" },
      { letter: "A", result: "correct" },
      { letter: "B", result: "correct" },
      { letter: "C", result: "correct" },
      { letter: "D", result: "correct" },
      { letter: "D", result: "incorrect" },
      { letter: "F", result: "correct" },
    ];

    expect(result).toEqual(expected);
  });
});
