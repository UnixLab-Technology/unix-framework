import "dotenv/config";
import {
    Client, 
    Partials, 
    IntentsBitField,  
    Collection,
} from "discord.js";
import fs from "fs";
import path from "path";

const fileCondition = (fileName) => fileName.endsWith(".js");
export class ExtendedClient extends Client {
    commands = new Collection();
    buttons = new Collection();
    selects = new Collection();
    modals = new Collection();
    constructor(){
        super({
            intents: Object.keys(IntentsBitField.Flags),
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent,
                Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        })
    }

    start(){
        this._registerModules();
        this._registerEvents();
        this.login(process.env.BOT_TOKEN);
    }

    _registerCommands(commands){
        this.application?.commands.set(commands)
        .then(() => {
            console.log("✅ Slash Commands (/) defined");
        })
        .catch(error => {
            console.log(`❌ An error occurred while trying to set the Slash Commands (/): \n${error}`);
        })
    }

    _registerModules(){
        const slashCommands = [];

        const commandsPath = path.join(__dirname, "..", "commands");

        fs.readdirSync(commandsPath).forEach(local => {

            fs.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async fileName => {

                const command = (await import(`../commands/${local}/${fileName}`))?.default;
                const { name, buttons, selects, modals } = command

                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);

                    if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects) selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals) modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });

        this.on("ready", () => this._registerCommands(slashCommands))
    }

    _registerEvents(){
        const eventsPath = path.join(__dirname, "..", "events");


        fs.readdirSync(eventsPath).forEach(local => {

            fs.readdirSync(`${eventsPath}/${local}`).filter(fileCondition)
            .forEach(async fileName => {
                const { name, once, run } = (await import(`../events/${local}/${fileName}`))?.default
            
                try {
                    if (name) (once) ? this.once(name, run) : this.on(name, run);
                } catch (error) {
                    console.log(`An error occurred on event: ${name} \n${error}`);
                }
            })

        })
    }
}