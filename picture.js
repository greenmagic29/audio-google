const fs = require('fs');

async function main() {
    try {
       //saving the file to .md format
       //adding endline in md format
       let raw_text = fs.readFileSync('./output-1680666296412', {encoding: 'utf8'});
       raw_text = raw_text.replace(/[\r\n]/gm, "\\\n");

       //adding the images
       const images = [
        "IMG-20141214-WA0001.jpg",
       "IMG-20141214-WA0004.jpg",
       "IMG-20230330-WA0005.jpg",
       "IMG-20230330-WA0006.jpg",
       "IMG-20230330-WA0008.jpg",
       "IMG-20230330-WA0010.jpg",
       "IMG-20230330-WA0012.jpg",
       "IMG-20230330-WA0013.jpg",
       "IMG-20230330-WA0014.jpg",
       "IMG-20230330-WA0015.jpg",
       "IMG-20230330-WA0016.jpg",
       "IMG-20230330-WA0017.jpg",
       "IMG-20230330-WA0022.jpg",
       "IMG-20230330-WA0023.jpg",
       "IMG-20230330-WA0024.jpg",
    ];
    const timeInMss = new Date().getTime();
       for(let img of images) {
        raw_text = raw_text.replace(`${img} (附件檔案)\\\n`, `${img} (附件檔案)\\\n ![image info](./pictures/${img})\\\n`);
       }
       fs.writeFileSync(`./pictures-${timeInMss}.md`, raw_text, {encoding: 'utf-8'});
    } catch (error) {
        
    }
}

main()