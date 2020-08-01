const discord = require('discord.js');
module.exports = {
    message: (Tico, con, emoji, cores, checkchannel) => {
        Tico.on('message', async message => {
        if (message.author.Tico) return;
        if (message.channel.type === "dm") return;


        con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {
            if (rows.length < 1) return;
            let prefix = rows[0].Prefixo;
            let args = message.content.slice(prefix.length).trim().split(' ');
            let cmd = args.shift().toLowerCase();
            let command;

            if (!message.content.startsWith(prefix)) return;

                if(!message.member.guild.me.hasPermission(['MANAGE_CHANNELS', 'ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'MANAGE_ROLES', 'USE_EXTERNAL_EMOJIS'])) {
                    return message.author.send(`Opps, preciso de algumas permissões para funcionar em seu servidor.
**Permissão**
                    
- MANAGE_CHANNELS
- ADD_REACTIONS
- VIEW_CHANNEL
- SEND_MESSAGES
- MANAGE_MESSAGES
- EMBED_LINKS
- CONNECT
- SPEAK
- MANAGE_ROLES
- USE_EXTERNAL_EMOJIS`).then(msg => msg.delete({timeout: 15000})).catch(error => message.channel.send(`Opps, preciso de algumas permissões para funcionar em seu servidor.
**Permissão**
                    
- MANAGE_CHANNELS
- ADD_REACTIONS
- VIEW_CHANNEL
- SEND_MESSAGES
- MANAGE_MESSAGES
- EMBED_LINKS
- CONNECT
- SPEAK
- MANAGE_ROLES
- USE_EXTERNAL_EMOJIS`)).then(msg => msg.delete({timeout: 15000}))
                }

                message.delete();

            con.query(`SELECT * FROM config WHERE ID = 1`, (err, rows) => {
                if (err) return console.log('\x1b[39m[Logs DB]"\x1b[31m Error: \x1b[33m Não achei a tabela (Config) [Tico.db.Config]', "\x1b[37m")
                if (rows.length < 1) return;
    
                let Manutenção = rows[0].Manutenção
                let ManutençãoTexto = rows[0].ManutençãoTexto;


                if (Manutenção == 1) {
                    con.query(`SELECT * FROM staff WHERE IDUsuário = '${message.author.id}'`, (err, rows) => {
                        if(err) return console.log('\x1b[39m[Logs DB]"\x1b[31m Error: \x1b[33m Não achei a tabela (Staff) [Tico.db.Staff]', "\x1b[37m")

                        let embed = new discord.MessageEmbed()
                        .setColor(cores.Amarelo)
                        .setAuthor('Tico™ - Manutenção')
                        .setDescription(`${emoji.Manutenção} Oh não, estou em modo manutenção.. \n\n ${emoji.Info} **Mensagem dos Dev's:** \n\`\`\`js\n${ManutençãoTexto}\`\`\` \n\n ${emoji.Info} - *Precisa de ajuda? Entre em meu suporte* [**Clique aqui**](https://discord.gg/JbAPBzp)`)
                        if (rows.length < 1) return message.channel.send(embed).then(m => m.delete({timeout: 15000}))                        
                        if (Tico.commands.has(cmd)) {
                            command = Tico.commands.get(cmd);
                            command.run(Tico, message, con, args, emoji, cores, checkchannel);
                        } else if (Tico.aliases.has(cmd)) {
                            command = Tico.commands.get(Tico.aliases.get(cmd));
                            command.run(Tico, message, con, args, emoji, cores, checkchannel);
                        }
                        })
                    } else {
                        if (Tico.commands.has(cmd)) {
                            command = Tico.commands.get(cmd);
                            command.run(Tico, message, con, args, emoji, cores, checkchannel);
                        } else if (Tico.aliases.has(cmd)) {
                            command = Tico.commands.get(Tico.aliases.get(cmd));
                            command.run(Tico, message, con, args, emoji, cores, checkchannel);
                        }
                    }
                })
            })
        })
    }
}