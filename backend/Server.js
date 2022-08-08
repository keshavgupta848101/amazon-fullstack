import Express from "express";
import data from './data.js'
const app = Express()

const PORT = 5000 || process.env.PORT

app.get('/api/products', (req, res) => {
    res.send(data.products)
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})