const SessionStatusDef = {
  ACTIVE: 'ACTIVE',
  COMPLETED_IDLE: 'COMPLETED_IDLE',
  COMPLETED_FLOW: 'COMPLETED_FLOW',
  COMPLETED_USER: 'COMPLETED_USER',
} as const;

type SessionStatus = typeof SessionStatusDef[keyof typeof SessionStatusDef];

export default SessionStatus;
