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
            <button class="btn btn-small hover:bg-[#FF1F3D] hover:text-white" onclick="loadCategoryVideos(${cat.category_id})">${cat.category}</button>
        `;
    categoryContainer.append(categoryDiv);
  }
};
loadCategory();

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      displayVideos(data.videos);
    });
};

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
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
                        <p class="text-sm text-gray-400 flex">${element.authors[0].profile_name} <img class="w-5 h-5"  src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="badge"></p>
                        <p class="text-sm text-gray-400">${element.others.views}</p>
                    </div>
                </div>
            </div>
        `;

    videoContainer.append(videoCard);
  });
};



const loadCategoryVideos = (id) =>{
    const url = `
        https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayVideos(data.category);
    })
}