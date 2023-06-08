// Get some random images, then create an img element for each and append it to the div.
// The images should be styled so they take up all the space and adapt nicely, like at waifu.im

// the target container of the images
const galleryDiv = document.getElementsByClassName('gallery')[document.getElementsByClassName('gallery').length-1];

async function subredditGallery() {

    // remove old images
    galleryDiv.classList.remove('gallery-big');
    galleryDiv.classList.add('gallery-small');
    galleryDiv.innerHTML = '<br>Loading     Posts...';
    
    // get user input
    const subreddit = document.getElementById('subredditinput').value;

    // fetch images
    let images;
    try{
        images = (await axios.get(`https://api.reddit.com/r/${subreddit}/top/.json?limit=30&t=all`)).data.data.children;
    } catch(err){
        console.log(err.message, err)
        
        return galleryDiv.innerHTML = '<br>Error: Enter a valid subreddit';
    }

    // set subreddit stats
    let nameElm = document.getElementById('statname');
    let subsElm = document.getElementById('statsubscribers');
    nameElm.innerHTML = images[0].data.subreddit_name_prefixed;
    subsElm.innerHTML = images[0].data.subreddit_subscribers;
    
    galleryDiv.innerHTML = '';

    galleryDiv.classList.remove('gallery-small')
    galleryDiv.classList.add('gallery-big');

    
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

            // create the img element
            let imageElm = document.createElement('img');
            imageElm.src = imageUrl;
            imageElm.classList.add('img');
            imageElm.id = 'img '+i;

            // add img to the dom
            galleryDiv.appendChild(imageElm);
        }
    }
    // in case of no images for subreddit
    if (galleryDiv.innerHTML === ''){
        galleryDiv.classList.remove('gallery-big')
        galleryDiv.classList.add('gallery-small')
        galleryDiv.innerHTML = '<br>Error: No images found for this Subreddit';
    }
};
