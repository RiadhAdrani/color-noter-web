import Spinner from "../components/Spinner.js";
import { STATES } from "../utils/Utils.js";
import UI from "../models/UI.js";

const { Div } = Components;

export default () => {
     return Div({
          flags: {
               renderIf: UI.state === STATES.isLogging,
          },
          styleSheet: {
               className: "app-loading",
               normal: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
               },
          },
          children: [Spinner(), "Loading..."],
     });
};
