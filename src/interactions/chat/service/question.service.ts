import { ServiceInterface } from "@/interactions/chat/interface/service.interface";
import { SessionInterface } from "@/interactions/chat/interface/session.interface";
import { QuestionServiceInterface } from "../interface/question-service.interface";
import { QuestionInterface } from "../interface/question.interface";

export class QuestionService
  extends ServiceInterface
  implements QuestionServiceInterface
{
  private static instance: QuestionService;
  private constructor() {
    super();
  }

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  public async findFirst(
    session: SessionInterface
  ): Promise<QuestionInterface> {
    throw new Error("Method not implemented.");
  }
}
