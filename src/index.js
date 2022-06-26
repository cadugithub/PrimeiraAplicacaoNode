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

//==========MIDDLEWARE=================
//Para uma função ser um middleware precisa ter três parâmetros

function verifyIfExistsAccountCPF(request, response, next){

    const { cpf } =  request.headers

    const customer = customers.find(customer => customer.cpf === cpf) // O método find retorna o valor encontrado

    if(!customer) {
        return response.status(400).json({error : "Customer not found!"})
    }

    request.customer = customer // enviando o customer para as próximas rotas
    return next()
}
//==========MIDDLEWARE=================

app.post("/account",(request, response)=>{
    const { cpf, name } =  request.body

    customerAlreadyExists = customers.some((customer) => customer.cpf === cpf) // O método some verifica se existe dado com o valor passado

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
// "app.use(middleware)" => quando todas as próximas rotas precisarem do mesmo middleware
app.get("/statement", verifyIfExistsAccountCPF,(request, response)=>{

    const {customer} = request
    return response.json(customer.statement)

})
app.post("/deposit", verifyIfExistsAccountCPF ,(request, response)=>{
    const { description, amount } = request.body

    const {customer} = request

    const statementOperation = {
        description,
        amount,
        create_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})


app.listen(3333) // localhost:3333