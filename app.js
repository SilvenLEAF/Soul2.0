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








// --------------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${ PORT }`);
})