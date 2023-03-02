const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

const { translate } = require('bing-translate-api');


module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('翻譯[粵轉繁]')
	.setType(ApplicationCommandType.Message),
	      
    async execute(interaction) {
      const messagecontent = interaction.targetMessage.content
			
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('delete')
					.setLabel('刪除本訊息')
					.setStyle(ButtonStyle.Danger),);
				
         translate(`${messagecontent}`, 'yue', 'zh-Hant', true).then(async res => {
            console.log(res.translation);
            const message = await interaction.reply({content: `原訊息內容：${messagecontent}\n翻譯結果：${res.translation}`, components: [row] })
            const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button});
				
			collector.on('collect', i => {
	if(i.customId === 'delete'){
		setTimeout(function(){ interaction.deleteReply()}, 1000);
	}})
          })
      
		
				
    }}