import { Theme } from "../models/Themes.js";

const { Button } = Components;

export default (text, onClick, theme, renderIf = true) => {
     return Button({
          flags: {
               renderIf,
          },
          text,
          styleSheet: {
               className: `standard-button${theme ? `-colored` : ""}`,
               normal: {
                    padding: "5px 30px",
                    background: theme ? theme.dark : Theme.get().dark,
                    color: "white",
                    border: "none",
                    transitionDuration: "0.2s",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    borderRadius: "2.5px",
                    margin: "2px",
               },
               hover: {
                    cursor: "pointer",
               },
               active: {
                    transform: "scale(0.95)",
                    background: theme ? theme.darker : Theme.get().darker,
               },
          },
          events: { onClick },
     });
};
