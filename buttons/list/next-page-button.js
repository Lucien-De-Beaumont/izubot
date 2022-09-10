const config = require("../../config");
const Discord = require("discord.js");
const db = require('../../utils/connectMYSQL')
const date = require('date-and-time');

module.exports = {
    name: "next-page-button",
    roles: [config.guild],

    async runInteraction(client, interaction) {
        interaction.deferUpdate()
        const message = await interaction.fetchReply()
        let numberPages = message.embeds[0].footer.text.slice(5, message.embeds[0].footer.text.indexOf(' sur'))
        let maxNumberPages = parseInt(message.embeds[0].footer.text.slice(message.embeds[0].footer.text.indexOf('sur ') + 4))

        if (numberPages > maxNumberPages) {
            numberPages = 0
        }

        const [results0] = await db.query(`SELECT * FROM HeroicAcademy WHERE discordid=${db.escape(interaction.guild.members.cache.find(member => member.displayAvatarURL() == message.embeds[0].thumbnail.url).id)} ORDER BY nom ASC LIMIT 5 OFFSET ${(numberPages * 5)}`);

        if (interaction.member.displayName != message.embeds[0].author.name.slice('Demandé par '.length)) { return interaction.followUp({ content: `Vous ne pouvez pas réagir à ce bouton !`, ephemeral: true }) }
        const listEmbed = new Discord.MessageEmbed()
            .setTitle(message.embeds[0].title)
            .setThumbnail(message.embeds[0].thumbnail.url)
            .setAuthor({ name: message.embeds[0].author.name, iconURL: message.embeds[0].author.iconURL })
            .setColor(message.embeds[0].color)
            .setFooter({ text: `Page ${+numberPages + 1} sur ${+maxNumberPages}` })
            .setTimestamp()

        for (element in results0) {
            listEmbed.addFields({ name: `${results0[element].nom}`, value: `Préfixe : \`${results0[element].prefix}\`\nLien de l'avatar : ${results0[element].iconURL}\nDate de création : <t:${Math.floor(new Date(results0[element].date).getTime() / 1000)}:R>, le <t:${Math.floor(new Date(results0[element].date).getTime() / 1000)}:f>`, inline: false })
        }

        const buttons = new Discord.MessageActionRow()
        if (+numberPages > 0) {
            buttons.addComponents(
                new Discord.MessageButton()
                    .setCustomId('first-page-button')
                    .setLabel('Première page')
                    .setEmoji('⏮️')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('previous-page-button')
                    .setLabel('Page précédente')
                    .setEmoji('◀️')
                    .setStyle('PRIMARY'),
            )
        }

        buttons.addComponents(
            new Discord.MessageButton()
                .setCustomId('choose-page-button')
                .setLabel('Recherche')
                .setEmoji('🔎')
                .setStyle('SUCCESS'),
        )

        if (+numberPages + 1< maxNumberPages) {
            buttons.addComponents(
                new Discord.MessageButton()
                    .setCustomId('next-page-button')
                    .setLabel('Page suivante')
                    .setEmoji('▶️')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('last-page-button')
                    .setLabel('Dernière page')
                    .setEmoji('⏭️')
                    .setStyle('PRIMARY'),
            )
        }
        message.edit({ embeds: [listEmbed], components: [buttons] })
    }
}  