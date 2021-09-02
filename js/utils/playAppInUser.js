import { myUsers } from "../database/Users.js";
import regex from "../regex.js";
import checkFormSuperficial from "./checkFormSuperficial.js";


export default function playAppInUser(){
    let permissions;
    let formulary = document.querySelector(".inputs__send__edit");
    let sendData = document.querySelector(".styles__submit__button");
    let data = myUsers.getData(localStorage.getItem("myUserId"));
    let contMessage= document.querySelector(".footer");
    let message = "";
    let dataObject = {
        name__current: data.personalInformation.name,
        userName__current:data.personalInformation.userName,
        website__current:data.personalInformation.web,
        biography__current:data.personalInformation.description,
        email__current: data.email,
        phone__current:data.personalInformation.phone
    }



    formulary.addEventListener("input", e=>{
        dataObject[e.target.id] = e.target.value;
        if(dataObject.name__current != "" && dataObject.userName__current != "" && dataObject.email__current != ""){
            permissions = true;
        }else{
            permissions = false;
        }


        if(permissions){
            sendData.classList.remove("disabled__button");
        }else{
            sendData.classList.add("disabled__button");
            
        }
    });
    formulary.addEventListener("submit", e =>{
        e.preventDefault();
        if(permissions){
            validationForm(dataObject);
        }
    })

    sendData.addEventListener("click",e=>{
        e.preventDefault();
        if(permissions){
            validationForm(dataObject);
        }
    })


    function validationForm(object){
        for(let x in regex){
            regex[x].lastIndex = 0;
        }
        let {email__current,name__current,phone__current,userName__current,website__current} = object;

            if(!regex.name.test(name__current)){
                message = "Ingresa un nombre válido";
            }else if(!regex.userName.test(userName__current)){
                message = "Ingresa un nombre de usuario válido válido";
            }else if(website__current.trim() !="" &&  !regex.website.test(website__current)){
                message = "Ingresa una web válida";
            }else if(!regex.email.test(email__current)){
                message = "Ingresa una correo válido";
            }else if(phone__current.trim() != "" &&  !regex.number.test(phone__current)){
                message = "Ingresa un número válido";
            }else{
                message = "Datos editados correctamente";
                    let dataBase = JSON.parse(localStorage.getItem("dataBaseUsers"));
                    console.log(object);
                    dataBase.forEach(travel=>{
                        if(travel.id == localStorage.getItem("myUserId")){
                            console.log(travel);
                            travel.personalInformation.name = object.name__current;
                            travel.personalInformation.userName = object.userName__current;
                            travel.personalInformation.web = object.website__current;
                            travel.personalInformation.description = object.biography__current;
                            travel.email = object.email__current;
                            travel.personalInformation.phone = object.phone__current;
                        }
                    });
                    localStorage.setItem("dataBaseUsers", JSON.stringify(dataBase));
            }
            contMessage.innerHTML = `<p>${message}</p>`;
            contMessage.classList.add("see__footer");
                setTimeout(() => {
                    contMessage.classList.remove("see__footer");
                }, 3000);
        

    }



}