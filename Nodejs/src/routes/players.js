const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/',(req,res) => {
    var query = ('SELECT t1.id, t1.nickname, t2.puntos, t2.fecha_creacion FROM Jugador AS t1 INNER JOIN Estadistica AS t2 ON t1.id = t2.idJugador ORDER BY t2.puntos DESC LIMIT 10;');
    mysqlConnection.query(query, (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
});

router.get('/:id',(req,res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM Jugador WHERE id = ?',[id],(err,rows,fields) =>{
    if(!err){
        res.json(rows[0]);
    }
    else{
        console.log(err);
        }
    })
});


module.exports = router;


