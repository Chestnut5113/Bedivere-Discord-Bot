 const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel_addmember')
		.setDescription('在討論頻道新增成員。一次只能新增一位。')
		.addUserOption(option => option.setName('member').setDescription('新增的成員')
		.setRequired(true)),
	
	async execute(interaction) {
		const user = interaction.options.getUser('member');
		const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");
		if (interaction.channel.parentId !== '1017085389225340989' || interaction.channel.id == '1017086798981234820')
			{interaction.reply({ content: '請在討論頻道使用指令！', ephemeral: true})}
				
			else
				{await interaction.channel.permissionOverwrites.edit(
      user.id, { ViewChannel: true },
			user.id, { SendMessages: true });
				 
				await interaction.reply(`已新增成員！`);
				 
				await interaction.channel.send(`<@${user.id}> 你已被新增至頻道！`)}

		}
};
