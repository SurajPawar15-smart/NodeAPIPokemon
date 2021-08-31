const express=require("express");
const mongoose=require("mongoose");
const app=express();

//applying middleware to convert unreadable data to js object.
app.use(express.json());

//type of request
//url

mongoose.connect("mongodb+srv://suraj:suraj123@cluster0.3knk7.mongodb.net/pokeapi?retryWrites=true&w=majority",{useNewUrlParser:true},()=>{
    console.log("MongoDB  Server is  connected successfully...!!!");
})

//schema collections
const pokemonSchema=new mongoose.Schema({
    name:String,
    type:String,
    imageUrl:String
})
//model for pokemons collection that will be used for all the operations
const pokemonModel=new mongoose.model('pokemons',pokemonSchema);

//Done-to get all pokemons
app.get('/pokemons',async(req,res)=>{
    let pokemons=await pokemonModel.find();
    res.send(pokemons);
})

//Done-to fetch a single pokemon based on _id
app.get('/pokemon/:id',async(req,res)=>{
    let id=req.params.id;
    let pokemon=await pokemonModel.find({_id:id});
    res.send(pokemon);
})


//Done-to fetch a single pokemon based on type
app.get('/pokemon/type/:type',async(req,res)=>{
    let type=req.params.type;
    let pokemon=await pokemonModel.find({type:type});
    res.send(pokemon);
})

//Done-to fetch a single pokemon based on type
app.get('/pokemon/name/:name',async(req,res)=>{
    let name=req.params.name;
    let pokemon=await pokemonModel.find({name:name});
    res.send(pokemon);
})

//Done-to post the data of pokemons
app.post('/pokemon',(req,res)=>{
let pokemon=req.body;
let pokemonObj=new pokemonModel(pokemon);
pokemonObj.save((err,data)=>{
    if(err===null){
        res.send({message:"Pokemon Created"})
    }
});
})

//Done-endpoint to delete a pokemons
app.delete('/pokemon/:id',(req,res)=>{
    let id=req.params.id;
    pokemonModel.deleteOne({_id:id},(err,data)=>{
    //console.log(id);
    res.send({message:"Deleted Pokemon"});
    })
})

//to update a pokemons
app.put('/pokemon/:id',(req,res)=>{
    let id=req.params.id;
    let pokemon=req.body;

    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{
        if(err===null){
            res.send("Pokemon Updated");
        }
    })
    findByIdUpdate(id,pokemon)
})


//to create a new pokemon
//creation and start of server
app.listen(3001,()=>{
    console.log("Server is Running Successfully...!!!");
})