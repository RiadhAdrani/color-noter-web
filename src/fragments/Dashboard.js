import CardListLine from "../components/CardListLine.js";
import { divideIntoLines, selectLineSize, STATES } from "../utils/Utils.js";
import UI from "../models/UI.js";
import FloatingSection from "./FloatingSection.js";
import { filterNotes } from "../services/Actions.js";

const { Div } = Components;

export default () => {
     const divList = divideIntoLines(filterNotes(), selectLineSize());

     return Div({
          flags: {
               renderIf: UI.state === STATES.isConnected,
          },
          styleSheet: {
               className: "app-dashboard",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    width: "90%",
                    padding: "20px 0px",
                    alignSelf: "center",
               },
          },
          children: [
               ...divList.map((line) => CardListLine([...line], selectLineSize())),
               FloatingSection(),
          ],
     });
};
