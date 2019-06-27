import express from 'express'
import exphbs from 'express-handlebars'
import _ from 'lodash'
import controller from './controllers'
const app = express()
const port = 3000

// Register Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// Use Handlebars view engine
app.set('view engine', '.hbs');

app.use('/', controller)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))