const { MongoClient, ServerApiVersion } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    singleton = client.db(process.env.DB);
    return singleton;
}

module.exports = { connect };
