const fs = require('fs');
const discord = require('discord.js');
const ABdayBot = new discord.Client();
const guildie = {
    "name":"",
    "id":"",
    "birthday":""
};
var date = new Date();
var anathema = JSON.parse(fs.readFileSync("./anathema.json", (err) =>{
    if (err) console.log("Failed to read file", err);
    return;
}));

function celebrate(bdayPerson){
    // Send message in channel with birthday wish and name mention.
    // Currently searching for a JS library that can handle timed functions.
}

ABdayBot.once('ready', () => {
    console.log("Let's party!");
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });

  ABdayBot.on('message', message => {
    var found = false;
    if (message.author.bot || message.channel.type === "dm") return;
    else if (message.content.startsWith("!bbbirthday")){
        const bday = message.content.slice(11).trim();
        guildie.name = message.member.displayName;
        guildie.id = message.author.id;
        guildie.birthday = bday;
        bdayPattern = /\d{1,2}\/\d{1,2}\/\d{0,4}/;
        if (!bdayPattern.exec(guildie.birthday)){
            message.channel.send("That is not a valid birthday");
            return;
        }

        for (var i = 0; i < anathema.length; i++){
            if (anathema[i].id === guildie.id){
                found = true;
                break;
            }
        }
        if (!found){
            anathema.push(guildie);
            message.channel.send("Birthday for " + message.member.displayName
            + " has been added successfully!");
        }
        else if (found){
            message.channel.send("There is already a birthday on file for "
            + message.member.displayName + ".\n"
            +"Please delete the old entry using the 'remove' command.");
        }
    }

    

    else if (message.content === "!bbremove"){
        guildie.name = message.member.displayName;
        guildie.id = message.author.id;
        for (var j = 0; j < anathema.length; j++){
            if (guildie.id === anathema[j].id){
                anathema.splice(j, 1);
                found = true;
                message.channel.send("Birthday for " + message.member.displayName
                + " has been removed.");
                break;
            }
        }
        if (!found){
            message.channel.send("There is no birthday on file for "
            + message.member.displayName);
        }
    }
    else if (message.content === "!bbhello"){
        message.reply("Hello!");
    }
    fs.writeFile("./anathema.json", JSON.stringify(anathema), (err) =>{
        if (err) console.log("Failed to write JSON file.");
        return;
    });
});

ABdayBot.on('error', err =>{
    console.warn(err);
});

ABdayBot.login(process.env.TOKEN);