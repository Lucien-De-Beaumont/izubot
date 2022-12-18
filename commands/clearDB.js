const Discord = require("discord.js");
const config = require("../config");
const db = require('../utils/connectMYSQL');

module.exports = {
    name: "cleardb",
    roles: [config.perms['adminPerms']],
    description: "Supprimer l'ensemble des personnages RP de personnes n'étant plus sur le serveur",
    dmPermission: true,
    hidden: false,
    helpType: "fun",

    async runInteraction(client, interaction) {
        const [results0] = await db.query(`SELECT DISTINCT discordid FROM HeroicAcademy`)
        let membersIDs = []
        let absentIDs = []
        for (element of results0) {
            membersIDs.push(element['discordid'])
        }
        membersIDs.forEach(memberID => {
            if (typeof interaction.guild.members.cache.get(memberID) == 'undefined') {
                absentIDs.push(memberID)
            }
        })

        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle(`Suppression de personnages RP d'anciens membres`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setDescription(`__**Liste complète des anciens membres visés par la suppression :**__\n\n<@${absentIDs.toString().replaceAll(',','>\n<@')}>`)
        interaction.reply({ embeds: [embed]})

        db.query("DELETE FROM HeroicAcademy WHERE discordid = '"+absentIDs.toString().replaceAll(",","' OR discordid ='")+"'")
    },
}