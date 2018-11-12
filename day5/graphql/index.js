const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
// GraphQL schema
const  schema = buildSchema(`
    type Query {
        message: Float
    }
`);
// Root resolver
const root = {
    message: () => Math.random()
};
// Create an express server and a GraphQL endpoint
const  app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { hakob: 'HAKOB!!' });
});

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
