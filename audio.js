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
		return `\nfilename - ${gcsUri} \n${transcription}`;
	}
	catch(error){
		return `\n${gcsUri} - error: ${error}\n`;
	}
}

async function main() {
	try {
		const filenames = [
		"gs://example-audio-green/20230401.174704122_file.opus",
		"gs://example-audio-green/20230401.174704238_file.opus",
		"gs://example-audio-green/20230401.174704354_file.opus",
		"gs://example-audio-green/20230401.174704501_file.opus",
		"gs://example-audio-green/20230401.174704623_file.opus",
		"gs://example-audio-green/20230401.174704724_file.opus",
		"gs://example-audio-green/20230401.174704855_file.opus"

		];
		//let promises = [];
		//for (const filename of filenames) {
		//	promises.push(transcribeSpeech(filename));
		//}
		const results = await Promise.all(filenames.map(filename => {
			console.log(`processing filename ${filename}`)
			return transcribeSpeech(filename)
		}));
		//console.log(results);
		const timeInMss = new Date().getTime();
		fs.writeFileSync(`./output-${timeInMss}`, results.join('\n'));
		console.log(`main, Done, result length: ${results.length}`);
	}
	catch (err){
		console.log(`main error: `, err);
	}
	
}

main();


