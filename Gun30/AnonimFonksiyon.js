
// İSMİ OLAN FONKSİYON
function gulucukle(str) {
    return str + " :)";
}

//                    CALLBACK FUNC
function yazdir(metin, donusturucu) {
    metin = donusturucu(metin);
    console.log(metin);
}

yazdir("sakin olun", gulucukle);

// ANONİM FONKSİYONU DEĞİŞKENDE SAKLAYARAK
const buyutucu = function(x) {
    return x.toLocaleUpperCase("tr");
};

yazdir("izmirde tarhana çorbası", buyutucu);


// ANONİM FONKSİYONLA
yazdir("me before you", function(str) {
    return str.split("").join("-");
});

// ANONİM ARROW FUNCTION İLE
yazdir("afyonkarahisarlılaştıramadıklarımızdan mıymışsınız", x => x.length);

function uckere(str) {
    return str.repeat(3);
}

yazdir("7", uckere);

yazdir("Oley! ", x => x.repeat(3));

// sonraki derste callback fonksiyonlara sık sık rastlayacağız
// örnek:

const unluler = ["drake", "rihanna", "zayn", "adele"];

const dizi2 = unluler.map(x => x.toUpperCase());

console.log(unluler);
console.log(dizi2);