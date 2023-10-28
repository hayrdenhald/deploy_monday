(function main() {
  console.log("Hello from main.js!");

  // const dbInitializationSuccess = await DB.initializeDb();
  // if (!dbInitializationSuccess) {
  //   throw new Error("Something went wrong with initialization of the db, exiting...");
  // }

  // const persons = await DB.getPersons();
  // console.log(persons);

})();

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function incrementDeployAmount(person) {
  return { name: person.name, deployAmount: person.deployAmount + 1 }
}

function updatePersonInPersonData(person, personData) {
  return personData.map(x => x.name === person.name ? person : x);
}