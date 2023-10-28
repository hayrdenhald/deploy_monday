import * as FM from "./fm.js";

const dbPath = "./db.json";

const initialContent = {
  persons: [
    {
      name: "b",
      deployAmount: 0,
    },
    {
      name: "h",
      deployAmount: 0,
    },
    {
      name: "r",
      deployAmount: 0,
    },
  ]
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

async function getDb() {
  const dbRawFile = await FM.read(dbPath);
  const db = await JSON.parse(dbRawFile);
  return db;
}

async function setDb(db) {
  const success = await FM.write(dbPath, JSON.stringify(db, null, "\t"));
  return success;
}
