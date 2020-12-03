const Discord = require("discord.js")
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log('This bot is online ✔')
    client.user.setPresence({
        activity: {
            name: `${config.prefix}help, for help`,
            type: 0,
        },
    })

    command(client, 'ping', (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'kick', (message) => {
        const kickUser = message.mentions.users.first();

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            let falsekickEmbed = new Discord.MessageEmbed()
            .setTitle('Kick Member')
            .setDescription('Sorry, you do not have the permission to use this command')
            .setTimestamp()
            .setColor("#7a1111")
            return message.channel.send(falsekickEmbed)
        }

        if (kickUser) {
            var member = message.guild.member(kickUser);

            if (member) {
                member.kick('You have not listned tot he mods and/or the rules.')
                let kickEmbed = new Discord.MessageEmbed()
                .setTitle('Kick Member')
                .setDescription(`You have sucessfully kick ${kickUser} ✔`)
                .addFields(
                    { name: '**Moderator**', value: `${message.author}`}
                )
                .setTimestamp()
                .setFooter('bot test server')
                .setColor('#55eb34')
                message.channel.send(kickEmbed)
            }
        }
    })

    command(client, 'ban', (message) => {
        const banUser = message.mentions.users.first();

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            let falsebanEmbed = new Discord.MessageEmbed()
                .setTitle('Ban Member')
                .setDescription('Sorry, but you do not have the permission to use this command.')
                .setTimestamp()
                .setColor('#7a1111');
            return message.channel.send(falsebanEmbed)
        }

        if (banUser) {
            var member = message.guild.member(banUser);

            if (member) {
                member.ban({
                    reason: 'You have either broken a serious rule, or a moderator banned you for a reson!'
                }).then(() => {
                    let banEmbed = new Discord.MessageEmbed()
                        .setTitle('Ban Member')
                        .setDescription(`You banned the user ${banUser} successfully ✔`)
                        .addFields(
                            { name: '**Moderator**', value: `${message.author}` }
                        )
                        .setTimestamp()
                        .setFooter('bot test server')
                        .setColor('#55eb34')
                    message.channel.send(banEmbed)
                })
            }
        }
    })


    command(client, 'embed', (message) => {
        const Embed = new Discord.MessageEmbed()
            .setTitle('Embed')
            .setColor('#5bf074')
            .setDescription('This is our first embed!')
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
        message.channel.send(Embed)
    })

    command(client, ['serverinfo', 'si'], (message) => {
        const memEmbed = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .setColor('#5bf074')
            .addFields(
                {
                    name: 'Server Name',
                    value: `${message.guild.name}`
                },

                {
                    name: 'Server Member Count',
                    value: `${message.guild.memberCount}`
                }
            )
        message.channel.send(memEmbed)
    })
})

client.login(config.token)