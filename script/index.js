console.log('index is connected')

const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res=>res.json())
        .then(data => {
            displayCategory(data.categories)
        })
}


const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    for(let cat of categories){
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button class="btn btn-small hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        categoryContainer.append(categoryDiv);
    }
}
loadCategory(); 