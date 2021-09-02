

export default function seeThing(node, nav, myClass){
    node.addEventListener("click", function(){
        console.log("Hola")
        nav.classList.toggle(myClass);
    });
}