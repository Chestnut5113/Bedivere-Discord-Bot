const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aboutme')
		.setDescription(`關於機器人的資訊`),
	async execute(interaction) {
		
		const aboutmeEmbed = new EmbedBuilder()
	.setColor([0, 183, 195])
	.setTitle('關於我！')
  .setThumbnail('https://cdn.discordapp.com/avatars/1051503430558027826/bada79198c303ac49985c56fe75e8804.webp?size=2048')
	.addFields(
		{ name: '一般', value: '貝德維爾 事務所 的多用途機器人🤖\n技術支援：Chestnut_5113#1838' },
		{ name: '選用討論頻道的好處：', value: '✅ 討論私隱、安全，不受干擾\n✅ 管理員專業、中立、持平 有助調解可能的紛爭\n✅ 可隨時新增成員加入討論\n✅ 討論結束後可刪除或封存頻道'},
		{ name: '開始使用', value: '常見問題：</help:1058397664233926676>\n馬上建立頻道！</channel_create:1058337927203147788>'},
	);

interaction.reply({ embeds: [aboutmeEmbed]});
     
			
		}
	};