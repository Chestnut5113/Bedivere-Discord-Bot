  const { Client, SlashCommandBuilder, ChannelType, CategoryChannel, PermissionsBitField, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ComponentType, EmbedBuilder } = require('discord.js');

const { stripIndents } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel_create')
        .setDescription('建立一個除管理員及所指定的成員外，其他伺服器成員無法存取的私人頻道。')
	      .addUserOption(option => option.setName('member')
					.setDescription('加入指定的成員。你無法加入自己或機器人。')
					.setRequired(true)),
	      
    async execute(interaction) {
			
			  const member = interaction.options.getUser('member');
			  const host = interaction.user
			 
			if (member.id == host.id || member.id == '1051503430558027826'){
			interaction.reply({ content: '別這麼孤單\n請求拒絕。', ephemeral: true});} else{
			
			  const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone");
			
        const createdChannel = await interaction.guild.channels.create({
        name: `${host.username}-及-${member.username}_的委託討論`,
        type: ChannelType.GuildText,
				parent: '1017085389225340989',
				
					 permissionOverwrites: [
        {
				  id: everyone.id,
					deny: [PermissionsBitField.Flags.ViewChannel],
				},
				{
				  id: host.id,
					allow: [PermissionsBitField.Flags.ViewChannel],
				},
				{
          id: member.id,
					allow: [PermissionsBitField.Flags.ViewChannel],
				},
				],
		});

			createdChannel.send(`<@${host.id}>，<@${member.id}>`);
			
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('delete')
					.setLabel('刪除頻道')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('archive')
					.setLabel('封存頻道')
					.setStyle(ButtonStyle.Primary),
			);
       interaction.reply({ content: `已成功建立頻道！<#${createdChannel.id}>\n請到頻道查看説明。`, ephemeral: true});
				
			const welcometext = stripIndents`
	 已成功建立頻道！

   ℹ️提示：你可以使用/channel_name來更改頻道名稱！

   當討論結束後，你可以：
   1️⃣ 繼續保留頻道留待下次討論，我們不會干涉；
   2️⃣ 回到這條訊息，點選按鈕來**刪除頻道**；
   3️⃣ 回到這條訊息，點選按鈕來**封存頻道**，頻道將不會被刪除，但你們無法查看。
   若將來要恢復頻道，請先記下本頻道ID，再在任何文字頻道執行/channel_return <頻道的ID>。
	 
   若果按鈕出現“此交互失敗”，請執行2️⃣ /channel_delete 或 3️⃣ /channel_archive指令。
   ⚠️**注意刪除頻道無法復原！刪除前請三思！**`;

    const welcome = new EmbedBuilder()
	.setColor([ 0, 183, 195 ])
	.setTitle('已成功建立頻道！')
	.setDescription(`${welcometext}`)
	.setTimestamp()
	.setFooter({ text: '貝德維爾', iconURL: 'https://cdn.discordapp.com/attachments/1017427293167173702/1063837880440606811/IMG_2768.png' });

				
		const message = await createdChannel.send({ embeds: [welcome] , components: [row]  });
			message.pin()
				
		const ccid = await createdChannel.send(`本頻道ID：${createdChannel.id}`)
      ccid.pin()

			
				const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button});
			collector.on('collect', i => {
	if(i.customId === 'delete'){ if (i.user.id === member.id || host.id) {
		i.reply(`<@${i.user.id}> **⚠️頻道即將刪除⚠️**`);
		setTimeout(function(){message.channel.delete()},1000 * 5) 
	} else {
		i.reply({ content: `~~哈哈~~ 你無法執行指令！`, ephemeral: true });
	}}

	if(i.customId === 'archive'){ if (i.user.id === member.id || host.id) {
		i.reply(`<@${i.user.id}> **:information_source:頻道即將封存:information_source:**`);
		      setTimeout(function(){message.channel.setParent('1057566237116350498')},1000 * 5) 
	} else {
		i.reply({ content: `~~哈哈~~ 你無法執行指令！`, ephemeral: true });
	}}
});
			}
			
    }};

  