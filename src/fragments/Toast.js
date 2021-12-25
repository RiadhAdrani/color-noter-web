import FAIcon from "../components/FAIcon.js";
import HorizontalSpace from "../components/HorizontalSpace.js";
import { Theme } from "../models/Themes.js";
import UI from "../models/UI.js";

const { Div, P } = Components;

export default () => {
     return Div({
          flags: {
               renderIf: UI.toast.show,
          },
          styleSheet: {
               className: "toast-view",
               normal: {
                    position: "absolute",
                    bottom: "0px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: "20px",
                    zIndex: 4,
               },
          },
          children: Div({
               children: [
                    P({
                         text: UI.toast.text,
                         style: { alignSelf: "center" },
                    }),
                    FAIcon("fa fa-times-circle", () => {
                         UI.toast.close();
                    }),
               ],
               styleSheet: {
                    className: "toast-text",
                    normal: {
                         backgroundColor: Theme.get().darker,
                         border: `solid 2px ${Theme.get().dark}`,
                         padding: "10px 20px",
                         borderRadius: "2.5px",
                         textAlign: "center",
                         display: "flex",
                         alignItem: "center",
                         animation: "fade-in-up 0.7s ease",
                    },
                    animations: [
                         {
                              name: "fade-in-up",
                              steps: {
                                   "0%": { transform: "translateY(20px)", opacity: 0 },
                                   "100%": { transform: "translateY(0px)", opacity: 1 },
                              },
                         },
                    ],
               },
          }),
     });
};
