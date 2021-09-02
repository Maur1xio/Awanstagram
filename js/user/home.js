import { myUsers } from "../database/Users.js";
import paintEveryonePublication from "../log/creattePublication.js";
localStorage.removeItem("idForProfile");



let id = localStorage.getItem("myUserId");
let dataPrimaryUser = myUsers.getData(id);
let userSecoundary = document.querySelector(".content__users__info");
let contFollowedProfiles = document.querySelector(".followed__profiles");

let dataBase = myUsers.getAllData();
let followed = dataPrimaryUser.followed;


function takeOutTheFollowing(id){
    let answer = followed.some(travel => travel == id);
    return answer;
}

/* Dándole datos al submenú */
function setInfoInSubMenu(){
    let userPrimary = document.querySelector(".primary__user");
    let dataSecoundary = [];
    userPrimary.innerHTML = `
    
        <img src="${dataPrimaryUser.personalInformation.img}">

        <div class="info__my__user__info">

            <div class="data__info__my__user__info">
                <h4>${dataPrimaryUser.personalInformation.userName}</h4>
                <p>${dataPrimaryUser.personalInformation.name}</p>
            </div>

            <a href="profile.html">Perfil</a>

        </div>

    `;

    for(let x of dataBase){
        if(x.id != id){
            if(dataSecoundary.length < 5){
                let key = x.id;
                if(!takeOutTheFollowing(key)){
                    dataSecoundary.push(x)
                }
            }
        }
    };

    for(let x of dataSecoundary){
            userSecoundary.innerHTML += `
            <div  class="my__user__info my__user__info__profile__x" >

                <a href="profile.html">
                    <img data-id="${x.id}" src="${x.personalInformation.img}">
                </a>
                <div class="info__my__user__info">

                    <div class="data__info__my__user__info">
                        <h4>${x.personalInformation.userName}</h4>
                        <p>${x.personalInformation.name}</p>
                    </div>

                <button class="follow__someone" data-id="${x.id}">Seguir</button>

                </div>

            </div>  
        `;
    };
    let usersInfo = [...document.querySelectorAll(".my__user__info__profile__x img")];
    for(let x of usersInfo){
        x.addEventListener("click", e=>{
            let key = e.target.getAttribute("data-id");
            localStorage.setItem("idForProfile", key);
        })
    }




}



/* Dándole datos al menú de de seguidos */
function setInfoInMenuFollowed(){

    if(dataPrimaryUser.followed.length == 0){
        contFollowedProfiles.innerHTML = `<p>Empieza a seguir a personas para ver contentido</p>`;
    }else {
        paintUserFollowed();
    }

}


/* Dándole funcionalidad de "seguir a alguien" */
function followSomeone(){
    userSecoundary.addEventListener("click",e=>{
        if(e.target.classList.contains("follow__someone")){
            let key = e.target.getAttribute("data-id");
            addFollower(key);
            dataBase.forEach(travel=>{
                
                if(travel.id == id){
                    travel.followed.push(parseInt(key));
                    console.log(key,travel)
                    travel.followed = travel.followed.filter(travel=>{
                        if(travel != id){
                            return travel;
                        }
                    })
                }
            });
            console.log(dataBase);
            localStorage.setItem("dataBaseUsers", JSON.stringify(dataBase));
            e.target.classList.add("following");
            e.target.classList.remove("follow__someone");
            e.target.textContent = "Siguiendo";
        }
    });
}

function addFollower(key){
    console.log(`Vamos a meter este id:${id} a los "seguidores" del usuario ${key}` );
    dataBase.forEach(travel=>{
        if(travel.id == key){
            travel.followers.push(parseInt(id));
        }
    });
}

function paintUserFollowed(){
    for(let x of followed){
        let data = myUsers.getData(x);
        contFollowedProfiles.innerHTML+= `
        
            <a href="profile.html" data-id="${data.id}"  class="profile__of__followed">

                <img src="${data.personalInformation.img}" alt="">
                <p>${data.personalInformation.userName}</p>

            </a>

        `;
    }
    
    contFollowedProfiles.addEventListener("click",e=>{
            let key;
        if(e.target.classList.contains("profile__of__followed")){
            key = e.target.getAttribute("data-id");
        }else if(e.target.parentElement.classList.contains("profile__of__followed")){
             key = e.target.parentElement.getAttribute("data-id");
        }
        localStorage.setItem("idForProfile", key);
    })
}

followSomeone();
setInfoInSubMenu();
setInfoInMenuFollowed();
/* Agregando las publicaciones */
let myData = myUsers.getData(localStorage.getItem("myUserId"));
let dataBasePublications = myUsers.getAllPublications();
let publications = myData.followed;
let myId = parseInt(localStorage.getItem("myUserId"));
let contPublicationsInHTML = document.querySelector(".cont__publications");
publications.push(myId);

/*   */

/* publications.forEach(travel=>{
    for(let x of dataBasePublications){
        if(x.idFormUser == travel){
            let dataUser = myUsers.getData(x.idFormUser);
           
        };
    }
}); */
paintEveryonePublication(dataBasePublications, contPublicationsInHTML, publications);

