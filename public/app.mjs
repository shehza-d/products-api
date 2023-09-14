const baseUrl = window.location.href.includes("localhost")
  ? `http://localhost:3003`
  : ``;

const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const dataDiv = document.querySelector("#data");
const form = document.querySelector("#addProductForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`${baseUrl}/api/v1/product`, {
      name: productName.value,
      price: price.value,
      description: description.value,
    });
    notyf.success(data.message);
    getProductData();
    form.reset();
  } catch (err) {
    notyf.error(err.response.data.message);
  }
});

const getProductData = async () => {
  dataDiv.innerHTML += "";
  try {
    const {
      data: { data },
    } = await axios.get(`${baseUrl}/api/v1/products`);

    if (!data.length) throw Error("No Data Found");

    data.map((item, i) => {
      dataDiv.innerHTML += `
</div>
  <div class="border relative p-4 rounded-lg border-slate-700">
  <h3 class="text-2xl font-semibold capitalize">${item.name}</h3>
  <h5 class="text-xl">$ ${item.price}</h5>
  <p class="text-justify font-light">
    ${item.description}
  </p>
  <button
	onclick="${deleteProduct(item._id)}"
	class="absolute top-4 right-6 bg-blue-400 rounded-full h-7 flex justify-center items-center w-7"
	>X
  </button>
  <span
	class="absolute top-4 right-16 bg-blue-400 rounded-full h-7 flex justify-center items-center w-7"
	>${i + 1}
  </span>
</div>`;
    });
  } catch (err) {
    notyf.error(err.response.data.message);
  }
};
getProductData();

window.deleteProduct = async (id) => {
  console.log("tsting");
  try {
    const data = await axios.delete(`${baseUrl}/api/v1/product/${id}`);
    getProductData();
  } catch (err) {
    notyf.error(err.response.data.message);
  }
};

// https://github.com/caroso1222/notyf
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: "center",
    y: "top",
  },
  dismissible: true,
  types: [
    {
      type: "success",
      background: "#22c55e",
    },
    {
      type: "error",
      background: "#ef4444",
    },
  ],
});
