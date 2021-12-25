import NoteCard from "./NoteCard.js";

const { Div } = Components;

export default (notes, n) => {
     const children = notes.map((n) => NoteCard({ data: n }));

     if (notes.length < n) {
          while (children.length < n) {
               children.push(
                    Div({
                         styleSheet: {
                              className: "empty-note-card",
                              normal: { flex: 1, margin: "7px", padding: "10px 20px" },
                         },
                    })
               );
          }
     }

     return Div({
          styleSheet: {
               className: "card-list-line",
               normal: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginBottom: "0px",
               },
          },
          children: children,
     });
};
