import checkFormSuperficial from "./checkFormSuperficial.js";
import regex from "../regex.js";
import messageAlert from "../user/editionUser.js";
let formulary;
export default function playAppInPassword(){
   
    formulary = document.querySelector(".inputs__send__edit");
    let sendData = document.querySelector(".styles__submit__button");
    let object1 = {
        beforePassword__current: "",
        password__current: "",
        newPassword__current: ""
    }
    let permission = false;


       

        formulary.addEventListener("input", e=>{
            object1[e.target.id] = e.target.value;
            permission = checkFormSuperficial(object1);
            if(permission){
                sendData.classList.remove("disabled__button");
            }else{
                sendData.classList.add("disabled__button");

            }
        });


        sendData.addEventListener("click", e=>{
            e.preventDefault()
            if(permission){
                validationForm(object1);
            }
        });

}








function validationForm({beforePassword__current, password__current,newPassword__current}){
    let dataChange = JSON.parse(localStorage.getItem("dataBaseUsers"));
    let dataUser = dataChange.filter(travel => {
            if(travel.id == localStorage.getItem("myUserId")){
                    return travel;
                }
            })
dataUser = dataUser[0];
    let message;
    regex.pass.lastIndex = 0;
    
    if(beforePassword__current != dataUser.pass){
        message = "Las contraseña ingresada no coincide con la anterior.";
    }else if(!regex.pass.test(password__current)){
        message = "La contraseña ingresada no es válida.";
    }else if(password__current != newPassword__current){
        message = "Las constraseñas ingresadas no coinciden.";

    }else{
        let newPass = document.querySelector("#password__current");
            dataChange.forEach(travel=>{
                if(travel.id == localStorage.getItem("myUserId")){
                    travel.pass = newPass.value;
                }
            });
        localStorage.setItem("dataBaseUsers", JSON.stringify(dataChange));
        formulary.reset();
        message = "La contraseña se ha cambiado con éxito.";
    }
    

    messageAlert.innerHTML = `<p>${message}</p>`;
    messageAlert.classList.add("see__footer");
        setTimeout(() => {
            messageAlert.classList.remove("see__footer");
        }, 3000);


}