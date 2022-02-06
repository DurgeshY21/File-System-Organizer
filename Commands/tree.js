function treeFn(dirPath){
    //console.log("Tree command implemented for", dirPath);
    
    if(dirPath==undefined){
        //console.log("Kindly enter the Path") 
       // process.cwd();
        treeHelper(process.cwd(), "");
        return;
        } else{
            let doesExist= fs.existsSync(dirPath);
            if(doesExist){
                treeHelper(dirPath, "");
            }else{
                console.log("Kindly enter the correct Path");
                return;
            }
        }
}
function treeHelper(dirPath, indent){
    //isfile or folder
    let isFile=fs.lstatSync(dirPath).isFile();    // if a files
    if(isFile==true){
       let fileName= path.basename(dirPath); 
       console.log(indent+ "---->>>>"+ fileName);
    } 
    else{
        let dirName=path.basename(dirPath);   //if a folders
        console.log(indent+ "<<<<---------"+dirName);
        fs.readdirSync(dirPath);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
         let childPath=   path.join(dirPath, childrens[i]);
         treeHelper(childPath, indent+ "\t");    //recursion used here - call again if this is folder then under this for files

        }
    }
}
module.exports={
    treeKey:treeFn
}