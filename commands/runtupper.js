const fetch = require("node-fetch")
const config = require('../config')
const db = require("../utils/connectMYSQL");
const date = require('date-and-time');
const Logger = require("../utils/Logger");

module.exports = {
    name: "runtupper",
    roles: [config.guild],
    description: "Insère dans la BDD toutes les données dans tupper.json",
    dmPermission: false,
    hidden: false,
    async runInteraction(client, interaction) {
        const filter = msg => msg.author.id == interaction.member.id
        const collector = interaction.channel.createMessageCollector({ filter, time: 120000 })

        interaction.reply(`<@${interaction.member.id}>, merci d'envoyer le fichier obtenu via la commande "tul!export" !`)
        collector.on('collect', async collected => {
            if (collected.content.startsWith('https://') && collected.content.endsWith('.json') || collected.attachments.first()?.url.startsWith('https://') && collected.attachments.first()?.url.endsWith('.json')) {
                const file = collected.attachments.first()?.url ?? collected.content
                for (element of (JSON.parse(await (await fetch(file)).text()).tuppers)) {
                    await db.query(`INSERT INTO HeroicAcademy SET nom = "${element.name}", prefix = "${element.brackets[0].trim()}", iconURL="${element.avatar_url}", date="${date.format(new Date(element.created_at), 'YYYY-MM-DD HH:mm:ss')}", discordid="${element.user_id}"`)
                }
                interaction.channel.send(`Super <@${interaction.member.id}>, c'est bon ! Tes personnages sont utilisables !`)
            }
        })

    },

}
