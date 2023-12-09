

// const ejs = require("ejs");
const express = require("express");
const http = require("http");
const path = require("path");
const sqlite3 = require("sqlite3");


// Initialization Kodları
const app = express();
const server = http.createServer(app);

const db = new sqlite3.Database("mesajlar.db");



// app.use komutları
app.use(express.urlencoded({ extended: false }));



// EJS kullanımını belirtiyoruz
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/yuksahibi.html");
});



app.post("/gonder", (req, res) => {
    var { konum, hedefKonum, yukMiktari, fiyatTeklifi, sonTeslimatTarihi,
        sigortaIstegi, isTanimi } = req.body;
    console.log(konum, hedefKonum, yukMiktari, fiyatTeklifi, sonTeslimatTarihi,
        sigortaIstegi, isTanimi);

    db.run('INSERT INTO yuk_sahibi_ilanlari (konum, hedef_konum, yuk_miktari, fiyat_teklifi, son_teslimat_tarihi, sigorta_istegi, is_tanimi) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [konum, hedefKonum, yukMiktari, fiyatTeklifi, sonTeslimatTarihi, sigortaIstegi, isTanimi], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Bilgiler eklendi`);
        });

    res.sendFile(__dirname + "/public/yuksahibi.html");

})





app.use(express.static(__dirname + "/public"));



server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor...');
});
