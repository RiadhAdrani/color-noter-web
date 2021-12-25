import { STATES } from "../utils/Utils.js";
import { changeColor, disconnect, sync } from "../services/Actions.js";
import { Theme } from "../models/Themes.js";
import { ColorWindow } from "./EditColor.js";
import FAIcon from "../components/FAIcon.js";
import UI from "../models/UI.js";
import User from "../models/User.js";
import Search from "./Search.js";

const { Div, H1, P } = Components;

export default () => {
     return Div({
          styleSheet: {
               className: "app-bar",
               normal: {
                    padding: "5px 20px",
                    background: Theme.get().dark,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
               },
               mediaQueries: [
                    {
                         condition: "(max-width:600px)",
                         normal: { flexDirection: "column", justifyContent: "center" },
                    },
               ],
          },
          children: [
               H1({
                    text: [`Color Noter `],
                    styleSheet: {
                         className: "app-title",
                         normal: { fontSize: "1.25em" },
                         mediaQueries: [
                              {
                                   condition: "(max-width:600px)",
                                   normal: {
                                        display: "flex",
                                        flexDirection: "column",
                                        textAlign: "center",
                                   },
                              },
                         ],
                    },
               }),
               Search(),
               Div({
                    flags: { renderIf: UI.state === STATES.isConnected },
                    styleSheet: {
                         className: "app-bar-options",
                         normal: {
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                         },
                         mediaQueries: [
                              {
                                   condition: "(max-width:600px)",
                                   normal: { flexDirection: "column" },
                              },
                         ],
                    },
                    children: [
                         Div({
                              children: [
                                   FAIcon("fa fa-user", () => {
                                        ColorWindow.set((color) => {
                                             changeColor(color);
                                             ColorWindow.exit();
                                        });
                                   }),
                                   FAIcon("fa fa-sync-alt", sync),
                                   FAIcon("fa fa-sign-out-alt", disconnect),
                              ],
                         }),
                    ],
               }),
          ],
     });
};
