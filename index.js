const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

// keys
const keys = require('./keys');
// graphql schema, resolvers and error function
const { schema, resolvers, customErrorFunction } = require('./graphql');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        customFormatErrorFn: customErrorFunction,
        graphiql: true,
    })
);

app.use((req, res, next) => {
    res.status(404).json({ message: `${req.url} not found` });
});
// custom error middleware
app.use((err, req, res, next) => {
    err.code = err.code || 500;
    console.error({ err });
});

app.listen(keys.PORT, () => {
    console.log(`server running on port ${keys.PORT}`);
});
