module.exports = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',

  ACCOUNT_TYPES: {
    STUDENT: 'Student',
    MENTOR: 'Mentor',
    ADMIN: 'Admin',
  },

  AUTHOR_DETAILS: {
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    PROFILEPICTURE: 'profilePicture',
  },

  CLIENT_URLS: {
    LOCALHOST: 'http://localhost:5173',
    LOCALHOST2: 'http://127.0.0.1:5173',
    STUDYBUDDYNETLIFY: 'https://stdybdyv1.netlify.app',
    ALTCAMPNETLIFY: 'https://altcampv1.netlify.app',
  },

  EMAIL_TEMPLATES: {
    EMAIL_VERIFICATION: 'emailVerification',
    PASSWORD_RESET: 'passwordReset',
    WELCOME_ADDRESS: 'welcomeAddress',
  },

  EMAIL_SUBJECTS: {
    EMAIL_VERIFICATION: 'AltCamp Verification Code',
    PASSWORD_RESET: 'AltCamp Password Reset Code',
  },

  GENDER: {
    FEMALE: 'female',
    MALE: 'male',
  },

  TOKEN_TYPE: {
    PASSWORD_RESET: 'password_reset',
    EMAIL_VERIFICATION: 'email_verification',
  },

  MEDIA_SIZE_LIMITS: {
    PROFILEPICTURE: 1024 * 512,
  },

  VALID_IMAGE_FORMATS: {
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpeg',
    GIF: 'gif',
  },

  POST_TYPES: {
    ANSWER: 'Answer',
    COMMENT: 'Comment',
    POST: 'Post',
    QUESTION: 'Question',
  },

  POST_DETAILS: {
    TITLE: 'title',
    SLUG: 'slug',
  },

  REGEX_PATTERNS: {
    ALT_SCHOOL_ID: new RegExp('^ALT/SO[EPD]/02[2-9]/[0-9]{0,4}$', 'i'),
    BASE64IMAGE: new RegExp('^data:image/(png|jpeg|jpg|gif);base64', 'i'),
    PASSWORD: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'),
  },

  RESPONSE_MESSAGE: {
    SUCCESS: 'Request Successful!',
    FAILED: 'Request Failed!',
    LOGOUT: 'You have been logged out!',
    CREATE_SUCCESSFUL: (entity) => `${entity} created successfully`,
    CONFLICT: (entity) => `${entity} already exists!`,
    NOT_FOUND: (entity) => `${entity} not found!`,
    INVALID_CREDENTIALS: 'Invalid credentials!',
    ALREADY_VERIFIED: 'Email is already verified',
  },

  TRACKS: {
    'BACKEND-ENGINEERING': 'Backend Engineering',
    'CLOUD-ENGINEERING': 'Cloud Engineering',
    'DATA-ANALYSIS': 'Data Analysis',
    'DATA-ENGINEERING': 'Data Engineering',
    'DATA-SCIENCE': 'Data Science',
    'FRONTEND-ENGINEERING': 'Frontend Engineering',
    'PRODUCT-DESIGN': 'Product Design',
    'PRODUCT-MANAGEMENT': 'Product Management',
    'PRODUCT-MARKETING': 'Product Marketing',
  },

  AUTH: {
    OAUTH2: 'OAUTH2',
  },

  SERVICE: {
    GMAIL: 'gmail',
  },
};
