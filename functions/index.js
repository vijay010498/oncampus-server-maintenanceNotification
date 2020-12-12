const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const serverDB = functions.config().database.servervalue;
exports.sendClientMaintenanceNotification = 
functions.database.instance(serverDB).ref('/block_screen/overall').onUpdate(event =>{

    const status = event.after.val();
        if(status == true){
            const payload = { notification : {
                title: 'Maintenance Alert',
                body: 'App has been stopped for the server maintenance, It will be resumed and notified you shortly'
                }
            };
            return  admin.messaging().sendToTopic("Global_client",payload)
            .then(function(response){
                console.log('Notification sent successfully:',response);
            })
            .catch(function(error){
                console.log('Notification sent failed:',error);
            });

        }

        else if(status == false){
            const payload = { notification : {
                title: 'Maintenance Finished',
                body: 'Hola! Server Maintenence has been finished. You can now order food and get it to your table!'                
                }
            };
            return admin.messaging().sendToTopic("Global_client",payload)
            .then(function(response){
                console.log('Notification sent successfully:',response);
            })
            .catch(function(error){
                console.log('Notification sent failed:',error);
            });

        }


});