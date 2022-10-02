import { WhatsappClient } from "@whatsapp/whatsapp.client";

export interface ChatbotListener<T> {
    onMessage(message: T): void;
    initialize(): void;
}

const providers: ChatbotListener<any>[] = [
    new WhatsappClient(),
]

providers.forEach((provider) => provider.initialize());