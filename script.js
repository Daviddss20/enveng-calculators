var sent_button = document.getElementById("send_button");
var claired_button = document.getElementById("clair_button");
var variable = [];
let listEquations = [];
class equation {
constructor (name,vars){
this.name = name;
this.vars = vars;
this.varsFound = 0;
}
}

inputsId = [ //Identidicadores de inputs
Ww,
Ws,
Wt,
Vs,
Va,
Vw,
Vv,
Vt,
n,
e,
emax,
emin,
Ga,
Gw,
Gt,
Gs,
Dr,
w,
rho_m,
ys,
rho_w,
rho_d
]

//Funcion a botones
sent_button.addEventListener("click", calculate);
claired_button.addEventListener("click", borrar);
document.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
calculate();
}
});

//Equation List
listEquations.push( new equation ("pesoTotalMuestra_Wt", ["Wt","Ws","Ww"]) ); 
listEquations.push( new equation ("volumenVacios_Vv", ["Vv","Vw","Va"]) ); 
listEquations.push( new equation ("volumenTotal_Vt", ["Vt","Vv","Vs"]) ); 
listEquations.push( new equation ("pesoEspecifico_ys", ["ys","Ws","Vs"]) ); 
listEquations.push( new equation ("densidadMuestra_rho", ["rho_m","Wt","Vt"]) ); 
listEquations.push( new equation ("razonVacios_e", ["e","Vv","Vs"]) ); 
listEquations.push( new equation ("porosidad_n", ["n","Vv","Vt"]) ); 
listEquations.push( new equation ("gradoSaturacion_Gw", ["Gw","Vw","Vv"]) ); 
listEquations.push( new equation ("humedadNatural_w", ["w","Ww","Ws"]) ); 
listEquations.push( new equation ("gradoSaturacionAire_Ga", ["Ga","Va","Vv"]) ); 
listEquations.push( new equation ("pesoFaseSolida_Ws", ["Ws","Wt","w"]) ); 
listEquations.push( new equation ("correlacion_n_e", ["n","e"]) ); 
listEquations.push( new equation ("densidadRelativa_Dr", ["Dr","emax","emin","e"]) ); 
listEquations.push( new equation ("gravedadEspecificaMuestra_Gt", ["Gt","rho_m","rho_w"]) ); 
listEquations.push( new equation ("gravedadEspecificaSolidos_Gs", ["Gs","rho_d","rho_w"]) ); 
listEquations.push( new equation ("gravedadEspecificaSolidos_Gs_2", ["Gs","w","Gw","e"]) ); 
listEquations.push( new equation ("densidadMuestraSeca", ["rho_d","Ws","Vt"]) ); 
listEquations.push( new equation ("densidadAgua", ["rho_w","Ww","Vw"]) ); 

