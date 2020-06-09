const Discord = require('discord.js');
const { Client } = require('discord.js');
const { Richembed } = require('discord.js');
const { Collection } = require('discord.js');
const { config } = require('dotenv'); 
const handler = require('d.js-command-handler');
const { readdirSync } = require("fs");


const client = new Client({
    disbleEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

// ["command"].forEach(handler => {
   // require(`./handler/${handler}`)(client);
// });

// Custom Status on Bot info card
client.on("ready", () => {
    console.log('Hi, ${client.user.username} is now Online');

    client.user.setPresence({
        status: "online",
        game: {
            name: "Wishing everyone a Happy Bday!",
            type: "WATCHING"
        }
    });
});

// User message name that sends a message to the bot
client.on('message', async message => {
    console.log(`${message.author.username} said: ${message.content}`);
});

client.on('message', async message => {
    const prefix = '!bb';

    if (message.author.bot) return;  // the "!" in these statements are equal to if not. if (!) = If not / is not true.
    if (!message.guild); // A guild is also known as a server in the Discord world.
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);

});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });

client.login(process.env.TOKEN);