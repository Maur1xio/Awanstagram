

export default function checkFormSuperficial(object){
   let confirmation = 0;
   let array = Object.entries(object);
    for(let x of array){
        if(x[1] != "" || x[1] == true){
            confirmation+= 1;
        }
    }

   if(confirmation == array.length){
       return true;
   }else{
        return false;
   }
}