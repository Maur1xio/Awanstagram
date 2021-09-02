
import {myUsers} from "../database/Users.js"

let n = 0;
if(localStorage.getItem("idFromPublications") !== null){
    n = parseInt(localStorage.getItem("idFromPublications"));
}
let buttonBackPage = document.querySelector(".back__page ");
let myData = myUsers.getData(localStorage.getItem("myUserId"));
let contHTMLThings = document.querySelector(".main");
let addPublication = document.getElementById("addPublication");
let linkImg = localStorage.getItem("linkImg");
contHTMLThings.innerHTML = `

    
        <img src="${myData.personalInformation.img}" alt="">

        <textarea class="text__info__user__main" id="textToSendToPublication" placeholder="Escribe un texto para tu publicación"></textarea>

        <div class="img__user__main">
            <img src="${linkImg}" alt="">
        </div>

`;
let textImg = document.getElementById("textToSendToPublication");

buttonBackPage.addEventListener("click", function(){
    history.back(1);
});
addPublication.addEventListener("click", function(){
    let allData = myUsers.getAllData();

    n += 1;
    localStorage.setItem("idFromPublications", n);
    let publication = {
        idFormUser : parseInt(localStorage.getItem("myUserId")),
        idPublication : n,
        img: linkImg,
        info: textImg.value.trim(),
        likes : [],
        comments: [],
    };
    myUsers.addPublications(publication);
    localStorage.setItem("dataBaseUsers", JSON.stringify(allData));
    window.location.href = "profile.html";
});