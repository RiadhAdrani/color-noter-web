export default (description) => {
     return {
          creationDate: new Date().getTime(),
          description,
          doneDate: -1,
          dueDate: -1,
          modifcationDate: new Date().getTime(),
          priority: "MEDIUM",
          uid: `${new Date().getTime()}-${new Date().getTime() * 3}-${new Date().getTime()}`,
     };
};
