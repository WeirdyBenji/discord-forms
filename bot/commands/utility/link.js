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
				.setRequired(true)
				.addChoices(
					{ name: 'PM 03 24', value: 'pm0324' },
					{ name: 'Montpellier 24', value: 'mtp24' },
					{ name: 'Springbreak 24', value: 'spb24' },
					{ name: 'PM 10 24', value: 'pm1024' },
					{ name: 'Pau 24', value: 'pau24' },
					{ name: 'Toulouse 24', value: 'tls24' },
				),
		)
		.addStringOption(option =>
			option
				.setName('message-id')
				.setDescription('The origin message will be mentioned'),
		),
	async execute(interaction) {
		const registerButton = new ButtonBuilder()
			.setCustomId(`register-${interaction.options.getString('campaign-id')}`)
			.setLabel('S\'inscrire')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
			.addComponents(registerButton);

		let message = null;
		const messageId = interaction.options.getString('message-id');
		if (messageId) {
			try {
				message = await interaction.channel.messages.fetch(messageId);
			} catch (e) {
				await interaction.reply({ content: e.message, ephemeral: true });
				return;
			}
		}

		if (message && message.id) {
			message.reply({ components: [row] });
		} else {
			const channel = await interaction.client.channels.fetch(interaction.channel.id);
			await channel.send({ components: [row] });
		}

		await interaction.reply({ content: 'Done', ephemeral: true });
		await interaction.deleteReply();
	},
};
