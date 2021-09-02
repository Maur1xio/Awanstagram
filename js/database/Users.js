let n = 0;
let dataUsers = 
[
    {
      "email": "fernandoherrera@gmail.com",
      "pass": "UsuarioUno12352",
      "id": 1,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628723136/ptshk0jstbsnqjggbpwb.png",
        "web": "user1.com.pe",
        "sex": "",
        "phone": "",
        "userName": "FernandoH",
        "description": "OKKKKKKKK",
        "name": "Fernando Herrera"
      }
    },
    {
      "email": "dorian@gmail.com",
      "pass": "Usuariodos12352",
      "id": 2,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628785347/ji1gvilpcx6wjihgyav1.png",
        "web": "3e4wopitnerwoitg.com",
        "sex": "",
        "phone": "",
        "userName": "dorianDesigns",
        "description": "¡Hola, soy un usuario muy raro!",
        "name": "Doriannnn"
      }
    },
    {
      "email": "robert@gmail.com",
      "pass": "woifbUOIbn3243",
      "id": 3,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628783428/pzasr29k3k4nga7okltn.png",
        "web": "user3.com",
        "sex": "",
        "phone": "",
        "userName": "roberto24",
        "description": "",
        "name": "Roberto Musso"
      }
    },
    {
      "email": "aquisi@gmail.com",
      "pass": "wefWEDGwertg345",
      "id": 4,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628783559/ul4eipqdwpbogfgxmd4e.jpg",
        "web": "user4.com",
        "sex": "",
        "phone": "",
        "userName": "aquino52",
        "description": "",
        "name": "Diego Aquino"
      }
    },
    {
      "email": "maurxio2@mail.com",
      "pass": "wefgOPK0973843459343897492840100101",
      "id": 6,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628783727/naabjajjnfwdess5n0ka.png",
        "web": "youtube.com",
        "sex": "",
        "phone": "",
        "userName": "Maur1xio",
        "description": "",
        "name": "Mauri"
      }
    },
    {
      "email": "scott@gmail.com",
      "pass": "097379846329877489324jsweG",
      "id": 7,
      "publicationsEveryone": [],
      "followers": [],
      "followed": [],
      "personalInformation": {
        "img": "https://res.cloudinary.com/di92wwdjb/image/upload/v1628783858/zbjoapekstfvbmzybqit.png",
        "web": "user7.com.pe.org",
        "sex": "",
        "phone": "",
        "userName": "scott32",
        "description": "",
        "name": "Scott Cawthon"
      }
    }
  ];
let dataPublication = [];

if(n = 0){
    localStorage.setItem("dataBaseUsers", JSON.stringify(dataUsers));
    n+= 1;
}

if(localStorage.getItem("dataBaseUsers") !== null){
    dataUsers = JSON.parse(localStorage.getItem("dataBaseUsers"));
}
if(localStorage.getItem("dataBasePublications") !== null){
  dataPublication = JSON.parse(localStorage.getItem("dataBasePublications"));
}

    class Users{

        constructor(){
            this.users = dataUsers;
            this.publications = dataPublication;
        }
    
        addData(object){
            this.users = [...this.users, object];
            this.saveData();
        }

        addPublications(object){
          this.publications = [object, ...this.publications];
          this.savePublications();
        }
        

        saveData(){
            localStorage.setItem("dataBaseUsers", JSON.stringify(this.users));
        }
        savePublications(){
          localStorage.setItem("dataBasePublications", JSON.stringify(this.publications));
        }

        getData(id){

            for(let x of this.users){
                if(x.id == id){
                    return x;
                }
            }

        }


        getAllData(){
            return this.users;
        }

        getAllPublications(){
          return this.publications;
        }

        getPublication(id){
          let publicationTotal = [];
          for(let x of this.publications){
            if(x.idFormUser == id){
              publicationTotal.push(x);
            }
        }
        return publicationTotal;
        }

        getPublicationForCreation(id){
            for(let x of this.publications){
              if(x.idPublication == id){
                return x
              }
          }
        }


        getPublicationForId(id){
          for(let x of this.publications){
            if(x.idPublication == id){
              return x;
            }
          }
        }
    
    }
    
    
    export let myUsers = new Users;
    
