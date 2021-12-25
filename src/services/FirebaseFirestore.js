import { TextNote } from "../models/Note.js";
import User from "../models/User.js";

const fireConfig = {
     apiKey: "AIzaSyAvw2rOiIFFTnfCmwcy_13jq3QRPTUNj3M",
     authDomain: "color-noter.firebaseapp.com",
     databaseURL: "https://color-noter-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "color-noter",
     storageBucket: "color-noter.appspot.com",
     messagingSenderId: "12057113157",
     appId: "1:12057113157:web:1169b298506d5b66cbe92c",
};

firebase.initializeApp(fireConfig);

let db = firebase.firestore();

class Database {
     constructor() {}

     static db = db;
}

async function getUserByID(id, onSuccess, onFailure) {
     let user = {};

     Database.db
          .collection("users")
          .doc(id)
          .get()
          .then((query) => {
               if (query.exists) {
                    user = { ...query.data() };
                    getUserNotes(id, (notes) => {
                         user.notes = notes;
                         onSuccess(user);
                    });
               } else {
                    onFailure();
               }
          });
}

function getUserNotes(id, onSuccess) {
     const notes = [];

     Database.db
          .collection("users")
          .doc(id)
          .collection("user_notes")
          .get()
          .then((query) => {
               query.docs.forEach((note) => {
                    notes.push({ ...note.data() });
               });
               onSuccess(notes);
          });
}

function getUserByUsername(username, onSuccess, onFailure = () => {}) {
     Database.db
          .collection("users")
          .get()
          .then((query) => {
               let found = false;

               query.docs.forEach((doc) => {
                    if (doc.data().id === username && doc.data().password) {
                         found = true;
                         onSuccess(doc.id);
                         return;
                    }
               });

               if (!found) {
                    onFailure();
               }
          });
}

function tryLoggingIn(username, password, onSuccess, onFailure) {
     getUserByUsername(
          username,
          (uid) => {
               getUserByID(uid, (user) => {
                    if (user.password === password) {
                         onSuccess(user);
                    } else {
                         onFailure();
                    }
               });
          },
          onFailure
     );
}

function addUser(username, password, email, onSuccess, onFailure) {
     Database.db
          .collection("users")
          .add({
               email,
               id: username,
               password,
               last_sync: new Date().getTime(),
               user_color: "0",
               user_theme: "0",
          })
          .then((query) => {
               const welcomeNote = new TextNote(
                    "Welcome to Color Noter!",
                    "Welcome to Color Noter ! Feel free to create new notes and customize your theme !",
                    "0"
               ).toJSON();

               Database.db
                    .collection("users")
                    .doc(query.id)
                    .collection("user_notes")
                    .doc(welcomeNote.uid)
                    .set(welcomeNote);

               onSuccess();
          })
          .catch(() => {
               onFailure();
          });
}

function updateFirestore(onSuccess) {
     getUserByUsername(User.get.id, (uid) => {
          Database.db
               .collection("users")
               .doc(uid)
               .update(User.get.prepare().data)
               .then(() => {
                    User.get.prepare().notes.forEach((note) => {
                         Database.db
                              .collection("users")
                              .doc(uid)
                              .collection("user_notes")
                              .doc(note.uid)
                              .set(note);
                    });
                    Database.db
                         .collection("users")
                         .doc(uid)
                         .collection("user_notes")
                         .get()
                         .then((query) => {
                              query.docs.forEach((doc) => {
                                   const index = User.get.notes.findIndex(
                                        (n) => doc.data().uid === n.uid
                                   );
                                   if (index === -1) {
                                        doc.ref.delete();
                                   }
                              });

                              onSuccess();
                         });
               });
     });
}

export { getUserByID, getUserNotes, getUserByUsername, tryLoggingIn, addUser, updateFirestore };
