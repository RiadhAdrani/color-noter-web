import { STATES } from "../utils/Utils.js";

export default class UI {
     constructor() {}

     static state = STATES.isLoggedOut;

     static toast = {
          text: "",
          show: false,
          close: function () {
               updateAfter(() => {
                    this.show = false;
               });
          },
          display: function (text) {
               updateAfter(() => {
                    this.show = true;
                    this.text = text;
                    setTimeout(() => {
                         updateAfter(() => {
                              this.show = false;
                         });
                    }, 5000);
               });
          },
     };

     static search = setState("");

     static targetNote = undefined;

     static changeColor = false;

     static changeState(newState) {
          updateAfter(() => {
               UI.state = newState;
          });
     }

     static editNote = (note) => {
          updateAfter(() => {
               const tn = { ...note };
               UI.targetNote = { ...tn };
          });
     };

     static cancelEditNote() {
          updateAfter(() => {
               UI.targetNote = undefined;
          });
     }
}
