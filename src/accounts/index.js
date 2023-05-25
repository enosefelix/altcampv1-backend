const router = require('express').Router();
const { verifyUser } = require('../../middleware/authenticate');
const {
  getAccount,
  getAccounts,
  updateAccount,
  uploadProfilePicture,
} = require('./accountsController');
const multer = require('multer');
const {
  getAccountsValidator,
  profileBioValidator,
  profileValidator,
} = require('./accountsValidator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});
const validatorMiddleware = require('../../middleware/validator');

const upload = multer({ dest: 'src/accounts/tmp/uploads/' });

router
  .route('/')
  .get(validator.query(getAccountsValidator), getAccounts)
  .put(verifyUser, validatorMiddleware(profileValidator), updateAccount);

router
  .route('/bio')
  .put(verifyUser, validatorMiddleware(profileBioValidator), updateAccount);

router
  .route('/upload-profile-picture')
  .put(verifyUser, upload.single('profilePicture'), uploadProfilePicture);

router.route('/:id').get(getAccount);

module.exports = router;
