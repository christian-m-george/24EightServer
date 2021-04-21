const app = require('./app')

const { PORT } = require('./config')

app.listen(`192.168.0.137:${PORT}`, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})