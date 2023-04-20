// Imports the Google Cloud client library
//use cmd
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\admin\Documents\digital-strata-382312-da9b9c43e479-google-key.json

//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\wyp60\Downloads\digital-strata-382312-da9b9c43e479-google-key.json
//npm run test

const speech = require('@google-cloud/speech');
const fs = require('fs');


// Creates a client
const client = new speech.SpeechClient();
async function transcribeSpeech(gcsUri) {
	try {
		//gs://example-audio-green/PTT-20230331-WA0003.opus
		/**
		 * TODO(developer): Uncomment the following lines before running the sample.
		 */

		const encoding = 'WEBM_OPUS';
		const sampleRateHertz = 16000;
		const languageCode = 'zh-HK';

		const config = {
		  encoding: encoding,
		  sampleRateHertz: sampleRateHertz,
		  languageCode: languageCode,
		};

		const audio = {
		  uri: gcsUri,
		};

		const request = {
		  config: config,
		  audio: audio,
		};

		// Detects speech in the audio file. This creates a recognition job that you
		// can wait for now, or get its result later.
		const [operation] = await client.longRunningRecognize(request);
		// Get a Promise representation of the final result of the job
		const [response] = await operation.promise();
		const transcription = response.results
		  .map(result => result.alternatives[0].transcript)
		  .join('\n');
		//console.log(`Transcription: ${transcription}`);
		return `${transcription}`;
	}
	catch(error){
		return `\n${gcsUri} - ERROR: ${error}\n`;
	}
}

async function main() {
	try {
		const filenames = [
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0036.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0037.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0038.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0040.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0041.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230102-WA0042.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0017.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0018.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0019.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0020.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0021.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0022.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0023.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0024.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0028.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0029.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230103-WA0030.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0000.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0001.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0002.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0003.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0004.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0006.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0007.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0008.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0014.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230105-WA0015.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0003.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0006.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0007.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0009.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0011.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0012.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0013.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0014.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0015.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0016.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0017.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0018.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0019.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0021.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0022.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0023.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0024.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0025.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0026.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0027.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0028.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0029.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0030.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0031.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0032.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0033.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0034.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0035.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202301/PTT-20230106-WA0036.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230109-WA0000.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230109-WA0001.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230109-WA0002.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230112-WA0001.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230112-WA0002.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230112-WA0003.opus",
			"/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/202302/PTT-20230112-WA0004.opus",

		];
		//let promises = [];
		//for (const filename of filenames) {
		//	promises.push(transcribeSpeech(filename));
		//}
		const folder = new RegExp(`/c/Users/wyp60/Documents/audio-google/WhatsApp_Voice_Notes/.*/`)
		const results = await Promise.all(filenames.map(filename => {
			console.log(`processing filename ${filename}`)
			return transcribeSpeech("gs://example-audio-green/" + filename.replace(folder, ""))
		}));
		//console.log(results);
		const timeInMss = new Date().getTime();
		let raw_text = fs.readFileSync('./output-1682003649645', {encoding: 'utf8'});
		for(let i = 0; i < results.length ; ++i) {
			raw_text = raw_text.replace(`${filenames[i]}`, `${filenames[i]}\n ${results[i]}`);
		}
		fs.writeFileSync(`./output-${timeInMss}`, raw_text, {encoding: 'utf-8'});
		console.log(`main, Done, result length: ${results.length}`);
	}
	catch (err){
		console.log(`main error: `, err);
	}
	
}

main();


