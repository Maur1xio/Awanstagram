

export default function placeholderInput(input){
    input.addEventListener("focus", function(){
        input.classList.remove("center__placeholder");
        input.classList.add("left__placeholder");
    });

    input.addEventListener("blur", function(){
        input.classList.remove("left__placeholder");
        input.classList.add("center__placeholder");
    });
}