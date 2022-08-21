const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

const clientes = [
  {
    //Dados cadastrais
    //"id": 1,
    "nome": "Felipe Santiago",
    "dataNascimento": "05/09/1996",
    "genero":"masculino",
    "Idcpf": "00000000-07",
    //Dados de entrega
    "domicilio":"Casa",
    "cep":"69000000",
    "endereço": "Av. Alphaville",
    "bairro": "Cidade Nova",
    "cidade": "Manaus",
    "estado": "Amazonas",
    "referencia": "Igreja Adventista",
    //Dados de contato
    "Telcelular":'92982765182',
    "email": "felipesantiago.job@gmail.com ",
    //Dados da conta
    "senha": "@desafiobemol",
  },
];

const getClientesValidos = () =>  clientes.filter(boolean);
const getClienteByIdcpf = idcpf => getClientesValidos().find(cliente => clientes.Idcpf === idcpf);

/*
Lista de Endpoints da aplicação CRUD de clientes
CRUD: Create, Read (Single & All), Update and Delete
CRUD: Criar, Ler (Individual e Tudo), Atualizar e Remover
- [POST] /cadastro_cliente - Cria novo cadastro cliente
- [GET] /listagem_clientes - Retorna a lista de clientes
- [GET] /lista_cliente/{id} - Retorna apenas um unico cliente pelo ID
- [PUT] /atualiza_cliente/{id} - Atualiza uma cliente pelo ID
- [DELETE] /apaga_cliente/{id} - Remover um cliente pelo ID
*/

//- [POST] /cadastro_cliente - Cria novo cadastro cliente
app.post('/cadastro-cliente', function(req,res){
  const cliente = req.body;

  if(!cliente || !cliente.Idcpf){
    res.send('Cliente invalido');

    return;
  }
  cliente.push(cliente);
  res.send(cliente);
  
})

//- [GET] /listagem_clientes - Retorna a lista de clientes
app.get('/listagem-cliente', function(req,res){
  res.send(getClientesValidos());
});

//- [GET] /lista_cliente/{id} - Retorna apenas um unico cliente pelo ID
app.get('/lista-cliente/:id', function(req,res){
  const id = +req.params.idcpf;

  const cliente = getClienteByIdcpf(id);

  if(!cliente){
    res.send('Cliente não encontrado.');
    return;
  }
  res.send(cliente);
});

//- [PUT] /atualiza_cliente/{id} - Atualiza uma cliente pelo ID
app.put('/atualiza-cliente/:id', function(req,res){
  const id = +req.params.Idcpf;

  const cliente = getClienteByIdcpf(id);

  const novoCliente = req.body;
  if(!novoCliente){
    res.send('Cliente invalido');
    return;
  }
  cliente=novoCliente;
  res.send(cliente);

});

//- [DELETE] /apaga_cliente/{id} - Remover um cliente pelo ID
app.delete('/apaga-clientes/:id', function(req,res){
  const id = +req.params.Idcpf;

  const cliente = getClienteByIdcpf(id);

  if (!cliente){
    res.send('Cliente não encontrado.');
    return;
  }

  const index = clientes.indexOf(cliente);
  delete clientes[index];

  res.send('Mensagem removida com sucesso.');
});

app.listen(port, function(){
    console.info('App rodando em http://localhost:'+ port);
});