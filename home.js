let userchoice;

const setmap = document.getElementById("mainbox");
const choices = document.querySelectorAll(".myimg");
choices.forEach((e) => {
    e.addEventListener("click", () => {
        userchoice = e.getAttribute("src");
        setmap.src = userchoice;
        localStorage.setItem(1,userchoice);
        console.log(userchoice);
    })
});




