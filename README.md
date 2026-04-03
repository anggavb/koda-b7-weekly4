# Week 4: Presentation

**MOVIE CATALOGUE PRESENTATION**
Memahami Konsep Dasar JavaScript DOM, Event Propagation, dan Fetch API 
*Presented by Angga Vb* 

---

## DOM (Document Object Model)

DOM adalah representasi struktur HTML sebagai *tree*. Setiap elemen menjadi *node* yang bisa dimanipulasi dengan JavaScript. 

Struktur dasar DOM terdiri dari:
* **Document**: Merepresentasikan keseluruhan halaman web.
* **Element Nodes**: Merupakan elemen-elemen HTML (seperti `html`, `head`, `body`, `h1`, `p`).
* **Text Nodes**: Teks yang berada di dalam elemen.

### DOM Method
Fungsi atau perintah bawaan yang disediakan oleh Document Object Model (DOM) API untuk berinteraksi dengan elemen-elemen HTML.

```javascript
// Mengambil atau mencari element tertentu
const btnToUp = document.getElementById("btnToUpper")
const section = document.querySelector("section")
const wrapper = document.querySelector(".wrapper")

// Membuat element dan attribute baru
const newWrapper = document.createElement("input")
newWrapper.setAttribute("type", "text")

// Proses manipulasi element HTML
section.classList.remove("hidden")
wrapper.classList.add("hidden")
newWrapper.textContent = "This is input text!"
section.append(wrapper)
```

---

## Window vs Document

Keduanya sering kita pakai tapi kadang luput akan perbedaannya. Jadi kira-kira apa bedanya Window dengan Document? 

* **Window**: Merepresentasikan jendela browser (tab) itu sendiri. Objek ini menampung segalanya, termasuk Document, riwayat (history), dan ukuran layar.
* **Document**: Merepresentasikan halaman web (HTML) yang sedang dirender di dalam jendela tersebut.

**Contoh Perbandingan Kode:**
```javascript
// Example Window
window.localStorage.getKey('watchlist')
window.location.href
window.history.back()

// Example Document
document.body
document.querySelector("section")
document.addEventListener("click", function () {
    alert("Windah Absen Dulu")
})
```

---

## Event Propagation Behavior

Event Propagation Behavior adalah suatu mekanisme yang menentukan bagaimana suatu event (seperti klik, *scroll*, atau tekan tombol) menyebar atau bergerak melalui struktur DOM (Document Object Model) untuk mencapai elemen target.

Terdapat 3 fase utama di dalam Event Propagation Behavior:
1.  **Event Capturing**: Event dimulai dari elemen paling atas (dokumen/window) dan turun ke elemen target (elemen yang diklik). Sering disebut *trickling*, event ditangkap oleh elemen induk sebelum mencapai elemen target.
2.  **Target**: Event mencapai elemen target atau elemen yang memicu event tersebut.
3.  **Event Bubbling**: Ini adalah perilaku default dalam JavaScript. Ketika elemen anak diklik, event akan dipicu pada elemen tersebut, lalu "menggelembung" naik ke elemen induknya, kakeknya, dan seterusnya hingga document.

**Bagaimana cara menanganinya?**
```html
<div id="outer">
    <div id="inner">
        <button id="btn">Klik</button>
    </div>
</div>
```

```javascript
// Contoh penanganan di JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const outer = document.getElementById('outer');
    outer.addEventListener('click', () => {
        alert('Outer div clicked!');
    });

    const inner = document.getElementById('inner');
    inner.addEventListener('click', () => {
        alert('Inner div clicked!');
    });

    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
```

---

## Fetch API (GET vs POST)

Fetch API adalah cara modern di JavaScript untuk melakukan request data ke server (HTTP Request). Berbasis *promise*, fetch menawarkan sintaks yang lebih bersih dan fleksibel untuk interaksi data, menggantikan XMLHttpRequest (XHR) tradisional.

### GET
Digunakan murni untuk meminta/mengambil data dari server. Data dikirim lewat URL. Lebih cepat, bisa di-cache, tapi tidak aman untuk data sensitif.

```javascript
// Fetch API - GET
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```


### POST
Digunakan untuk mengirim data baru ke server (misal: submit form login). Data dikirim tersembunyi di dalam *body request*. Lebih aman, tidak di-cache.

```javascript
// Fetch API - POST
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Contoh', value: 123 })
})
    .then(response => response.json())
    .then(data => console.log(data));
```


---

## Showcase Project: Movie Catalogue

**Pages:**
* Login View 
* Signup View 
* All Films List View 

**Features:**
* Login (localstorage) 
* Register (localstorage) 
* Fetch Movies/Film using TMDB API 
* TailwindCSS 

### Font & Color Palette
* **Font Header**: Outfit 
* **Font Body**: Roboto 
* **Body Color**: #09122C 
* **Primary Color**: #5A9690 
* **Secondary Color**: #FFFFE0 
* **Primary Hover Color**: #95D2CC 
* **Border Color**: #E0D9D9 

### Project Structure
* Semua file javascript ada di dalam folder `js`.
* Menggunakan Tailwind CLI.
* `package.json` terinstall Tailwind, TailwindCLI dan script untuk compile file config tailwind css.

```css
/* Konfigurasi input.css */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import "tailwindcss";

@theme {
    --color-main: #09122C;
    --color-ivory: #FFFFE0;
    --color-accent: #5A9690;
    --color-accent-hover: #95d2cc;
    --color-vintage: #E0D9D9;
    --font-heading: 'Outfit', sans-serif;
    --font-sans: 'Roboto', sans-serif;
}
```


---

**THANKS! HOPEFULLY Y'ALL ENJOYED** 
* GitHub: [https://github.com/anggavb/koda-b7-weekly4](https://github.com/anggavb/koda-b7-weekly4) 
* Live App: [https://movie-catalogue-zeta.vercel.app](https://movie-catalogue-zeta.vercel.app) 
* Presentation Link: [https://canva.link/0ihx7c4au1nup4i](https://canva.link/0ihx7c4au1nup4i)
