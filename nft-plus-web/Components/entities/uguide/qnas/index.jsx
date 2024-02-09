import { QNA as BaseQna } from "./Qna";
import { QnaProvider } from "./useQnaContext";

const Qna = () => {
  return (
    <QnaProvider>
      <BaseQna />
    </QnaProvider>
  );
};

export default Qna;
