const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores, checkchannel) => {


    let queue = message.client.playlists.get(message.guild.id)

    if (!queue) {
        let erroqueue = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Não estou em nenhum canal.`)
        return message.channel.send(erroqueue).then(m => m.delete({timeout: 5000}))
    }


    let c = message.member.voice.channelID;
    let d = message.member.voice.channel;
    
    if (!c) {
        let embederro = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não esta no mesmo canal que estou tocando batidão.`)
        .setTimestamp()
        return message.channel.send(embederro).then(m => m.delete({timeout: 12000}))
    }


    if (message.client.playlists.get(message.guild.id).voiceChannelID != c) {
        let embederrovoice = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não esta no mesmo canal que estou tocando batidão.`)
        .setTimestamp()
        return message.channel.send(embederrovoice).then(m => m.delete({timeout: 12000}))
    }

    con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
        if (err) throw err;
        let TagDJ = rows[0].TagDJ;
        if (TagDJ != 'Nenhum') {
            let tag = message.guild.roles.cache.get(TagDJ)
            if (!tag) {
                return queue.connection.dispatcher.end('skip');
            } else {
                if (!message.member.roles.cache.has(tag.id)) {


                if (queue.skippers.includes(message.author.id)) {
                    let embederrovoto = new discord.MessageEmbed()
                    .setColor(cores.Vermelho)
                    .setDescription(`Você já votou para pular. \`${queue.skipvote}/${d.members.size - 1}\``)
                    .setTimestamp()
                    return message.channel.send(embederrovoto).then(m => m.delete({timeout: 12000}))
                }
                queue.skipvote++
                queue.skippers.push(message.author.id)
                let embedacc1 = new discord.MessageEmbed()
                .setColor(cores.Verde)
                .setDescription(`Votado para pular com sucesso. \`${queue.skipvote}/${d.members.size - 1}\``)
                .setTimestamp()
                message.channel.send(embedacc1).then(m => m.delete({timeout: 12000}))
                if (queue.skipvote == d.members.size - 1) return queue.connection.dispatcher.end('skip');
                } else return queue.connection.dispatcher.end('skip');
            }
        } else {
            return queue.connection.dispatcher.end('skip');
        }
    })
}
module.exports.help = {
    name: 'skip',
    aliases: [`pular`]
};