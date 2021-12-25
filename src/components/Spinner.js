import { Theme } from "../models/Themes.js";

const { Div } = Components;

export default () => {
     return Div({
          styleSheet: {
               className: "loading-spinner",
               normal: {
                    height: "30px",
                    width: "30px",
                    border: `solid 5px ${Theme.get().normal}`,
                    borderRadius: "50%",
                    borderColor: `${Theme.get().normal} transparent ${
                         Theme.get().normal
                    } transparent`,
                    marginBottom: "15px",
                    animation: "spin 2s linear infinite",
               },
          },
     });
};
