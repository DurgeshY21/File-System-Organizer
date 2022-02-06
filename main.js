#!/usr/bin/env node       
let inputArr=process.argv.slice(2);  //print after 2 element i.e node and main.js
console.log(inputArr);
let fs=require("fs");
let path=require("path");
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize")
// node main.js tree "directoryPath"
// node main.js organize "diriectory Path"
//node main.js help
// 0th has command and 1 has call
let command=inputArr[0];
let types={
    media:  ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp','jpg', 'odg','odf','txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}
switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        //treeFn(inputArr[1]); 
    break;
    case "organize":
        organizeObj.organizeKey(inputArr[i]);
        //organizeFn(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        //helpFn();
            break;
    default:
            console.log("Input Right Command ❤❤❤");
            break;
}
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

//help implemented
function helpFn(dirPath){
    console.log(`List of all commands:
    node main.js tree "directoryPath"
    node main.js organize "diriectory Path"
    node main.js help
    `);
}
