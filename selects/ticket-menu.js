const Discord = require('discord.js');
const config = require('../config')
const Logger = require("../utils/Logger");

module.exports = {
    name: 'ticket-menu',
    async runInteraction(client, interaction) {

        try { eval('config.guild_' + interaction.guild.id + ".channels['category-ticket']"); eval('config.guild_' + interaction.guild.id + ".channels['ticket']") } catch (err) { return Logger.debug('fatal error occured:' + err) }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Envoyer un ticket à l'équipe de modération`)
            .setDescription(`Utilisez le bouton ci-dessous pour envoyer un ticket à notre équipe de modération, qui l'étudiera dans les plus brefs délais !`)

        const ticketMenu = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('ticket-menu')
                    .setPlaceholder('Sélectionner une raison...')
                    .addOptions([
                        {
                            label: 'Dépôt de fiche RP',
                            description: 'Soumettre une fiche RP.',
                            value: 'ficherp',
                            emoji: '📝'
                        },
                        {
                            label: 'Demande de création de lieu',
                            description: 'Demander la création d\'un lieu pour RP.',
                            value: 'locationcreate',
                            emoji: '📍'
                        },
                        {
                            label: 'Question',
                            description: 'Poser une question à l\'équipe de modération.',
                            value: 'question',
                            emoji: '❓'
                        },
                        {
                            label: 'Signalement',
                            description: 'Signaler un membre, une faille ou un dysfonctionnement.',
                            value: 'report',
                            emoji: '⚠️'
                        },
                        {
                            label: 'Idée',
                            description: 'Proposer une idée pour le serveur.',
                            value: 'lightbulb',
                            emoji: '💡'
                        },

                    ]),
            )

        let description
        let title

        switch (interaction.values[0]) {
            case 'ficherp':
                description = `Bonjour <@${interaction.member.id}> !\n\nMerci d'avoir contacté l'équipe de modération pour votre **dépôt de fiche RP**. \nAfin que cette dernière ait toutes les chances d'être acceptée, pensez à suivre les indications donnée dans <#1002182423582363668>.\n\nNotre équipe a par ailleurs **déjà** été notifiée de votre dépôt de fiche, merci donc de **ne pas** les mentionner. Une réponse vous sera donnée dans les plus brefs délais.\n\nBonne journée à vous !`;
                title = `Dépôt de fiche RP`
                break;
            case 'locationcreate':
                description = `Bonjour <@${interaction.member.id}> !\n\nMerci d'avoir contacté l'équipe de modération pour votre **demande d'ajout d'un lieu RP**. \nAfin que cette dernière ait toutes les chances d'être acceptée, veuillez décrire votre lieu, la zone dans laquelle il pourraît être inclus, une image pour l'accompagner, son utilité [...].\n\nNotre équipe a par ailleurs **déjà** été notifiée de votre demande d'ajout de lieu, merci donc de **ne pas** les mentionner. Une réponse vous sera donnée dans les plus brefs délais.\n\nBonne journée à vous !`;
                title = `Demande de création de lieu`
                break;
            case 'question':
                description = `Bonjour <@${interaction.member.id}> !\n\nMerci d'avoir contacté l'équipe de modération pour la **question** que vous semblez avoir. \n\nNous vous écoutons, quelle est votre question ?\n\nNotre équipe a par ailleurs **déjà** été notifiée que vous aviez une question, merci donc de **ne pas** les mentionner. Une réponse vous sera donnée dans les plus brefs délais.\n\nBonne journée à vous !`;
                title = `Question`
                break;
            case 'report':
                description = `Bonjour <@${interaction.member.id}> !\n\nMerci d'avoir contacté l'équipe de modération concernant votre **signalement**. \n\nNous sommes sincèrement désolés que vous ayez à signaler un problème. Nous ferons évidemment de notre mieux pour régler ça le plus vite possible.\nAfin d'accélerer la vitesse de résolution de votre problème, merci de nous décrire le plus précisément possible votre souci.\n\nNotre équipe a par ailleurs **déjà** été notifiée que vous aviez un problème, merci donc de **ne pas** les mentionner. Une réponse et une solution vous seront apportées dans les plus brefs délais.\n\nBonne journée à vous !`;
                title = `Signalement`
                break;
            case 'lightbulb':
                description = `Bonjour <@${interaction.member.id}> !\n\nMerci d'avoir contacté l'équipe de modération pour nous faire part de votre **idée**. \n\nAfin de pouvoir faciliter le débat et la compréhension, merci de nous décrire le plus précisément possible votre idée.\n\nNotre équipe a par ailleurs **déjà** été notifiée que vous aviez un problème, merci donc de **ne pas** les mentionner. Une réponse et une solution vous seront apportées dans les plus brefs délais.\n\nBonne journée à vous !`;
                title = `Idée`
                break;

        }
        client.channels.cache.get(eval('config.guild_' + interaction.guild.id + ".channels['ticket']")).messages.fetch({ limit: 1 }).then(messages => {
            let lastMessage = messages.first();
            client.channels.cache.get(eval('config.guild_' + interaction.guild.id + ".channels['ticket']")).messages.fetch(`${lastMessage.id}`).then(message => message.edit({ embeds: [embed], components: [ticketMenu] }))
        })

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`Nouveau ticket : ${title}`)
            .setDescription(`${description}`)
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
            .setTimestamp()

        const buttons = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('Fermer le ticket')
                    .setEmoji('🔐')
                    .setStyle('DANGER')
            )

        client.channels.cache.get(eval('config.guild_' + interaction.guild.id + ".channels['category-ticket']")).createChannel(
            `ticket-${interaction.member.displayName}-${Math.round(Math.random() * 100)}`, {
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.member.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: eval('config.guild_' + interaction.guild.id + ".perms['wholeStaff']"),
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        }).then(channel => {
            channel.send({ embeds: [embed2], components: [buttons] });
            interaction.reply({ content: `Votre ticket ( <#${channel.id}> ) a bien été créé !\nUn staff s'occupera de vous dès que possible !`, ephemeral: true });
            channel.send('<@&' + eval('config.guild_' + channel.guild.id + ".perms['wholeStaff']").join('>, <@&') + '>').then(msg => {
                msg.delete()
            })
        })

    }
};