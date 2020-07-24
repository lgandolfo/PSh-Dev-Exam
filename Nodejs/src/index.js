const express = require('express');
const cron = require("node-cron");
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
const mysqlConnection = require('./database');
const randomInt = require('random-int');


//settings
app.set('port',process.env.PORT | 9000);

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/players'));


//starting
app.listen(app.get('port'),() => {
    console.log("Server load");
});

cron.schedule('0 */5 * * * *', function(){

     var p1 = createMatch();
     p1.then(idJuego => createPlayers(idJuego));
    }

)

function createPlayers(idJuego){
    for(var i=0; i < 10; i++){
        const api_url = "https://randomuser.me/api";
        fetch(api_url)
        .then(res =>  res.json())
        .then(json => {
            console.log(json.results[0].name.first);
            var promise = createPlayer(json.results[0].name.first,json.results[0].picture.medium);
            promise.then(idJugador => createStat(idJuego,idJugador));
        })
        .catch(err => console.error(err))
    }
 }


const createPlayer = (nickname,photoURL) => {
    return new Promise(function(resolve, reject) {
        mysqlConnection.query("INSERT INTO Jugador(nickname,photo_url) VALUES (?,?)",[nickname,photoURL],(err,rows,fields) => {
        if(!err){
            var id = rows.insertId;
            return resolve(id);
            }
        else {
            console.log(err);
            return reject(err);
            };
        })
    });
    
}

function createMatch() {
    return new Promise(function(resolve, reject) {
        mysqlConnection.query("INSERT INTO Juego() VALUES ()",(err,rows,fields) => {
            if(!err){
                var id = rows.insertId;
                return resolve(id);
             }
            else {
                console.log(err);
                return reject(err);
             };
        });
    });
   
}

function createStat(idJuego,idJugador){
    var score = randomInt(100);
    var timestamp = Date.now();

    mysqlConnection.query("INSERT INTO Estadistica(idJuego,idJugador,puntos,fecha_creacion) VALUES (?,?,?,?)", [idJuego,idJugador,score,timestamp],(err,rows,fields) => {
        if(!err){
            var id = rows.insertId;
            return Promise.resolve(id);
        }
        else {
            console.log(err);
            return err;
        };
    })
}




