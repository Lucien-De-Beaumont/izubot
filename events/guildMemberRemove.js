const Discord = require("discord.js");
const config = require("../config");
const Logger = require("../utils/Logger");

module.exports = {
  name: "guildMemberRemove",
  once: false,
  async execute(client, member) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Un membre vient de partir 😢`)
      .setImage(`${member.guild.iconURL()}`)
      .setDescription(`Nous venons d'apprendre que ${member.displayName} nous a quittés, à une prochaine fois peut être !`)
      .setTimestamp()
      .setFooter({ text: member.guild.memberCount + ` personnes sur le serveur` })

    client.channels.cache.get(config.channels['depart']).send({ embeds: [embed] })
  },
};