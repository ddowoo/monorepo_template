import { Dispatch, SetStateAction } from "react";
import { useQuiz } from "../../../../store/server/useQuiz";
import { useSearchParams } from "react-router-dom";
import { useQuizConfig } from "../../../../store/client/quizConfig";

type Props = {
  isSolving: boolean;
  nowSolvingIndex: number;
  setIsSolving: Dispatch<SetStateAction<boolean>>;
};

const Questions = () => {
  const { count, level } = useQuizConfig();
  const { data: questionList } = useQuiz(count, level);

  const [searchParams] = useSearchParams();
  const idx = searchParams.get("idx") ?? "0";
  console.log(questionList);
  console.log("idx : ", idx);
  const quiz = questionList && questionList[parseInt(idx)];

  return (
    <div className="text-wrap">
      <p>{`${idx + 1}. ${quiz?.question}`}</p>
      {quiz?.optionList.map((option, index) => {
        return (
          <p key={`quiz_option_${option}`} className="my-2 cursor-pointer">
            {index + 1}. {option}
          </p>
        );
      })}
    </div>
  );
};

export default Questions;
