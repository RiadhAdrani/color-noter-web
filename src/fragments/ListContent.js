import AddTodo from "../components/AddTodo.js";
import Todo from "../components/Todo.js";
import { Themes } from "../models/Themes.js";
import UI from "../models/UI.js";

const { Div } = Components;

export default (note) => {
     const renderIf = Array.isArray(note.content);

     if (renderIf) {
          return Div({
               flags: {
                    renderIf,
               },
               children: [
                    AddTodo(),
                    Div({
                         styleSheet: {
                              className: "todos-container",
                              normal: {
                                   display: "flex",
                                   flexDirection: "column",
                                   height: "300px",
                                   overflowY: "auto",
                                   padding: "5px",
                              },
                              webkitScrollbar: {
                                   width: "10px",
                              },
                              webkitScrollbarTrack: {
                                   boxShadow: "inset 0 0 2px grey",
                              },
                              webkitScrollbarThumb: {
                                   background: Themes[UI.targetNote.color].dark,
                              },
                              webkitScrollbarThumbActive: {
                                   background: Themes[UI.targetNote.color].darker,
                              },
                              mediaQueries: [
                                   {
                                        condition: "(max-width:600px)",
                                        normal: { margin: "5px", padding: "0px" },
                                   },
                              ],
                         },
                         children: note.content.map((item) => Todo(item)),
                    }),
               ],
          });
     } else {
          return null;
     }
};
