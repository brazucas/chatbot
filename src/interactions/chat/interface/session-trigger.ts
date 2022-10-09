import { SessionInterface } from './session';

export interface SessionTriggerInterface {
  get id(): number;
  get message(): string;
  get isPartial(): boolean;
  get createdAt(): Date;
  get isActive(): boolean;

  getSessionsTriggered(): Promise<SessionInterface[]>;
  triggerForMessage(message: string): Promise<boolean>;
}
