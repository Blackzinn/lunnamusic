const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {



    function count(_números) {
        _números = _números.toString();
        var texto = ``, números = { 1: ':1_:726212442472054908', 2: ':2_:726212442648084511', 3: ':3_:726212442723450941', 4: ':4_:726212442727907398', 5: ':5_:726212442509803582', 6: ':6_:726212442811531344', 7: ':7_:726212442467860531', 8: ':8_:726212443264516246', 9: ':9_:726212443235156088', 0: ':0_:726212442920845403' };
    
        for(let i =0; i < _números.length; i++) texto += '<' + números[parseInt(_números[i])] + '>';
    
        return texto;
    }

    let queue = message.client.playlists
    let serverqueue = queue.get(message.guild.id)
    if (!serverqueue){
        let embederroqueue = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Não estou em nenhum canal.`)
        .setTimestamp()
        return message.channel.send(embederroqueue).then(async msg => msg.delete({timeout: 10000}))
    }

    if (!serverqueue.songs[0]) {
        let embederro = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Não há músicas tocando agora.`)
        .setTimestamp()
        return message.channel.send(embederro).then(async msg => msg.delete({timeout: 10000}))
    }

    let embed = new discord.MessageEmbed()
    .setColor(cores.Azul)
    .setThumbnail(serverqueue.songs[0].thumbnail)
    .setAuthor(`Tico™ - Lista de música`, 'https://cdn.discordapp.com/emojis/715601588848164954.gif?v=1')


    if (serverqueue.loop == false) {
        embed.setDescription(`⏯️ [**${serverqueue.songs[0].title}**](${serverqueue.songs[0].url})`)
    } else {
        embed.setDescription(`🔄 [**${serverqueue.songs[0].title}**](${serverqueue.songs[0].url})`)
    }

    for (var i = 1; i < serverqueue.songs.length; i++) {
        if (i > 5) return;
        embed.addField(`${count(i)} - \`${serverqueue.songs[i].title}\``, `*Pedido por:* \`${serverqueue.songs[i].author}\``)
    }

    message.channel.send(embed).then(async msg => msg.delete({timeout: 25000}))
}
module.exports.help = {
    name: 'lista',
    aliases: [`queue`]
};