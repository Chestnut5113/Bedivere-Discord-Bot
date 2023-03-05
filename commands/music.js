const { SlashCommandBuilder, GatewayIntentBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, ComponentType } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const  ytdl  = require('ytdl-core');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('加入語音')
		.addChannelOption((option) => option
			.setName('channel')
			.setDescription('加入的頻道')
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildVoice))
		.addStringOption(option => option.setName('link')
		    .setDescription('youtube連結')
			.setRequired(true)),
	async execute(interaction) {
		const link = interaction.options.get('link').value
		const voiceChannel = interaction.options.getChannel('channel');
 
        if (!link.includes('https://www.youtube.com/')){
			interaction.reply({ content: '我只能播放youtube內容！', ephemeral: true})
		}
		else if (link.includes('playlist')){
			interaction.reply({ content:'我不能播放影片清單！QAQ', ephemeral: true})
		}
  else{
		const stream = ytdl(link, {filter: 'audioonly'});

	    const connection = joinVoiceChannel({
         channelId: voiceChannel.id,
	     guildId: interaction.guildId,
	     adapterCreator: interaction.guild.voiceAdapterCreator,})
		
		const audioPlayer = createAudioPlayer();
		const resource = createAudioResource(stream);

		audioPlayer.play(resource);
		connection.subscribe(audioPlayer);

        const row = new ActionRowBuilder() //按鈕
			.addComponents(
				new ButtonBuilder()  //0
					.setCustomId('pause')
					.setLabel('⏸️暫停播放')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()  //1
					.setCustomId('resume')
					.setLabel('▶️恢復播放')
					.setStyle(ButtonStyle.Success)
					.setDisabled(true),
				new ButtonBuilder()  //2
					.setCustomId('disconnect')
					.setLabel('⏹️離開語音頻道')
					.setStyle(ButtonStyle.Danger),
			);

			
		const playing = new EmbedBuilder()
			.setColor([0, 183, 195])
			.setAuthor({ name: '正在播放！'})
			.setThumbnail('https://cdn.discordapp.com/avatars/1051503430558027826/bada79198c303ac49985c56fe75e8804.webp?size=2048')
			.addFields(
				{ name: '播放內容：', value: `${link}` },)
			.setTimestamp()
        interaction.reply({embeds: [playing], components: [row]})
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button });  //接收按鈕指令
		   collector.on('collect', async i => {
			   if (i.customId === 'pause') {
				audioPlayer.pause(resource);
				await row.components[0].setDisabled(true)
				await row.components[1].setDisabled(false)
				i.reply({ content:'歌曲已暫停播放！', ephemeral: true})
				await interaction.editReply({embeds: [playing], components: [row]})
			   }
			   if (i.customId === 'resume') {
				audioPlayer.unpause(resource);
				await row.components[0].setDisabled(false)
				await row.components[1].setDisabled(true)
				i.reply({ content:'歌曲已恢復播放！', ephemeral: true})
				await interaction.editReply({embeds: [playing], components: [row]})
			   }
			   if (i.customId === 'disconnect') {
				connection.destroy()
				await row.components[0].setDisabled(true)
				await row.components[1].setDisabled(true)
				await row.components[2].setDisabled(true)
				await i.reply({ content:'已退出語音頻道！', ephemeral: true})
				await interaction.editReply({embeds: [playing], components: [row]})
				
			   }
		   });

		}},
};