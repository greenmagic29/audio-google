const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
async function lsWithGrep() {
  try {
      const { stdout, stderr } = await exec(`find . -newermt '2023-04-17 20:47' ! -newermt '2023-04-18 20:48' -ls`);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  }catch (err) {
     console.error(err);
  };
};
//lsWithGrep();

async function main() {
  try {
    let raw_text = fs.readFileSync('./chat_old.txt', {encoding: 'utf8'});
    const keyword = new RegExp('.* <Media omitted>\n', 'g');
    
  } catch (error) {
    
  }
}