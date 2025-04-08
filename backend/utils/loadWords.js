import fetch from "node-fetch";

const WORD_LIST_URL =
  "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt";

export async function loadWords() {
  const res = await fetch(WORD_LIST_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch word list: ${res.status}`);
  }

  const text = await res.text();

  return text
    .split("\n")
    .map((w) => w.trim().toUpperCase())
    .filter((w) => /^[A-Z]+$/.test(w));
}
