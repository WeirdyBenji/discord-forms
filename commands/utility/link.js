const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Link a msg with a form'),
	async execute(interaction) {
		const registerButton = new ButtonBuilder()
			.setCustomId(`register-${interaction.id}`)
			.setLabel('S\'inscrire')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
			.addComponents(registerButton);

		const channel = await interaction.client.channels.fetch(interaction.channel.id);
		await channel.send({
			components: [row],
		});

		await interaction.reply({ content: 'Done.', ephemeral: true });
		await interaction.deleteReply();
	},
};
