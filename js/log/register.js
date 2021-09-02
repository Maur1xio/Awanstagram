import regex from "../regex.js";
import checkFormSuperficial from "../utils/checkFormSuperficial.js";
import {myUsers} from "../database/Users.js";

    let id = 7;

   /*  localStorage.setItem("idForUsers", id); */
    if(localStorage.getItem("idForUsers") !== null){
        id = parseInt(localStorage.getItem("idForUsers"));
    }

   /*  let form = document.querySelector(".cont__log__in__register__main"); */

    let newData = {
        email : "",
        name: "",
        userName : "",
        pass : ""
    }
    
    let condition = {
        email : false,
        name: false,
        userName :false,
        pass : false
    }
    let buttonSubmitForm = document.querySelector(".button__style");
    let buttonPermissions = false;
    
    
    addEventListener("DOMContentLoaded", function(){
        let inputs = [...document.querySelectorAll(".input__for__select")];
    
        for(let x of inputs){
            x.addEventListener("input", function(e){
                regex[e.target.id].lastIndex = 0;
                if(regex[e.target.id].test(e.target.value.trim())){
                    e.target.nextElementSibling.innerHTML = `<i class="far fa-check-circle"></i>`;
                    newData[e.target.id] = e.target.value.trim();
                    condition[e.target.id] = true;
    
                }else{
                    e.target.nextElementSibling.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
                    condition[e.target.id] = false;
                }
                buttonPermissions = checkFormSuperficial(condition);
    
                if(buttonPermissions){
                    buttonSubmitForm.classList.remove("opacity");
                }else{
                    buttonSubmitForm.classList.add("opacity");
                }
            });
        };
    
    });
    
    buttonSubmitForm.addEventListener("click", e=>{
        e.preventDefault();
        if(buttonPermissions){
            let email = document.getElementById("email").value.trim();
            let name = document.getElementById("name").value.trim();
            let userName = document.getElementById("userName").value.trim();
            let pass = document.getElementById("pass").value.trim();   
            let dataToSend = {
                email,
                pass
            }  
            id += 1;
            localStorage.setItem("idForUsers", id);
            dataToSend.id = id;
            dataToSend.publicationsEveryone = [];
            dataToSend.followers = [];
            dataToSend.followed = [];
            dataToSend.personalInformation = {
                img : "../images/profile.PNG",
                web : "",
                sex : "",
                phone : "",
                userName,
                description : "",
                name
            }

            myUsers.addData(dataToSend);
            localStorage.setItem("myUserId",dataToSend.id);
            window.location.pathname = `./views/profile.html`;
            
            /* Reiniciando estilos, y datos */
/* 
            form.reset();

            for(let x in newData){
                newData[x] = "";
            }

            for(let x in condition){
                condition[x] = false;
            }
            buttonPermissions = false;
            buttonSubmitForm.classList.add("opacity");

            let contIcons = [...document.querySelectorAll(".cont__icon")];
            for(let x of contIcons){
                x.innerHTML = "";
            }
          */
        
        }
    
    });
    
    
