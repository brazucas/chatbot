export interface QuestionOptionInterface {
  get id(): number;
  get title(): string;
  get isActive(): boolean;
  get createdAt(): Date;
}
