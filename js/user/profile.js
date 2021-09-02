import { myUsers } from "../database/Users.js";
import updateImage from "../utils/uptadeImage.js";
import editOneThing from "./edition/editOneThing.js";
import selectPublications from "./selectPublications.js";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/di92wwdjb/image/upload";
const cloudinaryKey = "oz9eacua";



let contItemsPublication = document.querySelector(".cont__items__publication");
let itemsPublication = [...document.querySelectorAll(".item__publication")];
let myData;
let permissions;
let dataOfMyUser = myUsers.getData(localStorage.getItem("myUserId"));
let buttonEdit = document.querySelector(".edit__button__first__info__data");



 if(localStorage.getItem("idForProfile") === null || localStorage.getItem("idForProfile") == localStorage.getItem("myUserId")){
    myData = myUsers.getData(localStorage.getItem("myUserId"));
    permissions = true;

}else if(localStorage.getItem("idForProfile") !== null){
  
    myData = myUsers.getData(localStorage.getItem("idForProfile"));
    permissions = false;
    buttonEdit.classList.add("invisible");
    let answer = dataOfMyUser.followed.some(travel => travel == myData.id);
    let message = "";
    if(answer){
        message = "Siguiendo";
    }else{
        message ="Seguir";
    }
    let contButtonsProfile = document.querySelector(".first__info__data");
    contButtonsProfile.innerHTML+= `<button class="edit__button__first__info__data">${message}</button>`;
    let buttonAction = document.querySelector(".edit__button__first__info__data:nth-child(3)");

    buttonAction.addEventListener("click",function(){
            if(answer){
                answer = false;
                let allData = myUsers.getAllData();
                console.log(allData);

                    allData.forEach(travel=>{
                        if(travel.id == localStorage.getItem("myUserId")){
                            travel.followed = travel.followed.filter(travel=>{
                                if(travel != myData.id){
                                    return travel;
                                }
                            })
                        }
                    });
                    allData.forEach(travel=>{
                        if(travel.id == myData.id){
                            travel.followers = travel.followers.filter(travel=>{
                                if(travel != localStorage.getItem("myUserId")){
                                    return travel;
                                }
                            })
                        }
                    });
                    buttonAction.textContent = "Seguir";
                    localStorage.setItem("dataBaseUsers", JSON.stringify(allData));

            }else{
                answer = true;
                let allData = myUsers.getAllData();

                    allData.forEach(travel=>{
                        if(travel.id == localStorage.getItem("myUserId")){
                            travel.followed = [...travel.followed, myData.id];
                        }
                    });
                    allData.forEach(travel=>{
                        if(travel.id == myData.id){
                            travel.followers = [...travel.followers, parseInt(localStorage.getItem("myUserId"))];
                        }
                    });
                    buttonAction.textContent = "Siguiendo";
                    localStorage.setItem("dataBaseUsers", JSON.stringify(allData));
            }
            window.location = window.location;
        });


}





/* Interactividad al seleccionar los elementos de publicación */

selectPublications(contItemsPublication,itemsPublication, "select__item__publication", "item__publication");

/* Editando el documento */



let userName = [...document.querySelectorAll(".userName")];
let publicationsEveryone = [...document.querySelectorAll(".publications__for__user")];
let followers = [...document.querySelectorAll(".followers__for__user")];
let followed = [...document.querySelectorAll(".followed__for__user")];
let user = [...document.querySelectorAll(".name__user")];
let descriptionUser = [...document.querySelectorAll(".description__user")];
let links = [...document.querySelectorAll(".links__user")];
let contImg = document.querySelector(".img__data__user img");


editOneThing( userName,myData.personalInformation.userName);
editOneThing( followers,myData.followers.length);
editOneThing( followed,myData.followed.length);
editOneThing( user,myData.personalInformation.name);
editOneThing( descriptionUser,myData.personalInformation.description);
editOneThing( links,myData.personalInformation.web);
contImg.src = myData.personalInformation.img;


/* Dándole funcionalidad a los botónes del perfil */

let contMenúTitle = document.querySelector(".header__card__information h5");
let contMenúUsers = document.querySelector(".main__card__information");

