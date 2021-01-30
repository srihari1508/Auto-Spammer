const Discord = require('discord.js-self')
const client = new Discord.Client()

require('dotenv-flow').config()
const token = process.env.TOKEN
const prefix = '.'

client.on('ready', () => {
	console.log(`Connected to ${client.user.tag}`)
})

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.id !== client.user.id) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const command=args.shift()
	//console.log(`Args: ${args}\nCommand: ${command}`)
	if(command === 'spam'){
		let text = args[0]
		let time = args[1]
		if(!text || !time){
			message.channel.send('ERROR | Please send the arguments along with the command\n'+
				'Usage: `.spam <Message> <Time (s,m or h)>`')
			return
		}
		else {
			if(time.endsWith('s')){
				let timingString = (time.split('s'))[0]
				let timing = parseFloat(timingString)
				message.channel.send(text)
				setInterval(() => {
					message.channel.send(text)
				}, 1000 * timing)
			}
			else if(time.endsWith('m')){
				let timingString = (time.split('s'))[0]
				let timing = parseFloat(timingString)
				message.channel.send(text)
				setInterval(() => {
					message.channel.send(text)
				}, 1000 * timing * 60)
			} else if(time.endsWith('h')){
				let timingString = (time.split('s'))[0]
				let timing = parseFloat(timingString)
				message.channel.send(text)
				setInterval(() => {
					message.channel.send(text)
				}, 1000 * timing * 60 * 60)
			}
		}
	}
})

client.login(token)