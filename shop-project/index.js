const itemBody = document.querySelector("#container");
const categoryList = document.querySelectorAll(".category");
const searchContent = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-submit");

const init = async function (path) {
    try {
        const response = await fetch(`${path}`);
        const data = await response.json();
        initProducts(data);
    } catch (error) {
        alert(error);
    }
}

const initProducts = function (products) {
    // SHOW PRODUCTS
    itemBody.innerHTML = " ";
    products.forEach(element => {
        createProduct(element);
    });
    // FILTER BY CATEGORY
    categoryList.forEach(element => {
        element.addEventListener("click", function (e) {
            const title = e.target.innerText.toLowerCase();
            categoryList.forEach(e => e.className = "") // DIRTY
            e.target.className = "selected";
            const filteredProducts = products.filter(element => element.category.toLowerCase() === title);
            itemBody.innerHTML = " ";
            filteredProducts.forEach(element => {
                createProduct(element);
            });
        })
    });
    // FILTER BY SEARCH
    searchButton.addEventListener("click", function () {
        const title = searchContent.value.trim().toLowerCase();
        const filteredProducts = products.filter(element => element.title.toLowerCase().includes(title));
        if (filteredProducts.length !== 0) {
            itemBody.innerHTML = " ";
            filteredProducts.forEach(element => {
                createProduct(element);
            });
        }
        else {
            itemBody.innerHTML = "<h1> Nothing... </h1>";
        }
    })
}

const createProduct = function (element) {
    console.log(element)
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    const itemPic = document.createElement("img");
    itemPic.id = "pic";
    itemPic.src = element.image;
    const itemTitle = document.createElement("h1");
    itemTitle.id = "title";
    itemTitle.innerText = element.title;

    const priceDiv = document.createElement("div");
    priceDiv.className = "price-box";
    const priceSpan = document.createElement("span");
    priceSpan.innerText = element.price + " $";
    const addDiv = document.createElement("div");
    addDiv.className = "add-box";
    const addIcon = document.createElement("i");
    addIcon.className = "fa fa-plus";
    addDiv.appendChild(addIcon);
    priceDiv.appendChild(priceSpan);
    priceDiv.appendChild(addDiv);

    itemDiv.appendChild(itemPic);
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(priceDiv);

    itemBody.appendChild(itemDiv);
}


window.addEventListener("load", init("https://fakestoreapi.com/products"));