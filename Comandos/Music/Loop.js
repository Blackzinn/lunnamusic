const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {
 
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
                switch (queue.loop) {
                    case true:
                        queue.loop = false
                        let embedloopdesativado = new discord.MessageEmbed()
                        .setColor(cores.Vermelho)
                        .setDescription(`🔀 Loop desativado com sucesso.`)
                        .setFooter(`Pedido de: ${message.author.username}`)
                    return message.channel.send(embedloopdesativado).then(m => m.delete({timeout: 12000}))
                
                    case false:
                        queue.loop = true
                        let embedloopativado = new discord.MessageEmbed()
                        .setColor(cores.Verde)
                        .setDescription(`🔄 Loop ativado com sucesso.`)
                        .setFooter(`Pedido de: ${message.author.username}`)
                        return message.channel.send(embedloopativado).then(m => m.delete({timeout: 12000}))
                }
            } else {
                if (!message.member.roles.cache.has(tag.id)) {
                    let embedmaxqueue = new discord.MessageEmbed()
                    .setColor(cores.Vermelho)
                    .setDescription(`Você precisa obter a tag (${tag}) para Ativar/Desativar o Loop.`)
                    .setTimestamp()
                    return message.channel.send(embedmaxqueue).then(m => m.delete({timeout: 5000}))
                } else {
                    switch (queue.loop) {
                        case true:
                            queue.loop = false
                            let embedloopdesativado = new discord.MessageEmbed()
                            .setColor(cores.Vermelho)
                            .setDescription(`🔀 Loop desativado com sucesso.`)
                            .setFooter(`Pedido de: ${message.author.username}`)
                        return message.channel.send(embedloopdesativado).then(m => m.delete({timeout: 12000}))
                    
                        case false:
                            queue.loop = true
                            let embedloopativado = new discord.MessageEmbed()
                            .setColor(cores.Verde)
                            .setDescription(`🔄 Loop ativado com sucesso.`)
                            .setFooter(`Pedido de: ${message.author.username}`)
                            return message.channel.send(embedloopativado).then(m => m.delete({timeout: 12000}))
                    }
                }
            }
        } else {
            switch (queue.loop) {
                case true:
                    queue.loop = false
                    let embedloopdesativado = new discord.MessageEmbed()
                    .setColor(cores.Vermelho)
                    .setDescription(`🔀 Loop desativado com sucesso.`)
                    .setFooter(`Pedido de: ${message.author.username}`)
                return message.channel.send(embedloopdesativado).then(m => m.delete({timeout: 12000}))
            
                case false:
                    queue.loop = true
                    let embedloopativado = new discord.MessageEmbed()
                    .setColor(cores.Verde)
                    .setDescription(`🔄 Loop ativado com sucesso.`)
                    .setFooter(`Pedido de: ${message.author.username}`)
                    return message.channel.send(embedloopativado).then(m => m.delete({timeout: 12000}))
            }
        }
    })
}
module.exports.help = {
    name: 'loop',
    aliases: [`repetir`]
};