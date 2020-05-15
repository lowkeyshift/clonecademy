module.exports = {
    logintoken: {
      loginsuccess: 'successfully login',
      usernotfound: 'Usernotfound',
      errtoken: 'error occurred in loginwithtoken',
      loginmessage: ''
    },
    loginerr: {
      emailerr: 'email  is required ',
      passworderr: 'password  is required',
      findusererr: 'error occurred in findUser',
      notusererr: 'user not register with the system',
      emailNotverify: 'user email not verified,please verify your email',
      emailPassWrong: 'email/password wrong',
      loggedin: 'you are logged In'
    },
    additionalcompany: {
      error: 'error occurred in update companyAddtionalInfo',
      saved: 'company additional information saved',
      alreadysaved: 'company additional  information already saved',
    },
    edit: {
      error: 'error occurred in editing company',
      editSuccess: 'company edited successfully',
      failed: 'cannot edit company',
    },
    edituser: {
      error: 'error occurred in editing userPersonalInfo',
      useredit: 'user edited successfully',
      failed: 'cannot edit user',
    },
    forgetmail: {
      error: 'error occurred in findUser',
      notregister: 'user not registered with the system',
      errSendmail: 'error occurred in sending mail',
      linksent: 'Link sent On your Registered Email'
    },
    passwordChange: {
      missingPassword: 'Password is missing from the request.',
      failedFindingUser: 'An error has occurred while attempting to find the user.',
      userNotFound: 'User not found.',
      generatingHash: 'An error has occurred while generating password hash.',
      updatingPassword: 'An error has occurred while attempting to save the new password.'
    },
    register: {
      somethingWentWrong: 'Something went wrong.',
      failedSendingVerificationEmail: 'An error has occurred while sending verification email.',
      userAlreadyRegistered: 'User already registered.',
      malformedRequest: 'Malformed request. Missing required: ',
      generatingHash: 'An error has occurred while generating password hash.',
      userDidNotSave: 'User data did not save.',
      tokenNotUpdated: 'An error has occurred while attempting to update verification token.',
      linkNotSent: 'Verification link was not sent.'
    },
    tokenResend: {
      somethingWentWrong: 'Something went wrong.',
      userAlreadyVerified: 'User is already verified.',
      userNotFound: 'User not found.',
      failedSavingToken: 'An error has occurred while attempting to save the verification token.',
      failedSendingEmail: 'An error has occurred while resending verification email.',
      tokenNotUpdated: 'Token was not updated.'
    },
    passwordReset: {
      missingEmail: 'Email is missing from ths request.',
      failedFindingUser: 'An error has occurred while attempting to find the user.',
      userNotFound: 'User not found.',
      failedSendingEmail: 'Something went wrong trying to send email to reset password.',
    }
  };
  