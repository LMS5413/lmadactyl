(async () => {
    require('dotenv').config()
    const ptero = require('./src/index')
    let object = {
        "name": "Bulilded by lmadactyl",
        "user": 7,
        "egg": 5,
        "docker_image": "ghcr.io/pterodactyl/yolks:java_8",
        "startup": "java -Xms128M -Xmx128M -jar server.jar",
        "environment": {
            "VANILLA_VERSION": "latest",
            "SERVER_JARFILE": "server.jar"
        },
        "limits": {
            "memory": 1024,
            "swap": 0,
            "disk": 1024,
            "io": 500,
            "cpu": 100
        },
        "feature_limits": {
            "databases": 1,
            "backups": 1
        },
        "allocation": {
            "default": 2764 //If in doubt about your server allocation, run this code (await pteroclient.client.features.request("https://yourpanel.com/api/application/nodes/**node_id**/allocations", {Authorization: "Bearer KEY TYPE 2"}, null, "GET")).filter(x => !x.data.attributes.assigned) 
        }
    }
    let result = await ptero.application.app.updateUser("https://panel", "", object)
    console.log(result)
})()