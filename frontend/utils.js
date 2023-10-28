export async function readJsonFile(path) {
  return fetch(path)
    .then((res) => res.text())
    .then((text) => JSON.parse(text))
    .catch((e) => console.error(e));
}

export function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}