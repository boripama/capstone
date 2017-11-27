const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const readFile = Promise.promisify(fs.readFile);
const { formatGpxForDatabase } = require('../../server/utils');
const { Activity } = require('../../server/db/models');

const seedGpxDir = (dirPath, userId) => {
  return new Promise((res, rej) => {
    try {
      fs.readdir(dirPath, async (err, files) => {
        if (err) console.error(err);

        const titles = files.map(file => file.slice(0, files[0].length - 4));
        const filesMap = await Promise.map(files, f => readFile(path.join(dirPath, f)));
        console.log(`${dirPath} ${filesMap.length} files read successfully`);

        const newActivitiesInfo = await Promise.map(filesMap, (buffer, i) => {
          return formatGpxForDatabase(buffer, titles[i]);
        });
        console.log(`${dirPath} ${newActivitiesInfo.length} files formatted for database`);

        const newActs = await Promise.map(newActivitiesInfo, act => {
          return Activity.create(act);
        });
        console.log(`${dirPath} ${newActs.length} activities created`);

        const assigned = await Promise.each(newActs, act => act.setUser(userId));
        console.log(`${dirPath} ${assigned.length} activities assigned to user ${userId}`);

        res(`${dirPath} done`);
      });
    }
    catch (err) { rej(err); }
  });
};

module.exports = seedGpxDir;
