const express = require('express')
const { v4: uuidv4 } = require("uuid")
/**TIPOS DE PARAMETROS
 * 
 * Route Params => São separados pela "/"" => servem para identificar um recurso(editar/deletar/buscar recurso)
 * Query Params => Paginação, Filtro
 * Body Params => São objetos passados para inserção ou alteração (JSON)
 */
const app = express()

app.use(express.json())

const customers = []
/** 
* cpf - String  
* name - String
* id - uuid
* statement - []
*/
app.post("/account",(request, response)=>{
    const { cpf, name } =  request.body

    customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

    if(customerAlreadyExists){
        return response.status(400).json({error: "Customer alredy exists"})
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send()
})

app.get("/statement",(request, response)=>{})



app.listen(3333) // localhost:3333