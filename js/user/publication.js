import { myUsers } from "../database/Users.js";
import paintEveryonePublication from "../log/creattePublication.js";

export {myUsers} from "../database/Users.js";

let buttonClosePubli = document.querySelector(".close__publication__info");
let contPublication = document.querySelector(".cont__publication__info");
let contAllPublication = document.querySelector(".cont__publication__user");
let contDataPublication = document.querySelector(".cont__data__publication");


contAllPublication.addEventListener("click", function(e){
    let key = parseInt(e.target.getAttribute("data-id"));
    if(key > 0){
        
        paintMenu(key);

    }
});

buttonClosePubli.addEventListener("click", function(){
    contPublication.classList.toggle("invisible");
});

function paintMenu(key){
    console.log("Hola");
    contDataPublication.innerHTML = "";
    let dataPublication = myUsers.getPublicationForId(key);
    let dataBaseProfiles = myUsers.getAllData();
    let publications = dataBaseProfiles.map(travel=>{
        return travel.id
    });
    paintEveryonePublication([dataPublication], contDataPublication, publications);
    contPublication.classList.remove("invisible");


}