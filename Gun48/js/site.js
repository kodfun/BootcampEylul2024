/* <<< DEMO BAŞLANGIÇ ! SONRA SİLİNİZ >>> */
document.getElementById("ekle").onclick = () => {
    for (let i = 0; i < 100; i++) {
        document.getElementById("liste").innerHTML += 
            `<button type="button" class="list-group-item list-group-item-action">Not ${i+5}</button>`;
    }
};
/* <<< DEMO   BİTİŞ   ! SONRA SİLİNİZ >>> */
let notlar = [
    {
        baslik: "Gratisten Alınacaklar",
        icerik: "1. Gloss\n2. Oje\n3. Allık\n4. Highligther"
    },
    {
        baslik: "Eczane Listesi",
        icerik: "1. Panadol Ağrı Kesici\n2. Mide Koruyucu (Lansol)"
    },
    {
        baslik: "Gezilecek Yerler",
        icerik: "* Montenegro\n* Paris (Fransa)\n* Fethiye/Göcek"
    },
    {
        baslik: "2025'te Yapılacaklar",
        icerik: "* 2025’te yeni yerler keşfet, en az 3 ülke gez\n* Her ay bir kitap oku, bu yıl kendine zaman ayır\n* Sağlıklı yaşamak için haftada 3 gün spor yap\n* 2025’te hayalini kurduğun bir projeye başla\n* Yıl sonunda sevdiklerinle güzel bir tatil planla"
    }
];

// TEZGAH
const btnEkle = document.getElementById("ekle");
const divListe = document.getElementById("liste");
const frmNot = document.getElementById("frmNot");
const txtBaslik = document.getElementById("baslik");
const txtIcerik = document.getElementById("icerik");
const btnKaydet = document.getElementById("kaydet");
const btnSil = document.getElementById("sil");

function aktifClassTemizle() {
    // for (const btn of divListe.children)
    //     btn.classList.remove("active");
    [...divListe.children].forEach(x => x.classList.remove("active"));
}

function baslikTiklandi(baslikElement, not) {
    txtBaslik.value = not.baslik;
    txtIcerik.value = not.icerik;
    aktifClassTemizle();
    baslikElement.classList.add("active");
}

function listele() {
    divListe.innerHTML = "";

    for (const not of notlar) {
        const btnNot = document.createElement("button");
        btnNot.className = "list-group-item list-group-item-action";
        btnNot.textContent = not.baslik;
        divListe.appendChild(btnNot);
        btnNot.onclick = () => baslikTiklandi(btnNot, not);
    }
}

listele();


/* <<< OFFCANVAS BAŞLANGIÇ >>> */
const offcanvas = new bootstrap.Offcanvas("#offcanvasExample");
const divMenu = document.getElementById("menu");
const divSidebarColumn = document.getElementById("sidebarColumn");
const divOffcanvasBody = document.getElementById("offcanvasBody");

function menuAyarla() {
    if (window.innerWidth < 576) {
        divOffcanvasBody.append(divMenu);
    }
    else {
        divSidebarColumn.append(divMenu);
        offcanvas.hide();
    }
};

window.onresize = menuAyarla;
menuAyarla();
/* <<<   OFFCANVAS BİTİŞ   >>> */