const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('展示伺服器的資訊'),
	async execute(interaction) {
		let guild = interaction.guild;

		guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
			const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
			return interaction.reply(`伺服器名稱：${interaction.guild.name}\n伺服器人數：${interaction.guild.memberCount}人\n在線人數：${totalOnline.size}`);
		});
		
		
	},
};