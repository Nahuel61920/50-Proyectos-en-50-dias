// Variabñes
const fieldset = document.querySelector(".fieldset");
let btnCalc = document.querySelector("#btn-calc");
let tab =document.getElementById("tab");

// EventListener
EventListener();
function EventListener() {
    btnCalc.addEventListener("click", gen_table);
}

// Funciones
function gen_table(){
    tab.innerHTML="";
    let capital = Number(document.getElementById("capital").value);
    let couta = Number(document.getElementById("couta").value);
    let interes = Number(document.getElementById("interes").value);
    

    validation();

    function validation(){
        if(capital>0){   
            for(i=1;i<=couta;i++){
                // Calculando Capital
                capitales=capital/couta;
                d1=capitales.toFixed(2);
                // Cuotas
                cuotas=((capital*interes)/100)/couta;
                d2=cuotas.toFixed(2);
    
                // Intereses
                intereses=capitales+cuotas;
                d3=intereses.toFixed(2);
    
    
                document.getElementById("tab").innerHTML=document.getElementById("tab").innerHTML+
                        `<tr>
                            <td> ${i}</td>
                            <td> ${d1}</td>
                            <td> ${d2}</td>
                            <td> ${d3}</td>
                        </tr>`;
            }
            totalCapital=capital.toFixed(2);
            t_i=cuotas*couta;
            totalCuota=t_i.toFixed(2);
            t_p=intereses*couta;
            totalInteres=t_p.toFixed(2);

            // Generar tabla
            document.getElementById("t1").innerHTML=totalCapital;
            document.getElementById("t2").innerHTML=totalCuota;
            document.getElementById("t3").innerHTML=totalInteres;        
        }else{
            errorNumero();
        }
    }

    function errorNumero() {
        const errorNumero = document.createElement("div");
        errorNumero.classList.add("alerta", "error");
        errorNumero.textContent = "Ingrese un numero valido";
        fieldset.appendChild(errorNumero);
    
        setTimeout(() => {
            errorNumero.remove();
        }, 3000);
    }
}

