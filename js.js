
$("body").append(
    `
        <div id="block_mainMenu">
          <div id="EntGame">
            <h1>Введите размер поля</h1>
            <input type="text" id="inputEntSizePole">
            <button>Нaчать игру</button>
          </div>
        </div>    
    
        <div id="PanelData">
          <div id="Timer">
            <i class="fas fa-hourglass-half" id="iconTimer"></i>
            <span id="minutes"></span>
            <span id="sec"></span>         

          </div>

          <div id="containerClick">
             <i class="fas fa-mouse-pointer"></i>
             <div id="NumbClick"></div>
          </div>

        </div>

       <div id="modalka_win">
           
          <img src="iskra-3-0.gif" alt="">
          <h1>Победа</h1>
       </div>

        <div class="container"> 
        
            <div class="game-field">  
                <table id="myTable">
                    <!--content to be here-->
                </table>
        
            </div>
            <canvas id="myCanvas" width="700" height="400"></canvas> 
        </div>

        <button id="pobeda_res">Демонстрация победы</button>
    `
)


let indexTemn = 0;

setTimeout(() => {
    $("#block_mainMenu").css("display", "block")
    let interval = setInterval(() => {
        indexTemn = indexTemn + 0.005;
        $("#block_mainMenu").css({
            "background-color": `rgb(0,0,0,${indexTemn})`
        })
        if (indexTemn >= 0.5) {
            clearInterval(interval)
            $("#EntGame").css("display", "block")
            $("#EntGame").animate({
                "opacity": "1"
            }, 1000)
        }
    }, 15);

}, 1000);


$("#EntGame button").on("click", function () {
    $("#EntGame").animate({
        "opacity": "0"
    }, 700)
    let numbPola = Number($("#inputEntSizePole").val());
    setTimeout(() => {
        $("#EntGame").css("display", "none")
        OtrisovkaCanvasa(numbPola);
    }, 700);
})
function OtrisovkaCanvasa(numbPola) {
    $(".container").css("display", "block")
    $(".container").animate({
        "top": "7%"
    }, 700)

    $("#pobeda_res").css("display", "block")
    $("#pobeda_res").animate({
        "opacity": "1"
    }, 2000)



    CreatePole(numbPola)
}


let Kolonki_box_mass = [];
var Peretaskivanie;
let canvas, ctx, speed = 4, textX = 0;


canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');



let Mass_Rand_Number = [];
function CreatePole(NumbOnNUmb) {


    function TIMER() {

        $("#PanelData").css("display", "block")
        $("#PanelData").animate({
            "opacity": "1"
        }, 1000);

        function PovorotTimerIcon() {

        }
        PovorotTimerIcon()

        const mins = $('#minutes');
        const secs = $('#sec');
        let S = '00',
            M = '00',
            H = '00';

        setInterval(function () {
            S = +S + 1;
            if (S < 10) { S = '0' + S; }
            if (S == 60) {
                S = '00';
                M = +M + 1;
                if (M < 10) { M = '0' + M; }
                if (M == 60) {
                    M = '00';
                    H = +H + 1;
                    if (H < 10) { H = '0' + H; }
                }
            }
            $(secs).text(S);
            $(mins).text(`${M} :`);
        }, 1000);

    }
    TIMER()


    let table = document.getElementById('myTable');
    $(table).text("");
    Kolonki_box_mass = [];
    let Line_tab;
    let Colonki_tab;
    let counter = 0;


    for (let i = 1; i < Math.pow(NumbOnNUmb, 2); i++) {
        Mass_Rand_Number.push(i);
    }
    Fun_TabRAndNumb(Mass_Rand_Number);

    for (let i = 0; i < NumbOnNUmb; i++) {
        Line_tab = table.insertRow(i);
        for (let j = 0; j < NumbOnNUmb; j++) {

            Colonki_tab = Line_tab.insertCell(j);
            Colonki_tab.addEventListener('dragstart', handleDragStart, false);

            if (counter < Mass_Rand_Number.length) {
                $(Colonki_tab).append
                    (
                        `
                       <div class="item" draggable="true"  id="${Mass_Rand_Number[counter]}"> 
                        ${Mass_Rand_Number[counter]}
                        </div>
                    `
                    )
            } else {

                Colonki_tab.addEventListener('dragover', handleDragOver, false);
                Colonki_tab.addEventListener('drop', handleDrop, false);

            }

            Kolonki_box_mass[counter] = Mass_Rand_Number[counter];
            counter++;
        }
    }
    Kolonki_box_mass[Math.pow(NumbOnNUmb, 2) - 1] = 'DisplayNone';

}
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function Fun_TabRAndNumb(Mass_Rand_Number) {
    let randIndex;
    for (let i = 0; i < Mass_Rand_Number.length; i++) {
        let Pust_box = Mass_Rand_Number[i];
        randIndex = randomInteger(1, 14);
        Mass_Rand_Number[i] = Mass_Rand_Number[randIndex];
        Mass_Rand_Number[randIndex] = Pust_box;

    }


}

