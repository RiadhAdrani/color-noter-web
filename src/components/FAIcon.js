import { Theme } from "../models/Themes.js";

const { I } = Components;

export default (name, onClick) => {
     return I({
          className: name,
          styleSheet: {
               className: `fa-icon-wrapper${typeof onClick === "function" ? "-clickable" : ""}`,
               normal: { padding: "10px" },
               hover:
                    typeof onClick === "function"
                         ? {
                                backgroundColor: Theme.get().darker,
                                transform: "scale(1.1)",
                                cursor: "pointer",
                           }
                         : {},
          },
          events: {
               onClick: () => {
                    if (typeof onClick === "function") {
                         onClick();
                    }
               },
          },
     });
};
