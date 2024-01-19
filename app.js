const express = require("express");
const app = express();
const port = 3000;


// import filesystem module
const fs = require('fs');


// Use static middleware
app.use(express.static('public'));

// define custom engine  "seahorses" 
app.engine("seahorses", (filePath, options, callback) => {
    //read file in the filepath
    fs.readFile(filePath, (err, content) => {
        //if there is an error, return the error through the callback function
        if (err) return callback(err);
        // Render content from 
        const rendered = content.toString().replaceAll("#title#", `${options.title}`).replace("#content#", `${options.content}`).replace(`#image-src#`, `${options.imgSrc}`);
        return callback(null, rendered);
    })
})

// define custom engine  "horses". If I have time I'll figure out how to reuse the logic from "seahorses"
app.engine("horses", (filePath, options, callback) => {
    //read file in the filepath
    fs.readFile(filePath, (err, content) => {
        //if there is an error, return the error through the callback function
        if (err) return callback(err);
        // Render content from 
        const rendered = content.toString().replaceAll("#title#", `${options.title}`).replace("#content#", `${options.content}`).replace(`#image-src#`,  `${options.imgSrc}`);
        return callback(null, rendered);
    })
})

//specify views directory
app.set('views', './views');

//set the view engine to 'dogs'
app.set('view engine', 'seahorses');


// Use custom middleware to log the status of the request
app.use(loadingData); 

app.get("/:anyhorse", (req, res) => {
    let options;
    
    if(req.params.anyhorse.toLowerCase() === "horse"){
        options = {
            title: "This is a horse",
            content: "A horse is a large, four-legged mammal known for its strength, speed, and domestication by humans. Horses are commonly used for various purposes, including riding, racing, work in agriculture, and as companions. They have a distinctive anatomy, including hooves, a mane, and a tail, and they belong to the family Equidae. Horses have played a significant role in human history and continue to be important in various cultures and activities worldwide.",
            imgSrc: "/horse.webp",
            

        }
      
    }
    else if(req.params.anyhorse.toLowerCase() === "seahorse"){
        options = {
           title: "This is a seahorse",
           content: "A seahorse is a small marine fish characterized by its unique appearance, with a horse-like head, a prehensile tail, and a vertical posture. Seahorses belong to the family Syngnathidae and are known for their distinctive features, such as a bony exoskeleton, lack of scales, and the ability of males to carry and give birth to offspring. They are typically found in shallow tropical and temperate waters, often clinging to seagrasses or coral reefs. Seahorses are notable for their intricate courtship behaviors and their fascinating, camouflaging abilities in aquatic environments.",
           imgSrc :  "/seahorse.jpg"
       
        }
     
    }   
    
    res.render("index", options);   
});
// I still need to work on this part. The post request to download the image does not work
app.post("/:anyhorse/download", (req, res) =>{
    if (req.params.anyhorse.toLowerCase() === "horse/download"){
     
        res.download('./horse.webp', 'horse.webp');
    }
})

function loadingData(req, res, next){
    console.log("Loading Data...");
    next();
}

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});