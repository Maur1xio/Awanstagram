import { myUsers } from "../database/Users.js";


let nComments = 0;
if(localStorage.getItem("idComment") !== null){
    nComments = parseInt(localStorage.getItem("idComment"));
}

export default function paintEveryonePublication(dataBasePublications, contPublicationsInHTML, publications){
    console.log(publications);
    dataBasePublications.forEach(travel=>{
        for(let x of publications){
            if(travel.idFormUser == x){
                let dataUser = myUsers.getData(travel.idFormUser);
                let contLikes = travel.likes;
                let classNameLike = "";
                let classNameDelete = "";
                let likesAnswer = contLikes.some(travel=> travel == localStorage.getItem("myUserId"));
                if(!likesAnswer){
                    classNameLike = "like__publication like__publication__off";
                    /* classNameDelete = "far fa-trash-alt more__options__publication invisible"; */
                }else{
                    classNameLike = "like__publication";
                    /* classNameDelete = "far fa-trash-alt more__options__publication"; */
                }
                let publicationAnswer = dataBasePublications.some(travel => travel.idFormUser == localStorage.getItem("myUserId"));
                if(x ==  localStorage.getItem("myUserId")){
                    classNameDelete = "far fa-trash-alt more__options__publication";
    
                }else{
                    classNameDelete = "far fa-trash-alt more__options__publication invisible";
    
                }
            /*     if(!likesAnswer){
                    classNameDelete = "far fa-trash-alt more__options__publication invisible";
                }else{
                    classNameDelete = "far fa-trash-alt more__options__publication";
                } */
                contPublicationsInHTML.innerHTML += `
                
                <div class="publications" data-id="${travel.idPublication}">
    
                        <header class="header__publication">
    
                            <div class="info__user__header__publication">
                                <div class="data__info__user__header__publication">
                                <a href="./profile.html" data-id="${travel.idFormUser}" class="for__go__profile"> <img  src="${dataUser.personalInformation.img}" alt=""></a>
                                    <h4>${dataUser.personalInformation.userName}</h4>
                                </div>
                                <i class="${classNameDelete}"></i>
                            </div>
                           
    
                        </header>
    
                        <main class="main__publication">
                            <article class="cont__img__main__publication">
                                <img class="img__main__publication" data-id="[${travel.idFormUser}, ${travel.idPublication}]" src="${travel.img}" alt="">    
                            </article>
                            <article class="everyone__comments">
                                <header class="header__everyone__comments">
                                    <svg class="${classNameLike}" data-id="${travel.idPublication}" aria-label="Me gusta" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                    <label class="comment__publication">
                                        <svg aria-label="Comentar" class="_8-yf5 " fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                                    </label>
                                    <div class="cont__num__likes">
                                        <p> <span>${travel.likes.length}</span> Me gusta</p>
                                    </div>
                                </header>
                                <main class="main__everyone__comments">
    
                                    <div class="text__user__main__comments">
    
                                        <span><a href="./profile.html" data-id="${travel.idFormUser}" class="for__go__profile">${dataUser.personalInformation.userName}</a></span>
                                        ${travel.info}
    
                                    </div>
    
                                    <div class="cont__comments__main__comments">
                                    </div>
    
                                </main>
                                <footer class="footer__everyone__commnets">
                                    <form class="creatte__comment">
    
                                        <textarea type="text" id="creatteComment" placeholder="Añade un comentario"></textarea>   
    
                                        <button id="sendComment" type="submit" class="disabled__button" data-id="${travel.idPublication}" >Comentar</button>
    
                                    </form>
                                </footer>
                            </article>
                        </main>
    
                    </div>
                `;
    
            }
        }
    });

                                            
/* Poniendo los comentarios */
            let contPublications = [...document.querySelectorAll(".publications")];
            for(let x of contPublications){
                console.log(x);
                let idPublication = x.getAttribute("data-id")
                let myPublication = myUsers.getPublicationForCreation(idPublication);
                console.log(myPublication);

                let comments = myPublication.comments;
                if(comments.length != 0){
                    for(let y of comments){
                        let user = myUsers.getData(y.idUser);
                        let answer = y.likes.some(travel=> travel == localStorage.getItem("myUserId"));
                        let classLikeComment  = "";
                        if(answer){
                            classLikeComment = "like__comment like__publication__on__animation";
                        }else{
                            classLikeComment = "like__comment like__publication__off__animation";
                        }
                        let containerComment = x.children[1].children[1].children[1].children[1];
                        containerComment.innerHTML += `
                            
                            <div class="comment">
                                <p class="info__comment"><span><a data-id="${user.id}" href="../views/profile.html">${user.personalInformation.userName}</a> </span>${y.text}</p>
                                <svg data-id="[${idPublication}, ${y.idComment}]"class="${classLikeComment}" aria-label="Me gusta" class="_8-yf5 " fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                <p class="num__likes__comment">${y.likes.length} Me gusta</p>
                            </div>
                        
                        `;
                    }
                    
                }
            }
        

            let commentHTML = [...document.querySelectorAll("#creatteComment")];
let buttonSend = [...document.querySelectorAll("#sendComment")];
for(let x of commentHTML){
    let buttonSend = x.nextElementSibling;
    x.addEventListener("input", e=>{
        if(e.target.value.trim() != ""){
            buttonSend.classList.remove("disabled__button");
        }else{
            buttonSend.classList.add("disabled__button");

        }
    });
    
}
likeButtonComment();
for(let x of buttonSend){
    x.addEventListener("click", e=>{
        e.preventDefault();
       if(e.target.previousElementSibling.value.trim() != ""){
           let text = e.target.previousElementSibling.value.trim();
           let key = e.target.getAttribute("data-id");
           e.target.previousElementSibling.value = "";
           e.target.classList.add("disabled__button")
           nComments += 1;
           localStorage.setItem("idComment", nComments);
           let newComment = {
               idUser : parseInt(localStorage.getItem("myUserId")),
               idComment : nComments,
               likes : [],
               text
           }
           console.log(newComment);
           for(let x of dataBasePublications){
               if(x.idPublication == key){
                   x.comments = [newComment, ...x.comments];
               };
           };
        localStorage.setItem("dataBasePublications", JSON.stringify(dataBasePublications));


        let contComments = e.target.parentElement.parentElement.parentElement.querySelector(".cont__comments__main__comments");

        let commentHTML = document.createElement("DIV");
        let myUser = myUsers.getData(localStorage.getItem("myUserId"));

        commentHTML.innerHTML = `
                <div class="comment">
                    <p class="info__comment"><span><a data-id="${localStorage.getItem("myUserId")}" href="../views/profile.html">${myUser.personalInformation.userName}</a> </span>${text}</p>
                    <svg data-id="[${key}, ${nComments}]" class="like__comment like__publication__off__animation" aria-label="Me gusta" class="_8-yf5 " fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>

                    <p class="num__likes__comment">0 Me gusta</p>

                </div>
        `;

        contComments.insertBefore(commentHTML, contComments.children[0]);

        likeButtonComment();
       }
    });
    
}
console.log(document.querySelector(".cont__publications"));
let linkToProfile = [...document.querySelector(".cont__publications").getElementsByTagName("a")];
for(let x of linkToProfile){

    x.addEventListener("click",e=>{
        let key
        if(e.target.nodeName != "IMG"){
            key = e.target.getAttribute("data-id");
        }else{
            key = e.target.parentElement.getAttribute("data-id");
        }
        localStorage.setItem("idForProfile", key);
        console.log(key);
    });
}




/* Haciendo funcionar el boton de "Me Gusta" */

let totalButtonsLike = [...document.querySelectorAll(".like__publication")];

for(let x of totalButtonsLike){
    x.addEventListener("click",e=>{
        function likesProcess(){
            let key = e.target.getAttribute("data-id");
        let myId = localStorage.getItem("myUserId");
        let myDataBasePublications = myUsers.getAllPublications();

        for(let x of myDataBasePublications){
            if(x.idPublication == key){
                let answer = x.likes.some(travel=> travel == myId);
                if(answer){
                    x.likes = x.likes.filter(travel=> travel != myId);
                }else{
                    x.likes = [parseInt(myId), ...x.likes];
                }
                let numLikes = x.likes.length;
                let contNumLikesHTML = e.target.nextElementSibling.nextElementSibling;
                contNumLikesHTML.innerHTML = `<p> <span>${numLikes}</span> Me gusta</p>`
            }
        };


        localStorage.setItem("dataBasePublications", JSON.stringify(myDataBasePublications));
        };
        if(e.target.classList.contains("like__publication")){
            if(e.target.classList.contains("like__publication__off")){
                e.target.classList.remove("like__publication__off");
                e.target.classList.remove("like__publication__off__animation");
                e.target.classList.add("like__publication__on__animation");
            }else{
                e.target.classList.remove("like__publication__off__animation");
                e.target.classList.add("like__publication__off");
                e.target.classList.remove("like__publication__on__animation");
                e.target.classList.add("like__publication__off__animation");
            }
            likesProcess();

        }
        

    });
};


/* Haciendo funcionar el btn de "Me gusta" en comentarios */
function likeButtonComment(){

    let likeComment = [...document.querySelectorAll(".like__comment")];

    for(let x of likeComment){
        x.addEventListener("click", function(e){
            if(e.target.nodeName != "path"){
                /* Animación */
                if(e.target.classList.contains("like__publication__off__animation")){
                    e.target.classList.remove("like__publication__off__animation");
                    e.target.classList.add("like__publication__on__animation");
                }else if(e.target.classList.contains("like__publication__on__animation")){
                    e.target.classList.remove("like__publication__on__animation");
                    e.target.classList.add("like__publication__off__animation");
                }
                /* Modificando base de datos */
                let newDataBasePublications = myUsers.getAllPublications();
                let dataLike = JSON.parse(e.target.getAttribute("data-id"));
                let [idForPublication, idForComment] = dataLike;
                for(let y of newDataBasePublications){
                    if(y.idPublication == idForPublication){
                        for(let z of y.comments){
                            if(z.idComment == idForComment){
                                let answer = z.likes.some(travel => travel == parseInt(localStorage.getItem("myUserId")));
                                if(answer){
                                    z.likes = z.likes.filter(travel=>{
                                        if(travel != parseInt(localStorage.getItem("myUserId"))){
                                            return travel;
                                        }
                                    })
                                }else{
                                    z.likes = [parseInt(localStorage.getItem("myUserId")), ...z.likes];
                                }

                                let numLikesComment = z.likes.length;
                                e.target.nextElementSibling.textContent = `${numLikesComment} Me gusta`;
                            }
                        }
                    }
                }
                localStorage.setItem("dataBasePublications", JSON.stringify(newDataBasePublications));
            }
        })
    }

};

/* Eliminando publicaciones */

let morePublication = [...document.querySelectorAll(".more__options__publication")];

for(let x of morePublication){
    x.addEventListener("click", function(e){
        let answer = confirm("¿Estás seguro de eliminar tu publicación?");
        if(answer){
            let key = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");

            console.log(dataBasePublications);
            dataBasePublications = dataBasePublications.filter(travel=>{
                if(travel.idPublication != key){
                    return travel
                }
            });
            localStorage.setItem("dataBasePublications", JSON.stringify(dataBasePublications));
            window.location = window.location;
        }

    });
}


}