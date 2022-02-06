function organizeFn(dirPath){
    // console.log("Organize command implemented for", dirPath);
     // 1. input-> directory path given
     let destPath;
     if(dirPath==undefined){
     //console.log("Kindly enter the Path")
     destPath=process.cwd();
     return;
     } else{
         let doesExist= fs.existsSync(dirPath);
         if(doesExist){
             // 2. create- organized file-> directory
             destPath= path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath)==false)
            fs.mkdirSync(destPath);
         }else{
             console.log("Kindly enter the correct Path");
             return;
         }
     }
     organizeHelper(dirPath, destPath);
     
     
 
 }
 // 3.check and identify categories of all fill present in input directory
 //get files of src folder 
 
 function organizeHelper(src, dest){
   let childNames=  fs.readdirSync(src); 
   //console.log(childNames);
   // check if a file or folder
   for(let i=0; i<childNames.length; i++){
      let childAddress= path.join(src, childNames[i]);
     let isFile= fs.lstatSync(childAddress).isFile();
     if(isFile){
     //console.log(childNames[i]);
    let category= getCategory(childNames[i]);
     console.log(childNames[i], "belongs to -->", category);
     //4. copy/cut to that organized directory in particular directory
     //function used to copy or send files to the category files
      sendFiles(childAddress, dest, category);
     }
   }
 }
 //copy files to particular category
 function sendFiles(srcFilePath, dest, category){
     let categoryPath=path.join(dest, category);
     if(fs.existsSync(categoryPath)==false){
         fs.mkdirSync(categoryPath);
     }
    let fileName= path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);        // will delete orignal files  after insert into categories
    console.log(fileName, "copied to ", category);
 }
 //identify categories belong to which 
 function getCategory(name){
    let ext= path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArray=  types[type];
        for(let i=0; i<cTypeArray.length; i++){ 
            if(ext==cTypeArray[i]){
                return type;
            }
 
        }
        return "others";
    }
 
 }
 module.exports={
     organizeKey: organizeFn
 }