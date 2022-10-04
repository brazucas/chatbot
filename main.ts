import { bootstrap } from "@/bootstrap";
import { SoundsInteraction } from "@/interactions/sounds.interaction";
import { WhatsappClient } from "@whatsapp/whatsapp.client";

const interactions = [new SoundsInteraction()];
const clients = [new WhatsappClient(interactions)];

bootstrap(clients);
