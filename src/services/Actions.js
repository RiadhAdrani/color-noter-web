import { STATES } from "../utils/Utils.js";
import {
     addUser,
     getUserByID,
     getUserByUsername,
     tryLoggingIn,
     updateFirestore,
} from "./FirebaseFirestore.js";
import User from "../models/User.js";
import UI from "../models/UI.js";

function login(username, password, onFailure) {
     UI.changeState(STATES.isLogging);

     tryLoggingIn(
          username,
          password,
          (data) => {
               User.get.set(data);
               UI.changeState(STATES.isConnected);
          },
          () => {
               UI.changeState(STATES.isLoggedOut);
               onFailure();
          }
     );
}

function register(username, password, email, onSuccess, onFailure) {
     UI.changeState(STATES.isLogging);

     tryLoggingIn(
          username,
          password,
          () => {
               onFailure();
          },
          () => {
               addUser(
                    username,
                    password,
                    email,
                    () => {
                         tryLoggingIn(username, password, (data) => {
                              User.get.set(data);
                              UI.changeState(STATES.isConnected);
                              onSuccess(data);
                         });
                    },
                    () => {
                         onFailure();
                    }
               );
          }
     );
}

function sync() {
     UI.changeState(STATES.isLogging);

     getUserByUsername(User.get.id, (uid) => {
          getUserByID(uid, (data) => {
               User.get.set(data);
               UI.changeState(STATES.isConnected);
               UI.toast.display("Synced successfully");
          });
     });
}

function disconnect() {
     UI.changeState(STATES.isLogging);

     updateFirebase(() => {
          User.get.init();
          UI.changeState(STATES.isLoggedOut);
     });
}

function save() {
     const index = User.get.notes.findIndex((item) => UI.targetNote.uid === item.uid);
     if (index !== -1) {
          UI.targetNote.modificationDate = new Date().getTime();
          User.get.notes[index] = UI.targetNote;
     } else {
          User.get.notes.push(UI.targetNote);
     }
     User.get.updateLastSync();

     updateFirebase(() => {});
}

function changeColor(color) {
     updateAfter(() => {
          User.get.user_color = color;
          User.get.updateLastSync();
          updateFirebase(() => {});
     });
}

function deleteNote() {
     User.get.notes = User.get.notes.filter((n) => UI.targetNote.uid !== n.uid);
     User.get.updateLastSync();

     updateFirebase(() => {});
}

function updateFirebase(onSuccess) {
     updateFirestore(() => {
          UI.toast.display("Saved to Firestore");
          onSuccess();
     });
}

function filterNotes() {
     const keyword = UI.search.value.trim().toLowerCase();

     return User.get.notes.filter((note) => {
          if (UI.search.value === "") return true;

          if (note.title.toLowerCase().includes(keyword)) return true;

          if (note.uid.split("")[0] === "T") {
               if (note.content.toLowerCase().includes(keyword)) return true;
          } else {
               for (let i = 0; i < note.content.length; i++) {
                    if (note.content[i].description.toLowerCase().includes(keyword)) {
                         return true;
                    }
               }
          }

          return false;
     });
}

export {
     sync,
     login,
     disconnect,
     register,
     save,
     changeColor,
     deleteNote,
     updateFirebase,
     filterNotes,
};
