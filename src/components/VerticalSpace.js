const { Div } = Components;

export default (height) => {
     return Div({ styleSheet: { className: `vertical-spacer-${height}`, normal: { height } } });
};
