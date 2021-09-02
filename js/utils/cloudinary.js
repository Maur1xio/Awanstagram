import { myUsers } from "../database/Users.js";



const cloudinaryUrl = "https://api.cloudinary.com/v1_1/di92wwdjb/image/upload";

const cloudinaryKey = "oz9eacua";




export default function uploadImage(){
    let addImg = document.getElementById("getImg");
    let contImg = document.querySelector(".cont__photo__profile img");
    let contImgHeader = document.querySelector(".cont__img__profile img");
    

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

        let key = localStorage.getItem("myUserId");
        let data = myUsers.getAllData();

        data.forEach(travel=>{
            if(travel.id == key){
                travel.personalInformation.img = link;
            }
        });

        localStorage.setItem("dataBaseUsers", JSON.stringify(data));
        console.log(link);
        console.log(data);
        contImg.src = link;
        contImgHeader.src = link;

    });
}