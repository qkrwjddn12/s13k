const Discord = require('discord.js')
const client = new Discord.Client()
const {prefix, token} = require('./config.json')
const fs = require('fs')

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name,command)
}

client.on('Ready', ()=>{
    client.user.setActivity('지원 봇',{type:'STREAMING'})
    console.log("봇이 준비되었습니다.")
})
client.on(`message`,msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)
    try{
        command.execute(msg,args)
    }catch(error){
        console.log(error)
    }
})

client.login(token)