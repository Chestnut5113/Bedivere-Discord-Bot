const { SlashCommandBuilder } = require('discord.js');

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('openai')
		.setDescription('使用本指令，與GPT-3對話！可使用任何語言進行溝通（但有很大機會回覆會不完整）')
	.addStringOption (option => option.setName('question')
			   .setDescription('想問的問題')
			   .setRequired(true)),
	async execute(interaction) {

		async function runCompletion () {
    const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${interaction.options.getString('question')}`,
});
console.log(completion.data.choices[0].text);
			interaction.reply(`${completion.data.choices[0].text}`)
}

runCompletion();
	}}
