const Discord = require("discord.js");

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
        if (difficulty == "\`\`\`🟢 | Facile\`\`\`") {

        } else if (difficulty == "\`\`\`⚪ | Intermédiaire\`\`\`") {
            let randomizer = Math.ceil(Math.random() * choices.length)
            let randomized = randomizer - 1;
            let choice = choices[randomized]
            let result = ""
            let color = ""

            if (choice == "ciseaux") {
                result = "🔴 | Vous avez perdu !"
            }
            else if (choice == "feuille") {
                result = "⚪ | Egalité !"
            }
            else if (choice == "pierre") {
                result = "🟢 | Vous avez gagné !"
            }


            const embed = new Discord.MessageEmbed()
                .setTitle('Partie de Pierre-Feuille-Ciseaux')
                .setTimestamp()
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .addField('Votre choix', `\`\`\`📄 | Feuille\`\`\``, false)
                .addField('Le choix d\'Izu', `\`\`\`${equiChoiceText[choice]}\`\`\``, false)
                .addField('Résultat', `\`\`\`${result}\`\`\``, false)
                if (choice == "ciseaux") {
                    embed.setColor('#FF0000')
                }
                else if (choice == "pierre") {
                    embed.setColor('#00FF00')
                }    

            message.edit({ embeds: [embed], components: [] })

        } else if (difficulty == "\`\`\`🔴 | Expert\`\`\`") {

        }
    }
}