//Functions
function calculate() {
console.log("1",variable);
inputSet();
console.log("2", variable);
var nameEq = selectEquationToSolve();
console.log(nameEq);
while (nameEq) {
solve(nameEq);
console.log(variable);
nameEq = selectEquationToSolve();
}
console.log(variable);
print();
console.log(variable);
}
function inputSet() { // Adquirir variables ingresadas por el usuario
for (const key in inputsId) {
var valueComming = inputsId[key].value;
var varName = inputsId[key].name;
variable[varName] = parseFloat(valueComming);
}
}
function selectEquationToSolve() {
var nameEquation;
for (const key in listEquations) {
var foundVars = 0;
for (const iterator of listEquations[key].vars) {
    if (variable[iterator]) {
        foundVars += 1;
    }
}
console.log(listEquations[key].vars.length,foundVars);
if ( (listEquations[key].vars.length - foundVars) == 1 ) {
    nameEquation = listEquations[key].name;
    console.log(listEquations[key].name,"k");
    alert("hola");
    break;
}
console.log(nameEquation);
}
console.log(nameEquation,"h");
return nameEquation;
}
function solve(name) {
switch (name) {
case 'pesoTotalMuestra_Wt':
    if(!variable["Wt"]) {
        variable["Wt"] = variable["Ww"] + variable["Ws"];
    }
    else if (!variable["Ww"]) {
        variable["Ww"] = variable["Wt"] - variable["Ws"];
    }
    else if (!variable["Ws"]) {
        variable["Ws"] = variable["Wt"] - variable["Ww"];
    }
    break;

case 'volumenVacios_Vv':
    if (!variable["Vv"]) {
        variable["Vv"] = variable["Vw"] + variable["Va"];
    }
    else if (!variable["Vw"]) {
        variable["Vw"] = variable["Vv"] - variable["Va"];
    }
    else if (!variable["Va"]) {
        variable["Va"] = variable["Vv"] - variable["Vw"];
    }
    break;
    
case 'volumenTotal_Vt':
    if (!variable["Vt"]) {
        variable["Vt"] = variable["Vv"] + variable["Vs"];
    }
    else if (!variable["Vv"]) {
        variable["Vv"] = variable["Vt"] - variable["Vs"];
    }
    else if (!variable["Vs"]) {
        variable["Vs"] = variable["Vt"] - variable["Vv"];
    }
    break;

case 'pesoEspecifico_ys':
    if (!variable["ys"]) {
        variable["ys"] = variable["Ws"] / variable["Vs"];
    }
    else if (!variable["Vs"]) {
        variable["Vs"] = variable["Ws"] / variable["ys"];
    }
    else if (!variable["Ws"]) {
        variable["Ws"] = variable["ys"] * variable["Vs"];
    }
    break;

case 'densidadMuestra_rho':
    if (!variable["rho_m"]) {
        variable["rho_m"] = variable["Wt"] / variable["Vt"];
    }
    else if (!variable["Vt"]) {
        variable["Vt"] = variable["Wt"] / variable["rho_m"];
    }
    else if (!variable["Wt"]) {
        variable["Wt"] = variable["rho_m"] * variable["Vt"];
    }
    break;

case 'razonVacios_e':
    if (!variable["e"]) {
        variable["e"] = variable["Vv"] / variable["Vs"];
    }
    else if (!variable["Vs"]) {
        variable["Vs"] = variable["Vv"] / variable["e"];
    }
    else if (!variable["Vv"]) {
        variable["Vv"] = variable["e"] * variable["Vs"];
    }
    break;

case 'porosidad_n':
    if (!variable["n"]) {
        variable["n"] = (variable["Vv"] / variable["Vt"])*100;
    }
    else if (!variable["Vt"]) {
        variable["Vt"] = (variable["Vv"] * 100) / variable["n"];
    }
    else if (!variable["Vv"]) {
        variable["Vv"] = (variable["n"] * variable["Vt"]) / 100;
    }
    break;

case 'gradoSaturacion_Gw':
    if (!variable["Gw"]) {
        variable["Gw"] = (variable["Vw"] / variable["Vv"]) * 100;
    }
    else if (!variable["Vv"]) {
        variable["Vv"] = (variable["Vw"] * 100) / variable["Gw"];
    }
    else if (!variable["Vw"]) {
        variable["Vw"] = (variable["Gw"] * variable["Vv"]) / 100;
    }
    break;

case 'humedadNatural_w':
    if (!variable["w"]) {
        variable["w"] = (variable["Ww"] / variable["Ws"]) * 100;
    }
    else if (!variable["Ws"]) {
        variable["Ws"] = (variable["Ww"] * 100) / variable["w"];
    }
    else if (!variable["Ww"]) {
        variable["Ww"] = (variable["w"] * variable["Ws"]) / 100;
    }
    break;

case 'gradoSaturacionAire_Ga':
    if (!variable["Ga"]) {
        variable["Ga"] = (variable["Va"] / variable["Vv"])*100;
    }
    else if (!variable["Vv"]) {
        variable["Vv"] = (variable["Va"] * 100) / variable["Ga"];
    }
    else if (!variable["Va"]) {
        variable["Va"] = (variable["Ga"] * variable["Vv"]) / 100;
    }
    break;

case 'pesoFaseSolida_Ws':
    if (!variable["Ws"]) {
        variable["Ws"] = variable["Wt"] / (variable["w"] + 1);
    }
    else if (!variable["w"]) {
        variable["w"] = (variable["Wt"] / variable["Ws"]) - 1;
    }
    else if (!variable["Wt"]) {
        variable["Wt"] = variable["Ws"] * (variable["w"] + 1);
    }
    break;

case 'correlacion_n_e':
    if (!variable["n"]) {
        variable["n"] = variable["e"] / (variable["e"] + 1);
    }
    else if (!variable["e"]) {
        variable["e"] = variable["n"] / (variable["n"] - 1);
    }
    break;

case 'densidadRelativa_Dr':
    if (!variable["Dr"]) {
        variable["Dr"] = (variable["emax"] - variable["e"]) / (variable["emax"] - variable["emin"]);
    }
    else if (!variable["e"]) {
        variable["e"] = variable["emax"] - (variable["Dr"] * (variable["emax"] - variable["emin"]));
    }
    else if (!variable["emin"]) {
        variable["emin"] = variable["emax"] - ((variable["emax"] - variable["e"]) / (variable["Dr"]));
    }
    else if (!variable["emax"]) {
        variable["emax"] = ((variable["Dr"]*variable["emin"])-variable["e"]) / (variable["Dr"]-1);
    }
    break;

case 'gravedadEspecificaMuestra_Gt':
    if (!variable["Gt"]) {
        variable["Gt"] = variable["rho_m"] / variable["rho_w"];
    }
    else if (!variable["rho_w"]) {
        variable["rho_w"] = variable["rho_m"] / variable["Gt"];
    }
    else if (!variable["rho_m"]) {
        variable["rho_m"] = variable["Gt"] * variable["rho_w"];
    }
    break;

case 'gravedadEspecificaSolidos_Gs':
    if (!variable["Gs"]) {
        variable["Gs"] = variable["rho_d"] / variable["rho_w"];
    }
    else if (!variable["rho_w"]) {
        variable["rho_w"] = variable["rho_d"] / variable["Gs"];
    }
    else if (!variable["rho_d"]) {
        variable["rho_d"] = variable["Gs"] * variable["rho_w"];
    }
    break;

case 'gravedadEspecificaSolidos_Gs_2':
    if (!variable["Gs"]) {
        variable["Gs"] = (variable["Gw"] * variable["e"])/variable["w"];
    }
    else if (!variable["w"]) {
        variable["w"] = (variable["Gw"] * variable["e"])/variable["Gs"];
    }
    else if (!variable["e"]) {
        variable["e"] = (variable["Gs"] * variable["w"])/variable["Gw"];
    }
    else if (!variable["Gw"]) {
        variable["Gw"] = (variable["Gs"] * variable["w"])/variable["e"];
    }
    break;

case 'densidadMuestraSeca':
    if (!variable["rho_d"]) {
        variable["rho_d"] = variable["Ws"] / variable["Vt"];
    }
    else if (!variable["Vt"]) {
        variable["Vt"] = variable["Ws"] / variable["rho_d"];
    }
    else if (!variable["Ws"]) {
        variable["Ws"] = variable["rho_d"] * variable["Vt"];
    }
    break;

case 'densidadAgua':
    if (!variable["rho_w"]) {
        variable["rho_w"] = variable["Ww"] / variable["Vw"];
    }
    else if (!variable["Vw"]) {
        variable["Vw"] = variable["Ww"] / variable["rho_w"];
    }
    else if (!variable["Ww"]) {
        variable["Ww"] = variable["Vw"] * variable["rho_w"];
    }
    break;

default:
    break;
}
return
}
function print() {
for (const iterator of inputsId) {
var name = iterator.name;
var number = variable[name];
if (number) {
    iterator.value = number.toFixed(4);
}
iterator.disabled = true;
}
clairData();
}
function borrar() {
for (const iterator of inputsId) {
iterator.value = '';
iterator.disabled = false;
}
inputsId[20].value = 1.0; //Densidad del agua
}
function clairData(){
for (const iterator of listEquations) {
iterator.varsFound = 0;
}
variable = [];
}