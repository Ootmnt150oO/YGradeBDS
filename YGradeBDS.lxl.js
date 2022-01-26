const playergrade = new Map();
const configpath = "./plugins/YGradeBDS/config.json";
const config = new JsonConfigFile(configpath);
function initPlayer(playername){
    var grade = new Map();
    grade.set("等級",parseInt(0,10));
    grade.set("經驗",parseInt(0,10));
    playergrade.set(playername,grade);
}
function removePlayer(playername){
    playergrade.delete(playername);
}
function getGrade(playername){
    return parseInt(playergrade.get(playername).get("等級"),10);
}
function getExp(playername){
    return parseInt(playergrade.get(playername).get("經驗"),10);
}
function getMaxExp(playername){
    return parseInt((getGrade(playername)*getGrade(playername))+50,10);
}
function getPlayerMap(playername){
    return playergrade.get(playername);
}
function addExp(playername,exp){
    setExp(playername,getExp(playername)+exp);
    if(canUP(playername))upGrade(playername);
}
function addGrade(playername,grade){
    setGrade(playername,getGrade(playername)+grade);
}
function setExp(playername,exp){
    getPlayerMap(playername).set("經驗",parseInt(exp,10));
}
function setGrade(playername,grade){
    getPlayerMap(playername).set("等級",parseInt(grade,10));
}
function canUP(playername){
    return getExp(playername) >= getMaxExp(playername);
}
function upGrade(playername){
    setExp(playername,getExp(playername)-getMaxExp(playername));
    addGrade(playername,1);
}
function loadPlayer(playername){
    initPlayer(playername);
    var str = config.get(playername,"0:0");
    var strs = str.split(":");
    setGrade(playername,strs[0]);
    setExp(playername,strs[1]);
}
function savePlayer(playername){
    var str = getGrade(playername) +":" +getExp(playername);
    config.set(playername,str);
    removePlayer(playername);
}
mc.listen("onJoin",function(player){
    loadPlayer(player.name);
});
mc.listen("onLeft",function(player){
    savePlayer(player.name);
});
