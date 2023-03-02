const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType  } = require('discord.js');
require('dotenv').config()
const { stripIndents } = require('common-tags');
const mySecret = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildVoiceStates] });

const express = require('express');
const app = express();
const port = 5000;

process.env.TZ = "Asia/Hong_Kong";
process.env.NODE_ENV = 'production';

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	app.get('/', (req, res) => res.send('梅爾50收 繪師：有志不在年糕 <br> <img src="https://cdn.discordapp.com/attachments/1017083108744499210/1044636616372801546/28f5e618fbca1884.png" width="500" height="600">'));
  
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
	console.log(`Ready! Logged in as ${client.user.tag}`);
	let logChannel = client.channels.cache.get(process.env.BOOT_LOG_CHANNEL_ID)
	logChannel.send(`Timestamp: ${new Date().toTimeString()}, bot is booted on ${process.env.NODE_ENV}`);
	
	 const activities = [
      "貝德維爾 正式開幕", //使用Replit時，文字打在這行不會在狀態中顯示，請漏空
	  "版本 1.45",
      "賣掉梅爾OuOb",
      "/help 查看指令教學",
	  "討論串->右鍵訊息->應用程式 也能開啓頻道！",
	  "新增 [翻譯] 及 /openai！ "
    ];

	setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity);
      }, 20000);

	  let MainChannel = client.channels.cache.get(process.env.MainChannel_ID)
	  const mainmessage = stripIndents`
	  小提示：
	  各位繪師們，可以使用</application:1070302732021420083>簡單驗証身份，
	  然後就可以在 <#1049329280162738186> 放出帖文，招募委託！`
	MainChannel.send(`${mainmessage}`).then((message)=> {
		setTimeout(function(){
		  message.delete();
		}, 500000) //Milliseconds (5000 = 5 Seconds);
	  });

	  setInterval(function(){
	  MainChannel.send(`${mainmessage}`)}, 14400000)

  });


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令時發生錯誤！', ephemeral: true });
	}
});

	client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isMessageContextMenuCommand()) return;
		
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令時發生錯誤！', ephemeral: true });
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;
		
	
	
	if(interaction.customId === 'select'){
    let choices = "";

		await interaction.values.forEach(async value => {
      choices += `${value}`
			
		})
		await interaction.reply({content: `所選的教學`, files: [`${choices}`], ephemeral: true})
	}

	
});

client.login(mySecret);