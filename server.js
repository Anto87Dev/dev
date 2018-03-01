const remoteFileWatcher = require('remote-file-watcher');
var rexec = require('remote-exec');

    var objConfig = {
        host: '80.211.163.13',
        port: 22,
        username: 'root',
        password: 'Gmorea2018',
        folders : {
            0 : '/home/da_inviare'
        },
        //debug: console.log 
    }

    const objRemoteFileWatcher = new remoteFileWatcher('uni', objConfig);
    
    objRemoteFileWatcher.on('uploading', function (objFile) {
    
        console.log('FILE UPLOADING:');
        console.log(objFile);
        
        
    });
    
    objRemoteFileWatcher.on('uploaded', function (objFile) {
    
        var file_uploaded = objFile.fileName;
        console.log('FILE UPLOADED:');        

       if(file_uploaded.endsWith(".zip")){
           
           var connection_options = {
    
                port: 22,
    
                username: 'root',
        
                password: 'Gmorea2018'
    
            };
 
            var hosts = [
 
                '80.211.163.13'

            ];
 

            var cmds = [
                
                'python /pyScript/sendPhotoAP.py '+file_uploaded 
                
            ];
 

            rexec(hosts, cmds, connection_options, function(err){
    
                if (err) {
        
                    console.log(err);
    
                } else {
        
                    console.log('Great Success!!');
                        
                }

            });
           
       }
        
    });
    
    objRemoteFileWatcher.on('deleted', function (objFile) {
    
        console.log('FILE DELETED:');
        console.log(objFile);
    });
    
    objRemoteFileWatcher.on('error', function (strServername, error) {
        
            console.log('ERROR: ' + strServername);
            console.log(error);
        });
    
                

           