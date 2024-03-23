const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

// /^[\\p{Ll}\\p{Lm}\\p{Lo}\\p{N}\\p{sc=Devanagari}\\p{sc=Thai}_-]+$/u.test($setName)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Link a msg with a form')
		.addStringOption(option =>
			option
				.setName('campaign-id')
				.setDescription('ID identifying which campaign url to search')
				.setRequired(true),
		),
	async execute(interaction) {
		const registerButton = new ButtonBuilder()
			.setCustomId(`register-${interaction.options.getString('campaign-id')}`)
			.setLabel('S\'inscrire')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
			.addComponents(registerButton);

		const channel = await interaction.client.channels.fetch(interaction.channel.id);
		await channel.send({ components: [row] });

		await interaction.reply({ content: 'Done.', ephemeral: true });
		await interaction.deleteReply();
	},
};
