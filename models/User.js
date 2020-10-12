const mongoose = require('mongoose');


/* ----------------------------------
.          SUB SCHEMAs
---------------------------------- */
const GoogleSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
  profileImage: String,
})






const GithubSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  email: String,
  profileImage: String,
})






const FacebookSchema = new mongoose.Schema({
  facebookId: String,
  username: String,
  email: String,
  profileImage: String,
})














const LocalSchema = new mongoose.Schema({  
  email: String,
  password: String,

  username: String,
  profileImage: String,

})









/* ----------------------------------
.          MAIN SCHEMA
---------------------------------- */
const UserSchema = new mongoose.Schema({
  google: GoogleSchema,
  github: GithubSchema,
  facebook: FacebookSchema,

  local: LocalSchema,

  about: {
    type: String,
    default: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi placeat modi adipisci quaerat, perferendis natus quidem tempora ea hic totam vel exercitationem, iste alias magni consectetur pariatur voluptatum? Quo, id distinctio? Illum voluptatibus ipsam nulla sed quis nisi mollitia at vel, et corporis quod reiciendis dolorum omnis reprehenderit blanditiis!`,
  },

  createdAt: String
  
})








/* ----------------------------------
.             USER MODEL
---------------------------------- */
module.exports = User = mongoose.model('User', UserSchema);