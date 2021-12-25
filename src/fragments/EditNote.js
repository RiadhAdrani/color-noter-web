import { Themes } from "../models/Themes.js";
import VerticalSpace from "../components/VerticalSpace.js";
import Button from "../components/Button.js";
import HorizontalSpace from "../components/HorizontalSpace.js";
import FAIcon from "../components/FAIcon.js";
import UI from "../models/UI.js";
import { deleteNote, save } from "../services/Actions.js";
import { ColorWindow } from "./EditColor.js";
import TextContent from "./TextContent.js";
import ListContent from "./ListContent.js";
import User from "../models/User.js";

const { Div, Input } = Components;

export default () => {
     let note = UI.targetNote ? UI.targetNote : { color: 0 };

     const renderIf = User.get.notes.find((item) => item.uid === note.uid) ? true : false;

     return Div({
          flags: {
               renderIf: UI.targetNote !== undefined,
          },
          styleSheet: {
               className: "edit-view",
               normal: {
                    backgroundColor: "#1e1e1e55",
                    width: "100vw",
                    height: "100%",
                    zIndex: 2,
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
               },
          },
          children: [
               Div({
                    styleSheet: {
                         className: "editable",
                         normal: {
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              margin: "0px 50px",
                              padding: "30px",
                              backgroundColor: "#1e1e1e",
                              border: `solid 5px ${Themes[note.color].dark}`,
                              borderRadius: "5px",
                         },
                         mediaQueries: [
                              {
                                   condition: "(max-width:600px)",
                                   normal: { margin: "10px", padding: "10px" },
                              },
                         ],
                    },
                    children: [
                         Div({
                              styleSheet: {
                                   className: "edit-top",
                                   normal: {
                                        display: "flex",
                                        flexDirection: "row",
                                   },
                                   mediaQueries: [
                                        {
                                             condition: "(max-width:600px)",
                                             normal: { flexDirection: "column" },
                                        },
                                   ],
                              },
                              children: [
                                   Input({
                                        value: note.title,
                                        placeholder: "Your title goes here",
                                        styleSheet: {
                                             className: "edit-title",
                                             placeholder: {
                                                  color: Themes[note.color].light,
                                             },
                                             normal: {
                                                  background: "transparent",
                                                  padding: "10px 10px",
                                                  border: "none",
                                                  marginRight: "10px",
                                                  color: "inherit",
                                                  fontSize: "1.5em",
                                                  flex: 1,
                                                  fontFamily: "Noto Sans",
                                             },
                                             focus: {
                                                  outline: `solid 1px ${Themes[note.color].dark}`,
                                                  color: "white",
                                             },
                                        },
                                        events: {
                                             onChange: (e) => {
                                                  updateAfter(() => {
                                                       note.title = e.target.value;
                                                  });
                                             },
                                        },
                                   }),
                                   Div({
                                        styleSheet: {
                                             className: "edit-color",
                                             normal: {
                                                  padding: "5px",
                                                  background: Themes[note.color].normal,
                                                  borderRadius: "50%",
                                                  border: `2px solid ${Themes[note.color].lighter}`,
                                             },
                                             hover: {
                                                  cursor: "pointer",
                                                  transform: "scale(1.1)",
                                             },
                                             mediaQueries: [
                                                  {
                                                       condition: "(max-width:600px)",
                                                       normal: {
                                                            display: "flex",
                                                            borderRadius: "5px",
                                                            justifyContent: "center",
                                                            marginTop: "10px",
                                                       },
                                                       hover: {
                                                            cursor: "pointer",
                                                            transform: "scale(1)",
                                                       },
                                                  },
                                             ],
                                        },
                                        children: [FAIcon("fas fa-palette")],
                                        events: {
                                             onClick: () => {
                                                  ColorWindow.set((color) => {
                                                       updateAfter(() => {
                                                            UI.targetNote.color = color;
                                                            ColorWindow.exit();
                                                       });
                                                  });
                                             },
                                        },
                                   }),
                              ],
                         }),
                         VerticalSpace("20px"),
                         TextContent(note),
                         ListContent(note),
                         VerticalSpace("20px"),
                         Div({
                              styleSheet: {
                                   className: "edit-buttons-wrapper",
                                   normal: {
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: "auto",
                                   },
                                   mediaQueries: [
                                        {
                                             condition: "(max-width:600px)",
                                             normal: {
                                                  flexDirection: "column",
                                                  margin: "0px",
                                                  justifyContent: "space-evenly",
                                             },
                                        },
                                   ],
                              },
                              children: [
                                   Button(
                                        [FAIcon("fas fa-trash"), "Delete"],
                                        () => {
                                             updateAfter(() => {
                                                  deleteNote();
                                                  UI.cancelEditNote();
                                             });
                                        },
                                        Themes[note.color],
                                        renderIf
                                   ),
                                   HorizontalSpace("5px"),
                                   Button(
                                        [FAIcon("fas fa-window-close"), "Cancel"],
                                        () => {
                                             UI.cancelEditNote();
                                        },
                                        Themes[note.color]
                                   ),
                                   HorizontalSpace("5px"),
                                   Button(
                                        [FAIcon("fas fa-save"), "Save"],
                                        () => {
                                             save(note);
                                             UI.cancelEditNote();
                                        },
                                        Themes[note.color]
                                   ),
                              ],
                         }),
                    ],
               }),
          ],
     });
};
