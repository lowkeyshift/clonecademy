'use strict';

const errorTryingTo = 'An error has occurred while trying to ';

module.exports = {
  generic: {
    somethingWentWrong: 'Something went wrong.'
  },
  auth: {
    jwtMiddleware: {
      noTokenProvided: 'No authentication token provided.',
      invalidToken: 'Invalid token.'
    }
  },
  user: {
    register: {
      failedSendingVerificationEmail: 'An error has occurred while sending verification email.',
      userAlreadyRegistered: 'User already registered.',
      emailRequired: 'Email is required.',
      passwordRequired: 'Password is required.',
      malformedEmail: 'Email is malformed.',
      generatingHash: 'An error has occurred while generating password hash.',
      userDidNotSave: 'User data did not save.',
      tokenNotUpdated: 'An error has occurred while attempting to update verification token.',
      linkNotSent: 'Verification link was not sent.'
    },
    login: {
      userNotFound: 'No user with that email address found.',
      emailAndPasswordDontMatch: 'The provided email and password don\'t match.',
      errorFindingUser: errorTryingTo + 'find the user.',
      emailNotYetVerified: 'The provided email is not yet verified.',
      emailRequired: 'An email is required.',
      passwordRequired: 'A password is required.',
      malformedEmail: 'The provided email is malformed.',
    },
    loginToken: {
      errorFindingUser: errorTryingTo + 'find the user.',
      userNotFound: 'Error finding user.',
      userEmailNotVerified: 'User email is not yet verified.'
    }
  },
  static: {
    getTitleCodes: {
      typeRequired: 'Code type is required.'
    }
  }

};
