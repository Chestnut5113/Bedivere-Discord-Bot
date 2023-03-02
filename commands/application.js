const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { stripIndents } = require('common-tags');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('application')
		.setDescription('上載證明審核驗證，以獲得職業身份組')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('請選擇項目')
				.setRequired(true)
				.addChoices(
					{ name: '現靈師（繪師）[請上傳2張你的作品，抄襲必究]', value: '繪師' },
			))
		.addAttachmentOption(option =>
			option.setName('attachment1')
				.setDescription('上傳圖片')
				.setRequired(true))
		.addAttachmentOption(option =>
			option.setName('attachment2')
				.setDescription('上傳圖片')
				.setRequired(true)),

	async execute(interaction) {
		const file1 = interaction.options.getAttachment("attachment1")
		const file2 = interaction.options.getAttachment("attachment2")//前設
		const intv = interaction.guild.members.cache.get(interaction.user.id)
		const applyfor = interaction.options.get('role').value
		const vchannel = interaction.guild.channels.cache.get('1070218243362529380')

interaction.reply({ content: '你的資料已傳送！請等候驗證結果，會由我私訊給你。', ephemeral: true })
		
		const row = new ActionRowBuilder() //按鈕
			.addComponents(
				new ButtonBuilder()
					.setCustomId('art')
					.setLabel('接納（繪師）')
					.setStyle(ButtonStyle.Success),);

		const messagetext = stripIndents`
 <@${intv.id}> 應徵 **${applyfor}**
 請務必根據上述申請項目 揀選同一按鈕
 以下是他/她的證明：`
		const message = await vchannel.send({ content: `${messagetext}`, files: [`${file1.url}`, `${file2.url}`], components: [row] })

		

		const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });  //接收按鈕指令
		collector.on('collect', async i => {
			if (i.customId === 'art') {
				await intv.roles.add('1070644285411708928');
				await row.components[0].setDisabled(true)
				await message.edit({ content: `${messagetext}`, files: [`${file1.url}`, `${file2.url}`], components: [row] })
				await vchannel.send(`驗證已接納！我將會給予申請者身份組，並通知申請者結果。`);

        const intvmessage = stripIndents`
你的 ${applyfor} 驗證已被接納！
你可填寫下列表單：https://forms.gle/z4c9L6UykPxALYbc7
在 <#1049329280162738186> 放出帖文，招募委託！

提示：
在 <#1049329280162738186> 貼出接單偏好時
記得也要在第一條訊息中上傳一張你覺得最能展現自己風格的作品
以及打出你所提供的畫作產品！`
				
				intv.send({content: `${intvmessage}`});
			}
		});
	}
};
