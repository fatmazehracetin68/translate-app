import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getLanguages, translateText } from "./redux/actions";
import { setAnswer } from "./redux/slices/translateSlice";

function App() {
  const dispatch = useDispatch();

  const { isLoading, error, languages } = useSelector((store) => store.languageReducer);

  const translateState = useSelector((store) => store.translateReducer);
  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "eng",
  });
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );
  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  // setText(translateState.answer);
  // dispatch(setAnswer(text));

  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri</h1>
        {/* üst bölüm */}
        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            isDisabled={isLoading}
            isLoading={isLoading}
            options={formatted}
            onChange={(e) => setSourceLang(e)}
            className="flex-1  border-4 border-sky-800  bg-sky-200 "
          />
          <button
            onClick={handleSwap}
            className="bg-purple-300 py-2 px-6 hover:bg-purple-50 transition rounded border-4 border-purple-500 text-black"
          >
            Değiş
          </button>
          <Select
            value={targetLang}
            isDisabled={isLoading}
            isLoading={isLoading}
            options={formatted}
            onChange={(e) => setTargetLang(e)}
            className="flex-1  border-4 border-sky-800  bg-sky-300 "
          />
        </div>
        {/* metin bölümleri */}

        <div className="flex gap-3 mt-5 md:gap[105px] max-md:flex-col ">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] bg-purple-200 text-black text-[20px] rounded p-[10px] border-4 border-purple-800"
            ></textarea>
          </div>
          <div className="flex-1">
            <textarea
              disabled
              value={translateState.answer}
              className="w-full min-h-[300px] max-h-[500px] bg-sky-200 text-[20px] border-4 border-sky-800 rounded p-[10px] text-gray-500"
            ></textarea>
          </div>
        </div>

        {/* buton */}
        <button
          disabled={translateState.isLoading}
          onClick={handleTranslate}
          className="border-4 border-sky-500  bg-sky-100  text-black px-5 py-3 rounded-md font-semibold hover:ring-2 hover-g-zinc-900 cursor-pointer transition mt-3"
        >
          Çevir
        </button>
      </div>
    </div>
  );
}

export default App;
