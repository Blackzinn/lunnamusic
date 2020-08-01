const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {
    let member = message.mentions.users.first() || Tico.users.cache.get(args[0]) || message.author;
    let avatar = `${member.displayAvatarURL({dynamic: true})}`;
    if (avatar.slice(-3) === "gif") avatar += "?size=2048";

        message.channel.send(`<@${message.author.id}>`).then(m => m.delete({timeout: 60000}))
        let embed = new discord.MessageEmbed()
        .setColor(cores.Azul)
        .addField(`${emoji.BobSpnja} Avatar de: @${member.tag}`, `Clique **[aqui](${avatar})** para baixar o avatar.`)
        .setImage(avatar)
        .setTimestamp();
        message.channel.send(embed).then(m => m.delete({timeout: 60000}))
}
module.exports.help = {
    name: 'avatar',
    aliases: ['av']
};