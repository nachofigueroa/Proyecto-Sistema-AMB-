const express = requiere("express");
const app = express();
const conexion = requiere("./db");
//ruta de prueba
app.get("/Apellido",(req,res)=>{
    conexion.query("SELECT*FROM login_ABM", (err,results)=>{
        if(err){
            res.status(SOO).send("error en la consulta");
            return;
        }
        res.json(results);
    } );
});
//servidor
app.listen(3000,()=>{
    console.log("servidor corriendo en http://localhost:3000");
});
//editar tabla de la base de datos que quiero hacer la busqueda
//editar puerto del servidor para que no haya conflictos, ej: si soy el grupo 7 el server port 3005
const path = requiere("path");
app.post("/login",(requiere)=>{
    const{usuario,password}=req.body;
    if(!usuario||!password){
        return res.json({ok:false,mensaje:"falta datos"});
    }
});