import { myUsers } from "../database/Users.js";



export default function updateImage(){
    let data = myUsers.getData(localStorage.getItem("myUserId"));
    let contItemsHeader = document.querySelector(".accessibility__nav");
    contItemsHeader.lastElementChild.children[0].children[0].children[0].src = data.personalInformation.img;
}