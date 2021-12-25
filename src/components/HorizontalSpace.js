const { Div } = Components;

export default (width) => {
     return Div({ styleSheet: { className: `horizontal-spacer-${width}`, normal: { width } } });
};
