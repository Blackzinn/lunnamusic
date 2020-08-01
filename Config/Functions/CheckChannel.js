const discord = require('discord.js');

function checkchannel(message) {

    const { emoji, con, cores } = require('../../index.js')

    let c = message.member.voice.channelID;
    
    if (!c) {
        let embederro = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`${emoji.Erro} Você não esta em nenhum canal.`)
        .setTimestamp()
        message.channel.send(embederro).then(m => m.delete({timeout: 12000}))
    }


    if (message.client.playlists.get(message.guild.id).voiceChannelID != c.id) {
        let embederrovoice = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`${emoji.Erro} Você não esta no mesmo canal que estou tocando um bailão.`)
        .setTimestamp()
        message.channel.send(embederrovoice).then(m => m.delete({timeout: 12000}))
    }

    return;
    
}
module.exports = {
    checkchannel: checkchannel
  }