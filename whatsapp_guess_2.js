const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const dayjs = require('dayjs')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

//get all date with media obmitted in the chate file

//for each date, find names containing that date and get the file paths

//replace the string once
//use string .replace("the date", `SEARCH_RESULT\nTHE_DATE`)

async function searchFilesPath(date) {
	const searchDate = dayjs(date, 'D/M/YYYY').format('YYYYMMDD');
	//cmd commmand: find /h/git/JUPAS -name 'PTT-20230102-WA* | sort -V'

	const { stdout, stderr } = await exec(`find /c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes -name 'PTT-${searchDate}-WA*' | sort -V`);
	
	return stdout;
}



async function main() {
try{
	let raw_text = fs.readFileSync('./chat_old.txt', {encoding: 'utf8'});
	const timeInMss = new Date().getTime();
	const getMediaReg = new RegExp(`(.*) .* - .* <Media omitted>\n`, 'gi');

	const mediaMatch = raw_text.matchAll(getMediaReg);
	let allFilePaths = "";
	const matchedDate = [];
	for(const match of mediaMatch){
		const date = match[1];
		if(matchedDate.includes(date)) {
			continue;
		}
		const filePaths = await searchFilesPath(date);
		if(filePaths !== "") {
			allFilePaths += filePaths;
			raw_text = raw_text.replace(date, `\n${date}\n${filePaths}\n${date}`);
		}
		matchedDate.push(date);
	}
	fs.writeFileSync(`./guess2-${timeInMss}.txt`, raw_text, {encoding: 'utf-8'});
	fs.writeFileSync(`./guess2_files-${timeInMss}.txt`, allFilePaths, {encoding: 'utf-8'});


	}
	catch(err){
	console.log(err)
	}
}
main();


//in audio2, get the allFilePaths to the array, loop and replace