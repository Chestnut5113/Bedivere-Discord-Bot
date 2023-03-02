const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, Events, ComponentType } = require('discord.js');

const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
	  .setDescription('各式教學，包括以影片介紹建立委託頻道的詳情'),
	  
	
	async execute(interaction) {
	const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('請選擇教學')
					.addOptions(
						{
							label: '建立頻道',
							description: '/channel_create',
							value: './video/create.mp4',
						},
						{
							label: '在討論串建立頻道',
							description: '開啓頻道',
							value: './video/messagetochannel.mp4',
						},
						{
							label: '更改頻道名稱',
							description: '/channel_name',
							value: './video/name.mp4',
						},
						{
							label: '新增成員',
							description: '/channel_ddmember',
							value: './video/addmember.mp4',
						},
						{
							label: '找不到要新增的成員的名稱',
							description: '/channel_addmember',
							value: './video/addmemberfaq.mp4',
						},
						{
							label: '封存頻道',
							description: '/channel_archive',
							value: './video/archive.mp4',
						},
						{
							label: '恢復頻道',
							description: '/channel_return',
							value: './video/return.mp4',
						},
						{
							label: '刪除頻道',
							description: '/channel_delete',
							value: './video/delete.mp4',
						},
					),
			);

  const channelcmd = stripIndents`
有關頻道建立：
/help：
選取指令說明，機器人會回覆所選的影片教學。

/channel_create：
建立頻道，請在member項輸入另一位成員的名稱。
注意你不可輸入你自己或機器人的名稱，否則將會被回退。
建立頻道後，機器人將會在你所在的頻道及新建立的頻道提及通知你和成員，你可以在釘選中找到說明。
如果有需要，你可以複製「本頻道ID」作之後恢復頻道用。

/channel_name：
更改頻道名稱，請在討論頻道中使用。
預設頻道的名字是「你-及-成員的討論頻道」。你可使用這個指令更改為其他名稱。

/channel_addmember：
新增另一位成員加入討論，請在討論頻道中使用。
由於discord只會顯示已在頻道裏的成員，你需要以 @名稱#id 輸入member項。

/channel_archive：
封存你的討論頻道，請在討論頻道中使用。
封存後不會被刪除，但你無法查看。

/channel_return：
恢復頻道，可在任何頻道使用。
你必須要輸入釘選訊息中的頻道ID來執行指令，否則請尋找騎士手動為你還原。

/channel_delete：
刪除頻道。請在討論頻道中使用。
注意！刪除後將無法復原！


只能在 事務所公開服務處-委託用交流網 使用：

[提及繪師]：
這是應用程式指令。
如果你的委託招募沒有繪師查看，你可以使用這個指令提及繪師。

[開啟頻道]：
這是應用程式指令。
如果客户要找繪師，可以直接在 繪師列表 右鍵繪師的訊息，執行「開啓頻道」指令。


驗證：
/application：
請根據你相應的專長，選擇‘role’ （目前只有繪師選項）， 並上載兩張自己創作的作品
上載後請等候騎士確認驗證～


其他有用指令：
[翻譯[粵轉繁]]：在需要翻譯的訊息按右鍵（電話長按），選擇應用程式->翻譯[粵轉繁]
/openai：使用本指令，與GPT-3對話！可使用任何語言進行溝通（但有很大機會回覆會不完整）

/aboutme：介紹機器人的資訊。
/ping：查看訊息的延遲值。
/server：查看伺服器的成員人數。
/avatar：取得你或其他成員[輸入target項]的頭像。
/mock：讓機器人模仿你。
[拯救世界]：應用程式指令，非常沒有用途AwA `

		
		await interaction.reply({ content: `${channelcmd}`, components: [row], ephemeral: true });

		


		}
		
		
		};
