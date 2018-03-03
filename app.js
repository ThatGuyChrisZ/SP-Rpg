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
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char, Unassigned ,XP, Health, cm , cc, cf, INTERGER) VALUES (?, ?, ?,?,?,?,?,?,?,? , ?, ?, ?,?)", [message.author.id, 1, "recruit", "N/A", "N/A", "glock", message.author.avatarURL, 5, 0, 100, "yes", "yes", "yes", "1"]);
                console.log("created new user charachter")
            } else {
                
                sql.run(`UPDATE scores SET points = ${row.points + 0} WHERE userId = ${message.author.id}`);
                console.log("created new user charachter")
            }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, rank TEXT , faction TEXT, inventory TEXT, weapon TEXT, char TEXT,Unassigned INTERGER, XP INTERGER, Health TEXT, cm TEXT, cc TEXT, cf TEXT, hourly INTERGER )").then(() => {
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char, Unassigned, XP, Health, cm , cc, cf, hourly) VALUES (?, ?, ?,?,?,?,?,?,?,?, ?, ?, ?,?)", [message.author.id, 1, "recruit", "N/A", "N/A", "glock", message.author.avatarURL, 5, 0, 100, "yes", "yes", "1"]);
                console.log("created new user charachter")
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
    if (command === '-setpfp') {
        
        let link = args.slice(0).join(" ");
        
            
        sql.run(`UPDATE scores SET Char = ${link} WHERE userId = ${message.author.id}`);
            message.reply("Your new profile picture was set")
        
    }
    if (command === '-hourly') {
        var no = "no"
        var yes = "yes"

        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (row.hourly === 1) {


                sql.run(`UPDATE scores SET points = ${row.points + 100} WHERE userId = ${message.author.id}`);
                message.reply("Your collected your hourly pay")
                sql.run(`UPDATE scores SET hourly = ${row.hourly + 1} WHERE userId = ${message.author.id}`);
                setTimeout(myfunction, 3600000)
                function myfunction() {

                    sql.run(`UPDATE scores SET hourly = ${row.hourly - 1} WHERE userId = ${message.author.id}`);
                }
            } else {
                message.reply('It has not been an hour yet!!!')
            }
        });

    }

    if (command === '-mine') {
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            if (row.cm === "yes") {
                var inv = row.inventory
                var rank = row.rank
                var step1 = Math.floor((Math.random() * 10) + 1);
                var step2 = step1 / 2
                var step3 = Math.floor(step2);
                message.reply("I sent the results to your console")
                console.log(step3);
                if (rank === "Grand Master") {
                    var stage1 = Math.floor((Math.random() * 10) + 1);
                    var stage2 = stage1 / 2
                    var stage3 = Math.floor(stage2)
                    if (stage3 === 1) {
                        var ainv = inv + " Coal"
                        console.log(ainv)
                        sql.run(`UPDATE scores SET inventory = ${row.inventory || ainv} WHERE userId = ${message.author.id}`);
                        msg.reply("you found coal")

                    }
                    if (stage3 === 2) {
                        var ainv = inv + " Iron Ore"
                        console.log(ainv)
                        sql.run(`UPDATE scores SET inventory = ${row.inventory || ainv} WHERE userId = ${message.author.id}`);
                        message.reply("you found Iron Ore")
                        console.log("saved")
                    }
                    if (stage3 === 3) {
                        var ainv = inv + " Coal"
                        console.log(ainv)
                        sql.run(`UPDATE scores SET inventory = ${row.inventory || ainv} WHERE userId = ${message.author.id}`);
                        message.reply("you found coal")
                    }
                    if (stage3 === 4) {
                        var ainv = inv + " Iron Ore"
                        console.log(ainv)
                        sql.run(`UPDATE scores SET inventory = ${row.inventory || ainv} WHERE userId = ${message.author.id}`);
                        message.reply("you found Iron Ore")
                    }
                    if (stage3 === 5) {
                        var ainv = inv + " Coal"
                        console.log(ainv)
                        sql.run(`UPDATE scores SET inventory = ${row.inventory} WHERE userId = ${message.author.id}`);
                        message.reply("you found coal")
                    }
                } else {
                    if (row.XP < 1000) {
                        var stage1 = Math.floor((Math.random() * 10) + 1);
                        var stage2 = stage1 / 2
                        var stage3 = Math.floor(stage2)
                        if (stage3 === 1) {
                            var ainv = inv + " Coal"
                            sql.run(`UPDATE scores SET inventory = ${ainv} WHERE userId = ${message.author.id}`);
                            msg.reply("you found coal")

                        }
                        if (stage3 === 2) {
                            var ainv = inv + " Iron Ore"
                            sql.run(`UPDATE scores SET inventory = ${ainv} WHERE userId = ${message.author.id}`);
                            msg.reply("you found Iron Ore")
                            console.log("saved")
                        }
                        if (stage3 === 3) {
                            var ainv = inv + " Coal"
                            sql.run(`UPDATE scores SET inventory = ${ainv} WHERE userId = ${message.author.id}`);
                            msg.reply("you found coal")
                        }
                        if (stage3 === 4) {
                            var ainv = inv + " Iron Ore"
                            sql.run(`UPDATE scores SET inventory = ${ainv} WHERE userId = ${message.author.id}`);
                            msg.reply("you found Iron Ore")
                        }
                        if (stage3 === 5) {
                            var ainv = inv + " Coal"
                            sql.run(`UPDATE scores SET inventory = ${ainv} WHERE userId = ${message.author.id}`);
                            msg.reply("you found coal")
                        }



                    } else {
                        if (row.xp < 5000) {
                            var stage1 = Math.floor((Math.random() * 10) + 1);
                            var stage2 = stage1 / 2
                            var stage3 = Math.floor(stage2)
                            if (stage1 === 1) {
                                sql.run(`UPDATE scores SET inventory = ${inv + " Coal"} WHERE userId = ${message.author.id}`);
                                msg.reply("you found coal")

                            }
                            if (stage1 === 2) {
                                sql.run(`UPDATE scores SET inventory = ${inv + " Iron Ore"} WHERE userId = ${message.author.id}`);
                                msg.reply("you found Iron Ore")
                            }
                            if (stage1 === 3) {
                                sql.run(`UPDATE scores SET inventory = ${inv + " Coal"} WHERE userId = ${message.author.id}`);
                                msg.reply("you found coal")
                            }
                            if (stage1 === 4) {
                                sql.run(`UPDATE scores SET inventory = ${inv + " Iron Ore"} WHERE userId = ${message.author.id}`);
                                msg.reply("you found Iron Ore")
                            }
                            if (stage1 === 5) {
                                sql.run(`UPDATE scores SET inventory = ${inv + " Coal"} WHERE userId = ${message.author.id}`);
                                msg.reply("you found coal")
                            }
                        }
                    }

                }


            }
        })
        

    }
    if (command === "-item") {
        let name = args.slice(0).join(" ");
        sql.get(`SELECT * FROM Items WHERE Name ="${name}"`).then(row => {
            if (!row) return message.reply("Item not found :sob:  !");


            message.channel.send({
                "embed": {

                    "url": "https://discordapp.com",
                    "color": 8596224,
                    "timestamp": "2018-02-28T00:53:21.614Z",
                    "footer": {
                        "icon_url": row.Picture,
                        "text": "Generated by SP-Rpg"
                    },
                    "thumbnail": {
                        "url": row.Picture
                    },

                    "author": {
                        "name": row.Name,
                        "url": "https://discordapp.com",
                        "icon_url": row.Picture
                    },
                    "fields": [

                        {
                            "name": "Item:",
                            "value": row.Name,
                            "inline": true
                        },
                        {
                            "name": "Description",
                            "value": row.Description,
                           

                        },
                        {
                            "name": "Use",
                            "value": row.Use,
                            
                        }

                    ]
                }
            })
        })






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

                        },
                        {
                            "name": "Unassigned Points",
                            "value": row.Unassigned,
                            "inline": true

                        },
                        {
                            "name": "XP",
                            "value": row.XP,
                            "inline": true

                        },
                        {
                            "name": "Health",
                            "value": row.Health,
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
