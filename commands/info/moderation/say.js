module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Says your input via the bot",
    useage: "<input>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Are you still there?").then (m => m.delete(6000));

        const roleColor = message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setImage('') //<-- A picture will appear under the message
                .setFooter('Thank you for supporting A-Bday-Bot!'); 
            
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
        
    }
    
};