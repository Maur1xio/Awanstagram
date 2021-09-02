/* Configuración del nav */

import updateImage from "./uptadeImage.js";
import placeholderInput from "../user/input.js";
import seeThing from "../user/seeThings.js";
import { myUsers } from "../database/Users.js";

let dataBaseUsers = myUsers.getAllData();
let input = document.querySelector(".input__search__nav");
let buttonActionNav = document.querySelector(".button__action__menu__nav");
let myNav = document.querySelector(".accessibility__nav");

let menuUsersSearch = document.querySelector(".cont__search__results");
let contProfilesSearch = document.querySelector(".search__results");


updateImage();


/* Placeholder didáctico */
placeholderInput(input);

/* Botón para activar el Nav */
seeThing(buttonActionNav,myNav, "see__accessibility__nav");



/* Buscador */

input.addEventListener("input", function(e){
    let word = e.target.value.trim();
    if(word != ""){
        menuUsersSearch.classList.remove("invisible");
        search(word);
    }else{
        menuUsersSearch.classList.add("invisible");
    }
});

menuUsersSearch.addEventListener("click", (e)=>{
    let key = e.target.getAttribute("data-id");
    localStorage.setItem("idForProfile", key);
});


function search(word){
    contProfilesSearch.innerHTML = "";
    let dataBaseUsersFilter = dataBaseUsers.filter(travel=>{
        if(travel.personalInformation.userName.toLowerCase().indexOf(word.toLowerCase()) >= 0 ||  travel.personalInformation.name.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
            return travel
        }
    });
    if(dataBaseUsersFilter.length > 0){
        contProfilesSearch.classList.remove("flex");
        for(let x of dataBaseUsersFilter){

            contProfilesSearch.innerHTML+= `
            
                <a class="profile__answer" href="../views/profile.html" data-id="${x.id}">
    
                    <div class="cont__user__data" data-id="${x.id}">
    
                        <img src="${x.personalInformation.img}" data-id="${x.id}" alt="">
                        <div class="info__user__data" data-id="${x.id}">
    
                            <h4 data-id="${x.id}">${x.personalInformation.userName}</h4>
                            <p data-id="${x.id}">${x.personalInformation.name}</p>
    
                        </div>
    
                    </div>
    
                </a>
    
            `;
           
        }
    }else{
        contProfilesSearch.classList.add("flex");
        contProfilesSearch.innerHTML = `<p class="message__no__search">No se encontró este usuario :(</p>`;
    }
   

}




myNav.lastElementChild.addEventListener("click", function(e){
    localStorage.setItem("idForProfile", parseInt(localStorage.getItem("myUserId")));
});

let menuToggle = document.querySelector(".exit__account");
let toggleExitAccount = document.querySelector(".cont__exit__account");

toggleExitAccount.addEventListener("click", function(){
    menuToggle.classList.toggle("exit__account__see");
})