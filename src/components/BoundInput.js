import { Theme } from "../models/Themes.js";

const { Input } = Components;

export default (state, placeholder, type, autoComplete) => {
     return Input({
          type,
          value: state.value,
          placeholder,
          autoComplete,
          styleSheet: {
               className: "bound-input",
               normal: {
                    padding: "7px 20px",
                    margin: "5px 0px",
                    border: `solid 3px transparent`,
                    transitionDuration: "0.2s",
               },
               focus: {
                    borderColor: Theme.get().dark,
                    outline: "none",
               },
          },
          events: {
               onChanged: (e) => {
                    state.setValue(e.target.value);
               },
          },
     });
};
