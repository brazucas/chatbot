import { WhatsappClient } from '@whatsapp/whatsapp.client';
import bootstrap from '@src/bootstrap';
import SoundsInteraction from '@src/interactions/sounds.interaction';

const interactions = [new SoundsInteraction()];
const clients = [new WhatsappClient(interactions)];

bootstrap(clients);
