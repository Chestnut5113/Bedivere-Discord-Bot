const { SlashCommandBuilder, ChannelType, Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('加入語音')
		.addChannelOption((option) => option
			.setName('channel')
			.setDescription('加入的頻道')
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildVoice)),
	async execute(interaction) {
		
		const voiceChannel = interaction.options.getChannel('channel');
		  const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
	    guildId: interaction.guildId,
	    adapterCreator: interaction.guild.voiceAdapterCreator,
    })
		
		const audioPlayer = createAudioPlayer();
		connection.subscribe(audioPlayer);
    audioPlayer.play(createAudioResource(createReadStream('./audio/audio1.mp3')),
    { inlineVolume: true });
   
		audioPlayer.on(AudioPlayerStatus.Idle, () => { connection.destroy() })
	
		},
};