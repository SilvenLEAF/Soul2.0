const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');




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




  username: String,
  profileImage: String,

  title: {
    type: String,
    default: `A Human Being`
  },
  workingAt: String,
  careeerStatus: String,
  websiteLink: String,
  twitterHandle: String,

  about: {
    type: String,
    default: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi placeat modi adipisci quaerat, perferendis natus quidem tempora ea hic totam vel exercitationem, iste alias magni consectetur pariatur voluptatum? Quo, id distinctio? Illum voluptatibus ipsam nulla sed quis nisi mollitia at vel, et corporis quod reiciendis dolorum omnis reprehenderit blanditiis!`,
  },

  createdAt: String
  
})








/* ----------------------------------
.             USER MODEL
---------------------------------- */
// methods ======================
// generating a hash
UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};










/* ----------------------------------
.             USER MODEL
---------------------------------- */
module.exports = User = mongoose.model('User', UserSchema);