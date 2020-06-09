const Discord = require('discord.js');
const { Client } = require('discord.js');
const { Richembed } = require('discord.js');
const { config } = require('dotenv'); 


const client = new Client({
    disbleEveryone: true
});

config({
    path: __dirname + "/.env"
});

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

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`🏓 Pinging...`);

        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency ${Math.round(client.ping)}ms`);
    }

    if (cmd === "say") {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Are you still there?").then (m => m.delete(6000));
        
        const roleColor = message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "));
            
            message.channel.send(embed);
        }
    }
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });

client.login(process.env.TOKEN);