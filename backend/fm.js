import fs from 'fs/promises';

export async function read(path) {
  return await fs.readFile(path, { encoding: 'utf8' });
}

export async function write(path, content) {
  try {
    await fs.writeFile(path, content, { encoding: 'utf8' });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function append(path, content) {
  try {
    await fs.appendFile(path, content, { encoding: 'utf8' });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function exists(path) {
  try {
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}