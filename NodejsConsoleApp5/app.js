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
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char, Unassigned ,XP, Health, cm , cc, cf,hourly) VALUES (?, ?, ?,?,?,?,?,?,?,? , ?, ?, ?,?)", [message.author.id, 1, "Private", "N/A", "N/A", "glock", message.author.avatarURL, 5, 0, 100, "yes", "yes", "yes", "1"]);
                console.log("created new user charachter")
            } else {
                
                sql.run(`UPDATE scores SET points = ${row.points + 0} WHERE userId = ${message.author.id}`);
                console.log("created new user charachter")
            }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, rank TEXT , faction TEXT, inventory TEXT, weapon TEXT, char TEXT,Unassigned INTERGER, XP INTERGER, Health TEXT, cm TEXT, cc TEXT, cf TEXT, hourly INTERGER )").then(() => {
                sql.run("INSERT INTO scores (userId, points, rank, faction , inventory , weapon, char, Unassigned, XP, Health, cm , cc, cf, hourly) VALUES (?, ?, ?,?,?,?,?,?,?,?, ?, ?, ?,?)", [message.author.id, 1, "Private", "N/A", "N/A", "glock", message.author.avatarURL, 5, 0, 100, "yes", "yes", "1"]);
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
                            "value":"Damage: " + row.Use,
                            
                        }

                    ]
                }
            })
        })






    }
    if (command === "-adventure") {

        var determiner;
        var fenemy;
        var damadge;
        sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
            console.log("adventure stage 1 is a yes")
            sql.get(`SELECT * FROM Pve WHERE id ="${message.author.id}"`).then(row2 => {
                
                if (!row2) {
                    
                        console.log("adventure stage 3 is a yes")
                        sql.run("INSERT INTO Pve (id, enemy, eh ) VALUES (?, ?, ?)", [message.author.id, "none", 0]);
                        console.log("created new user charachter")
                        message.reply(`enabled battles for you ${message.author.username}`)
                   
                    
                }
                else {
                    console.log("adventure stage 4 is a yes")



                    if (row2.enemy !== "none") {

                        sql.get(`SELECT * FROM Items WHERE Name ="${row.weapon}"`).then(row4 => {

                            if (row2.eh < 0) {
                                message.channel.send("The " + row2.enemy + " was killed by " + message.author + ", " + message.author + " recieves  " +row2.xpt + "xp")
                                sql.run(`UPDATE Pve SET enemy = "${"none"}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE scores SET XP = ${row.XP + row2.xpt} WHERE userId = ${message.author.id}`);
                                sql.get(`SELECT * FROM RL WHERE Rank ="${row.rank}"`).then(row5 => {
                                    
                                    if (row5.Xp < row.XP  ) {
                                        sql.get(`SELECT * FROM RL WHERE rid ="${row5.rid + 1}"`).then(row6 => {

                                            sql.run(`UPDATE scores SET rank = "${row6.Rank}" WHERE userId = ${message.author.id}`);
                                            sql.run(`UPDATE scores SET Health = ${row6.Health + 50} WHERE userId = ${message.author.id}`);
                                            message.channel.send("Congrats, " + message.author + " youve been promoted to " + row6.Rank)

                                        })

                                    }
                                })
                            } else {
                                if (row2.yhealth < 0) {
                                    sql.run(`UPDATE Pve SET enemy = "${"none"}" WHERE id = ${message.author.id}`);
                                    message.channel.send(`${message.author} has died`)
                                    
                                }
                                else {
                                    var took = row2.damage;
                                    sql.run(`UPDATE Pve SET eh = ${row2.eh - row4.Use} WHERE id = ${message.author.id}`);
                                   
                                    message.channel.send(row4.atp + " " + row4.Use + " damage and " + "took " + row2.damage + " damage and the enemy has " + row2.eh + " health left" + " you have " + row2.yhealth + "left")
                                    console.log("took " + took)
                                }

                            }

                        })
                    }
                    else {
                        determiner = Math.random();
                        determiner = determiner * 10;
                        determiner = determiner/2;
                        determiner = Math.floor(determiner);
                        console.log(determiner)
                        console.log(row.rank);
                        if (row.rank === "Private") {
                            console.log("stage 5 is working " + row.rank)
                            sql.get(`SELECT * FROM PEnemies WHERE id ="${determiner}"`).then(row3 => {
                                sql.run(`UPDATE Pve SET enemy = "${row3.Name}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE Pve SET eh = "${row3.Health}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE Pve SET xpt = "${row3.xptg}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE Pve SET yhealth = "${row.Health}" WHERE id = ${message.author.id}`);
                                
                                damadge = row3.Damage;
                                sql.run(`UPDATE Pve SET damage = "${damadge}" WHERE id = ${message.author.id}`);
                                message.reply(`You encountered an ${row3.Name}`)
                                console.log(damadge)
                               

                            })

                        }
                        if (row.XP > 1000) {
                            sql.get(`SELECT * FROM Current WHERE userid ="${message.author.id}"`).then(row7 => {
                                sql.get(`SELECT * FROM locations WHERE name ="${row7.location}"`).then(row8 => {
                                    sql.get(`SELECT * FROM ${row8.etype} WHERE id ="${determiner}"`).then(row9 => {
                                        if (!row9) {

                                        } else {
                                            sql.run(`UPDATE Pve SET enemy = "${row9.Name}" WHERE id = ${message.author.id}`);
                                            sql.run(`UPDATE Pve SET eh = "${row9.Health}" WHERE id = ${message.author.id}`);
                                            sql.run(`UPDATE Pve SET xpt = "${row9.xptg}" WHERE id = ${message.author.id}`);
                                            sql.run(`UPDATE Pve SET yhealth = "${row.Health}" WHERE id = ${message.author.id}`);

                                            damadge = row9.Damage;
                                            sql.run(`UPDATE Pve SET damage = "${damadge}" WHERE id = ${message.author.id}`);
                                            message.reply(`You encountered an ${row9.Name}`)
                                            console.log(damadge)
                                        }


                                    })
                                })
                            })

                        }
                        console.log("yep")
                    }
                }

                })

        }).catch(console.log("error"))





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
    if (command === "-factions") {
       


            message.channel.send({
                "embed": {

                    "url": "https://discordapp.com",
                    "color": 8596224,
                    "timestamp": "2018-02-28T00:53:21.614Z",
                    "footer": {
                        
                        "text": "Generated by SP-Rpg"
                    },
                    
                     

                    "author": {
                        "name": message.author.username,
                        "url": "https://discordapp.com",
                        
                    },
                    "fields": [

                        {
                            "name": "Rogue Nation",
                            "value": "The Rogue Nation faction is a faction built upon expirimental technology and stealth (assasains). They never fight in an agressive manner and rely on their stealth and technology to win fights!!!",
                            "inline": true
                        },
                        {
                            "name": "Scarlet",
                            "value": "Scarlet is a faction based on Naval Warfare. They build their ships out of the best material around and hardly have any losses.",
                            "inline": true

                        },
                        {
                            "name": "Storm Killers",
                            "value": "The Storm Killers are a faction based on ground combat and overwhelming their openents! They use no stealth and take the most direct approach to conquer their goal.",
                            "inline": true
                        },
                        {
                            "name": "The Hidden",
                            "value": "The Hidden are a faction built on using gold old fashion technology and stealth to get the dirty work of society done. They typically blend with society and never know eachothers names. Secrecy is key.",
                            "inline": true

                        },
                        {
                            "name": "Warblades",
                            "value": "The Warblades are a loud and proud faction focusing on aerial combat. Every pilot when they get out of the accademy is an ace. ",
                            "inline": true

                        },
                        {
                            "name": "Outsiders",
                            "value": "The Outsiders are a faction founded on the outcasts of society. They approach their endgoal with odd means but have a generally high success rate when it comes to accomplishing tasks.",
                            "inline": true

                        },
                        {
                            "name": "Swiss Reich",
                            "value": "The Swiss Reich is a small, yet well armed and funded private military organization." +
"The primary focus of the Reich is armored warfare, taking great interest in anything with tracks or wheels mounting a 20mm cannon or more." +
"Every soldier is assigned a vehicle of their choice, being a commander at the highest, and mechanic at the lowest.",
                            "inline": true

                        },
                        {
                            "name": "The United Soviet States of Norway",
                            "value": "A general named Markz (so original) wanted change, and he wanted it now! Therefore, like any sane man, he started the Red Revolution, not red because of blood, of which was much, but red of communism. Henceforth, he overthrew the government and started this country." ,

                            "inline": true

                        }

                    ]
                }
            })
       






    }
    if (command === "-choose") {
        let name = args.slice(0).join(" ");
        sql.get(`SELECT * FROM Factions WHERE Name ="${name}"`).then(row => {
            if (!row) return message.reply("There is not a faction by that name :sob: ");
            else {
                sql.run(`UPDATE scores SET faction = "${name}" WHERE userId = ${message.author.id}`);
                message.reply("Congrats: You Have joined the "+name+ " Faction")
                sql.get(`SELECT * FROM Current WHERE userid="${message.author.id}"`).then(row1 => {
                    if (!row1) return message.reply("You are unregistered on the map :sob: ");
                    else {
                        sql.run(`UPDATE Current SET location="${row.Academy}" WHERE userid = ${message.author.id}`);
                        message.reply(row.Leader + ": Welcome to the faction recruit I am your faction leader. You made a wise choice!!! Now let me take you back to " + row.Academy + " for your training!!!")
                    }

                })


            }

        })





    }
    if (command === "-assign") {
        let number = args[0];
        let name = args.slice(1).join(" ");
        let search = args.slice(1).join("");
        var newnum5;
        console.log(search)
        
        sql.get(`SELECT * FROM Skills WHERE id ="${message.author.id}"`).then(row => {
            console.log("Check on stage 1")
            if (name === "xp bonus") {
                newnum5 = row.xpbonus + number
                console.log(newnum5)
            }
            if (name === "fishing chance") {
                newnum5 = row.fishingchance + number
            }
            if (name === "mining boost") {
                newnum5 = row.miningbonus + number
            }
            if (name === "attack") {
                newnum5 = row.attack + number
            }
            if (name === "defence") {
                newnum5 = row.miningbonus + number
            }
            if (name === "chopping") {
                newnum5 = row.chopping + number
            }
            if (!row) return message.reply("There is not a Skill  by that name :sob: ");
            else {
                sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row1 => {
                    if (row1.Unassigned <= number) {
                        sql.run(`UPDATE Skills SET ${name} = "${newnum5}" WHERE id = ${message.author.id}`);
                        message.reply("assigned " + number + " points to " + search)
                        sql.run(`UPDATE scores SET Unassigned = ${row.Unassigned - 5} WHERE userId = ${message.author.id}`);
                    } else {message.reply("Seriously you really though you were gonna pull of using more points then you had???") }
                })
               


            }

        }).catch(console.log("error"))





    }
    if (message.content === '-skills') {
        sql.get(`SELECT * FROM Skills WHERE id = "${message.author.id}"`).then(row1 => {
            if (!row1) {
                sql.run("INSERT INTO Skills (id,chopping,xpbonus,fishingchance, attack, defence,miningbonus) VALUES (?, ?,?,?,?,?,?)", [message.author.id, 0, 0, 0, 0,0,0]);
                console.log("created new Entry")
                message.channel.send({
                    "embed": {

                        "url": "https://discordapp.com",
                        "color": 8596224,
                        "timestamp": "2018-02-28T00:53:21.614Z",
                        "footer": {

                            "text": "Generated by SP-Rpg"
                        },
                        

                        "author": {
                            "name": message.author.username,
                            "url": "https://discordapp.com"
                        },
                        "fields": [


                            {
                                "name": "Mining bonus",
                                "value": row1.miningbonus,
                                "inline": true

                            },
                            {
                                "name": "Xp bonus",
                                "value": row1.xpbonus,
                                "inline": true
                            },
                            {
                                "name": "Chopping Bonus",
                                "value": row1.chopping,
                                "inline": true

                            },
                            {
                                "name": "Area",
                                "value": row1.fishingchance,
                                "inline": true

                            },
                            {
                                "name": "Area",
                                "value": row1.attack,
                                "inline": true

                            },
                            {
                                "name": "Area",
                                "value": row1.defence,
                                "inline": true

                            },


                        ]
                    }
                })
            } else {
                console.log("branch 2")
                sql.get(`SELECT * FROM Skills WHERE id ="${message.author.id}"`).then(row => {

                    message.channel.send({
                        "embed": {

                            "url": "https://discordapp.com",
                            "color": 8596224,
                            "timestamp": "2018-02-28T00:53:21.614Z",
                            "footer": {

                                "text": "Generated by SP-Rpg"
                            },


                            "author": {
                                "name": message.author.username,
                                "url": "https://discordapp.com"
                            },
                            "fields": [


                                {
                                    "name": "Mining bonus",
                                    "value": row1.miningbonus,
                                    "inline": true

                                },
                                {
                                    "name": "Xp bonus",
                                    "value": row1.xpbonus,
                                    "inline": true
                                },
                                {
                                    "name": "Chopping Bonus",
                                    "value": row1.chopping,
                                    "inline": true

                                },
                                {
                                    "name": "Fishing Chance",
                                    "value": row1.fishingchance,
                                    "inline": true

                                },
                                {
                                    "name": "Attack",
                                    "value": row1.attack,
                                    "inline": true

                                },
                                {
                                    "name": "Defence",
                                    "value": row1.defence,
                                    "inline": true

                                },


                            ]
                        }
                    })

                    console.log("Updated charachters location")
                })
            }

        }).catch(() => {
            console.error;

            console.log("Error")

        });

    }

    
    if(message.content === '-location') {
        sql.get(`SELECT * FROM Current WHERE userid = "${message.author.id}"`).then(row1 => {
            if (!row1) {
                sql.run("INSERT INTO Current (userid, location) VALUES (?, ?)", [message.author.id, "beginning camp"]);
                console.log("created new Entry")
                message.reply('Registered and added you to the map')
            } else {
                sql.get(`SELECT * FROM locations WHERE name ="${row1.location}"`).then(row => {

                    message.channel.send({
                        "embed": {

                            "url": "https://discordapp.com",
                            "color": 8596224,
                            "timestamp": "2018-02-28T00:53:21.614Z",
                            "footer": {

                                "text": "Generated by SP-Rpg"
                            },
                            "thumbnail": {
                                "url": "http://www.qygjxz.com/data/out/170/5256338-ninja-pictures.png"
                            },

                            "author": {
                                "name": row.Name,
                                "url": "https://discordapp.com",
                                "icon_url": "http://www.qygjxz.com/data/out/170/5256338-ninja-pictures.png"
                            },
                            "fields": [

                                
                                {
                                    "name": "Lore",
                                    "value": row.Lore,
                                    "inline": true

                                },
                                {
                                    "name": "Npc's",
                                    "value": row.Npc,
                                    "inline": true
                                },
                                {
                                    "name": "Type",
                                    "value": row.Type,
                                    "inline": true

                                },
                                {
                                    "name": "Area",
                                    "value": row.Land,
                                    "inline": true

                                },
                                {
                                    "name": "Connections",
                                    "value": row.connections,
                                    "inline": true

                                }
                               

                            ]
                        }
                    })
                    
                    console.log("Updated charachters location")
                })
                }
                    
        }).catch(() => {
            console.error;
           
                console.log("Error")
          
            });

    }
    if (command === '-gquest') {
        let tt = args.slice(0).join(" ");
        sql.get(`SELECT * FROM Current WHERE userid = "${message.author.id}"`).then(row1 => {
            sql.get(`SELECT * FROM locations WHERE Name ="${row1.location}"`).then(row2 => {
                var included = row2.Npc.includes(`${tt}`);
                if (included) {
                    sql.get(`SELECT * FROM npc WHERE Name ="${tt}"`).then(row3 => {
                        message.channel.send(row3.dialoga)
                        sql.get(`SELECT * FROM qprogress WHERE id ="${message.author.id}"`).then(row4 => {
                            if (!row4) {
                                sql.run("INSERT INTO qprogress (id, qid, stage, objective, onquest) VALUES (?, ?,?,?,?)", [message.author.id, 0, 0, "none", "no"]);
                            }
                            else {
                                sql.run(`UPDATE qprogress SET qid = "${row3.qgiven}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE qprogress SET onquest = "${yes}" WHERE id = ${message.author.id}`);
                                sql.run(`UPDATE qprogress SET stage = "${1}" WHERE id = ${message.author.id}`);
                                sql.get(`SELECT * FROM Quests WHERE id ="${row3.qgiven}"`).then(row5 => {
                                    sql.run(`UPDATE qprogress SET objective = "${row5.o1}" WHERE id = ${message.author.id}`);
                                })


                            }

                        })




                    })

                }else{message.channel.send('There is no npc nearby by that name')}


            })

        })



    }
    if (command === '-quest') {
        sql.get(`SELECT * FROM qprogress WHERE id ="${message.author.id}"`).then(row => {
            var stage = row.stage;
            var quest = row.qid;
            
            sql.get(`SELECT * FROM Quests WHERE id ="${quest}"`).then(row1 => {
                message.channel.send({
                    "embed": {

                        "url": "https://discordapp.com",
                        "color": 8596224,
                        "timestamp": "2018-02-28T00:53:21.614Z",
                        "footer": {

                            "text": "Generated by SP-Rpg"
                        },
                        "thumbnail": {
                            "url": "http://www.qygjxz.com/data/out/170/5256338-ninja-pictures.png"
                        },

                        "author": {
                            "name": row1.Name,
                            "url": "https://discordapp.com",
                            "icon_url": "http://www.qygjxz.com/data/out/170/5256338-ninja-pictures.png"
                        },
                        "fields": [



                            {
                                "name": "Current Objective",
                                "value": row.objective,
                                "inline": true

                            }


                        ]
                    }
                })
            })
        })

    }
    if (command === '-travel') {
        let goto = args.slice(0).join(" ");
        sql.get(`SELECT * FROM Current WHERE userid = "${message.author.id}"`).then(row1 => {
            sql.get(`SELECT * FROM locations WHERE Name ="${row1.location}"`).then(row2 => {
                if (!row1) {
                    sql.run("INSERT INTO Current (userid, location) VALUES (?, ?)", [message.author.id, "beginning camp"]);
                    console.log("created new Entry")
                    message.reply('Registered and added you to the map')
                } else {
                    sql.get(`SELECT * FROM locations WHERE Name ="${goto}"`).then(row => {
                        console.log(row.Name)
                        var included = row2.connections.includes(`${goto}`);
                        if (included) {
                            if (!row) {
                                message.reply('invalid location')
                            }
                            else {
                                console.log(row.Restricted)
                                if (row.Restricted === "yes") {
                                    
                                    if (message.author.id === dev1) {
                                        sql.run(`UPDATE Current SET location = "${goto}" WHERE userId = ${message.author.id}`);
                                        message.reply(`traveled to ${goto}`)

                                    }
                                    else{message.reply("Sorry this area is restricted")}
                                }
                                if (row.Restricted === "no") {
                                    sql.run(`UPDATE Current SET location = "${goto}" WHERE userId = ${message.author.id}`);
                                    message.reply(`traveled to ${goto}`)
                                }

                            }


                        }
                        else { "invalid connection" }
                    })
                }

            }).catch(() => {
                console.error;

                console.log("Error")

            });
        })
    }
    if (command === '-warp') {
        if (message.author.id === dev1) {
            let goto = args.slice(0).join(" ");
            sql.get(`SELECT * FROM Current WHERE userid = "${message.author.id}"`).then(row1 => {
                sql.get(`SELECT * FROM locations WHERE Name ="${row1.location}"`).then(row2 => {
                    if (!row1) {
                        sql.run("INSERT INTO Current (userid, location) VALUES (?, ?)", [message.author.id, "beginning camp"]);
                        console.log("created new Entry")
                        message.reply('Registered and added you to the map')
                    } else {
                        sql.get(`SELECT * FROM locations WHERE Name ="${goto}"`).then(row => {
                            console.log(row.Name)
                            
                            
                                if (!row) {
                                    message.reply('invalid location')
                                }
                                else {
                                    console.log(row.Restricted)
                                    if (row.Restricted === "yes") {

                                        if (message.author.id === dev1) {
                                            sql.run(`UPDATE Current SET location = "${goto}" WHERE userId = ${message.author.id}`);
                                            message.reply(`traveled to ${goto}`)

                                        }
                                        else { message.reply("Sorry this area is restricted") }
                                    }
                                    if (row.Restricted === "no") {
                                        sql.run(`UPDATE Current SET location = "${goto}" WHERE userId = ${message.author.id}`);
                                        message.reply(`traveled to ${goto}`)
                                    }

                                }


                            
                            
                        })
                    }

                }).catch(() => {
                    console.error;

                    console.log("Error")

                });
            })
        }else{message.reply("Sorry you lack the permissions to do this action")}
    }


    //end


});





client.login(config.token);
