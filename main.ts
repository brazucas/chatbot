import { SoundsInteraction } from "@/interactions/sounds.interaction";
import { ChatbotClient } from "@/typings";
import { WhatsappClient } from "@whatsapp/whatsapp.client";

const interactions = [new SoundsInteraction()];

(async () => {
  console.log("Initializing...");

  const providers: ChatbotClient<any>[] = [new WhatsappClient(interactions)];

  for (const provider of providers) {
    await provider.initialize();
  }

  console.log(
    `Loaded ${providers.length} providers and ${interactions.length} interactions`
  );
})();
