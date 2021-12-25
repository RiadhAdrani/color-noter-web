import FAIcon from "../components/FAIcon.js";
import { Theme } from "../models/Themes.js";
import UI from "../models/UI.js";
import { STATES } from "../utils/Utils.js";

const { Div, Input } = Components;

const show = setState(false);

export default () => {
     return Div({
          flags: { renderIf: UI.state === STATES.isConnected },
          styleSheet: {
               className: "search-view",
               normal: {
                    display: "flex",
                    flexDirection: "row",
               },
          },
          children: [
               Div({
                    styleSheet: {
                         className: "search-toggle",
                         hover: {
                              cursor: "pointer",
                         },
                    },
                    events: {
                         onClick: () => {
                              if (show.value) {
                                   UI.search.value = "";
                              }
                              show.setValue(!show.value);
                         },
                    },
                    children: FAIcon(!show.value ? "fa fa-search" : "fa fa-times-circle", () => {}),
               }),
               Input({
                    value: UI.search.value,
                    placeholder: "Search your notes",
                    flags: {
                         renderIf: show.value,
                    },
                    styleSheet: {
                         className: "search-input",
                         normal: {
                              background: "transparent",
                              color: Theme.get().lighter,
                              border: "none",
                              padding: "2px 15px",
                         },
                         focus: {
                              outline: `1px solid ${Theme.get().normal}`,
                         },
                         placeholder: {
                              color: Theme.get().normal,
                         },
                    },
                    events: {
                         onChange: (e) => {
                              UI.search.setValue(e.target.value);
                         },
                    },
               }),
          ],
     });
};
