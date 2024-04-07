import axios from "axios";
import { quizAxios } from "./instances";

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export type QuestionItem = Question & { optionList: string[] };

type OpenDbReturn = {
  response_code: number;
  results: Question[];
};

export const getQuestionListFetch = async (count: QuizCount, level: QuizLevel): Promise<QuestionItem[]> => {
  try {
    const res = await axios.get<OpenDbReturn>(`https://opentdb.com/api.php?amount=${count}&difficulty=${level}&type=multiple`);

    if (res.data.response_code === 0) {
      return res.data.results.map((question) => {
        const { correct_answer, incorrect_answers } = question;

        return {
          ...question,
          optionList: shuffle([correct_answer, ...incorrect_answers]),
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const results: OpenDbReturn = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "Where is the train station Llanfair?",
      correct_answer: "Wales",
      incorrect_answers: ["Moldova", "Czech Republic", "Denmark"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "What is the name of the Jewish New Year?",
      correct_answer: "Rosh Hashanah",
      incorrect_answers: ["Elul", "New Year", "Succoss"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Television",
      question: "In the show &quot;Tengen Toppa Gurren Lagann&quot; what is the name of the character who force everyone to live underground?",
      correct_answer: "Lordgenome",
      incorrect_answers: ["Kingloname", "Lord Genome", "King Loname"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Geography",
      question: "What is the largest country in the world ?",
      correct_answer: "Russian Federation",
      incorrect_answers: ["China", "Canada", "Brazil"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Geography",
      question: "What is the largest country in the world ?",
      correct_answer: "Russian Federation",
      incorrect_answers: ["China", "Canada", "Russia"],
    },
  ],
};
