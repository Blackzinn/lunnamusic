const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {
    if (!message.member.hasPermission(['ADMINISTRATOR'])) {
        let embederroperm = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não possuí permissão para mudar o prefixo.`)
        .setTimestamp()
        return message.channel.send(embederroperm).then(msg => msg.delete({timeout: 10000}))
    }

    let Prefix = args[0];

    con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
        if (err) throw err;
        let prefix = rows[0].Prefixo

        if (!Prefix) {
            let embed = new discord.MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Opps, informe um prefixo antes. (\`${prefix}prefixo [Novo Prefixo]\`)`)
            .setTimestamp()
           return message.channel.send(embed).then(msg => msg.delete({timeout: 10000}))
        }



        let sql;

        sql = `UPDATE servidores SET Prefixo = '${Prefix}' WHERE IDServidor = '${message.guild.id}'`
        con.query(sql)


        let embedsucess = new discord.MessageEmbed()
        .setColor(cores.Verde)
        .setDescription(`Prefixo mudado para \`${Prefix}\``)
        .setTimestamp()
        return message.channel.send(embedsucess).then(msg => msg.delete({timeout: 10000}))
    })
}
module.exports.help = {
    name: 'prefixo',
    aliases: [`prefix`]
};