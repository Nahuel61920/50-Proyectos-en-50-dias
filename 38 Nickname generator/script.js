// Variables
const male = document.querySelector("#male");
const female = document.querySelector("#female");
const random = document.querySelector("#random");
const nickname_input = document.querySelector("#nickname_input");
const button_generate = document.querySelector("#button_generate");
const button_copy = document.querySelector("#button_copy");
const img_button_copy = document.querySelector("#img_button_copy");

const male_names = ['Gerbilator','Nessundorma','RowanTree','Octagonalo','Logan','Deadman','Ovzerber','ReBatonLay','LilFrog','PiggeonnM',
                'BlueDrakon','NeverLate','BillionBoy','CenturyCarry','Deepdie','Eyefactor','Konoha','Jouseel','Ashin','Monsterhead',
                'Raistar','DarkAngel','Akino','Yujoa','Qatzer','Krakenboy','KookToop','Herobrain','Einstetein','HereShels','Bigbull',
                    'BigGoose','LetsCrab','Octopus','Racoonboy','Owlupe','TurtleAim','AquaDragon','Zann','MordorEterium','Sqoba','Warpeace'];

const female_names = ['Esmeralda','Brella','Briii','Tycon','Xu','Zylene','Xaalana','Juliett','Amarata Witch','Delaphin','Velona VanG',
                    'Davina Eleno','Ithabel','Mystique','Amatista','Jade','Zhaphiro', 'Axinita','Bizzy','Astra','Skye','Akali Atroz',
                    'AsheGlade', 'Azircat','Evelynn','Janna','Gazal','Kaisadinn','Seraphine','Zoe','Meireaper','Shadowgirl','Zayra',
                    'Ellie','Serena','Bulma','Kinomoto','Akira','Haruka','Shika','Asuka','Shichimiya','Adashino','Asaka','Mitsuki'];

// Event list 
eventListener();
function eventListener() {
    button_generate.addEventListener("click", generateNickname);

    male.addEventListener('click',() =>{
        checkInput("male");
    })
    female.addEventListener('click',() =>{
        checkInput("female");
    })
    random.addEventListener('click',() =>{
        checkInput("random");
    })

    button_copy.addEventListener("click", () =>{
        nickname_input.select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();

        img_button_copy.src = "img/check.svg";
    });
}

// Funciones
function checkInput(input){
    switch(input){
        case "male":
            female.checked = false;
            random.checked = false;
            break;
        case "female":
            male.checked = false;
            random.checked = false;
            break;
        case "random":
            female.checked = false;
            male.checked = false;
            break;
    }
}

function selectNames(input){
    switch(input){
        case "male":
            return male_names[Math.floor(Math.random() * male_names.length)];
        case "female":
            return female_names[Math.floor(Math.random() * female_names.length)];
        case "random":
            const options = male_names.concat(female_names);
            return options[Math.floor(Math.random() * options.length)];
    }
}


function generateNickname(){
    if(male.checked || female.checked || random.checked){
        if(male.checked){
            nickname_input.value = selectNames("male");
        }else if(female.checked){
            nickname_input.value = selectNames("female");
        }else{
            nickname_input.value = selectNames("random");
        }

        img_button_copy.src = "img/copy.svg";
        button_copy.style.display = "block";
    }
}

