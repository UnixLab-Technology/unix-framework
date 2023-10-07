import { client } from "../..";
import { Event } from "../../types/Event";

export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (interaction.isAutocomplete() && command.autoComplete){
            command.autoComplete(interaction);
            return;
        }

        if (interaction.isChatInputCommand()) {
            const options = interaction.options
            command.run({ client, interaction, options })
            return;
        }
    },
})