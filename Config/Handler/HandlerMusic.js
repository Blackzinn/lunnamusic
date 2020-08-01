
const { MessageEmbed, Util, MessageManager } = require('discord.js');
const { emoji, con, cores } = require('../../index.js')
const ytdl = require('ytdl-core');
const { message } = require('../Global/Message.js');
let time;

function timeoutf(queue, i, guild) {
  switch (i) {
    case 1:

      let embedleave = new MessageEmbed()
      .setColor(cores.Vermelho)
      .setDescription(`Não há mais músicas no queue.`)
      queue.get(guild.id).textChannel.send(embedleave).then(m => m.delete({timeout: 5000}));


      queue.get(guild.id).end = true;
      time = setTimeout(() => {
          let embedleave = new MessageEmbed()
          .setColor(cores.Amarelo)
          .setDescription(`Nenhum música foi reproduzida nos últimos 3 minutos, voando do canal.`)
          queue.get(guild.id).textChannel.send(embedleave).then(m => m.delete({timeout: 5000}));
          queue.get(guild.id).voiceChannel.leave();
          queue.delete(guild.id); 
        }, 180000);
      break;
    case 0:
    clearInterval(time)
    queue.get(guild.id).end = false;
    break;
    }  
}

const handleVideo = async (video, message, voiceChannel, voiceChannelID, playlist = false) => {

  const queue = message.client.playlists; 

  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    thumbnail: video.thumbnails.default.url,
    author: message.author.username,
  };
  
  
  // create the object for each song 
  if (!queue.has(message.guild.id)) { // check if there isn't a queue for the guild already
    const queueConstruct = { // create the object with information we require
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      voiceChannelID: voiceChannelID,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false,
      end: false,
      skipvote: 0,
      skippers: []
  }; 

    queue.set(message.guild.id, queueConstruct); // set the object we just made
    queueConstruct.songs.push(song); // push the song object so we can use it later

    try {
      const connection = await voiceChannel.join(); // join the voice channel

      queueConstruct.connection = connection; // set the connection to be used globally

      play(message.guild, queueConstruct.songs[0]); // play the first song in the queue
      timeoutf(queue, 0, message.guild, queueConstruct.songs[0])
    } catch (error) { // any errors, HANDLED
      queue.delete(message.guild.id);
      const embed = new MessageEmbed()
        .setAuthor('Error')
        .setDescription(`An error has occured: ${error}`)
        .setColor(message.guild.me.roles.highest.color || 0x00AE86);
      return message.channel.send(embed);
    }
  } else {
    if (message.client.playlists.get(message.guild.id).voiceChannelID != voiceChannelID) {
      let embederrovoice = new MessageEmbed()
      .setColor(cores.Vermelho)
      .setDescription(`Você não esta no mesmo canal que estou tocando batidão.`)
      .setTimestamp()
      return message.channel.send(embederrovoice).then(m => m.delete({timeout: 12000}))
  }
  
    con.query(`SELECT * FROM servidores WHERE IDServidor = '${message.guild.id}'`, (err, rows) => {


      let TagDJ = rows[0].TagDJ

      if (TagDJ != 'Nenhum') {
        let tag = message.guild.roles.cache.get(TagDJ)

        if (!message.member.roles.cache.has(tag.id)) {
          if (queue.get(message.guild.id).songs.length >= rows[0].MaxQueue) {
            let embedmaxqueue = new MessageEmbed()
            .setColor(cores.Vermelho)
            .setDescription(`Para adicionar mais de (**${rows[0].MaxQueue}**) música(s) você precisa obter a tag: ${tag}.`)
            .setTimestamp()
            return message.channel.send(embedmaxqueue).then(m => m.delete({timeout: 12000}))
        }
        }
      }

    queue.get(message.guild.id).songs.push(song); // if the queue exists, it'll push the song object

    if (playlist) return; // if it's a playlist it wont do this so doesn't spam adding songs
    else {



      if (queue.get(message.guild.id).end == true) {
        play(message.guild, queue.get(message.guild.id).songs[0]);
        return timeoutf(queue, 0, message.guild)
      }


      let songdurm = String(song.durationm).padStart(2, '0'); // format the time
      let songdurh = String(song.durationh).padStart(2, '0'); // same ^
      let songdurs = String(song.durations).padStart(2, '0'); // same ^^

      let embed = new MessageEmbed()
        .setThumbnail(song.thumbnail)
        .setAuthor(`Pedido por: ${song.author}`)
        .setDescription(`\`Adicionado na lista:\` [**${song.title}**](${song.url})`)
        .setColor(cores.Amarelo);
      return message.channel.send(embed).then(m => m.delete({timeout: 15000}));
        }
    })
  }
  return;
};
  
