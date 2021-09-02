export default function editOneThing(where,what){
    for(let x of where){

        x.textContent = what;
        if(x.nodeName == "A"){
            if(what.indexOf("http") == -1){
                x.href = `https://${what}`;
            }else{
                x.href = `${what}`;

            }
        }
    }
}