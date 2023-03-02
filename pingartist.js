const { ContextMenuCommandBuilder, ApplicationCommandType, ChannelType, CategoryChannel, PermissionsBitField } = require('discord.js');

module.exports = {
	 data: new ContextMenuCommandBuilder()
	.setName('提及繪師')
	.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		const member = interaction.targetMessage.author
		const user = interaction.user
		
		if (interaction.channel.parentId !== '1026150756140716082')
			{interaction.reply({ content: '👀 請勿濫用指令！你無法在此提及繪師！', ephemeral: true})}
			
						
    else{
		     interaction.reply('🤔 正在召喚！')
			setTimeout(function(){
      interaction.channel.send(`<@&1070644285411708928> 快來救救這位客人吧`)},1000 * 2)
     
			
		}
	},
};