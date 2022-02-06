function helpFn(dirPath){
    console.log(`List of all commands:
    node main.js tree "directoryPath"
    node main.js organize "diriectory Path"
    node main.js help
    `);
}
module.exports={
    helpKey: helpFn
}