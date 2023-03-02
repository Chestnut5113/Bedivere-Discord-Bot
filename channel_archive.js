const { SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel_archive')
		.setDescription('封存本頻道。封存後即無法查看，你可在頻道釘選中的訊息尋找本頻道ID，將來能使用/returnchannel恢復頻道。'),
	async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run

			const user = interaction.user
      const guild = interaction.guild;
      const categoryChannels = guild.channels.cache.filter(channel => channel.type === "category");
			
			if (interaction.channel.parentId !== '1017085389225340989' || interaction.channel.id == '1017086798981234820')
			{interaction.reply({ content: '👀 請勿濫用指令！你無法封存本頻道！', ephemeral: true})}
				
			else
				{await interaction.reply(`<@${user.id}> :information_source:**頻道即將封存**:information_source:`);
			
				 
      setTimeout(function(){interaction.channel.setParent('1057566237116350498')},1000 * 7)}

		
		}
};