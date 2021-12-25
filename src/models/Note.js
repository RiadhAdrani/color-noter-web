import { generateUID } from "../utils/Utils.js";

class Note {
     constructor(title, content, color, uid) {
          this.title = title;
          this.content = content;
          this.color = color;
          this.creationDate = new Date().getTime();
          this.modificationDate = new Date().getTime();
          this.uid = uid;
     }

     toJSON() {
          return {};
     }

     static createFromData(data) {
          const note = new Note(data.title, data.content, data.color, data.uid);
          note.creationDate = data.creationDate;
          note.modificationDate = data.modificationDate;
          return note;
     }
}

class TextNote extends Note {
     constructor(title, content, color) {
          super(title, content, color, generateUID("T"));
     }

     toJSON() {
          return {
               color: this.color,
               content: this.content,
               creationDate: this.creationDate,
               modificationDate: this.modificationDate,
               title: this.title,
               uid: this.uid,
          };
     }
}

class CheckList extends Note {
     constructor(title, content, color) {
          super(title, content, color, generateUID("C"));
     }

     toJSON() {
          return {
               color: this.color,
               content: this.content,
               creationDate: this.creationDate,
               modificationDate: this.modificationDate,
               title: this.title,
               uid: this.uid,
          };
     }
}

export { TextNote, CheckList };
