import { Themes } from "../models/Themes.js";
import UI from "../models/UI.js";
import FAIcon from "./FAIcon.js";

const { Div, Input } = Components;

export default (todo) => {
     return Div({
          styleSheet: {
               className: "todo-item",
               normal: {
                    display: "flex",
                    flexDirection: "row",
                    padding: "5px",
               },
          },
          children: [
               Input({
                    styleSheet: {
                         className: "todo-check",
                         normal: { transform: "scale(1.5)", margin: "auto 0px" },
                         checked: {
                              background: Themes[UI.targetNote.color].dark,
                         },
                    },
                    type: "checkbox",
                    checked: todo.doneDate != -1,
                    events: {
                         onChanged: (e) => {
                              updateAfter(() => {
                                   UI.targetNote.modificationDate = new Date().getTime();
                                   UI.targetNote.content.find((t) => t.uid === todo.uid).doneDate =
                                        e.target.checked ? new Date().getTime : -1;
                              });
                         },
                    },
               }),
               Input({
                    value: todo.description,
                    placeholder: "Todo description",
                    type: "text",
                    maxLength: "75",
                    styleSheet: {
                         className: `todo-description${todo.doneDate === -1 ? "" : "-done"}`,
                         normal: {
                              padding: "10px",
                              marginLeft: "10px",
                              flex: 1,
                              background: "transparent",
                              textDecorationLine: todo.doneDate !== -1 ? "line-through" : "",
                              border: "none",
                              color: "inherit",
                              border: "1px solid transparent",
                         },
                         focus: {
                              outline: "none",
                              borderColor: Themes[UI.targetNote.color].dark,
                         },
                    },
                    events: {
                         onChanged: (e) => {
                              updateAfter(() => {
                                   UI.targetNote.modificationDate = new Date().getTime();
                                   UI.targetNote.content.find(
                                        (t) => t.uid === todo.uid
                                   ).description = e.target.value;
                              });
                         },
                    },
               }),
               Div({
                    styleSheet: {
                         className: "todo-delete",
                         normal: {
                              padding: "2px",
                              border: `solid 1px ${Themes[UI.targetNote.color].dark}`,
                              margin: "2px",
                         },
                         hover: {
                              background: Themes[UI.targetNote.color].dark,
                              cursor: "pointer",
                         },
                    },
                    events: {
                         onClick: () => {
                              updateAfter(() => {
                                   UI.targetNote.content = UI.targetNote.content.filter(
                                        (t) => t.uid !== todo.uid
                                   );
                              });
                         },
                    },
                    children: [FAIcon("fas fa-trash")],
               }),
          ],
     });
};
