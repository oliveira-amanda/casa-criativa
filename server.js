//usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require('./db')

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Transforme sua carreira e seja um programador desejado no mercado, dominando as ferramentas mais modernas de desenvolvimento web e mobile.",
//         url: "http://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Saiba como manter uma rotina regular de exercícios físicos e hábitos saudáveis durante a quarentena com essas dicas fitness.",
//         url: "https://www.youtube.com/watch?v=wbg43E2gVx4"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "A meditação é uma técnica que desenvolve habilidades como a concentração, tranquilidade e o foco no presente. Trata-se de uma prática ancestral, com raízes na sociedade oriental.",
//         url: "https://www.youtube.com/watch?v=tdyG4V_k3ts"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Diversão em Família",
//         description: "Para quem gosta de soltar a voz sem acanhamentos, o Youtube oferece o modo karaokê, que você só tem que baixar e instalar no computador.",
//         url: "https://segredosdomundo.r7.com/karaoke-youtube/"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Sabe aquele dia que você está em casa e percebe que está faltando alguma coisa na decoração? Aprenda aqui como fazer um quadro bem legal.",
//         url: "https://www.revistaartesanato.com.br/como-pintar-um-quadro-em-casa/"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         title: "Recortes",
//         category: "Criatividade",
//         description: "Henri Matisse no seu estúdio quando criava obras com recortes de papel colorido.",
//         url: "https://www.historiadasartes.com/sala-dos-professores/criando-com-recortes-de-papel/"
//     }
// ]

//Configurar arquivos estáticos
server.use(express.static("public"))

//Habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express:server,
    noCache: true,
})

//criei uma rota e capturo o pedido do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
    
        for (let idea of reverseIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas})
    })
})
server.get("/ideias", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows){
    
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }
        const reverseIdeas = [...rows].reverse()
        return res.render("ideas.html", {ideas: reverseIdeas})
    })
})
server.post("/", function(req, res){
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    `
    values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        return res.redirect('/ideias')
    })
})
//liguei meu servidor na porta 3000
server.listen(3000)