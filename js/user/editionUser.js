


import playAppInPassword from "../utils/playAppInPassword.js";
import playAppInUser from "../utils/playAppInUser.js";
import { myUsers } from "../database/Users.js";
import uploadImage from "../utils/cloudinary.js";
import updateImage from "../utils/uptadeImage.js";



localStorage.removeItem("idForProfile");
let messageAlert = document.querySelector(".footer");

export default messageAlert;





/* Cambiar el contenido de qué se va a editar */

let contButtonsActionChange = document.querySelector(".change__edit__fuction");
let contInputsForEdit = document.querySelector(".cont__send__edit");
let forCompleteData = myUsers.getData(localStorage.getItem("myUserId"));
let HTMLInputProfile =`
<form class="inputs__send__edit">

<div class="photo__profile__inputs__send settings__flex">

    <div class="cont__photo__profile">
        <img src="${forCompleteData.personalInformation.img}" alt="">
    </div>

    <div class="info__photo__profile">

        <h3>${forCompleteData.personalInformation.userName}</h3>
            <label for="getImg">Cambia tu foto de perfil</label>
            <input type="file" id="getImg">

    </div>

</div>

<div class="change__name__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="name__current">Nombre</label>
    </div>

    <div class="cont__input__change__name input__styles__data">

        <input type="text" id="name__current" class="my__input__styles" value="${forCompleteData.personalInformation.name}">
        <p class="margin__automatic">Para ayudar a que las personas descubran tu cuenta, usa el nombre por el que te conoce la gente, ya sea tu nombre completo, apodo o nombre comercial.</p>
        <p class="margin__automatic">Solo puedes cambiar tu nombre dos veces en un plazo de 14 días.
        </p>

    </div>

</div>

<div class="change__userName__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="userName__current">Nombre de usuario</label>
    </div>

    <div class="cont__input__change__userName input__styles__data">

        <input type="text" id="userName__current" class="my__input__styles" value="${forCompleteData.personalInformation.userName}">
        <p class="margin__automatic">En la mayoría de los casos, podrás volver a cambiar tu nombre de usuario a ${forCompleteData.personalInformation.userName} durante 14 días más. <a href="https://help.instagram.com/876876079327341" target="_BLANK"> Más información </a> </p>

    </div>

</div>

<div class="change__website__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="website__current">Sitio Web</label>
    </div>

    <div class="cont__input__change__website input__styles__data">

        <input type="text" id="website__current" class="my__input__styles" value="${forCompleteData.personalInformation.web}">
        <p class="margin__automatic">Puedes promocionar lo que desees a todo el mundo. (Tiene que ser una url válida)</p>


    </div>

</div>

<div class="change__biography__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="biography__current">Biografía</label>
    </div>

    <div class="cont__input__change__website input__styles__data">

        <textarea  id="biography__current" class="my__input__styles">${forCompleteData.personalInformation.description}</textarea>
        <p class="margin__automatic">Proporciona tu información personal. Esta, al estar en tu perfil, todo el mundo la podrá ver.</p>


    </div>

</div>

<div class="change__email__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="email__current">Cambia tu correo</label>
    </div>

    <div class="cont__input__change__email input__styles__data">

        <input type="text" id="email__current" class="my__input__styles" value="${forCompleteData.email}">
        <p class="margin__automatic">Proporciona tu información personal. Esta, al no aparecer en tu perfil, no se podrá ver.</p>


    </div>

</div>

<div class="change__phone__inputs__send settings__flex">

    <div class="padding__automatic">
        <label for="phone__current">Número</label>
    </div>

    <div class="cont__input__change__phone input__styles__data">

        <input type="text" id="phone__current" class="my__input__styles" value="${forCompleteData.personalInformation.phone}">
        <p class="margin__automatic">Proporciona tu información personal. Esta, al no aparecer en tu perfil, no se podrá ver.</p>


    </div>

</div>

<input type="submit" value="Enviar" class="styles__submit__button disabled__button" data="userInputs">



</form>
`;
let HTMLInputPassword = `
    <form class="inputs__send__edit">

        <div class="change__beforePassword__inputs__send settings__flex">

            <div class="padding__automatic margin__right">
                <label for="beforePassword__current">Contraseña antigua</label>
            </div>

            <div class="cont__input__change__beforePassword input__styles__data">

                <input type="password" id="beforePassword__current" class="my__input__styles new__my__input__styles">
                <p class="margin__automatic">Proporciona tu información personal. Esta, al no aparecer en tu perfil, no se podrá ver.</p>

            </div>

        </div>

        <div class="change__password__inputs__send settings__flex">

            <div class="padding__automatic margin__right">
                <label for="password__current">Contraseña nueva</label>
            </div>

            <div class="cont__input__change__password input__styles__data">

                <input type="password" id="password__current" class="my__input__styles new__my__input__styles">
                <p class="margin__automatic">Proporciona tu información personal. Esta, al no aparecer en tu perfil, no se podrá ver.</p>

            </div>

        </div>

        <div class="change__newPassword__inputs__send settings__flex">

            <div class="padding__automatic margin__right">
                <label for="newPassword__current">Confirar Contraseña nueva</label>
            </div>

            <div class="cont__input__change__newPassword input__styles__data">

                <input type="password" id="newPassword__current" class="my__input__styles new__my__input__styles">
                <p class="margin__automatic">Proporciona tu información personal. Esta, al no aparecer en tu perfil, no se podrá ver.</p>

            </div>

        </div>


    <input type="submit" value="Enviar" class="styles__submit__button disabled__button" data="passInputs">


    </form>
`;

async function getImgAndUpdate(){
    await uploadImage();
    updateImage();
}

contInputsForEdit.innerHTML = HTMLInputProfile;
playAppInUser();
getImgAndUpdate();




contButtonsActionChange.addEventListener("click",e=>{
    if(e.target.classList.contains("styles__action__edit")){
        let allButtonsToChange = [...document.querySelectorAll(".styles__action__edit")];
        for(let x of allButtonsToChange){
            x.classList.remove("select__action__edit");
            x.classList.add("whit__hover");
        }
        e.target.classList.add("select__action__edit");
        e.target.classList.remove("whit__hover");

        let contInfoToEdit  = e.target.getAttribute("value");
        
        if(contInfoToEdit == "edit__perfil"){
            contInputsForEdit.innerHTML = HTMLInputProfile;
            playAppInUser();
            getImgAndUpdate();



        }else{
            contInputsForEdit.innerHTML = HTMLInputPassword;
            playAppInPassword();



        }


    }

});



