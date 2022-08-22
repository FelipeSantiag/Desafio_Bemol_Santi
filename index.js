const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

(async() => {
const connectionString = 'mongodb://localhost:27017/bemol_santi';

console.info('Conectando ao banco de dados MongoDB...');

const options = {
  useUnifiedTopology: true
};

const client = await mongodb.MongoClient.connect(connectionString, options);
//console.log(client);

const app = express();

const port = process.env.Port || 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

/* //Modelo de objeto cliente
let "cliente": {
//Dados cadastrais
    //"id": 1,
    "nome": "Felipe Santiago",
    "dataNascimento": "05/09/1996",
    "genero":"masculino",
    "Idcpf": "0000000007",
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
};
*/
/* //Clientes p/ Teste de API 
const clientes = [
  { "id": 1,
    "nome": "Felipe Santiago",
    "dataNascimento": "05/09/1996",
    "genero":"masculino",
    "Idcpf": "0000000007",
    "domicilio":"Casa",
    "cep":"69000000",
    "endereço": "Av. Alphaville",
    "bairro": "Cidade Nova",
    "cidade": "Manaus",
    "estado": "Amazonas",
    "referencia": "Igreja Adventista",
    "Telcelular":"92982765182",
    "email": "felipesantiago.job@gmail.com ",
    "senha": "@desafiobemol",

  },
  { "id": 2,
    "nome": "Santiago",
    "dataNascimento": "09/05/1997",
    "genero":"masculino",
    "Idcpf": "0000000008",
    "domicilio":"Casa",
    "cep":"69000000",
    "endereço": "Av. Alphaville",
    "bairro": "Cidade Nova",
    "cidade": "Manaus",
    "estado": "Amazonas",
    "referencia": "Oficina batista",
    "Telcelular":"92982765182",
    "email": "santiago.dm@gmail.com ",
    "senha": "@desafiobemol",
  
  }
];
*/
const db = client.db('bemol_santi');
const clientes = db.collection('clientes');
const localEntrega = db.collection('localEntrega');

//console.log(await clientes.find({}).toArray());

const getClientesValidos = () => clientes.find({}).toArray();
const getClienteByIdcpf = id => clientes.findOne({ _id: ObjectId(id) });

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
app.post('/clientes', async (req,res) => {
  const cadastro = req.body;

  if(!cadastro) { 
      res.send('Cadastro de cliente invalido.');

    return;
  }

  //cliente.id = clientes.length+1;
  //clientes.push(cliente);  
    const {insertedCount} = await clientes.insertOne(cadastro);
     
  //console.log(dadosDoCliente);
  /*
  if(insertedCount !== 1){
    res.send('Ocorreu uma falha no cadastro do cliente.');
    return;
  }
  */
  res.send(cadastro);
  
})

//- [GET] /listagem_clientes - Retorna a lista de clientes
app.get('/clientes', async (req,res) => {
  res.send(await getClientesValidos());
  //res.send(clientes);
});

//- [GET] /lista_cliente/{id} - Retorna apenas um unico cliente pelo ID
app.get('/clientes/:id', async (req,res) => {
  const id = req.params.id;

  const cliente = await getClienteByIdcpf(id);

  if(!cliente){
    res.send('Cliente não encontrado.');
    return;
  }
  res.send(cliente);
});

//- [PUT] /atualiza_cliente/{id} - Atualiza uma cliente pelo ID
app.put('/clientes/:id', async (req,res) => {
  const id = req.params.id;

  //let index = getClienteByIdcpf(id).id;
  const novoCliente = req.body;
 
  if(!novoCliente
    ||!novoCliente.nome
    ||!novoCliente.Telcelular
    ||!novoCliente.Idcpf
    ||!novoCliente.senha){

    res.send('Cliente com dados inválidos.');
    return;
  }

  const quantClientes = await clientes.countDocuments( {_id: ObjectId(id) });

  if(quantClientes !== 1) {
    res.send('Cliente não encontrado.');

    return;
  }

  const {result} = await clientes.updateOne(
    {
      _id: ObjectId(id)
    },
    {
      $set: novoCliente
    }
  );

  //if(result.ok !== 1) {
  //  res.send('Ocorreu um erro ao atualizar o cliente.');

 //   return;
  //};

  res.send(await getClienteByIdcpf(id));
  
});

//- [DELETE] /apaga_cliente/{id} - Remover um cliente pelo ID
app.delete('/clientes/:id', async (req,res) => {
  const id = req.params.id;

  //const cliente = getClienteByIdcpf(id);
  const quantClientes = await clientes.countDocuments( {_id: ObjectId(id)} );

  if(quantClientes !== 1 ){
    res.send('Cliente nao encontrado.');

    return;
  }
  const {deletedCount} = await clientes.deleteOne({ _id: ObjectId(id)});

  if(deletedCount !== 1 ) {
    res.send('Ocorreu um erro ao remover o cliente.');

    return;
  };
  
  res.send('Cliente removido com sucesso.');

});

app.listen(port, function(){
    console.info('App rodando em http://localhost:'+ port);
});

})();