var stranica = document.getElementsByClassName('title');
var trenutnaStrana = stranica[0].text;
//console.log(trenutnaStrana);

$(document).ready(function(){
    //Navigacija :
    if(trenutnaStrana != "Galerija" ){
    $(".navigacija li ").hover(function(){
       $(this).find("li").stop().slideToggle();
    });

    }
    //Slider :
    // $.ajax({
    //     url:"JS/slider.json",
    //     type:"GET",
    //     dataType:"json",
    //     success: function (podaci){
    //         //console.log(podaci);
    //         var x = 0;
    //         function slider(){            
    //             var slider = "<img src='"+podaci[x].slika+"'/>";
    //             if(x<(podaci.length-1)){
    //                 x++;
    //             }       
    //             else{
    //                 x=0;
    //             }      
    //             $("#slider").html(slider);
               
    //         }
    //         setInterval(slider, 4000);              
    //     },
    //     error: function(greska){
    //         console.log(greska.status);
    //     }
        
    // });

    if(trenutnaStrana == "Gradovi"){
        $.ajax({
            url:"JS/sadrzajGradovi.json",
            type:"GET",
            dataType:"json",
            success:  function(podaci){
                //console.log(podaci);
                var i = 10;
                var j = 0;
                var ispis2 = "";
                for(x in podaci){
                    var trObj = podaci[x];
                    //console.log(trObj.imeGrada);
                    ispis2 += "<fieldset id='"+i+"'>";
                    ispis2 += "<legend>"+trObj.imeGrada+"</legend>";
                    for(y in trObj.fs){
                        var trObj2 = trObj.fs[y];
                        ispis2 += "<div class='deloviGrada'>";
                            ispis2 += "<img src='"+trObj2.slika.src+"'alt='"+trObj2.slika.alt+"'/>"
                            ispis2 += "<p class='naslov'>"+trObj2.naslov+"</p>";
                            ispis2 += "<p class='opis'>"+trObj2.glavniText+"</p>";
                            ispis2 += "<input class='procitajteVise' type='button' value='Pročitajte više' onClick='prikaziDodatak("+j+");'/>"
                            ispis2 += "<p id='"+j+"' class='dodatak'>"+trObj2.dodatakText+"</p>";
                        ispis2 += "</div>"; 
                        j++                                   
                    }   
                    ispis2 += "</fieldset>";
                    i++;
                }
                document.getElementById('sadrzajGradovi').innerHTML = ispis2;
            }
        }); 
    }
   
});

window.onload = function(){
    //Forma:  
if(trenutnaStrana == "Register"){
    document.getElementById('greske').style.display = "none";
    document.getElementById('taster').addEventListener("click", provera);
    function provera(){

    var imePrezime = document.getElementById('tabImePrezime').value;
    var eMail = document.getElementById('tabEmail').value;
    var brTel = document.getElementById('tabBroj').value;
    var pol = document.getElementsByName('rbPol');
    var polIzbor = "";
    for(x in pol){
        if(pol[x].checked){
            polIzbor += pol[x].value;
            break;
        }
    }
    var korIme = document.getElementById('tabKorIme').value;
    var pass = document.getElementById('tabPass').value;

    var regImePrezime = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,9}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,9})+$/;
    var regEmail = /^[a-z\d]+(\.[a-z\d]*)*\@[a-z\d]{1,10}(\.[a-z\d]*){0,3}\.[a-z]{2,4}$/;
    var regBrTe = /^((\+3816)|(06))[01234569]\/[\d]{3,4}\-[\d]{3,4}$/
    var regKorIme = /^[A-Za-z][A-Za-z0-9]*$/
    var regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/

    var nizGreske = new Array();
    if(!regImePrezime.test(imePrezime)){
        nizGreske.push("Nepravilno upisani ime i prezime.");
        document.getElementById('tabImePrezime').style.border = "2px solid red";
    }else{
        document.getElementById('tabImePrezime').style.border = "2px solid green";
    }
    if(!regEmail.test(eMail)){
        nizGreske.push("Nepravilno upisan eMail.");
        document.getElementById('tabEmail').style.border = "2px solid red";
    }else{
        document.getElementById('tabEmail').style.border = "2px solid green";
    }
    if(!regBrTe.test(brTel)){
        nizGreske.push("Nepravilno upisan broj telefona.");
        document.getElementById('tabBroj').style.border = "2px solid red";
    }else{
        document.getElementById('tabBroj').style.border = "2px solid green";
    }
    if(polIzbor == ""){
        nizGreske.push("Morate izabrati pol.");
    }
    if(!regKorIme.test(korIme)){
        nizGreske.push("Nepravilno upisano korisnicko ime(bez razmaka).");
        document.getElementById('tabKorIme').style.border = "2px solid red";
    }else{
        document.getElementById('tabKorIme').style.border = "2px solid green";
    }
    if(!regPass.test(pass)){
        nizGreske.push("Nepravilno upisan password (bar jedan broj, malo slovo, veliko slovo i min 7 karaktera).");
        document.getElementById('tabPass').style.border = "2px solid red";
    }else{
        document.getElementById('tabPass').style.border = "2px solid green";
    }

    var ispisGresaka = "";
    if(nizGreske.length > 0){
        document.getElementById('greske').style.display = "block";
        for(x in nizGreske){
            ispisGresaka += "<p style='color:red; font-size:20px; '>"+nizGreske[x]+"</p>";    
        }
    } else {
        document.getElementById('greske').style.display = "none";
    }

    document.getElementById('greske').innerHTML = ispisGresaka;
    }
}
};

