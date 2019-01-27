const resetDatabase = require('./server/src/resetDatabase')

resetDatabase().then(() => {
  console.log('HI')
})
