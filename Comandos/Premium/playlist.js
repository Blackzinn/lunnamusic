const discord = require('discord.js')
const ytapi = require('simple-youtube-api'); 
const { handlerplaylist } = require('../../Config/Handler/HandlerPlayList.js');
const youtube = new ytapi('AIzaSyB4cwqooP4aqAIjPQGz1JIFhZPIWB0r07c'); 
module.exports.run = async (Tico, message, con, args, emoji, cores) => {





    switch (args[0]) {
        case 'lista':
            function count(_números) {
                _números = _números.toString();
                var texto = ``, números = { 1: ':1_:726212442472054908', 2: ':2_:726212442648084511', 3: ':3_:726212442723450941', 4: ':4_:726212442727907398', 5: ':5_:726212442509803582', 6: ':6_:726212442811531344', 7: ':7_:726212442467860531', 8: ':8_:726212443264516246', 9: ':9_:726212443235156088', 0: ':0_:726212442920845403' };
            
                for(let i =0; i < _números.length; i++) texto += '<' + números[parseInt(_números[i])] + '>';
            
                return texto;
            }
        
            let embedinicio = new discord.MessageEmbed()
            .setColor(cores.Azul)
            .setAuthor(`Tico™ | Playlists`)
            .setDescription(`Todas suas playlists foram salvas **aqui**.`)
        
        
            let top10query = `SELECT * FROM playlists WHERE IDUsuário = '${message.author.id}' ORDER BY ID LIMIT 5`
        
            let query = querytxt => {
                return new Promise((resolve, reject) => {
                  con.query(querytxt, (err, results, fields) => {
                    if (err) reject(err);
                    resolve([results, fields]);
                  });
                });
              };
              
              let [results, fields] = await query(top10query);
        
            results.map(results => {
                
            embedinicio.addField(`${count(results.ID)} - **Nome: ${results.Nome}**`, `Volume: *${results.Volume}*`)
        
            for (var i = 0; i < results.ID; i++) {
                console.log(i)
            }
        
        });
        
            message.channel.send(embedinicio)       
        break;
        case "criar":



        let nome = ['']
        let volume = ['']






        let embedcriar = new discord.MessageEmbed()
        .setColor(cores.Azul)
        .setAuthor('Tico™ | Playlist (Criar)')
        .setDescription(`Aqui você pode criar uma playlist de sua preferência, para tocar a qualquer momento. \n\n**Lembrando** você pode criar no máximo 3 playlists \n\n ${emoji.Sucesso} - Criar playlist`)
        .setTimestamp()
        message.channel.send(embedcriar).then(async msg => {
            await msg.react(emoji.SucessoID)
            const Collector = msg.createReactionCollector((r, u) => (r.emoji.id == emoji.SucessoID && u.id === message.author.id))
            Collector.on("collect", async r => {
                r.users.remove(message.author)
                switch (r.emoji.id) {
                    case emoji.SucessoID:

                    let embecriar1 = new discord.MessageEmbed()
                    .setColor(cores.Azul)
                    .setDescription('Qual o nome da playlist?')
                    .setTimestamp()
                    msg.edit(embecriar1).then(async msg => {
                        await msg.reactions.removeAll();

                        let collectormensagem = new discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1 });
                        collectormensagem.on('collect', message => {
                            message.delete();
                
                
                            let mensagem = message.content;

                            nome = `${mensagem}`


                            let embedmusic = new discord.MessageEmbed()
                            .setColor(cores.Azul)
                            .setDescription(`${emoji.Adicionado} Adicionar música \n${emoji.Finalizar} Finalizar`)
                            .setTimestamp()
                            msg.edit(embedmusic).then(async msg => {
                                await msg.react(emoji.AdicionadoID)
                                await msg.react(emoji.FinalizarID)
                                const Collector = msg.createReactionCollector((r, u) => (r.emoji.id == emoji.AdicionadoID, emoji.FinalizarID && u.id === message.author.id))
                                Collector.on("collect", async r => {
                                    r.users.remove(message.author)
                                    switch (r.emoji.id) {
                                        case emoji.AdicionadoID:

                                            let embecriar2 = new discord.MessageEmbed()
                                            .setColor(cores.Azul)
                                            .setDescription('Informe o URL/Nome da música')
                                            .setTimestamp()
                                            msg.edit(embecriar2).then(async msg => {
                                                await msg.reactions.removeAll();
                        
                                                let collectormensagem = new discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1 });
                                                collectormensagem.on('collect', async message => {
                                                    message.delete();
                                              
                                                    const url = message.content ? message.content.replace(/<(.+)>/g, '$1') : '';
                                                    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                                                    const playlist = await youtube.getPlaylist(url);
                                                    const videos = await playlist.getVideos();
                                                    for (const video of Object.values(videos)) {
                                                        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                                                        await handleVideo(video2, message, true); // eslint-disable-line no-await-in-loop
                                                    }
                                                    } else {
                                                    let video;
                                                    try {
                                                        video = await youtube.getVideo(url);
                                                    } catch (error) {
                                                        const videos = await youtube.searchVideos(args.join(' '), 1);
                                                        if (!videos.length) return console.log('Nenhum video')
                                                        video = await youtube.getVideoByID(videos[0].id);   
                                                    }
                                                    msg.edit(embedmusic).then(async msg => {
                                                        await msg.react(emoji.AdicionadoID)
                                                        await msg.react(emoji.FinalizarID)
                                                    })
                                                    return handlerplaylist(video, message)
                                                    }
                                        })
                                    })
                                        
                                        break;
                                        case emoji.FinalizarID:
                                        con.query(`SELECT * FROM playlists WHERE IDUsuário = '${message.author.id}'`, (err, rows) => {
                                            if (rows.length < 1) {
                                            var sql;
                                            sql = `INSERT INTO playlists (IDUsuário, Nome, Songs, Volume) VALUES ('${message.author.id}', ${nome}, '${message.client.playlistsusers.get(message.author.id).songs}', '100')`
                                            con.query(sql)
                                            }
                                        })
                                        break;
                                    }
                                })
                            })
                        })
                    })
                    break;
                }
            })
        })
        break;
    }

}
module.exports.help = {
    name: 'playlist',
    aliases: [false]
};