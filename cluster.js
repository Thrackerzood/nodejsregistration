const cluster = require('cluster')
const os = require('os')

if(cluster.isMaster){
   const cpu = os.cpus().length
   for(let i = 0; i < cpu - 1; i++){
      const worker = cluster.fork()
      worker.on('exit', ()=>{
         console.log(`Worker died!:  ${worker.process.pid}`)
         cluster.fork()
      })
   }
}

if(cluster.isWorker){
   require('./index.js')
}