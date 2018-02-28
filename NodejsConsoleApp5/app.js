const Discord = require('discord.js');
const client = new Discord.Client();
const sql = require("sqlite");
var dev1 = "158397118611062785";
var dev2 = "196443959558406144";
const config = require("./config.json");

sql.open("./records.sqlite");
client.on('ready', () => {
    console.log('I am ready!');
});


client.on('message', message => {
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.content === '-rpgreg') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) {
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char) VALUES (?, ?, ?,?,?,?,?)", [message.author.id, 1, "recruit", "N/A", "N/A", "glock", message.author.avatarURL]);
            } else {
                
                sql.run(`UPDATE scores SET points = ${row.points + 0} WHERE userId = ${message.author.id}`);
            }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, rank TEXT , faction TEXT, inventory TEXT, weapon TEXT, char TEXT)").then(() => {
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char) VALUES (?, ?, ?,?,?,?,?)", [message.author.id, 1, "recruit", "N/A", "N/A", "glock", message.author.avatarURL ]);
            });
        });
    }
    if (message.content === '-bal') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("sadly you do not have any points yet!");
            message.reply(`you currently have ${row.points} $, good going!`);
        });
    }
    if (message.content === '-rank') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("sadly you do not have any points yet!");
            message.reply(`you current rank is ${row.rank}`)
        })
    }
    if (message.content === '-faction') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("sadly you do not have any points yet!");
            message.reply(`you are a member of the ${row.faction} faction`)
        })
    }
    if (command === '-wcreate') {
        let Damadge = args[0];
        let name = args.slice(1).join(" ");
        if (message.author.id === dev1, dev2) {
            sql.run("INSERT INTO Weapons (Weapon, Damadge) VALUES (?, ?)", [Damadge, name]);
            console.log("Created a new weapon entree:" + "Weapon:" + name + " Damadge" + Damadge)
            message.reply("Created a new weapon entree:" + "Weapon:" + name + " Damadge" + Damadge)
        }
    }
    if (command === '-fcreate') {
        let Damadge = args[0];
        let name = args.slice(1).join(" ");
        if (message.author.id === dev1, dev2) {
            sql.run("INSERT INTO Factions (Funds , Name) VALUES (?, ?)", [Damadge, name]);
            console.log("Created a new Faction:" + " Name:" + name + " Funds:" + Damadge)
            message.reply("Created a new Faction:" + " Name:" + name + " Funds:" + Damadge)
        }
    }


    if (command === "-me") {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) return message.reply("sadly you do not have any points yet!");


            message.channel.send({
                "embed": {

                    "url": "https://discordapp.com",
                    "color": 8596224,
                    "timestamp": "2018-02-28T00:53:21.614Z",
                    "footer": {
                        "icon_url": row.Char,
                        "text": "Generated by SP-Rpg"
                    },
                    "thumbnail": {
                        "url": row.Char
                    },
                   
                    "author": {
                        "name": message.author.username,
                        "url": "https://discordapp.com",
                        "icon_url": row.Char
                    },
                    "fields": [

                        {
                            "name": "Money",
                            "value": row.points,
                            "inline": true
                        },
                        {
                            "name": "Rank",
                            "value": row.rank,
                            "inline": true

                        },
                        {
                            "name": "Current Equipped Weapon",
                            "value": row.weapon,
                            "inline": true
                        },
                        {
                            "name": "Faction",
                            "value": row.faction,
                            "inline": true

                        }

                    ]
                }
            })
        })






    }


    //end


});





client.login(config.token);
