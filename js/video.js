// video times
function getTimesstring(time){
    const hour = parseInt(time/3600);
    let remainingsecond = parseInt( time % 3600 )
    const munite = parseInt( remainingsecond / 60 );
    const second = remainingsecond % 60;
    return `${hour} hour ${munite} munite ${second} second ago`
}
// loadDatachatagori 
const loadDatachatagori = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => displaychatagory(data.categories))
    .catch((error) => console.log(error))
}
// lodaVideos
const loadVideos = (searchText = "")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response => response.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error))
}
const removeactiveClass = ()=>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for( let btns of buttons){
        btns.classList.remove("active")
    }
};

const loadCategoryVideos = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(response => response.json())
    .then((data) => {
         //  sobaike remomve
         removeactiveClass();
        // sobaike add
       
        const activebtn = document.getElementById(`btn-${id}`);
       

        activebtn.classList.add("active-btn");
        // activebtn.classList.add("sort");
        console.log(activebtn);
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}
// object 

// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }


// displyvideos
const displayVideos = (videos)=>{
    // console.log(videos);
    const videoContainer = document.getElementById('videos');
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = "";
    if(videos.length == 0 ){
        videoContainer.innerHTML = `
        <div class=" flex flex-col pt-16 justify-center items-center">
             <img  class=" " src="assest/Icon.png"/>
             <h2 class=" text-xl font-bold">NO CONTANTE HERE IN THIS CATEGORY</h2>
        </div>
        `;
        return;
    }else{
        videoContainer.classList.add("grid");
    }

     videos.forEach((video) => {
        console.log(video);
    const card = document.createElement('div');
    card.classList = "card card-compact";
    card.innerHTML = 
    `<figure class="h-[170px] relative">
    <img
      src=${video.thumbnail}
      class=" h-full w-full object-cover"
      alt="Shoes" />
       ${video.others.posted_date?.length == 0 
        ?""
        :` <span class=" absolute text-xs right-2 bottom-1 text-white bg-black py-2"> ${getTimesstring(video.others.posted_date)}</span>`}
     
    </figure>
    <div class="px-0 py-2 gap-4 flex">
          <div>
              <img class=" w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
          </div>

          <div>
              <h1 class="font-bold">${video.title}</h1>
              <div class="flex items-center gap-2">
               <p class="text-gray-400">${video.authors[0].profile_name}</p>
               ${video.authors[0].verified  == true 
                ?`<img class="w-5 " src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
                :""
              }
              </div>
              <p></p>
          </div>
    </div>
    `;
    videoContainer.appendChild(card)
    
     });
     
}

// displaychatagory

const displaychatagory = (categories)=>{
    const cetegoryButton = document.getElementById('cetegory-button');
     categories.forEach((item) => {
        console.log(item);
        const buttoncontainer = document.createElement('div');
        buttoncontainer.innerHTML =
        `<button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="border-2 py-3 px-4 rounded-lg category-btn">
         ${item.category}
         </button>

        `


        cetegoryButton.appendChild(buttoncontainer);
        
     });
}

document.getElementById("search-input").addEventListener('keyup',(event)=>{
   loadVideos(event.target.value);
})

loadDatachatagori();
loadVideos();

