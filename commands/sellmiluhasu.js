const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ComponentType, EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');


module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('拯救地球')
	.setType(ApplicationCommandType.Message),
	      
    async execute(interaction) {
		if (interaction.targetMessage.author.id !== '433588151966236683') return;
			else{
		interaction.reply({ content: '想拯救嗎？先賣掉梅爾！'});
			}},
};
