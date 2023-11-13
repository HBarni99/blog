import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var vezeteknevek = ["Barnabas"];
var cimek = ["About sports"];
var bejegyzesek = ["Sport pertains to any form of physical activity or game,[1] often competitive and organized, that aims to use, maintain, or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators.[2] Sports can, through casual or organized participation, improve participants' physical health. Hundreds of sports exist, from those between single contestants, through to those with hundreds of simultaneous participants, either in teams or competing as individuals. In certain sports such as racing, many contestants may compete, simultaneously or consecutively, with one winner; in others, the contest (a match) is between two sides, each attempting to exceed the other. Some sports allow a tie or draw, in which there is no single winner; others provide tie-breaking methods to ensure one winner. A number of contests may be arranged in a tournament producing a champion. Many sports leagues make an annual champion by arranging games in a regular sports season, followed in some cases by playoffs."];
var datumok = ["2023.11.11"];
var adatok =  {
    bejegyzoNeve : vezeteknevek,
    bejegyzesCime : cimek,
    bejegyzesTartalma : bejegyzesek,
    bejegyzesSzama : 0,
    bejegyzesDatuma : datumok,
};

function datumLekerdezo (){
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    var date = year + "." + month + "." + day;
    return date;
}

app.get("/", (req, res)=>{
    res.render("index.ejs",adatok);
});

app.get("/ujbejegyzes",(req,res)=>{
    res.render("ujbejegyzes.ejs");
});
app.post("/",(req,res)=>{
    var vezeteknev = req.body["vezeteknev"];
    vezeteknevek.push(vezeteknev);
    var cim = req.body["cim"];
    cimek.push(cim);
    var bejegyzes = req.body["bejegyzes"];
    var datum = datumLekerdezo();
    datumok.push(datum);
    bejegyzesek.push(bejegyzes);
    res.render("index.ejs",adatok);
});
app.post("/modositott",(req,res)=>{
    var vezeteknev = req.body["vezeteknev"];
    vezeteknevek[adatok.bejegyzesSzama]=vezeteknev;
    var cim = req.body["cim"];
    cimek[adatok.bejegyzesSzama]=cim;
    var bejegyzes = req.body["bejegyzes"];
    bejegyzesek[adatok.bejegyzesSzama]= bejegyzes;
    res.render("index.ejs",adatok);
});
app.get("/bejegyzes/:szam", (req,res)=>{
    adatok.bejegyzesSzama = req.params["szam"];
    res.render("bejegyzes.ejs",adatok);
});
app.get("/kapcsolat", (req,res)=>{
    res.render("kapcsolat.ejs");
});
app.get("/torles/:szam", (req,res)=>{
    adatok.bejegyzesSzama = req.params["szam"];
    vezeteknevek.splice(adatok.bejegyzesSzama, 1);
    cimek.splice(adatok.bejegyzesSzama, 1);
    bejegyzesek.splice(adatok.bejegyzesSzama, 1);
    datumok.splice(adatok.bejegyzesSzama, 1);
    res.render("index.ejs", adatok);
});
app.get("/modositas/:szam", (req,res)=>{
    adatok.bejegyzesSzama = req.params["szam"];
    res.render("modositas.ejs",adatok);
});

/*app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });*/
  app.listen(process.env.PORT || 3000);