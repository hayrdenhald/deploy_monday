import * as DB from "./db.js";
import * as FM from "./fm.js";
import * as Utils from "./utils.js";

(async function main() {
  const dbInitializationSuccess = await DB.initializeDb();
  if (!dbInitializationSuccess) {
    throw new Error("Something went wrong with initialization of the db, exiting...");
  }

  const persons = await DB.getPersons();
  const choosingPool = await DB.getChoosingPool();

  if (!choosingPool.length) {
    throw new Error("The choosing pool was empty!");
  }

  const chosenPersonName = choose(choosingPool);

  let newChoosingPool = choosingPool.filter(x => x !== chosenPersonName);
  if (!newChoosingPool?.length) {
    newChoosingPool = persons.map(x => x.name);
  }

  await DB.setChoosingPool(newChoosingPool);

  await DB.setChosenPersonName(chosenPersonName);

  const lastUpdate = Utils.getCurrentSimpleDate();
  await DB.setLastUpdate(lastUpdate);

  const chosenPerson = persons.find(x => x.name === chosenPersonName);
  const newPerson = incrementDeployAmount(chosenPerson);
  const newPersons = persons.map(x => x.name === newPerson.name ? newPerson : x);

  await DB.setPersons(newPersons);

  updateFrontendContent(chosenPerson, lastUpdate, newPersons);
})();

function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function incrementDeployAmount(person) {
  return { name: person.name, deployAmount: person.deployAmount + 1 }
}

async function updateFrontendContent(chosenPerson, lastUpdate, persons) {
  let y = {};

  persons.forEach(person => {
    y[person.name] = person.deployAmount;
  });

  const content = {
    chosenPersonName: chosenPerson.name,
    lastUpdate,
    deployAmounts: Object.fromEntries(
      persons.map(person => [person.name, person.deployAmount])
    ),
  };

  await FM.write("./frontend/content.json", JSON.stringify(content, null, "\t"));
}