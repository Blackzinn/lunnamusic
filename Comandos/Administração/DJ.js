const discord = require('discord.js')
module.exports.run = async (Tico, message, con, args, emoji, cores) => {
    if (!message.member.hasPermission(['ADMINISTRATOR'])) {
        let embederroperm = new discord.MessageEmbed()
        .setColor(cores.Vermelho)
        .setDescription(`Você não possuí permissão para mudar o prefixo.`)
        .setTimestamp()
        return message.channel.send(embederroperm).then(msg => msg.delete({timeout: 10000}))
    }

    if (args[0] == 'tag') {
        let tag = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!tag) {
            let embederro = new discord.MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Opps, parece que não encontrei essa **Tag**.`)
            .setTimestamp()
           return message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
        }


        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;

            sql = `UPDATE servidores SET TagDJ = '${tag.id}' WHERE IDServidor = '${message.guild.id}'`
            con.query(sql)


            let embedsucessotag = new discord.MessageEmbed()
            .setColor(cores.Verde)
            .setDescription(`A tag de **DJ** foi setada para ${tag}`)
            .setTimestamp()
            message.channel.send(embedsucessotag).then(m => m.delete({timeout: 10000}))

        })
    }

    if (args[0] == 'maxqueue') {
        let number = Number(args[1])

        if (!number) {
            let embederro = new discord.MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Por favor, infome uma quantia de música, que o usuário sem a tag de **DJ** pode colocar na lista de música.`)
            .setTimestamp()
            return message.channel.send(embederro).then(m => m.delete({timeout: 15000}))
        }

        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;

            sql = `UPDATE servidores SET MaxQueue = '${number}' WHERE IDServidor = '${message.guild.id}'`
            con.query(sql)


            let embedsucessoqueue = new discord.MessageEmbed()
            .setColor(cores.Verde)
            .setDescription(`Agora quem não tem a tag de **DJ** do servidor, não pode colocar mais de (${number}) música(s) na lista de pedido.`)
            .setTimestamp()
            message.channel.send(embedsucessoqueue).then(m => m.delete({timeout: 10000}))

        })
    }

    if (args[0] == 'add') {
        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!usuario) {
            let embederro = new discord.MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Opps, parece que não encontrei esse usuário.`)
            .setTimestamp()
            message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
        }

        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;

            let tag = message.guild.roles.cache.get(rows[0].TagDJ)

            if (!tag) {
                let embederro = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que não encontrei a tag de **DJ** desse servidor.`)
                .setTimestamp()
                return message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
            }


            if (usuario.roles.cache.has(tag.id)) {
                let embederro2 = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que essa pessoa já possuí a tag de **DJ**.`)
                .setTimestamp()
                return message.channel.send(embederro2).then(m => m.delete({timeout: 10000}))
            }



            usuario.roles.add(tag.id).catch(() => {
                let embederro = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que não tenho permissão de dar a tag de **DJ**`)
                .setTimestamp()
                return message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
            })
        })
    }

    if (args[0] == 'remove') {
        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[1])

        if (!usuario) {
            let embederro = new discord.MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Opps, parece que não encontrei esse usuário.`)
            .setTimestamp()
            message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
        }

        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;

            let tag = message.guild.roles.cache.get(rows[0].TagDJ)

            if (!tag) {
                let embederro = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que não encontrei a tag de **DJ** desse servidor.`)
                .setTimestamp()
                return message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
            }

            if (!usuario.roles.cache.has(tag.id)) {
                let embederro2 = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que essa pessoa não possuí a tag de **DJ**.`)
                .setTimestamp()
                return message.channel.send(embederro2).then(m => m.delete({timeout: 10000}))
            }

            usuario.roles.remove(tag.id).catch(() => {
                let embederro = new discord.MessageEmbed()
                .setColor(cores.Vermelho)
                .setDescription(`Opps, parece que não tenho permissão de remover a tag de **DJ**`)
                .setTimestamp()
                message.channel.send(embederro).then(m => m.delete({timeout: 10000}))
            })
        })
    }



    if (args[0] == null) {
        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;

            let Tag = ``


            let tag = message.guild.roles.cache.get(rows[0].TagDJ)

            if (!tag) {
                Tag = `@Tag`
            } else {
                Tag = `${tag}`
            }

            let embed = new discord.MessageEmbed()
            .setColor(cores.Azul)
            .setAuthor(`DJ Tico™ | Informações`, `https://cdn.discordapp.com/emojis/717742505990553631.gif?v=1`)
            .setDescription(`**Olá ${message.author} esse painel é para você configurar o sistema de DJ.** \n\n*O sistema de __DJ__ foi criado basicamente para aqueles usuários que possuí a tag de __DJ__, essa tag possuí algumas permissões especificas.*\n\n**__Permissões__** \n\n${emoji.Numero1} - Skip : \`Sem voto\` \n${emoji.Numero2} - Volume : \`Alterar volume do bot\` \n${emoji.Numero3} - Skipto : \`Pula para musica expecifica da play list\` \n${emoji.Numero4} - Rádio : \`Sistema de rádio\` \n\n**__Status__** \n\n${emoji.Info} Tag : ${Tag} \n${emoji.Sucesso} MaxQueue : *${rows[0].MaxQueue}*`)
            .setTimestamp()
            message.channel.send(embed)
        })
    }
}
module.exports.help = {
    name: 'dj',
    aliases: [`configdj`]
};  