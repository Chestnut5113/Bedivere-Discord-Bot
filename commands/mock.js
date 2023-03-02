const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mock')
		.setDescription('等等，我不要模仿你！Σ(っ °Д °;)っ')
	.addStringOption (option => option.setName('content')
			   .setDescription('別別別')
			   .setRequired(true)),
	async execute(interaction) {
		const text  =  interaction.options.getString('content')
		return interaction.channel.send(`${text}`);
	},
};
