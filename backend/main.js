import * as DB from "./db.js";
import * as FM from "./fm.js";
import * as LG from "./logger.js";
import * as Utils from "./utils.js";

(async function main() {
  const dbInitializationSuccess = await DB.initializeDb();
  if (!dbInitializationSuccess) {
    const errorMessage = "Something went wrong with initialization of the db, exiting...";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  const persons = await DB.getPersons();
  const choosingPool = await DB.getChoosingPool();

  if (!choosingPool.length) {
    const errorMessage = "The choosing pool was empty!";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  const chosenPersonName = choose(choosingPool);

  let newChoosingPool = choosingPool.filter(x => x !== chosenPersonName);
  if (!newChoosingPool?.length) {
    newChoosingPool = persons.map(x => x.name);
  }

  const setChoosingPoolSuccess = await DB.setChoosingPool(newChoosingPool);
  if (!setChoosingPoolSuccess) {
    const errorMessage = "Failed to set choosing pool!";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  const setChosenPersonNameSuccess = await DB.setChosenPersonName(chosenPersonName);
  if (!setChosenPersonNameSuccess) {
    const errorMessage = "Failed to set chosen person name!";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  const lastUpdate = Utils.getCurrentSimpleDate();

  const setLastUpdateSuccess = await DB.setLastUpdate(lastUpdate);
  if (!setLastUpdateSuccess) {
    const errorMessage = "Failed to set last update!";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  const chosenPerson = persons.find(x => x.name === chosenPersonName);
  const newPerson = incrementDeployAmount(chosenPerson);
  const newPersons = persons.map(x => x.name === newPerson.name ? newPerson : x);

  const setPersonsSuccess = await DB.setPersons(newPersons);
  if (!setPersonsSuccess) {
    const errorMessage = "Failed to set persons!";
    await LG.log(errorMessage);
    throw new Error(errorMessage);
  }

  updateFrontendContent(chosenPerson, lastUpdate, newPersons);

  await LG.log("Successfully made new person choice and updated frontend content.");
})();

function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function incrementDeployAmount(person) {
  return { name: person.name, deployAmount: person.deployAmount + 1 }
}

async function updateFrontendContent(chosenPerson, lastUpdate, persons) {
  const content = {
    chosenPersonName: chosenPerson.name,
    lastUpdate,
    deployAmounts: Object.fromEntries(
      persons.map(person => [person.name, person.deployAmount])
    ),
  };

  await FM.write("./frontend/content.json", JSON.stringify(content, null, "\t"));
}