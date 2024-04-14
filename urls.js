const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

const fileName = process.argv[2];

if(process.argv.length < 3) {
    console.error("Please provide the file name!");
    process.exit(1);
}

fs.readFile(fileName, "utf8", async function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const lines = data.split("\n")
    console.log(lines)
    
    for(let i = 0; i < lines.length; i++){
        const line = lines[i].trim();
        
        if(line){
            try{
                const urlObj = new URL(line);
                const res = await axios.get(urlObj.toString());
                const html = res.data
                const domainName = urlObj.hostname; 
                const newFileName = `${domainName}.txt`;
        
                fs.writeFile(newFileName, html, "utf8", function(err){
                    if (err){
                        console.error(err);
                        process.exit(1);
                    }
                    console.log('Writing Success!')
                  })
            } catch(e){
                console.error(`Error processessing line ${i+1}: ${e.message}`)
            }
        }
    }
  });
