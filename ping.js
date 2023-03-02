const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('查看機器人的延遲率'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
interaction.editReply(`訊息的延遲率：${sent.createdTimestamp - interaction.createdTimestamp}ms`);

	},
};