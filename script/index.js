console.log("index is connected");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategory(data.categories);
    });
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" class="btn btn-small hover:bg-[#FF1F3D] hover:text-white" onclick="loadCategoryVideos(${cat.category_id})">${cat.category}</button>
        `;
    categoryContainer.append(categoryDiv);
  }
};

const loadVideos = (searchText = '') => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
};

loadVideos();

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
      <div class="col-span-full text-center flex flex-col py-[200px]">
                <img class="w-[120px] mx-auto" src="./assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Opps Sorry !! There is no content here. </h2>
      </div>
    `;
    return;
  }
  videos.forEach((element) => {
    // console.log(videos);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
         <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src="${element.thumbnail}" alt="Shoes" />
                    <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hour 56min
                        ago</span>
                </figure>
                <div class="py-5 flex gap-3 px-0">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${element.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">${element.title}</h2>
                        <p class="text-sm text-gray-400 flex">${element.authors[0].profile_name} 
                        ${element.authors[0].verified == true ? `<img class="w-5 h-5"  src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="badge">` : ' '}
                        </p>
                        <p class="text-sm text-gray-400">${element.others.views}</p>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${element.video_id}')" class="btn btn-block">Show Details</button>
            </div>
        `;

    videoContainer.append(videoCard);
  });
};

const loadVideoDetails = (video_id) => {
  // console.log(video_id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayVideoDetails(data.video);
    });
};

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const details_container = document.getElementById("details_container");
  details_container.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  `;
};

const loadCategoryVideos = (id) => {
  const url = `
        https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveButton();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

const removeActiveButton = () => {
  const activeButtons = document.getElementsByClassName("active");
  // console.log((activeButtons));
  for (const btn of activeButtons) {
    btn.classList.remove("active");
  }
};

document.getElementById('search').addEventListener('keyup', (event) =>{
  const input = event.target.value;
  // console.log(input);
  loadVideos(input);
})

loadCategory();
