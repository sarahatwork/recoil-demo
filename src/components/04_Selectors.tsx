import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";

const dateState = atom({
  key: "date_example04",
  default: Date.now(),
});

const dateDisplayState = selector({
  key: "dateDisplay_example04",
  get: ({ get }) => {
    return moment(get(dateState)).format("YYYY-MM-DD");
  },
});

const Selectors = () => {
  const [date, setDate] = useRecoilState(dateState);
  const dateDisplay = useRecoilValue(dateDisplayState);

  return (
    <>
      <div>Date value</div>
      <input
        type="number"
        value={date}
        onChange={(e) => setDate(Number(e.target.value))}
      />
      <div>
        The formatted date is: <b>{dateDisplay}</b>
      </div>
    </>
  );
};

export default Selectors;
