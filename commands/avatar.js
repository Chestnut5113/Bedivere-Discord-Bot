const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('取得你或所選擇成員的頭像')
		.addUserOption(option => option.setName('target').setDescription('所選擇成員的頭像')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`${user.username} 的頭像：${user.displayAvatarURL()}`);
		return interaction.reply(`你的頭像： ${interaction.user.displayAvatarURL()}`);
	},
};
