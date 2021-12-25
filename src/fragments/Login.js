import BoundInput from "../components/BoundInput.js";
import Button from "../components/Button.js";
import FAIcon from "../components/FAIcon.js";
import VerticalSpace from "../components/VerticalSpace.js";
import { STATES } from "../utils/Utils.js";
import { login } from "../services/Actions.js";
import UI from "../models/UI.js";
import { Theme } from "../models/Themes.js";

const { H2, P, Form } = Components;

const username = setState("");
const password = setState("");

let alert = "";

export default () => {
     return Form({
          flags: {
               renderIf: UI.state === STATES.isLoggedOut,
          },
          styleSheet: {
               className: "login-view",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
               },
          },
          children: [
               H2({ text: "Login" }),
               VerticalSpace("20px"),
               BoundInput(username, "Username", "text", "username"),
               BoundInput(password, "Password", "password", "current-password"),
               P({
                    flags: { renderIf: alert !== "" },
                    styleSheet: {
                         className: "alert-text",
                         normal: { color: Theme.get().light },
                    },
                    text: [FAIcon("fas fa-exclamation-circle"), alert],
               }),
               P({
                    styleSheet: {
                         className: "register-text",
                         normal: { color: Theme.get().normal, cursor: "pointer" },
                    },
                    text: [FAIcon("fas fa-user-plus"), "No account ? Register here !"],
                    events: {
                         onClick: () => {
                              UI.changeState(STATES.isSingningUp);
                         },
                    },
               }),
               VerticalSpace("20px"),
               Button("Login", () => {
                    alert = "";
                    login(username.value, password.value, () => {
                         updateAfter(() => {
                              alert = "Invalid combination ! Please try again.";
                         });
                    });
               }),
          ],
     });
};
