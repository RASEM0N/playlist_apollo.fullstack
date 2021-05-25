const express = require('express')

const app = express()

const PORT = 1488

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
