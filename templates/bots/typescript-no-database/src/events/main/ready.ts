import { client } from "../..";
import { Event } from "../../structs/types/Event";

export default new Event({
    name: "ready",
    once: true,
    run(){
        
        const { commands, buttons, selects, modals } = client;

        console.log("✅ Bot online");
        console.log(`Commands loaded: ${commands.size}`);
        console.log(`Buttons loaded: ${buttons.size}`);
        console.log(`Select Menus loaded: ${selects.size}`);
        console.log(`Modals loaded: ${modals.size}`);

    },
})