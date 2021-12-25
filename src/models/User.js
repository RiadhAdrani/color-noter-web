class User {
     constructor() {}

     static get = {
          email: "",
          id: "",
          last_sync: "",
          user_color: "7",
          user_theme: "0",
          notes: [],
          set: function (data) {
               this.email = data.email;
               this.id = data.id;
               this.last_sync = data.last_sync;
               this.user_color = data.user_color;
               this.user_theme = data.user_theme;
               this.notes = data.notes;
          },
          init: function () {
               this.set({
                    email: "",
                    id: "",
                    last_sync: "",
                    user_color: "7",
                    user_theme: "0",
                    notes: [],
               });
          },
          prepare: function () {
               return {
                    data: {
                         email: this.email,
                         id: this.id,
                         last_sync: this.last_sync,
                         user_color: this.user_color,
                         user_theme: this.user_theme,
                    },
                    notes: this.notes,
               };
          },
          setId: function (newID) {
               updateAfter(() => {
                    this.id = newID;
               });
          },
          setEmail: function (newEmail) {
               updateAfter(() => {
                    this.email = newEmail;
               });
          },
          setColor: function (newColor) {
               updateAfter(() => {
                    this.user_color = newColor;
               });
          },
          setTheme: function (newTheme) {
               updateAfter(() => {
                    this.user_theme = newTheme;
               });
          },
          setNotes: function (newNotes) {
               updateAfter(() => {
                    this.notes = newNotes;
               });
          },
          updateLastSync: function () {
               this.last_sync = new Date().getTime();
          },
     };
}

export default User;
