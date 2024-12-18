/* <<< DEMO BAŞLANGIÇ ! SONRA SİLİNİZ >>> */
document.getElementById("ekle").onclick = () => {
    for (let i = 0; i < 100; i++) {
        document.getElementById("liste").innerHTML += 
            `<button type="button" class="list-group-item list-group-item-action">Not ${i+5}</button>`;
    }
};
/* <<< DEMO   BİTİŞ   ! SONRA SİLİNİZ >>> */

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