import { expect, test } from "vitest";
import { Answer } from "../entities/answer";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answers-repository";

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestions = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestions.execute({
    instructorId: "1",
    questionId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});
