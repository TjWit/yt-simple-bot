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

    command(client, 'embed', (message) => { 
        const Embed = new Discord.MessageEmbed()
        .setTitle('Embed')
        .setColor('#5bf074')
        .setDescription('This is our first embed!')
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(Embed)
    })

    command(client, ['serverinfo','si'], (message) => {
        const memEmbed = new Discord.MessageEmbed()
        .setTitle('Server Info')
        .setColor('#5bf074')
        .addFields (
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