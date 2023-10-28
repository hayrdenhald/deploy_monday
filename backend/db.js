import * as FM from "./fm.js";

const dbPath = "./backend/db.json";

const initialContent = {
  persons: [
    {
      name: "b",
      deployAmount: 0
    },
    {
      name: "h",
      deployAmount: 0
    },
    {
      name: "r",
      deployAmount: 0
    }
  ],
  chosenPersonName: "",
  lastUpdate: "27.10.23"
};

export async function initializeDb() {
  const dbExists = await FM.exists(dbPath);
  if (!dbExists) {
    const success = await setDb(initialContent);
    return success;
  }
  return true;
}

export async function getPersons() {
  const db = await getDb();
  return db.persons;
}

export async function setPersons(persons) {
  const db = await getDb();
  db.persons = persons;
  const success = await setDb(db);
  return success;
}

export async function getLastUpdate() {
  const db = await getDb();
  return db.lastUpdate;
}

export async function setLastUpdate(lastUpdate) {
  const db = await getDb();
  db.lastUpdate = lastUpdate;
  const success = await setDb(db);
  return success;
}

export async function getChosenPersonNameName() {
  const db = await getDb();
  return db.chosenPersonName;
}

export async function setChosenPersonName(chosenPersonName) {
  const db = await getDb();
  db.chosenPersonName = chosenPersonName;
  const success = await setDb(db);
  return success;
}

export async function getChoosingPool() {
  const db = await getDb();
  return db.choosingPool;
}

export async function setChoosingPool(choosingPool) {
  const db = await getDb();
  db.choosingPool = choosingPool;
  const success = await setDb(db);
  return success;
}

async function getDb() {
  const dbRawFile = await FM.read(dbPath);
  const db = await JSON.parse(dbRawFile);
  return db;
}

async function setDb(db) {
  const success = await FM.write(dbPath, JSON.stringify(db, null, "\t"));
  return success;
}
