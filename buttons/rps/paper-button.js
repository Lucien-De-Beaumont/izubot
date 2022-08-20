const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "paper-button",

    async runInteraction(client, interaction) {
        interaction.deferUpdate()
        const message = await interaction.fetchReply()
        const difficulty = message.embeds[0].fields[2].value

        let choices = ["pierre", "feuille", "ciseaux"]

        equiChoiceText = {
            "pierre": "🪨 | Pierre",
            "feuille": "📄 | Feuille",
            "ciseaux": "✂️ | Ciseaux",
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Partie de Pierre-Feuille-Ciseaux')
            .setTimestamp()
            .setThumbnail(`${client.user.displayAvatarURL()}`)

        if (difficulty == "\`\`\`🟢 | Facile\`\`\`") {
            embed.addFields({ name: 'Votre choix', value: `\`\`\`📄 | Feuille\`\`\``, inline: false })
            embed.addFields({ name: 'Le choix d\'Izu', value: `\`\`\`🪨 | Pierre\`\`\``, inline: false })
            embed.addFields({ name: 'Résultat', value: `\`\`\`🟢 | Vous avez gagné !\`\`\``, inline: false })
            embed.setColor('#00FF00')
        } else if (difficulty == "\`\`\`⚪ | Intermédiaire\`\`\`") {
            let randomizer = Math.ceil(Math.random() * choices.length)
            let randomized = randomizer - 1;
            let choice = choices[randomized]
            let result = ""

            if (choice == "ciseaux") {
                result = "🔴 | Vous avez perdu !"
            }
            else if (choice == "feuille") {
                result = "⚪ | Egalité !"
            }
            else if (choice == "pierre") {
                result = "🟢 | Vous avez gagné !"
            }


            embed.addFields({ name: 'Votre choix', value: `\`\`\`📄 | Feuille\`\`\``, inline: false })
            embed.addFields({ name: 'Le choix d\'Izu', value: `\`\`\`${equiChoiceText[choice]}\`\`\``, inline: false })
            embed.addFields({ name: 'Résultat', value: `\`\`\`${result}\`\`\``, inline: false })
            if (choice == "ciseaux") {
                embed.setColor('#FF0000')
            }
            else if (choice == "pierre") {
                embed.setColor('#00FF00')
            }

        } else if (difficulty == "\`\`\`🔴 | Expert\`\`\`") {
            embed.addFields({ name: 'Votre choix', value: `\`\`\`📄 | Feuille\`\`\``, inline: false })
            embed.addFields({ name: 'Le choix d\'Izu', value: `\`\`\`✂️ | Ciseaux\`\`\``, inline: false })
            embed.addFields({ name: 'Résultat', value: `\`\`\`🔴 | Vous avez perdu !\`\`\``, inline: false })
            embed.setColor('#FF0000')
        }
        message.edit({ embeds: [embed], components: [] })
    }
}