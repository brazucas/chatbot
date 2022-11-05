import { SessionHandlerInterface } from './session-handler.interface';

export interface SessionTriggerInterface {
  get id(): number;
  get message(): string;
  get isPartial(): boolean;
  get createdAt(): Date;
  get isActive(): boolean;

  getSessionsTriggered(): Promise<SessionHandlerInterface[]>;
  triggerForMessage(message: string): Promise<boolean>;
}
