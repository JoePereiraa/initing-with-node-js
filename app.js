const express = require('express');
const { randomUUID } = require('crypto')
const fs = require('fs');

const app = express();
app.use(express.json());

let products = [];

fs.readFile("product.json", "utf8", (err, data) => {
    if(err){
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})
/**
 * POST => Inserir dado
 * GET => Buscar um/mais dados
 * Put => Alterar um dado
 * DELETE => remover um dado
 */

/**
 * Body => sempre que eu quiser enviar dados para minha aplicacao
 * Params => /product/12312434545234 - parametro de rota
 * Query => /product?id=1433445452&value=1234124
 */

//POST PRODUCT
app.post("/products", (request, response) => {
    //Nome e preco =>name, price

    const {name, price} = request.body;
    const product = {
        name,
        price,
        id: randomUUID()
    }
    products.push(product);

    productFile()

    return response.json(product)
});
//GET PRODUCTS
app.get("/products", (request, response) => {
    return response.json(products);
});
//GET PRODUCT
app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find(product => product.id === id);
    return response.json(product);
});
//PUT PRODUCT
app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
        //OU
        // id: products[productIndex].id
    };

    productFile()

    return response.json({
        message: "produto alterado com sucesso!"
    });
}); 
//DELETE PRODUCT
app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);
    products.splice(productIndex, 1);

    productFile()

    return response.json({
        message: "Produto removido com sucesso!"
    })
});

function productFile() {    
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
        if(err){
            console.log(err)
        } else {
            console.log("produto inserido!")
        }
    })
}

app.listen(4002, () => console.log("O servidor esta rodando na porta 4002"));