import Login from "./fragments/Login.js";
import NavBar from "./fragments/NavBar.js";
import Dashboard from "./fragments/Dashboard.js";
import Load from "./fragments/Load.js";
import Register from "./fragments/Register.js";
import EditNote from "./fragments/EditNote.js";
import { EditColor } from "./fragments/EditColor.js";
import User from "./models/User.js";
import { Themes } from "./models/Themes.js";
import Toast from "./fragments/Toast.js";

const { Div } = Components;

export default () => {
     return Div({
          styleSheet: {
               className: "app-view",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    maxHeight: "100vh",
                    overflowY: "auto",
               },
               webkitScrollbar: {
                    width: "10px",
               },
               webkitScrollbarTrack: {
                    boxShadow: "inset 0 0 2px grey",
               },
               webkitScrollbarThumb: {
                    background: Themes[User.get.user_color].dark,
               },
               webkitScrollbarThumbActive: {
                    background: Themes[User.get.user_color].dark,
               },
          },
          children: [
               NavBar(),
               Toast(),
               Login(),
               Load(),
               Dashboard(),
               Register(),
               EditNote(),
               EditColor(),
          ],
     });
};
