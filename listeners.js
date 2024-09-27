window.addEventListener("DOMContentLoaded", (e) => game_onLoad(e));
window.addEventListener("beforeunload", (e) => game_onClose(e));




let wipedSave = {
    status: [

    ],
    resources: {
        essence: [0, 10]
    },
    wipingSave: true
}

//this will get the things above even if it's the first time starting up the game
export let gameVariables = wipedSave;

/**
 * wipes save.
 * 
 * @param {object} gameVariables the game's variables
 */
export function saveWipe(){
    gameVariables = wipedSave;

    console.log(gameVariables.wipingSave);

    location.reload(true);
}






function game_onLoad(e) {
    let getSave = JSON.parse(localStorage.getItem("saveStorage"));

    if (getSave){ //loads save if there is one
        gameVariables = getSave;
    }
    else{ //if new save:
    }




    
    let loreList = document.getElementById("loreList");
    let welcomeLore = document.createElement("li");
    welcomeLore.classList.add("lore");

    if (gameVariables.wipingSave){
        welcomeLore.classList.add("newLore");
        welcomeLore.textContent = "You wake up in the middle of nowhere.";

        gameVariables.wipingSave = false;
    }
    else{
        welcomeLore.textContent = "You wake up again, at the same place you were before.";
    }
    loreList.appendChild(welcomeLore);
}

function game_onClose(e){
    localStorage.setItem("saveStorage", JSON.stringify(gameVariables))
}












/////TODO:
//function updateLore() - self-calls
//function updateStatus() - self-calls
//function updateButtons() - self-calls
//function updateResources() - self-calls



///////////////////////////////////////////////
// variable manipulation or automatic things //
///////////////////////////////////////////////


export function fixMaxAll(){
    for (let resource in gameVariables.resources){
        if (gameVariables.resources[resource][0] > gameVariables.resources[resource][1])
            gameVariables.resources[resource][0] = gameVariables.resources[resource][1];
    }
}



let updateResourcesInterval = setInterval(updateResourcesDisplay, 100);
export function updateResourcesDisplay(){
    const resources = Object.keys(gameVariables.resources);

    for (let i = 0; (i < resources.length) && gameVariables.resources[resources[i]][0] > 0; i++) {
        let listItem = document.getElementsByClassName(resources[i])[0];
    
        if (!listItem) {
            listItem = document.createElement('li');
            listItem.classList.add(resources[i]);
            
            for (let iterList of document.getElementsByClassName("resourceList")){
                iterList.appendChild(listItem);
            }
        }
    
        listItem.textContent = `${resources[i].toUpperCase()}: ${gameVariables.resources[resources[i]][0]}`;
    }
}
