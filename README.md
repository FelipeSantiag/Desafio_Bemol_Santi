# Desafio_Bemol_Santi
 Backend REST API
Protocolo de comunicação : HTTP ou HTTPS IP: localhost ou 127.0.0.1 Porta: 3000

URI: http://localhost:3000/ Rota ou Endpoint: /

Posso criar novos caminhos dentro da mesma URL 

URI: http://localhost:3000/clientes

Rota ou Endpoint: /hello  /exemplo


[GET] http://localhost:3000/clientes [POST] http://localhost:3000/cliente

GET -> Obter informações POST -> Criar informações novas PUT -> Atualizar informações já existentes DELETE -> Remover informações já existentes

Também posso enviar um corpo da requisição

Toda requisição possui duas coisas: URL HEADER BODY

[POST] http://localhost:3000/clientes 
Body: {    "nome": "Nome Completo",
            "dataNascimento": "25/11/1999",
            "genero": "Feminino",
            "Idcpf": "0000000009",
            "Telcelular": "92982765182",
            "email": "email.cao@gmail.com ",
            "senha": "@desafiobemol",
            "dadosEntrega": [
            {
                "TipoDomicilio": "Casa",
                "cep": "69000000",
                "endereço": "Av. Alphaville, 412",
                "bairro": "Cidade Nova",
                "cidade": "Manaus",
                "estado": "Amazonas",
                "referencia": "Igreja Adventista"
            }]

