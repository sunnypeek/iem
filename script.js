const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  let data = [];

  // Load data dari iem.json
  fetch("iem.json")
    .then(response => response.json())
    .then(json => {
      data = json;
      displayData(data); // tampilkan semua saat awal
    });

  function displayData(filteredData) {
    const container = document.getElementById("iem-container");
    container.innerHTML = "";

    filteredData.forEach(item => {
      const card = `
        <div class="bg-white shadow-md rounded p-4">
          <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-contain mb-2">
          <h3 class="text-lg font-bold">${item.name}</h3>
          <p class="text-sm">Type: ${item.type}</p>
          <p class="text-sm">Profile: ${item.profile}</p>
          <p class="text-sm">Impedance: ${item.impedance}Ω</p>
          <p class="text-sm text-blue-700 font-bold">${item.price}</p>
          <a href="${item.link}" target="_blank" class="text-blue-500 underline text-sm">Lihat Produk</a>
        </div>
      `;
      container.innerHTML += card;
    });
  }

  // Fungsi untuk mengambil nilai dari checkbox dan input
  function getFilters() {
    const types = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .filter(cb => cb.checked)
      .map(cb => cb.nextElementSibling.textContent.trim().toLowerCase());

    const minImpedance = parseInt(document.querySelectorAll('input[type="number"]')[0].value) || 0;
    const maxImpedance = parseInt(document.querySelectorAll('input[type="number"]')[1].value) || 100;

    const minPrice = parseInt(document.querySelectorAll('input[type="number"]')[2].value) || 0;
    const maxPrice = parseInt(document.querySelectorAll('input[type="number"]')[3].value) || 10000000;

    return { types, minImpedance, maxImpedance, minPrice, maxPrice };
  }

  // Ubah harga dari string ke angka (contoh: RP200.000 → 200000)
  function parsePrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, ""));
  }

  // Event: klik tombol "CHECK"
  document.querySelector("a[href='#']").addEventListener("click", (e) => {
    e.preventDefault();
    const { types, minImpedance, maxImpedance, minPrice, maxPrice } = getFilters();

    const filtered = data.filter(item => {
      const price = parsePrice(item.price);
      return (
        (types.length === 0 || types.includes(item.type.toLowerCase()) || types.includes(item.profile.toLowerCase())) &&
        item.impedance >= minImpedance &&
        item.impedance <= maxImpedance &&
        price >= minPrice &&
        price <= maxPrice
      );
    });

    displayData(filtered);
  });
});

function applyFilter() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const selectedTypes = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const impMin = parseInt(document.getElementById('impMin').value);
  const impMax = parseInt(document.getElementById('impMax').value);
  const priceMin = parseInt(document.getElementById('priceMin').value);
  const priceMax = parseInt(document.getElementById('priceMax').value);

  const filtered = iemData.filter(item => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type.toLowerCase()) || selectedTypes.includes(item.profile.toLowerCase());

    return (
      typeMatch &&
      item.impedance >= impMin &&
      item.impedance <= impMax &&
      price >= priceMin &&
      price <= priceMax
    );
  });

  displayData(filtered);
}
