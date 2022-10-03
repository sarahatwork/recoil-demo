import { atom, DefaultValue, selector, useRecoilState } from "recoil";
import moment from "moment";

const dateState = atom({
  key: "dateDataFlow",
  default: Date.now(),
});

const dateDisplayState = selector({
  key: "dateDisplay",
  get: ({ get }) => {
    return moment(get(dateState)).format("YYYY-MM-DD");
  },
  set: ({ set }, newVal) => {
    set(
      dateState,
      newVal instanceof DefaultValue ? newVal : moment(newVal).unix() * 1000
    );
  },
});

const DataFlow = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [dateDisplay, setDateDisplay] = useRecoilState(dateDisplayState);

  return (
    <>
      <div>Date value</div>
      <input
        type="number"
        value={date}
        onChange={(e) => setDate(Number(e.target.value))}
      />
      <div>Formatted date</div>
      <input
        type="date"
        value={dateDisplay}
        onChange={(e) => setDateDisplay(e.target.value)}
      />
    </>
  );
};

export default DataFlow;
