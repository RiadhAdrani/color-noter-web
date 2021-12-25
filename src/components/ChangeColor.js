import { ColorWindow } from "../fragments/EditColor.js";
import { Theme, Themes } from "../models/Themes.js";
import Button from "./Button.js";
import VerticalSpace from "./VerticalSpace.js";

const { Div, P } = Components;

export default () => {
     return Div({
          styleSheet: {
               className: "change-color-view",
               normal: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px 10px",
                    background: "#1e1e1e",
                    margin: "5px",
                    boxShadow: `0 0 2px 0px ${Theme.get().normal}`,
               },
          },
          children: [
               P({
                    text: "Choose a color",
                    styleSheet: { className: "change-color-prompt", normal: { fontSize: "1.4em" } },
               }),
               VerticalSpace("20px"),
               Div({
                    styleSheet: {
                         className: "colors-container",
                         normal: {
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-evenly",
                              padding: "10px",
                         },
                    },
                    children: [
                         ...Themes.map((t, i) =>
                              Div({
                                   styleSheet: {
                                        className: `color-${i}`,
                                        normal: {
                                             background: t.dark,
                                             height: "50px",
                                             width: "50px",
                                             margin: "5px",
                                             borderRadius: "50%",
                                             transition: "0.2s",
                                        },
                                        hover: {
                                             transform: "scale(1.2)",
                                             cursor: "pointer",
                                        },
                                   },
                                   events: {
                                        onClick: () => {
                                             ColorWindow.onSelected(i);
                                             ColorWindow.exit();
                                        },
                                   },
                              })
                         ),
                    ],
               }),
               VerticalSpace("20px"),
               Button("Cancel", ColorWindow.exit),
          ],
     });
};
