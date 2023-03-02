const { SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel_return')
		.setDescription('恢復先前的討論頻道，請提供頻道ID（以<#ID>的方式輸入），及另一位成員的名稱。')
		.addChannelOption(option => option.setName('channelid')
					.setDescription('頻道的ID，請以<#ID>的方式輸入。')
					.setRequired(true))
		.addUserOption(option => option.setName('member')
					.setDescription('另一位成員')
					.setRequired(true)),
	async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run

			const member = interaction.options.getUser('member');
		  const channelid = interaction.options.getChannel('channelid');
      const user = interaction.user
		  const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");
		
		channelid.setParent('1017085389225340989')
		channelid.permissionOverwrites.set([
			{id: everyone.id, deny: [PermissionsBitField.Flags.ViewChannel],},
      {id: user.id, allow: [PermissionsBitField.Flags.ViewChannel],},
		  {id: member.id, allow: [PermissionsBitField.Flags.ViewChannel],},]);

		interaction.reply({ content: `頻道已恢復！ ${channelid}` , ephemeral: true})
	 await	channelid.send(`<@${user.id}>，<@${member.id}> 頻道已恢復！`)
		}
};