const { SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel_delete')
        .setDescription('刪除討論頻道。注意此動作無法復原！刪除前請三思！'),


    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run

			const user = interaction.user
      const guild = interaction.guild;
      const categoryChannels = guild.channels.cache.filter(channel => channel.type === "category");
			
			if (interaction.channel.parentId !== '1017085389225340989' || interaction.channel.id == '1017086798981234820')
			{interaction.reply({ content: '👀 請勿濫用指令！你無法刪除本頻道！', ephemeral: true})}
				
			else
				{interaction.reply(`<@${user.id}> **⚠️頻道即將刪除⚠️**`);
				setTimeout(function(){
        interaction.channel.delete()},1000 * 5)}

		}
}