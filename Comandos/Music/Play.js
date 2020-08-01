const discord = require('discord.js')
const ytapi = require('simple-youtube-api'); 
const { handleVideo } = require('../../Config/Handler/HandlerMusic.js');
const youtube = new ytapi('AIzaSyB4cwqooP4aqAIjPQGz1JIFhZPIWB0r07c'); 
module.exports.run = async (Tico, message, con, args, emoji, cores) => {

    if (!args.length) {
      let embederroargs = new discord.MessageEmbed()
      .setColor(cores.Vermelho)
      .setDescription(`Por favor, insira o nome/url da música.`)
      .setTimestamp()
      return message.channel.send(embederroargs).then(async msg => msg.delete({timeout: 10000}))
  }

    const voiceChannel = message.member.voice.channel;
    const voiceChannelid = message.member.voice.channelID;

    if (!voiceChannel) {
      let embederrocanal = new discord.MessageEmbed()
      .setColor(cores.Vermelho)
      .setDescription(`Por favor, entre em algúm canal primeiro.`)
      .setTimestamp()
      return message.channel.send(embederrocanal).then(async msg => msg.delete({timeout: 10000}))
  }
    const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
    } else {
      let video;
      try {
        video = await youtube.getVideo(url);
      } catch (error) {
        const videos = await youtube.searchVideos(args.join(' '), 1);
        if (!videos.length) {
          let embederrosong = new discord.MessageEmbed()
          .setColor(cores.Vermelho)
          .setDescription(`Opps, parece que não encontrei nada no **Youtube**.`)
          .setTimestamp()
          return message.channel.send(embederrosong).then(async msg => msg.delete({timeout: 10000}))
        }
        video = await youtube.getVideoByID(videos[0].id);   
      }
      return handleVideo(video, message, voiceChannel, voiceChannelid)
    }
}
module.exports.help = {
    name: 'play',
    aliases: [false]
};