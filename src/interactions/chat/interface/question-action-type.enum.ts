const QuestionActionDef = {
  HttpRequest: 'HttpRequest',
} as const;

type QuestionAction = typeof QuestionActionDef[keyof typeof QuestionActionDef];

export default QuestionAction;
