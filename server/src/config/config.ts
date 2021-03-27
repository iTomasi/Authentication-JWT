export default {
    JWT: "mitokensito",
    MYSQL: {
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
}