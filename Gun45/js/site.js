/* <<< DEMO BAŞLANGIÇ ! SONRA SİLİNİZ >>> */
document.getElementById("ekle").onclick = () => {
    for (let i = 0; i < 100; i++) {
        document.getElementById("liste").innerHTML += 
            `<button type="button" class="list-group-item list-group-item-action">Not ${i+5}</button>`;
    }
};
/* <<< DEMO   BİTİŞ   ! SONRA SİLİNİZ >>> */