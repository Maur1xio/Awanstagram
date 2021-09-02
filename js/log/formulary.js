import { myUsers } from "../database/Users.js";
import checkFormSuperficial from "../utils/checkFormSuperficial.js";

let buttonSubmitForm;
let permissionToButton = false;
let newUser;
let contMessage= document.querySelector(".footer");

addEventListener("DOMContentLoaded", ()=>{

     buttonSubmitForm = document.querySelector(".button__style");
     sendData();
     newUser = {
        email : "",
        pass : ""
    }

    let inputs = [document.getElementById("email"), document.getElementById("pass") ];
   
    for(let x of inputs){

        x.addEventListener("input", e=>{

            newUser[e.target.id] = e.target.value;

            permissionToButton = checkFormSuperficial(newUser);

                if(permissionToButton){
                    buttonSubmitForm.classList.remove("opacity");
                }else{
                    buttonSubmitForm.classList.add("opacity");
                }

        });

    }

});



function sendData(){
    buttonSubmitForm.addEventListener("click", (e)=>{
        e.preventDefault();
        if(permissionToButton){
            validationForm(newUser);
        }
    });
}



function validationForm(object){
    let {email, pass} = object;
    let dataBase = myUsers.getAllData();
    console.log(dataBase);
    let message = "";

    for(let x of dataBase){
        if(x.email == email && x.pass == pass){
            localStorage.setItem("myUserId", x.id );
            message = "Datos válidos"
            window.location.href = "/views/profile.html";
            break
        }else if(x.email == email){
            message = `Tu constraseña es incorrecta`;
            break
        }else{
            message = "Esta cuenta no existe."

        }
    }
    
    contMessage.innerHTML = `<p>${message}</p>`;
    contMessage.classList.add("see__footer");
        setTimeout(() => {
            contMessage.classList.remove("see__footer");
        }, 3000);
}