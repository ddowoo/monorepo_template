type QuizCount = 5 | 10 | 15 | null;
type QuizLevel = "easy" | "medium" | "hard" | null;

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: "multiple";
};
