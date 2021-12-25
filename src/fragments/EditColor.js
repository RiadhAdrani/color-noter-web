import ChangeColor from "../components/ChangeColor.js";

const { Div } = Components;

class ColorWindow {
     constructor() {}

     static onSelected = undefined;

     static exit() {
          updateAfter(() => {
               ColorWindow.onSelected = undefined;
          });
     }

     static set(f) {
          updateAfter(() => {
               ColorWindow.onSelected = (c) => {
                    f(c);
               };
          });
     }
}

const EditColor = () => {
     return Div({
          flags: {
               renderIf: ColorWindow.onSelected !== undefined,
          },
          styleSheet: {
               className: "edit-color-window",
               normal: {
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    background: "#1e1e1edd",
                    zIndex: 3,
               },
          },
          children: ChangeColor(),
     });
};

export { EditColor, ColorWindow };
