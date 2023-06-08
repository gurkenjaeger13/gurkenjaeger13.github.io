
var is_nsfw = false
var has_cookie = null
var files = ["https://cdn.waifu.im/6643.jpeg", "https://cdn.waifu.im/6928.png", "https://cdn.waifu.im/6619.jpeg", "https://cdn.waifu.im/7925.jpg", "https://cdn.waifu.im/6609.jpg", "https://cdn.waifu.im/6617.jpeg", "https://cdn.waifu.im/6656.jpeg", "https://cdn.waifu.im/6660.jpeg", "https://cdn.waifu.im/6646.jpg", "https://cdn.waifu.im/6608.jpeg", "https://cdn.waifu.im/6622.jpeg", "https://cdn.waifu.im/6654.jpeg", "https://cdn.waifu.im/6601.jpg", "https://cdn.waifu.im/6881.jpg", "https://cdn.waifu.im/6658.jpg", "https://cdn.waifu.im/6604.jpeg", "https://cdn.waifu.im/6618.jpeg", "https://cdn.waifu.im/7314.png", "https://cdn.waifu.im/6620.jpeg", "https://cdn.waifu.im/6784.jpg", "https://cdn.waifu.im/6648.jpeg", "https://cdn.waifu.im/6644.jpeg", "https://cdn.waifu.im/7392.jpg", "https://cdn.waifu.im/6621.jpeg", "https://cdn.waifu.im/7238.png", "https://cdn.waifu.im/7095.jpg", "https://cdn.waifu.im/7347.jpg", "https://cdn.waifu.im/6605.jpeg", "https://cdn.waifu.im/1859.jpg", "https://cdn.waifu.im/4715.jpeg"]
if (has_cookie || !is_nsfw) {
    $('.approval').css('visibility', 'visible')
} else {
    var ageverif = new bootstrap.Modal(document.getElementById('Ageverif'))
    ageverif.show()
    $('#over18button').focus()
}
var elem = document.querySelector('#ctm');

// !!!
var masonry = new Masonry(elem, { "itemSelector": ".grid-item", "percentPosition": true, "gutter": 0, "transitionDuration": 0 });



for (const i of files) {
    item = document.createElement('div');
    item.className = "col-md-2 grid-item";
    item.innerHTML = `<a href="/preview/${i.split('/').pop()}"><img class="img-fluid"  alt="..." src=${i}></a>`;
    elem.appendChild(item);
    masonry.addItems(item);
    masonry.layout();
    imagesLoaded(elem).on('progress', function() { masonry.layout(); })
}
