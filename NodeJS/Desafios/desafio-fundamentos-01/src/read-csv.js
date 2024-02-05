import fs from 'node:fs';
import { parse } from 'csv-parse';

const __dirname = new URL('../', import.meta.url).pathname;


const processFile = async () => {
  let count = 0
  const parser = fs
    .createReadStream(`${__dirname}/tasks.csv`)
    .pipe(parse());
  for await (const record of parser) {
    count++
    if (count > 1) {
      const data = {
        title: String(record[0]),
        description: String(record[1])
      }
      await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(async (data) => console.log(await data.json())).catch((err) => console.log(err))
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

(async () => {
  await processFile();
})();