import { Themes } from "../models/Themes.js";

const { TextArea } = Components;

export default (note) => {
     const renderIf = note.uid ? (note.uid.split("")[0] === "T" ? true : false) : false;

     return TextArea({
          flags: {
               renderIf,
          },
          maxLength: "5000",
          text: note.content,
          placeholder: "What's on your mind today ?",
          events: {
               onChange: (e) => {
                    updateAfter(() => {
                         note.content = e.target.value;
                    });
               },
          },
          styleSheet: {
               className: "edit-content",
               placeholder: {
                    color: Themes[note.color].light,
               },
               normal: {
                    background: "transparent",
                    padding: "10px 10px",
                    border: "none",
                    color: "inherit",
                    fontFamily: "inherit",
                    resize: "none",
                    height: "300px",
                    overflowY: "auto",
               },
               webkitScrollbar: {
                    width: "10px",
               },
               webkitScrollbarTrack: {
                    boxShadow: "inset 0 0 2px grey",
               },
               webkitScrollbarThumb: {
                    background: Themes[note.color].dark,
               },
               webkitScrollbarThumbActive: {
                    background: Themes[note.color].darker,
               },
               focus: {
                    outline: `solid 1px ${Themes[note.color].dark}`,
                    color: "white",
               },
          },
     });
};
