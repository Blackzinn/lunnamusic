const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {
    let vol = ``
    let queue = message.client.playlists.get(message.guild.id)

    if (!queue) {
        let erroqueue = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Não estou tocando nenhuma música.`)
        return message.channel.send(erroqueue).then(m => m.delete({timeout: 10000}))
    }

    let c = message.member.voice.channelID;
    
    if (!c) {
        let embederro = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não esta no mesmo canal que estou tocando batidão.`)
        .setTimestamp()
        return message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
    }


    if (message.client.playlists.get(message.guild.id).voiceChannelID != c) {
        let embederrovoice = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não esta no mesmo canal que estou tocando batidão.`)
        .setTimestamp()
        return message.channel.send(embederrovoice).then(m => m.delete({timeout: 10000}))
    }

    console.log(vol)



    con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
        if (err) throw err;

        let TagDJ = rows[0].TagDJ;
        if (TagDJ != 'Nenhum') {
            let tag = message.guild.roles.cache.get(TagDJ)
            if (!tag) {
                if (Number(args[0]) < 0 || Number(args[0]) > 100) {
                    let number = new discord.MessageEmbed()
                    .setColor(cores.Vermelho)
                    .setDescription(`${emoji.Erro} Por favor, informe um número de \`0 a 100\`.`)
                    .setTimestamp()
                    return message.channel.send(number).then(m => m.delete({timeout: 10000}))
                }
                if (Number(args[0]) < 50) {
                    vol = `🔉 Volume: **${Number(args[0])}%**`
                }
            
                if (Number(args[0]) > 50) {
                    vol = `🔊 Volume: **${Number(args[0])}%**`
                }
            
                if (Number(args[0]) == 0) {
                    vol = `🔈 **Sem volume.**`
                }
            
                if (Number(args[0]) == 50) {
                    vol = `🔊 Volume: **${Number(args[0])}%**`
                }
                
                message.guild.voice.connection.volume = Number(args[0]) / 100;
                queue.volume = Number(args[0]);
                queue.connection.dispatcher.setVolumeLogarithmic(Number(args[0]) / 100);
                let embedsucess1 = new discord.MessageEmbed()
                .setColor(cores.Verde)
                .setDescription(vol)
                .setTimestamp()
                return message.channel.send(embedsucess1).then(m => m.delete({timeout: 8000}))                
            } else {
            if (!message.member.roles.cache.has(tag.id)) {
                let embederro1 = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Você precisa obter a tag (${tag}) para alterar o volume.`)
                .setTimestamp()
                return message.channel.send(embederro1).then(m => m.delete({timeout: 10000}))
                } else {
                    if (Number(args[0]) < 0 || Number(args[0]) > 100) {
                        let number = new discord.MessageEmbed()
                        .setColor(cores.Vermelho)
                        .setDescription(`Por favor, informe um número de \`0 a 100\`.`)
                        .setTimestamp()
                        return message.channel.send(number).then(m => m.delete({timeout: 10000}))
                    }
                    if (Number(args[0]) < 50) {
                        vol = `🔉 Volume: **${Number(args[0])}%**`
                    }
                
                    if (Number(args[0]) > 50) {
                        vol = `🔊 Volume: **${Number(args[0])}%**`
                    }
                
                    if (Number(args[0]) == 0) {
                        vol = `🔈 **Sem volume.**`
                    }
                
                    if (Number(args[0]) == 50) {
                        vol = `🔊 Volume: **${Number(args[0])}%**`
                    }
                    message.guild.voice.connection.volume = Number(args[0]) / 100;
                    queue.volume = Number(args[0]);
                    queue.connection.dispatcher.setVolumeLogarithmic(Number(args[0]) / 100);
                    let embedsucess1 = new discord.MessageEmbed()
                    .setColor(cores.Verde)
                    .setDescription(vol)
                    .setTimestamp()
                    return message.channel.send(embedsucess1).then(m => m.delete({timeout: 8000}))                     
                }
            } // !tag
        } else {
            if (Number(args[0]) < 0 || Number(args[0]) > 100) {
                let number = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`${emoji.Erro} Por favor, informe um número de \`0 a 100\`.`)
                .setTimestamp()
                return message.channel.send(number).then(m => m.delete({timeout: 10000}))
            }
            if (Number(args[0]) < 50) {
                vol = `🔉 Volume: **${Number(args[0])}%**`
            }
        
            if (Number(args[0]) > 50) {
                vol = `🔊 Volume: **${Number(args[0])}%**`
            }
        
            if (Number(args[0]) == 0) {
                vol = `🔈 **Sem volume.**`
            }
        
            if (Number(args[0]) == 50) {
                vol = `🔊 Volume: **${Number(args[0])}%**`
            }
            
            message.guild.voice.connection.volume = Number(args[0]) / 100;
            queue.volume = Number(args[0]);
            queue.connection.dispatcher.setVolumeLogarithmic(Number(args[0]) / 100);
            let embedsucess1 = new discord.MessageEmbed()
            .setColor(cores.Verde)
            .setDescription(vol)
            .setTimestamp()
            return message.channel.send(embedsucess1).then(m => m.delete({timeout: 8000}))          
        }
    })
}
module.exports.help = {
    name: 'volume',
    aliases: [`vol`]
};