const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;

var prefix = "~"

var embed_color = 000000

/*
function sendMessage(msg) // Function to send messages -- still need to implement
{
	message.channel.send({embed: {
		color: embed_color,
		description: msg
	}});
}
*/

client.on('ready',() => {
	console.log('Online');
	client.user.setActivity('you sleep', {type: 'WATCHING'})
		.catch(console.error);
})

client.on('message', message => {
	if(!message.content.startsWith(prefix)) return; //Check for prefix

	if(message.author.bot) return; //Make sure bot isn't calling bot

	console.log(message.author.username + ' said: ' + message.content);

	if(message.author.username === "Ramsfield")
	{
		if(message.content.startsWith(prefix + "say"))
		{
			let copy = message.content;
			copy = copy.slice(5),
			message.channel.send({embed: {
				color: embed_color,
				description: copy
			}});
		}
	}

	//Helper function
	if(message.content === prefix + "help")
	{
		message.channel.send({embed: {
			color: embed_color,
			author: {
				name: "ChicoBot",
				icon_url: "https://i.imgur.com/SHoBd1U.gif"
			},
			fields:[{
				name:"General Help:",
				value: "Please message @Ramsfield#7696 for any questions, comments, or concerns.\n**~help** -- Brings up this message. But you probably knew that, cause you're here."
			},{
				name:"Moderation:",
				value: "**~mute `@user`** -- ***__Requires Lvl 15 - Monkey Face__*** -- Mutes a user\n**~unmute `@user`** -- ***__Requires Lvl 15 - Monkey Face__*** -- Unmutes a user"
			}],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: message.author.username
				}
		}
		});}
		//Mute function
		//Checks if member is of role "Lvl 15 - Monkey Face"
	else if(message.content.startsWith(prefix+'mute')){
		if(!message.member.roles.some(r=>["Lvl 15 - Monkey Face"].includes(r.name))){
			return message.channel.send({embed: {
				color: embed_color,
				description: message.author.username + " is not in the sudoers file. This incident will be reported."
			}}); 
		}
		else
		{
			let member = message.mentions.members.first();
			if(!member) //Check if member is in guild
				return message.channel.send({embed: {
					color: embed_color,
					description: "Please enter a valid member of this server."
				}});
			else if(member === message.member) //Check if member is author
				return message.channel.send({embed: {
					color: embed_color,
					description: message.author.username + " don't do this to yourself!"
				}});
			else if(member.roles.some(r=>["Mods"].includes(r.name))) //Check if member is a Mod
				return message.channel.send({embed: {
					color: embed_color,
					description: "I'm sorry Dave, I'm afraid I can't do that."
				}});
			else if(member.id === '412109529711378472') //Check if trying to mute bot
				return message.channel.send({embed: {
					color: embed_color,
					description: "Don't bring me down, Bruce."
				}});
			else{
				let muted = message.guild.roles.find("name", "Muted");
				member.addRole(muted).catch(console.error);
				const channel = member.guild.channels.find('name', 'modbox');
				channel.send(member+' has been muted.');
				return message.channel.send({embed: {
					color: embed_color,
					description: member + " has been muted. Mods will be notified."
				}});
			}
		}
	}
	//Unmute function. Basically a copy paste of mute
	else if(message.content.startsWith(prefix+'unmute')){

		if(!message.member.roles.some(r=>["Lvl 15 - Monkey Face"].includes(r.name))){
			return message.channel.send({embed: {
				color: embed_color,
				description:"You have no power here."
			}});} 
		else
		{
			let member = message.mentions.members.first();
			if(!member)
				return message.reply(" Please enter a valid member of this server.");
			let muted = message.guild.roles.find("name", "Muted");
			member.removeRole(muted).catch(console.error);
			return message.channel.send({embed: {
				color: embed_color,
				description: member + " has been unmuted."
			}});}
	}
	//Break Function
	else if(message.content === prefix + 'break'){
		let member = message.author;
		let muted = message.guild.roles.find("name", "Muted");
		member.addRole(muted).catch(console.error);
		const channel = member.guild.channels.find('name', 'modbox');
		channel.send(member+' has been muted.');
		message.channel.send({embed: {
			color: embed_color,
			description: "You're currently on break. You may message again in: " + Date().getTime()+30;
		}});}
	//Kayaking Role Add
	else if(message.content === prefix + 'kayak')
	{
	let kayaking = message.guild.roles.find("name", "oc - kayaking");
	message.member.addRole(kayaking);
	}
	//Hiking Role Add
	else if(message.content === prefix + 'hiking')
	{
	let hiking = message.guild.roles.find("name", "oc - hiking");
	message.member.addRole(hiking);
	}
	//Cycling Role Add
	else if(message.content === prefix + 'cycling')
	{
	let cycling = message.guild.roles.find("name", "oc - cycling");
	message.member.addRole(cycling);
	}
}
else if(message.content === prefix + 'ping'){
	message.channel.send({embed: {
		color: embed_color,
		description:` \`${Date.now() - message.createdTimestamp} ms\` `
	}});
}
else if(message.content.startsWith(prefix+'insult'))
{
	var msg = [", your mother was a hamster and your father smelt of elderberries.",  ", I bet you put your shoes on before your socks.", ", I can't. It's too easy.",", even Bob Ross would call you a mistake.",", may every sock you wear be slightly rotated, just enough for it to be uncomfortable.", ", may both sides of your pillow be warm.", ", you're impossible to underestimate.",", if you were an inanimate object, you'd be a participation trophy.",", you're not the dumbest person on the planet, but you sure better hope he doesn't die.",", you're kind of like Rapunzel except instead of letting down your hair, you let down everyone in your life.",", wow, you're like a 6 piece chicken mcnobody."];
	var x = Math.floor(Math.random()*msg.length);
	let insulted = message.mentions.members.first();
	if(!person)
		person = message.author;
	message.channel.send({embed: {
		color: embed_color,
		description: insulted + msg[x]
	}});
}
else if (message.content.startsWith(prefix+'compliment'))
{
	var msg = [", you are absolutely beautiful.", ", 20/10. Easily.",", beauty and brains incarnate.",", Hey, I just met you. And this is crazy. Here's my number. Call me maybe...",", wow. Just wow."];
	var x = Math.floor(Math.random()*msg.length);
	let person = message.mentions.members.first();
	if(!person)
		person = message.author;
	message.channel.send({embed: {
		color: embed_color,
		description: person + msg[x]
	}});
}
else if(message.content === prefix + 'uninsult')
{
	message.channel.send({embed: {
		color: embed_color,
		description: "I take it back. That was too much. I'm very sorry. It will never happen again. Please forgive me. I didn't know what I was doing."
	}});
}
});

client.login(token);
