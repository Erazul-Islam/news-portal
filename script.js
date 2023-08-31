const newsCatagory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json();


    const tabContainer = document.getElementById('tab');

    const trimedData = data.data.news_category.slice(0, 3);
    console.log(trimedData)

    trimedData.forEach((catagory) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="loadNews('${catagory.category_id}')" class="tab">${catagory.category_name}</a>
        `;

        tabContainer.appendChild(div);
    });
};


const loadNews = async (catagoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catagoryId}`)
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = " "

    data.data.forEach((news) => {
        console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card  w-96 mt-9 bg-base-100 shadow-xl">
                    <figure><img src="${news.image_url}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${news.title}
                        <div class="badge badge-secondary p-5">${news.rating.badge}</div>
                        </h2>
                        <p>${news.details.slice(0, 70)}...</p>
                        <div class="card-actions justify-around">
                            <p>${news.author.name}</p>
                            <img class="h-10" src=${news.author.img}/>
                           <button onclick="handleData()" class="btn btn-primary bg-black">Details</button>
                           
                        </div>
                    </div>
                </div>
        
        
        `
        cardContainer.appendChild(div)
    })
}

const handleData = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a${newsId}`);
    const data = await res.json();
    console.log(data)
    const modal = document.getElementById('modal-container')
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="my_modal_3" class="modal">
           <form method="dialog" class="modal-box">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Press ESC key or click on ✕ button to close</p>
           </form>
        </dialog> 
    `
    modal.appendChild(div);

    const modalcontent = document.getElementById('my_modal_3');
    modalcontent.showModal()
}





newsCatagory()