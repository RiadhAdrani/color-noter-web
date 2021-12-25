import App from "./src/App.js";
import { computeSize } from "./src/utils/Utils.js";

RecursiveDOM.app = () => App();
RecursiveDOM.devMode = false;

window.displayType = setState(computeSize());

RecursiveDOM.events = {
     onResize: () => {
          const n = window.displayType.value;
          const nw = computeSize();

          if (nw != n) {
               displayType.setValue(nw);
          }
     },
};

RecursiveDOM.staticStyle = {
     import: [
          "url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')",
     ],
     selectors: {
          "html,body, #app": {
               margin: "0px",
               background: "#1e1e1e",
               color: "white",
               display: "flex",
               flexDirection: "column",
               minHeight: "100vh",
               fontFamily: "Roboto",
               fontSize: "17px",
          },
          "h1,h2,h3,h4,h5,h6": {
               fontFamily: "Noto Sans",
               margin: "0px",
               padding: "5px 0px",
          },
          p: {
               margin: "0px",
          },
     },
     animations: {
          spin: {
               "0%": {
                    transform: "rotate(0deg)",
               },
               "100%": {
                    transform: "rotate(360deg)",
               },
          },
     },
};

RecursiveDOM.render();
