

// bir nesne
const kisi = { ad: "Ali", yas: 33};

// json hali
const json = JSON.stringify(kisi);
console.log("JSON HALİ: " + json);

// tekrardan json'dan nesneye dönüştürelim
// ve bir property'sine erişelim
let insan = JSON.parse(json);
console.log(`${insan.ad} adlı insan ${insan.yas} yaşındadır.`)