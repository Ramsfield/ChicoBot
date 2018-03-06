const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;

var prefix = "~"

var embed_color = 844660

client.on('ready',() => {
	console.log('Online');
})

client.on('message', message => {
	if(!message.content.startsWith(prefix)) return; //Check for prefix

	if(message.author.bot) return; //Make sure bot isn't calling bot

	console.log(message.author.username + ' said: ' + message.content);

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
			return message.reply(member + " has been unmuted.");
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
		var x = Math.floor(Math.random()*6);
		let insulted = message.mentions.members.first();
		if(!insulted)
			insulted = message.author;
		if(x === 0)
			insulted = insulted+(", your mother was a hamster and your father smelt of elderberries.");
		else if (x === 1)
			insulted = insulted+(", I bet you put your shoes on before your socks.");
		else if (x === 2)
			insulted = insulted+(", I can't. It's too easy.");
		else if (x === 3)
			insulted = insulted+(", even Bob Ross would call you a mistake.");
		else if (x === 4)
			insulted = insulted+(", may every sock you wear be slightly rotated, just enough for it to be uncomfortable.");
		else if (x === 5)
			insulted = insulted+(", may both sides of your pillow be warm.");
		message.channel.send(insulted);
	}
});

client.login(token);
