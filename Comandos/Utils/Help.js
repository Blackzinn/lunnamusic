const discord = require('discord.js');
module.exports.run = async (Tico, message, con, args, emoji, cores) => {

    con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {

        let Prefixo = rows[0].Prefixo;
        
        let embed = new discord.MessageEmbed()
        .setColor(cores.Azul)
        .setThumbnail(`https://cdn.discordapp.com/attachments/718600196677959790/728036372920664134/6385_christmaspartyparrot.gif`)
        .setAuthor('Ajuda Tico™ | Página (Inicial)')
        .setDescription(`${emoji.Discord} **Saudações humano ${message.author}, sou o *Tico*.** \n**Meu prefixo nesse servidor:** \`${Prefixo}\``)
        .addField('**Links Utilitários**', `${emoji.Tocando2} [**Clique aqui**](https://discord.gg/JbAPBzp)\n ${emoji.Tocando2} [**Vote em mim**](https://embreve) \n${emoji.Tocando2} [**Me Convida**](https://embreve)`)
        .addField('**Lista**', `${emoji.Numero1} DJ \n${emoji.Numero2} Música \n${emoji.Numero3} Útilidades`, true)
        .addField('**Info**', `*Usuários:* \`${Tico.users.cache.size}\` \n *Servidores:* \`${Tico.guilds.cache.size}\``, true)
        .setTimestamp()
        message.channel.send(embed).then(async msg => {
            await msg.react(emoji.VoltarID)
            await msg.react(emoji.Numero1ID)
            await msg.react(emoji.Numero2ID)
            await msg.react(emoji.Numero3ID)
            const Collector = msg.createReactionCollector((r, u) => (r.emoji.id == emoji.Numero1ID, emoji.Numero2ID, emoji.Numero3ID, emoji.VoltarID && u.id === message.author.id))
            Collector.on("collect", async r => {
                r.users.remove(message.author)
                switch (r.emoji.id) {
                    case emoji.Numero1ID:
                        let config = new discord.MessageEmbed()
                        .setColor(cores.Azul)
                        .setAuthor('Ajuda Tico™ | Página (DJ)', `https://cdn.discordapp.com/emojis/726212442472054908.png?v=1`)
                        .setDescription(`*Estes é meu painel para configurar sua permissões de __DJ__* \n \⚒️ **Comando principal \`${Prefixo}dj\`**`)
                        .addField(`${Prefixo}dj tag @tag/id`, '\`Configurar tag de DJ\`')
                        .addField(`${Prefixo}dj maxqueue {quantia}`, '\`Editar para quem não tem a tag DJ, colocar certa quantia de música na lista de pedido.\`')
                        .addField(`${Prefixo}dj add @usuário/id`, '\`Adicionar a tag DJ em uma pessoa.\`')
                        .addField(`${Prefixo}dj remove @usuário/id`, '\`Remover a tag DJ em uma pessoa.\`')
                        .setFooter(`Comando solicitado por: ${message.author.username}`, message.author.avatarURL())
                        msg.edit(config)
                    break;
                    case emoji.Numero2ID:
                        let msc = new discord.MessageEmbed()
                        .setColor(cores.Azul)
                        .setAuthor('Ajuda Tico™ | Página (Música)', `https://cdn.discordapp.com/emojis/726212442648084511.png?v=1`)
                        .addField(`${Prefixo}play [Nome/URL]`, '\`Tocar música.\`')
                        .addField(`${Prefixo}stop`, '\`Parar música.\`')
                        .addField(`${Prefixo}pause`, '\`Pausar música.\`')
                        .addField(`${Prefixo}resume`, '\`Despausar a música.\`')
                        .addField(`${Prefixo}skip`, '\`Pular música.\`')
                        .addField(`${Prefixo}queue`, '\`Lista de música.\`')
                        .addField(`${Prefixo}volume [0/100]`, '\`Alterar volume.\`')
                        .addField(`${Prefixo}loop`, '\`Repetir música.\`')
                        .setFooter(`Comando solicitado por: ${message.author.username}`, message.author.avatarURL())
                        msg.edit(msc)
                    break;
                    case emoji.Numero3ID:
                        let utils = new discord.MessageEmbed()
                        .setColor(cores.Azul)
                        .setAuthor('Ajuda Tico™ | Página (Útilidades)', `https://cdn.discordapp.com/emojis/726212442723450941.png?v=1`)
                        .addField(`${Prefixo}avatar [Usuário]`, '\`Veja o avatar de alguma pessoa.\`')
                        .addField(`${Prefixo}help`, '\`Painel de comandos.\`')
                        .setFooter(`Comando solicitado por: ${message.author.username}`, message.author.avatarURL())
                        msg.edit(utils)
                    break;
                    case emoji.VoltarID:
                        msg.edit(embed)
                    break;
                }
            })
        })
    })
}
module.exports.help = {
    name: 'help',
    aliases: ['ajuda']
};