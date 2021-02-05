const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const multer = require('multer');

// mongoose model declairations
require('./models/User');
require('./models/Post');
// keys
const keys = require('./keys');
// graphql schema, resolvers and error function
const { schema, resolvers, customErrorFunction } = require('./graphql');

// variables
const dbConfigs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

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

// connect mongodb atlas
mongoose
    .connect(keys.MONGODB_URI, dbConfigs)
    .then((result) => console.log({ mongoConnectResult: result }));

app.listen(keys.PORT, () => {
    console.log(`server running on port ${keys.PORT}`);
});
