const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel_name')
		.setDescription('更改討論頻道的名稱')
		.addStringOption (option => option.setName('name')
			   .setDescription('要改成的名稱')
			   .setRequired(true)),
	
	async execute(interaction) {
		const user = interaction.user
		const title =  interaction.options.getString('name')
		if (interaction.channel.parentId !== '1017085389225340989' || interaction.channel.id == '1017086798981234820')
			{interaction.reply({ content: '請在討論頻道使用指令！', ephemeral: true})}
				
			else
				
		{await interaction.channel.setName(`${title}`)
				await interaction.reply(`<@${user.id}> 已更改名稱為 **${title}**！`)}
	
	}
	
		};