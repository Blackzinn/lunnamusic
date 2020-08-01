const { MessageEmbed, Util, MessageManager } = require('discord.js');
const { emoji, con, cores } = require('../../index.js')
const ytdl = require('ytdl-core');
const handlerplaylist = async (video, message) => {
    
    const queue = message.client.playlistsusers; 

    let song = {
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

      if (!queue.has(message.author.id)) {
      const queueConstruct = { 
        songs: [],
        volume: 100,
      }; 

    queue.set(message.author.id, queueConstruct);
    queueConstruct.songs.push(song);

    let songdurm = String(song.durationm).padStart(2, '0'); // format the time
    let songdurh = String(song.durationh).padStart(2, '0'); // same ^
    let songdurs = String(song.durations).padStart(2, '0'); // same ^^

    const embed = new MessageEmbed()
    .setThumbnail(song.thumbnail)
    .setAuthor(`Tico™ | Playlist (Criar)`)
    .setDescription(`${emoji.Cd} Adicionado primeiro na lista: [${song.title}](${song.url})`)
    .addField('__Duração__',`${songdurh}:${songdurm}:${songdurs}`, true)
    .setColor(cores.Azul);
    return message.channel.send(embed).then(m => m.delete({timeout: 5000}));

    } else {

        queue.get(message.author.id).songs.push(song);
            let songdurm = String(song.durationm).padStart(2, '0'); // format the time
            let songdurh = String(song.durationh).padStart(2, '0'); // same ^
            let songdurs = String(song.durations).padStart(2, '0'); // same ^^

            
    
          const embed = new MessageEmbed()
          .setAuthor(`Tico™ | Playlist (Criar)`)
            .setDescription(`${emoji.Adicionado} Adicionado na lista: [${song.title}](${song.url})`)
            .addField('__Duração__',`${songdurh}:${songdurm}:${songdurs}`, true)
            .setColor(cores.Azul);
          return message.channel.send(embed).then(m => m.delete({timeout: 5000}));
        }
};
module.exports = {
    handlerplaylist: handlerplaylist
  }