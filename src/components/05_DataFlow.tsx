import { atom, DefaultValue, selector, useRecoilState } from "recoil";
import moment from "moment";

const dateState = atom({
  key: "date_example05",
  default: Date.now(),
});

const dateDisplayState = selector({
  key: "dateDisplay_example05",
  get: ({ get }) => {
    return moment(get(dateState)).format("YYYY-MM-DD");
  },
  set: ({ set }, newVal) => {
    // When the user selects a date in the format YYYY-MM-DD via the form input,
    // we update the `dateState` atom
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
