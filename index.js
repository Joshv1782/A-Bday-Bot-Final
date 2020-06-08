const Discord = require('discord.js');
const { config } = require('dotenv'); 
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

config({
    path: __dirname + "/.env"
});

// Custom Status on Bot info card
client.on('ready', () => {
    console.log(' I am now online, my name is ${client.user.uersname}');

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


client.on('message', message => {
    if (message.content === '!bb Ping'){
        message.channel.send('Pong');
    } else if (message.content === '!bb Hi') {
        message.channel.send('Hello!');
    }
});

client.on('message', async message => {
    const prefix = '!bb';

    if (message.author.bot) return;  // the "!" in these statements are equal to if not. if (!) = If not / is not true.
    if (!message.guild); // A guild is also known as a server in the Discord world.
    if (!message.content.startsWith(prefix)) return;

})

client.login(process.env.TOKEN);