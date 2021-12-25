import { Theme } from "../models/Themes.js";

import FAIcon from "./FAIcon.js";

const { Div } = Components;

export default (icon, onClick = () => {}) => {
     return Div({
          styleSheet: {
               className: "floating-action-button",
               normal: {
                    background: Theme.get().dark,
                    padding: "5px",
                    borderRadius: "50%",
                    transitionDuration: "0.15s",
                    margin: "7px",
                    transform: "scale(1.1)",
               },
               hover: {
                    background: Theme.get().darker,
                    cursor: "pointer",
                    transform: "scale(1.2)",
               },
               active: { transform: "scale(0.9)" },
          },
          children: [FAIcon(icon)],
          events: {
               onClick,
          },
     });
};
