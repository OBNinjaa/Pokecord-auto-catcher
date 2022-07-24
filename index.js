const Discord = require("legend.js");
const colors = require("colors");
const figlet = require("figlet");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(
    figlet.textSync("Pokecord", {
      font: "colossal",
      horizontalLayout: "default",
      verticalLayout: "default",
    }).yellow
  );
  console.log(`Pokecord Auto Catcher`.red);
  console.log(`Developed by: OBNinjaa\n`.red);
});

client.on("message", (message) => {
  if (message.channel.type === "dm") return;
  if (message.guild.id !== config.server) return;
  if (message.author.id !== "705016654341472327") return;
  message.embeds.some((item) => {
    if (item.title.includes("A Wild Pokémon has Appeared")) {
      let specialId = `${item.image.url.split("/regular/")[1].split(".png")[0]}`;

      let rawdata = fs.readFileSync("data.json");
      let pokemon = JSON.parse(rawdata);

      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].id == specialId) {
          console.log(`Sniped the pokemon!`.yellow + ` ${pokemon[i].name.green}`);
          return message.channel.send(`p!catch ${pokemon[i].name}`);
        }
      }
    }
  });
});

client.login(config.token);
