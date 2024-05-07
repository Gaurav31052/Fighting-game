let userchoice;

const setmap = document.getElementById("mainbox");
const choices = document.querySelectorAll(".myimg");
choices.forEach((e) => {
    e.addEventListener("click", () => {
        userchoice = e.getAttribute("src");
        setmap.src = userchoice;
        localStorage.setItem(1,userchoice);
        console.log(userchoice);
        if(userchoice === "./img/background1.jpg"){
            document.getElementById('name').innerHTML = "Bloom";
        }
        else if(userchoice === "./img/background2.jpg"){
            document.getElementById('name').innerHTML = "Skyris";
        }
        else if(userchoice === "./img/background3.jpg"){
            document.getElementById('name').innerHTML = "Night Hawl";
        }
        else if(userchoice === "./img/background4.jpg"){
            document.getElementById('name').innerHTML = "Caves";
        }
        else if(userchoice === "./img/background5.jpg"){
            document.getElementById('name').innerHTML = "Bind";
        }
        else if(userchoice === "./img/background6.jpg"){
            document.getElementById('name').innerHTML = "Forest";
        }
    })
});