function play(guild, song) {
  const queue = guild.client.playlists;
  const serverQueue = queue.get(guild.id);

    if (!song) {
      timeoutf(queue, 1, guild)
    return;
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url, {quality:'highestaudio',  highWaterMark: 1024 * 1024 * 10}))
      .on('error', (reason) => {
        console.log(reason)
        serverQueue.songs.length = 0;
        serverQueue.playing = false;
        queue.delete(guild.id); 
      })
      .on('finish', reason => {  // when the song ends
      if (!serverQueue.loop) { // if its not looped

        queue.get(guild.id).songs.shift(); // remove the first item from the queue, eg. first song

        serverQueue.skipvote = 0;
        serverQueue.skippers = [];

        setTimeout(() => { // wait 250ms before playing a song due to songs skipping

          return play(guild, serverQueue.songs[0]); // play the song

        }, 250); 

      } else { // if it is looped it doens't remove the first item
        setTimeout(() => {  // wait 250ms before playing a song due to songs skipping
          serverQueue.skipvote = 0;
          serverQueue.skippers = [];
          return play(guild, queue.get(guild.id).songs[0]); // play the song
        }, 250);		

      }
    });

  dispatcher.setVolume(serverQueue.volume / 100);

  //const songdurm = String(song.durationm).padStart(2, '0'); // format the time
  //const songdurh = String(song.durationh).padStart(2, '0'); // same ^
  //const songdurs = String(song.durations).padStart(2, '0'); // same ^^
  
  //const embed = new MessageEmbed() // create a message embed with all of the information
    //.setTitle(song.channel)
    //.setURL(song.channelurl)
    //.setThumbnail(song.thumbnail)
    //.setDescription(`${emoji.Tocando} Tocando agora: [${song.title}](${song.url})`)
    //.addField('__Duração__',`${songdurh}:${songdurm}:${songdurs}`, true)
    //.addField('__Pedido por__', song.author, true)
    //.addField('__Pedido por__', song.author)
    //.setColor(cores.Verde);
  if (!serverQueue.loop) {
    let embedtocando = new MessageEmbed()
    .setColor(cores.Azul)
    .setAuthor(`Tocando Agora`, `https://cdn.discordapp.com/attachments/721511960134287470/730908055104913438/335112740957978625_1.png`)
    .setDescription(`<a:Tocando3:730907943243087892> [*${song.title}*](${song.url})`)
    .setTimestamp()
    queue.get(guild.id).textChannel.send(embedtocando).then(m => m.delete({timeout: 25000}));
  }
  if (serverQueue.loop) {
    let embedtocandom = new MessageEmbed()
    .setColor(cores.Azul)
    .setAuthor(`Tocando Novamente`, `https://cdn.discordapp.com/attachments/721511960134287470/730908055104913438/335112740957978625_1.png`)
    .setDescription(`<a:Tocando3:730907943243087892> [*${song.title}*](${song.url})`)
    .setTimestamp()
    queue.get(guild.id).textChannel.send(embedtocandom).then(m => m.delete({timeout: 25000}));
  }
}

module.exports = {
  handleVideo: handleVideo
}