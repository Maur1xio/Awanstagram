export default function selectPublications(cont, items,classRemove, classUse){
    
    cont.addEventListener("click", e=>{
        if(e.target.classList.contains(classUse) || e.target.parentElement.classList.contains(classUse)){
            for(let x of items){
                x.classList.remove(classRemove);
            }
            if(e.target.classList.contains(classUse)){
                e.target.classList.add(classRemove);
            }else{
                e.target.parentElement.classList.add(classRemove);
            }
        }
    })

}