fetch("data/iem.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("iem-container");

    const filteredData = data.filter((item) => item.type === "magnetic");

    filteredData.forEach((item) => {
      const div = document.createElement("div");
      div.className =
        "relative w-[300px] h-[420px] bg-black overflow-hidden rounded-lg shadow-lg group";

      div.innerHTML = `
        <img alt="${item.name}" src="${
        item.image
      }" class="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-50" />
        <div class="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
          <div>
            <p class="text-xs font-semibold tracking-wide text-black uppercase">${
              item.type
            }</p>
            <p class="text-lg font-bold text-white sm:text-xl">${item.name}</p>
          </div>
          <div class="transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 space-y-3 overflow-y-auto text-xs text-white">
            ${item.specs.map((spec, i) => `${i + 1}. ${spec}`).join("<br/>")}
            <a class="relative inline-block mt-2" href="${item.link}">
              <span class="absolute inset-0 bg-blue-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
              <span class="relative px-8 py-2 text-xs font-bold tracking-widest uppercase text-black bg-white">
                ${item.price}
              </span>
            </a>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
  });
