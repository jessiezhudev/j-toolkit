function jsonToJavaClass(json){
    let javaClass = "";
    const keyWord = "private";
    //1. loop the json prop
    for (let prop in json) {
        //2. to find the type of the value
        let type = typeof json[prop];
        if(type === 'string') { //TODO 优化if else
            type = 'String';
        }else if(type === 'number') {
            type = 'int';
        }else if(type === 'boolean') {
            type = 'Boolean';
        }// ignoring datetime and objects...
        //3. split the prop and capitalize the first character
        let array = prop.split("_");
        let arrayLength = array.length;
        if(arrayLength>1) {
            let newProp = "";
            for (let i=0;length<arrayLength; i++) {
                if(i===0) {
                    newProp+=array[i];
                }else{
                    newProp+=array[i].replace(/^\S/,(e)=>{
                        return e.toUpperCase;
                    })
                }
            }
        }else{
            javaClass+=keyWord + " " + type + " " + prop+";";
        }
    }
    return javaClass;
}
let example = {
    name: "Jessie",
    age: 26,
    isDev: true
}

let javaObj = jsonToJavaClass(example);