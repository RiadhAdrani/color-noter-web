import FloatingButton from "../components/FloatingButton.js";
import { CheckList, TextNote } from "../models/Note.js";
import UI from "../models/UI.js";
import User from "../models/User.js";

const { Div } = Components;

export default () => {
     return Div({
          styleSheet: {
               className: "floating-section",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    padding: "20px",
                    bottom: "20px",
                    right: "20px",
               },
          },
          children: [
               FloatingButton("fas fa-sticky-note", () => {
                    UI.editNote(new TextNote("New Note", "", User.get.user_color));
               }),
               FloatingButton("fas fa-check-circle", () => {
                    UI.editNote(new CheckList("New Note", [], User.get.user_color));
               }),
          ],
     });
};
