import { Themes } from "../models/Themes.js";
import UI from "../models/UI.js";
import FAIcon from "./FAIcon.js";

const { Div, H3, P } = Components;

export default ({ data }) => {
     const content = (() => {
          if (data.uid.split("")[0] === "T") {
               return P({
                    text: data.content.substr(0, 150) + "...",
                    styleSheet: {
                         className: "note-card-text",
                         normal: { padding: "5px", wordBreak: "break-all" },
                    },
               });
          } else {
               return Div({
                    children: data.content.slice(0, 3).map((item) =>
                         P({
                              text: [
                                   FAIcon(
                                        item.doneDate === -1
                                             ? "fas fa-square"
                                             : "fas fa-check-square"
                                   ),
                                   item.description,
                              ],
                              style: {
                                   textDecorationLine: item.doneDate === -1 ? "" : "line-through",
                              },
                         })
                    ),
               });
          }
     })();

     return Div({
          styleSheet: {
               className: data.uid,
               normal: {
                    padding: "10px 20px",
                    margin: "7px",
                    transition: "0.2s",
                    borderLeft: `solid 7px ${Themes[data.color].dark}`,
                    flex: 1,
               },
               hover: {
                    backgroundColor: `${Themes[data.color].darker}55`,
                    cursor: "pointer",
                    transform: "scale(1.05)",
               },
          },
          events: {
               onClick: () => {
                    UI.editNote(data);
               },
          },
          children: [H3({ text: data.title }), content],
     });
};