let contMenuForUsers = document.querySelector(".information__user__persons");
let menuForUsers = document.querySelector(".card__information__user__persons");
let buttonActionCloseMenu = document.querySelector(".header__card__information svg");

buttonActionCloseMenu.addEventListener("click", function(){
    contMenuForUsers.classList.add("information__user__persons__none");
    menuForUsers.classList.remove("card__information__user__persons__animation");
    location.href = location.href;
});

/* Seguidos */

let buttonActionFollowed = [...document.querySelectorAll(".data__secound__info__styles:nth-child(3)")];
let buttonActionFollowers = [...document.querySelectorAll(".data__secound__info__styles:nth-child(2)")];

for(let x of buttonActionFollowed){
    x.addEventListener("click", ()=>{
       paintData("followed", "Seguidos", "Siguiendo");
    });
}
for(let x of buttonActionFollowers){
    x.addEventListener("click", ()=>{

       paintData("followers", "Seguidores", "Eliminar");
    });
}

function paintData(typeOfUsers, title, button){
    contMenúUsers.innerHTML = "";
    let data = myData[typeOfUsers];

    if(permissions){
        for(let x of data){
            let userInfo = myUsers.getData(x);
            contMenúUsers.innerHTML += `
            
                <div class="profile__information">

                    <div class="info__user__profile">
                        <div class="img__info__user">
                            <img src="${userInfo.personalInformation.img}" alt="">
                        </div>
                        <div class="text__info__user">
                            <h5>${userInfo.personalInformation.userName}</h5>
                            <p>${userInfo.personalInformation.name}</p>
                        </div>
                    </div>


                    <button class="button__style__cont__button__profile ${typeOfUsers} ${typeOfUsers}__true" data-id="${userInfo.id}">${button}</button>

                </div>
                
            `;
        }
    }else{
        for(let x of data){
            let userInfo = myUsers.getData(x);
            contMenúUsers.innerHTML += `
            
                <div class="profile__information">

                    <div class="info__user__profile">
                        <div class="img__info__user">
                            <img src="${userInfo.personalInformation.img}" alt="">
                        </div>
                        <div class="text__info__user">
                            <h5>${userInfo.personalInformation.userName}</h5>
                            <p>${userInfo.personalInformation.name}</p>
                        </div>
                    </div>


                    <button class="invisible button__style__cont__button__profile ${typeOfUsers} ${typeOfUsers}__true" data-id="${userInfo.id}">${button}</button>

                </div>
                
            `;
        }
    }
        
    
    contMenúTitle.textContent = title;
    contMenuForUsers.classList.remove("information__user__persons__none");
    menuForUsers.classList.add("card__information__user__persons__animation");
    contMenúUsers.addEventListener("click", e=>{
        let key = e.target.getAttribute("data-id");

        if(e.target.classList.contains("followed")){
            let allData = myUsers.getAllData();

                if(e.target.classList.contains("followed__true")){
                    e.target.classList.remove("followed__true");
                    e.target.classList.add("followed__false");
                    e.target.textContent = "Seguir";
                    allData.forEach(travel=>{
                        if(travel.id == localStorage.getItem("myUserId")){
                            travel.followed = travel.followed.filter(travel=>{
                                if(travel != key){
                                    return travel;
                                }
                            })
                        }
                    });
                    allData.forEach(travel=>{
                        if(travel.id == key){
                            travel.followers = travel.followers.filter(travel=>{
                                if(travel != localStorage.getItem("myUserId")){
                                    return travel;
                                }
                            })
                        }
                    });
                }else if(e.target.classList.contains("followed__false")){
                    e.target.classList.remove("followed__false");
                    e.target.classList.add("followed__true");
                    e.target.textContent = "Siguiendo";
                    allData.forEach(travel=>{
                        if(travel.id == localStorage.getItem("myUserId")){
                            travel.followed = [...travel.followed, parseInt(key)];
                        }
                    });
                    allData.forEach(travel=>{
                        if(travel.id == key){
                            travel.followers = [...travel.followers, parseInt(localStorage.getItem("myUserId"))];
                        }
                    });
                }
                localStorage.setItem("dataBaseUsers", JSON.stringify(allData));
                data = myUsers.getData(localStorage.getItem("myUserId"));
                editOneThing( followers,data.followers.length);
                editOneThing( followed,data.followed.length);
        }else if(e.target.classList.contains("followers")){
            let allData = myUsers.getAllData();
            console.log(key)
            allData.forEach(travel=>{
                if(travel.id == key){
                    travel.followed = travel.followed.filter(travel=>{
                        if(travel != localStorage.getItem("myUserId")){
                            return travel
                        }
                    })
                }
            });
            allData.forEach(travel=>{
                if(travel.id == localStorage.getItem("myUserId")){
                    travel.followers = travel.followers.filter(travel=>{
                        if(travel != key){
                            return travel;
                        }
                    })
                }
            });
            e.target.classList.add("disabled__button")
            localStorage.setItem("dataBaseUsers", JSON.stringify(allData));
            data = myUsers.getData(localStorage.getItem("myUserId"));
            editOneThing( followers,data.followers.length);
            editOneThing( followed,data.followed.length);
        }
       
    });

}


