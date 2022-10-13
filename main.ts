import bootstrap from '@src/bootstrap';
import SoundsInteraction from '@src/interactions/sounds.interaction';
import { WhatsappClient } from '@whatsapp/whatsapp.client';

const interactions = [new SoundsInteraction()];
const clients = [new WhatsappClient(interactions)];

bootstrap(clients);
