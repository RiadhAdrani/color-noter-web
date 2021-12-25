function selectLineSize() {
     return window.displayType.value;
}

function computeSize() {
     const width = window.innerWidth;
     if (width >= 1200) return 4;
     else if (width < 1200 && width >= 850) return 3;
     else if (width < 850 && width >= 700) return 2;
     else return 1;
}

function divideIntoLines(list, n) {
     let i = 0;
     const output = [];
     if (i > list.length) {
          return list;
     }

     do {
          if (i <= list.length) {
               output.push(list.slice(i, i + n));
          } else {
               output.push(list.slice(list.length - n));
          }
          i = i + n;
     } while (i < list.length);

     return output;
}

const STATES = Object.freeze({
     isLogging: "logging",
     isLoggedOut: "logged-out",
     isConnected: "connected",
     isSingningUp: "signed-up",
});

function generateUID(prefix) {
     return `${prefix}-${new Date().getTime()}-${new Date().getTime() + new Date().getTime() * 3}`;
}

export { selectLineSize, divideIntoLines, STATES, generateUID, computeSize };
