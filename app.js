const chalk = require('chalk');

const express = require('express');
const path = require('path');



// --------------------FIRING EXPRESS APP
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, `client/build`)));





/* ----------------------------------------
.                 config
---------------------------------------- */







/* ----------------------------------------
.                 routes
---------------------------------------- */
app.use(require('./routes/DnsRoute'));


// ----catch all handler
app.get('*', (req, res, next)=>{
  try {
    res.sendFile(path.join(__dirname, `client/build/index.html`));
  } catch (err) {
    next(err, req, res);
  }
})




// ------------ERROR HANDLER
app.use((err, req, res, next)=>{
  console.log(chalk.red(err.message));
  console.log(err)
})


// --------------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${ PORT }`);
})