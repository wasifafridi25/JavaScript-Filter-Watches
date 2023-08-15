const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProduct = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
    <div class="product">
        <img src="${product.img}" alt="">
        <span class="name">${product.name}</span>
        <span class="priceText">$${product.price}</span>
    </div>

    `
    )
    .join("");
};

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProduct(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProduct(data);
  }
});

displayProduct(data);

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  // const categories = ["All"].concat(allCats.filter((item, i) => {
  //     return allCats.indexOf(item) === i;
  //   }));

  // item = 'Dress'
  // i (index) = 0
  // allCats.indexOf(item) finds the first occurrence of 'Dress' in the array, which is at index 0.
  // So, allCats.indexOf(item) = 0.
  // The condition 0 === 0 is true, so this element is kept.
  // Second Element:

  // item = 'Dress'
  // i (index) = 1
  // allCats.indexOf(item) again finds the first occurrence of 'Dress' in the array, still at index 0.
  // So, allCats.indexOf(item) = 0.
  // The condition 0 === 1 is false, so this element is removed. This happens because indexOf always returns the first occurrence of an element, so any duplicates will have a different index i but the same indexOf.
  // Third Element:

  // item = 'Sport'
  // i (index) = 2
  // allCats.indexOf(item) finds the first occurrence of 'Sport' in the array, which is at index 2.
  // So, allCats.indexOf(item) = 2.
  // The condition 2 === 2 is true, so this element is kept.

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
        <span class="cat">${cat}</span>
      `
    )
    .join("");

  const diffCategories = document.querySelectorAll(".cat");
  diffCategories.forEach((element) => {
    element.addEventListener("click", (e) => {
      const selectedCategory = e.target.textContent;
      if (selectedCategory === "All") {
        displayProduct(data);
      } else {
        displayProduct(
          data.filter((item) => {
            return item.cat === selectedCategory;
          })
        );
      }
    });
  });
}
  //you can simply use the parent and use click event there instead of using for each

  // categoriesContainer.addEventListener("click", (e) => {
  //     const selectedCat = e.target.textContent;

  //     selectedCat === "All"
  //       ? displayProducts(data)
  //       : displayProducts(data.filter((item) => item.cat === selectedCat));
  //   });

  const setPrices = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input", (e) => {
      priceValue.textContent = "$" + e.target.value;
      displayProduct(data.filter((item) => item.price <= e.target.value));
    });
  };


setCategories();
setPrices();