/* Publicaciones */
let contPublications = document.querySelector(".cont__publication__user");
let contMessageNotPublication = document.querySelector(".cont__message__publication");
let publications;
if(localStorage.getItem("idForProfile") !== null){
    publications = myUsers.getPublication(localStorage.getItem("idForProfile"));
}else{
    publications = myUsers.getPublication(localStorage.getItem("myUserId"));
}
editOneThing( publicationsEveryone,publications.length);


if(permissions){
    if(publications.length == 0){
        contMessageNotPublication.innerHTML = `
            
        <img src="../images/publications.PNG" alt="">
        <p>Aún no hay publicaciones</p>
        <label class="button__for__add__publication" for="publicationAdd">Haz una publicación</label>
        <input type="file" id="publicationAdd">
        `;
        let addImgOnPublication = document.querySelector(".button__for__add__publication");
        addImgOnPublication.addEventListener("click",()=>{
            uploadImage();
        });
    }else{
        paintPublications();
    }
}else{

    if(publications.length == 0){
        contMessageNotPublication.innerHTML = `
            
        <img src="../images/publications.PNG" alt="">
        <p>Aún no hay publicaciones</p>
        <label id="messageAddPublication" for="publicationAdd">Haz una publicación</label>
        <input type="file" id="publicationAdd">
        `;
        let addPublication = document.getElementById("messageAddPublication");
        addPublication.classList.add("invisible");

    }else{
        
        paintPublications();
        let renewPublication = document.querySelector(".cont__new__publication");
        renewPublication.classList.add("invisible");

    }
}

function paintPublications(){
    let renewPublication = document.querySelector(".cont__new__publication");
    renewPublication.innerHTML  = `
    <label class="button__for__add__publication" for="publicationAdd">Haz una nueva publicación</label>
    <input type="file" id="publicationAdd"> 
    `;
        let addImgOnPublication = document.querySelector(".button__for__add__publication");
    addImgOnPublication.addEventListener("click",()=>{
        uploadImage();
    });

    for(let x of publications){
        contPublications.innerHTML += `
        
        <div class="publication">
            <img src="${x.img}" alt="">
            <div class="data__publication" data-id="${x.idPublication}">

                    <div class="my__data__publication" data-id="${x.idPublication}">

                        <div class="likes__publication info__data__publication">
                            <i data-id="${x.idPublication}" class="fas fa-heart"></i>
                            <p data-id="${x.idPublication}">${x.likes.length}</p>
                        </div>
                        <div class="comments__publication info__data__publication">
                            <i data-id="${x.idPublication}" class="fas fa-comment"></i>
                            <p data-id="${x.idPublication}">${x.comments.length}</p>
                        </div>

                    </div>

            </div>
        </div> 

        `;

    }

}



export default function uploadImage(){
    let addImg = document.getElementById("publicationAdd");


    addImg.addEventListener("change", async(e)=>{

        let file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryKey);


        let link = await axios.post(cloudinaryUrl,formData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });

        link = link.data.secure_url;
        localStorage.setItem("linkImg", link);
        window.location.href = "sendPublications.html";

    });
}









