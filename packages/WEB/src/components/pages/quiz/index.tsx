import { Suspense } from "react";
import Questions from "./components/questions";
import { BoxButton } from "../../atoms/buttons";

const Quiz = () => {
  return (
    <article className="flex flex-col h-full justify-between">
      <Suspense fallback={<p>퀴즈 기다리는 중....</p>}>
        <Questions />
      </Suspense>
      <BoxButton text="제출하기" role="primary" />
    </article>
  );
};

export default Quiz;
