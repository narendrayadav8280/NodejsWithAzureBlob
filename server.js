var storage = require('azure-storage');
var blobService = storage.createBlobService();

//for ci test
var containerName = 'your-container-name';
console.log("containerName:  "+ containerName);
blobService.createContainerIfNotExists(containerName, function(err, result, response) {
    if (err) {
        console.log("Couldn't create container %s", containerName);
        console.error(err);
    } else {
        if (result) {
            console.log('Container %s created', containerName);
        } else {
            console.log('Container %s already exists', containerName);
        }
    }
});

blobService.createBlockBlobFromText(
    containerName,
    'my-awesome-text-blob',
    'Hello, World!',
    function(error, result, response){
        if(error){
            console.log("Couldn't upload string");
            console.error(error);
        } else {
            console.log('String uploaded successfully');
        }
    });



var blobName = 'my-awesome-text-blob';
blobService.getBlobToText(
    containerName,
    blobName,
    function(err, blobContent, blob) {
        if (err) {
            console.error("Couldn't download blob %s", blobName);
            console.error(err);
        } else {
            console.log("Sucessfully downloaded blob %s", blobName);
            console.log(blobContent);
        }
    });
