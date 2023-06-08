var msnry = new Masonry( '.grid', {
    itemSelector: ".grid-item", 
    percentPosition: true, 
    gutter: 0, 
    transitionDuration: 0,
    initLayout: true,
    horizontalOrder: true,
    gutter: 0
});

msnry.layout();