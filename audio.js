// Imports the Google Cloud client library
//use cmd
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\admin\Documents\digital-strata-382312-da9b9c43e479-google-key.json
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
				"PTT-20230330-WA0003.opus",
				/*
				"PTT-20230330-WA0004.opus",
				"PTT-20230330-WA0007.opus",
				"PTT-20230330-WA0011.opus",
				"PTT-20230330-WA0020.opus",
				"PTT-20230330-WA0025.opus",
				"PTT-20230330-WA0026.opus",
				"PTT-20230330-WA0027.opus",
				"PTT-20230330-WA0028.opus",
				*/

		];
		//let promises = [];
		//for (const filename of filenames) {
		//	promises.push(transcribeSpeech(filename));
		//}
		const results = await Promise.all(filenames.map(filename => {
			console.log(`processing filename ${filename}`)
			return transcribeSpeech("gs://example-audio-green/" + filename)
		}));
		//console.log(results);
		const timeInMss = new Date().getTime();
		let raw_text = fs.readFileSync('./wtsapp_chat.txt', 'utf8');
		for(let i = 0; i < results.length ; ++i) {
			raw_text = raw_text.replace(`${filenames[i]} (附件檔案)`, `${filenames[i]} (附件檔案)\n ${results[i]}`);
		}
		fs.writeFileSync(`./output-${timeInMss}`, raw_text);
		console.log(`main, Done, result length: ${results.length}`);
	}
	catch (err){
		console.log(`main error: `, err);
	}
	
}

main();