function handleDragStart(e) {

    Peretaskivanie = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
}
let Peretskivinii = 0;
function ZA() {

    return function () {
        Peretskivinii = Peretskivinii + 1;
        $("#NumbClick").text(`${Peretskivinii}`)
    }
}
let Zamikanie = ZA();

let WOnindex = 0;

function Proverka(Mass_Rand_Number) {

    let ResMass = [];

    for (let index = 0; index < Mass_Rand_Number.length; index++) {
        ResMass.push(Number($($(".item")[index]).attr("id")))
    }



    let SravMass = [];
    for (let index = 0; index < Mass_Rand_Number.length; index++) {
        SravMass.push(index + 1)
    }
    //console.log(ResMass,SravMass)

    var compResult
    diff = function (a1, a2) {
        return a1.filter(i => a2.indexOf(i) < 0)
            .concat(a2.filter(i => a1.indexOf(i) < 0))
    }
    compare = function (a1, a2) {
        return a1.length == a2.length && a1.every((v, i) => v === a2[i])
    }

    compResult = compare(ResMass, SravMass)
}


function handleDrop(e) {

    if (e.stopPropagation) {
        e.stopPropagation();
    }




    Zamikanie();

    if (Peretaskivanie != this) {





        let x = parseInt(Peretaskivanie.innerText);
        let index = Kolonki_box_mass.indexOf(x);

        Kolonki_box_mass[Kolonki_box_mass.indexOf('DisplayNone')] = x;
        Kolonki_box_mass[index] = 'DisplayNone';
        if (won(Kolonki_box_mass)) {
            fUNWOOON()

        } else {
        }

        Peretaskivanie.innerHTML = this.innerHTML;
        Peretaskivanie.addEventListener('dragover', handleDragOver, false);
        Peretaskivanie.addEventListener('drop', handleDrop, false);

        this.innerHTML = e.dataTransfer.getData('text/html');
        this.removeEventListener('dragover', handleDragOver, false);
        this.removeEventListener('drop', handleDrop, false);
    }
    Proverka(Mass_Rand_Number)
    return false;
}


function won(arr) {


    if (arr[arr.length - 1] !== "DisplayNone") {
        return;
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (i + 1 == arr[i]) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function fUNWOOON() {
    setTimeout(() => {
        let audio = new Audio();
        audio.volume = 1;
        function sound() {
            audio = new Audio(); // Создаём новый элемент Audio
            audio.src = "00556.mp3"; //
            audio.autoplay = true; // Автоматически запускаем
            audio.volume = 1;
        }
        sound()
        $("#modalka_win").css("display", "block")
        $("#modalka_win").animate({
            "opacity": "1"
        }, 500)
    }, 2000);
}


$("#pobeda_res").on("click", function () {




    $($("#myTable").children().children().children().children()).animate({
        "opacity": "0"
    }, 500)

    setTimeout(() => {
        $($("#myTable").children().children().children().children()).animate({
            "opacity": "1"
        }, 500)
        for (let index = 0; index < ($("#myTable").children().children().children().children()).length; index++) {
            $($("#myTable").children().children().children().children()[index]).text(index + 1)
            $($("#myTable").children().children().children().children()[index]).attr("id", index + 1)
        }
        fUNWOOON()
    }, 1500);




})