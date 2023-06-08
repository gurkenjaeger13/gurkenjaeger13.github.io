// Get some random images, then create an img element for each and append it to the div.
// The images should be styled so they take up all the space and adapt nicely, like at waifu.im

// the target container of the images
let galleryDiv = document.getElementsByClassName('grid')[document.getElementsByClassName('grid').length-1];
let after;

// set layout options
var msnry = new Masonry( '.grid', {
    itemSelector: ".grid-item", 
    percentPosition: true, 
    gutter: 0, 
    transitionDuration: 0,
    initLayout: true,
    //horizontalOrder: true,
    gutter: 0
});

async function subSearch(subreddit){
    /*
    let gridElms = document.getElementsByClassName('grid')[0].childNodes;
    if (gridElms){
        for (let i=0; i<gridElms; i++){
            await msnry.remove( gridElms[i] );
        }
        await msnry.layout();
    }
    */

    
    console.log('Getting images for new subreddit ' + subreddit);
    
    // remove old posts to make room for new subreddit
    galleryDiv.innerHTML = '';
    
    //subreddit stats
    let sampleImage;
    try{
        sampleImage = (await axios.get(`https://api.reddit.com/r/${subreddit}/top/.json?limit=1&t=all`)).data.data.children;
    } catch(err){
        return console.log(err.message, err)
    }
    let nameElm = document.getElementById('statname');
    let subsElm = document.getElementById('statsubscribers');
    nameElm.innerHTML = sampleImage[0].data.subreddit_name_prefixed;
    subsElm.innerHTML = sampleImage[0].data.subreddit_subscribers;
    
    // get and add images
    galleryDiv.innerHTML = '';
    after = '';
    msnry.reloadItems();
    getPosts(subreddit);
}

async function getPosts(subreddit) {  
    console.log('The "after" variable is: '+after);

    // fetch images
    let apiRes;
    try{
        apiRes = (await axios.get(`https://api.reddit.com/r/${subreddit}/top/.json?limit=30&t=all&after=${after}`)).data.data;
    } catch(err){
        return console.log(err.message, err)
    }
    let images = apiRes.children;

    after = apiRes.after;
    
    // for-loop to add the img elms
    for (let i=0; i<images.length; i++){
        // get img url
        let imageUrl = images[i].data.url;
        
        // check if url is img
        //  |-what it can include-----------------------------------------------------------------------------------------|     |-what it can't include----|
        if (((imageUrl.includes('.jpg') || imageUrl.includes('.png') || imageUrl.includes('.gif') || imageUrl.includes('.gifv'))) && !(imageUrl.includes('imgur')) || ((imageUrl.includes('imgur')) && imageUrl.includes('.gifv'))){
            
            // special case for imgur gifs:
            if (imageUrl.includes('imgur') && imageUrl.includes('.gifv')){
                imageUrl = imageUrl.split('.gifv')[0]+'.gif'
            }

            // create container
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('grid-item');

            // create the img element
            let imageElm = document.createElement('img');
            imageElm.src = imageUrl;
            imageElm.classList.add('img');
            imageElm.id = 'img '+i;

            // add img to the dom
            imgDiv.appendChild(imageElm);
            galleryDiv.appendChild(imgDiv);
            await msnry.appended(imgDiv);

            // update layout
            await msnry.layout();
        }
        if ( i === images.length-1){
            let loadmoreTrigger = document.createElement('div');
            loadmoreTrigger.id = 'loader-trigger';
            loadmoreTrigger.classList.add('grid-item');
            galleryDiv.appendChild(loadmoreTrigger);
            await msnry.appended(loadmoreTrigger);
            setTimeout(function() { startObserving(loadmoreTrigger.id); }, 300);
        }
    }
    // in case of no images for subreddit
    if (galleryDiv.innerHTML === ''){
        galleryDiv.classList.remove('gallery-big')
        galleryDiv.classList.add('gallery-small')
        galleryDiv.innerHTML = '<br>Error: No images found for this Subreddit';
    }
    await msnry.layout();
    console.log('Loaded all images.')
    setTimeout(function() { refreshGrid(); }, 200);
    //setTimeout(function() { refreshGrid(); }, 500);
};

function refreshGrid(){
    msnry.layout();
    console.log('refreshed grid.');
}

function startObserving(targetId){
    // define an observer instance
    var observer = new IntersectionObserver(onIntersection, {
        root: null,   // default is the viewport
        threshold: .5 // percentage of target's visible area. Triggers "onIntersection"
    })
    
    // callback is called on intersection change
    function onIntersection(entries, opts){
        entries.forEach(entry => (function (){
            if (entry.isIntersecting){
                console.log(`Loading new images...`);
                stopObserving(entry.target.id, observer);
                setTimeout(function() { getPosts(document.getElementById('subredditinput').value); }, 500);
            }
        })()
        )
    }
    
    // Use the observer to observe an element
    observer.observe( document.querySelector(`#${targetId}`) )
    
}

function stopObserving(targetId, observer){
    let trigger = document.getElementById(targetId);
    observer.unobserve( trigger );
    msnry.remove( trigger );
    console.log('removed observer');
    msnry.layout();
}