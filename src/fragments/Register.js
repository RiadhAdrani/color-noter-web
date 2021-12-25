import BoundInput from "../components/BoundInput.js";
import Button from "../components/Button.js";
import FAIcon from "../components/FAIcon.js";
import VerticalSpace from "../components/VerticalSpace.js";
import { STATES } from "../utils/Utils.js";
import { register } from "../services/Actions.js";
import UI from "../models/UI.js";
import { Theme } from "../models/Themes.js";

const { H2, P, Form } = Components;

const username = setState("");
const password = setState("");
const email = setState("");

let alert = "";

export default () => {
     return Form({
          flags: {
               renderIf: UI.state === STATES.isSingningUp,
          },
          styleSheet: {
               className: "register-view",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
               },
          },
          children: [
               H2({ text: "Register" }),
               VerticalSpace("20px"),
               BoundInput(username, "Username", "text", "username"),
               BoundInput(password, "Password", "password", "current-password"),
               BoundInput(email, "Email", "Email", "email"),
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
                         className: "sing-in-text",
                         normal: { color: Theme.get().normal, cursor: "pointer" },
                    },
                    text: [
                         FAIcon("fas fa-sign-in-alt"),
                         "Already have an account ? Sign in here !",
                    ],
                    events: {
                         onClick: () => {
                              UI.changeState(STATES.isLoggedOut);
                         },
                    },
               }),
               VerticalSpace("20px"),
               Button("Login", () => {
                    UI.changeState(STATES.isLogging);
                    alert = "";

                    const usr = username.value.trim();
                    const psd = password.value.trim();
                    const eml = email.value.trim();

                    if (usr.length < 3) {
                         alert = "Username is too short ! Minimum length is 3";
                    }
                    if (psd.length < 6) {
                         alert = "Password is too short ! Minimum length is 6";
                    }
                    if (eml.length < 6) {
                         alert = "Email is too short ! Minimum length is 6";
                    }

                    if (alert != "") {
                         updateAfter(() => {
                              UI.changeState(STATES.isSingningUp);
                         });
                    } else {
                         register(
                              usr,
                              psd,
                              eml,
                              () => {
                                   alert = "";
                              },
                              () => {
                                   updateAfter(() => {
                                        alert = "Combination already exists";
                                   });
                              }
                         );
                    }
               }),
          ],
     });
};
