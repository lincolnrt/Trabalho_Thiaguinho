const express = require('express')
const { response } = require('express')
const app = express()

app.use(express.json())

const produtos = [ 
    { ident: 1010, nomeProduto: "Pacote folha A4", quantidadeProduto: 2, valorUnit: 12.00 },
]


// Fórmulas
    for (let i in produtos) {
        produtos[i].precoTot = produtos[i].quantidadeProduto * produtos[i].valorUnit
        produtos[i].precoVenda = produtos[i].valorUnit + produtos[i].valorUnit * 0.20
        produtos[i].lucro = produtos[i].precoVenda - produtos[i].valorUnit

            if (produtos[i].quantidadeProduto < 50) {
                produtos[i].situacaoProduto = "Estável"
            }

                else  if (produtos[i].quantidadeProduto >= 50 && produtos[i].quantidadeProduto < 100) {
                    produtos[i].situacaoProduto = "Boa"
                }

                else if (produtos[i].quantidadeProduto >= 100) {
                    produtos[i].situacaoProduto = "Excelente"
                }
            }

app.use((request, response, next) => {
console.log('Controle de Estoque da empresa ATACADISTA ATACADÃO')
return next()
})

        const checkProdutoInArray = (request, response, next) => {
            const { ident } = request.params

            if (!produtos[ident]) {
                return response
                            .status(400)
                            .json({ error: 'Não existe produto com este id.'})
            }
            return next()
        }

                const checkAtributoInArray = (request, response, next) => {
                    const { ident, nomeProduto, quantidadeProduto, valorUnit } = request.body

                    if (!ident || !nomeProduto || !quantidadeProduto || !valorUnit) {
                        return response
                                .status(400)
                                .json({erro: 'O campo ID, nome do produto ou quantidade do produto não existe no corpo da requisição.'}) 
                    }
                }

app.get('/produtos', (request, response) => {
return response.json(produtos)

})

app.get('/produtos/:ident', checkProdutoInArray, (request, response) => {
    const { id } = request.params
    return response.json(produtos[id])
})

app.post('/produtos/:ident', (request, response) => {
    const { ident, nomeProduto, quantidadeProduto, valorUnit } = produtoSelecionado = request.body
    produtos.push(produtoSelecionado)
    
        produtoSelecionado.precoTot = produtoSelecionado.quantidadeProduto * produtoSelecionado.valorUnit
        produtoSelecionado.precoVenda = produtoSelecionado.valorUnit + produtoSelecionado.valorUnit * 0.20
        produtoSelecionado.lucro = produtoSelecionado.precoVenda - produtoSelecionado.valorUnit

            if (produtoSelecionado.quantidadeProduto < 50) {
                produtoSelecionado.situacaoProduto = "Estável"
            }

                else  if (produtoSelecionado.quantidadeProduto >= 50 && produtoSelecionado.quantidadeProduto < 100) {
                    produtoSelecionado.situacaoProduto = "Boa"
                }

                else if (produtoSelecionado.quantidadeProduto >= 100) {
                    produtoSelecionado.situacaoProduto = "Excelente"
                }
            
    return response.json(produtos)
})


//


app.put('/produtos/:ident', checkProdutoInArray, checkAtributoInArray, (request, response) => {
    const { ident, nomeProduto, quantidadeProduto, valorUnit } = request.body
    const { id } = request.params
    const produtoAlteracao  = request.body    
    produtos = produtoAlteracao


    produtos.precoTot = produtos.quantidadeProduto * produtos.valorUnit
    produtos.precoVenda = produtos.valorUnit + produtos.valorUnit * 0.20
    produtos.lucro = produtos.precoVenda - produtos.valorUnit

        if (produtos.quantidadeProduto < 50) {
            produtos.situacaoProduto = "Estável"
        }

            else  if (produtos.quantidadeProduto >= 50 && produtos.quantidadeProduto < 100) {
                produtos.situacaoProduto = "Boa"
            }

            else if (produtos.quantidadeProduto >= 100) {
                produtos.situacaoProduto = "Excelente"
            }
        
return response.json(produtos)
})


app.delete("/produtos/:ident", checkProdutoInArray, (request, response) => {
    const { id } = request.params
    produtos.splice(id, 1)
    return response.json(produtos)
})

app.listen(3333, () => {
    console.log('Servidor rodando')
})