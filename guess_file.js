const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const dayjs = require('dayjs')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

async function lsWithGrep(time) {
  try {
      //
      const searchTime = time.format('YYYY-MM-DD HH:mm');
      //console.log("🚀 ~ file: guess_file.js:12 ~ lsWithGrep ~ searchTime:", searchTime)
      const searchTimePlusOneMin = time.add(5, 'm').format('YYYY-MM-DD HH:mm');
      //console.log("🚀 ~ file: guess_file.js:14 ~ lsWithGrep ~ searchTimePlusOneMin:", searchTimePlusOneMin)
      
      const { stdout, stderr } = await exec(`find /c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes -newermt '${searchTime}' ! -newermt '${searchTimePlusOneMin}' -ls`);
      //console.log('stdout:', stdout);
      //console.log('stderr:', stderr);
      let saveFilePathString = "";
      if(stdout === "") {
        return ""
      }
      const keyword = new RegExp('.* (/c/Users.*)\n', 'gi');
      const mm = stdout.matchAll(keyword);
      for (const match of mm) {
        saveFilePathString += match[1];
        saveFilePathString += "\n";
        //console.log(match[1]);
        //console.log(match.index)
      }
      return saveFilePathString;
      //fs.writeFileSync(`./saveFilePath-${timeInMss}.txt`, saveFilePathString, {encoding: 'utf-8'});
  }catch (err) {
     console.error(err);
  };
};
//lsWithGrep();

async function main() {
  try {
    let raw_text = fs.readFileSync('./chat_old.txt', {encoding: 'utf8'});
    const keyword = new RegExp('(.*) - .* <Media omitted>\n', 'gi');
    const mm = raw_text.matchAll(keyword);
    const changedDates = [];
    const timeInMss = new Date().getTime();
    //console.log("🚀 ~ file: guess_file.js:20 ~ main ~ mm:", mm)
    for (const match of mm) {
      //19/11/2022 14:34 
      if (changedDates.includes(match[1].trim())) {
        continue;
      }
      const dateObj = dayjs(match[1].trim(), 'D/M/YYYY HH:mm');
      
      //.format('YYYY-MM-DD HH:mm');
      const guessFiles = await lsWithGrep(dateObj);
      //console.log(`${match[1]}:${result}`);
      //console.log(match.index)
      //fill it to the right space
      const oneRegex = new RegExp(`${match[1]} - .* <Media omitted>\n`, 'gi');
      raw_text = raw_text.replace(oneRegex, '$&'+guessFiles)
      changedDates.push(match[1].trim());
    }

    
    fs.writeFileSync(`./guess-${timeInMss}.txt`, raw_text, {encoding: 'utf-8'});
  } catch (error) {
    console.log("🚀 ~ file: guess_file.js:57 ~ main ~ error:", error)
    
  }
}
main()