import { Themes } from "../models/Themes.js";
import ToDo from "../models/ToDo.js";
import UI from "../models/UI.js";
import FAIcon from "./FAIcon.js";

const { Div, Input } = Components;

const description = setState("");

export default () => {
     return Div({
          styleSheet: {
               className: "add-todo-item",
               normal: {
                    display: "flex",
                    flexDirection: "row",
                    padding: "5px",
               },
          },
          children: [
               Input({
                    value: description.value,
                    placeholder: "Todo description",
                    type: "text",
                    maxLength: "75",
                    styleSheet: {
                         className: "todo-description",
                         normal: {
                              padding: "10px",
                              marginLeft: "10px",
                              flex: 1,
                              background: "transparent",
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
                              description.setValue(e.target.value);
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
                                   UI.targetNote.content = [
                                        ToDo(description.value),
                                        ...UI.targetNote.content,
                                   ];
                                   description.setValue("");
                              });
                         },
                    },
                    children: [FAIcon("fas fa-plus-square")],
               }),
          ],
     });
};
