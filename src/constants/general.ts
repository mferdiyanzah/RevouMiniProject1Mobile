const EMAIL_REGEX =
  /^[^\s()<>,;:"[\]]{1,64}@[^\s()<>,;:"[\]]{1,255}\.[^\s()<>,;:"[\]]{2,}$/;

const MAX_EMAIL_LENGTH = 254;

const CORRECT_EMAIL = 'ferdiyanzah@test.app';

const CORRECT_PASSWORD = 'TestApp123!';

const FALLBACK_IMAGE = 'https://via.placeholder.com/150';

const POST_CONTENT_LIMIT = 220;

export {
  EMAIL_REGEX,
  MAX_EMAIL_LENGTH,
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  FALLBACK_IMAGE,
  POST_CONTENT_LIMIT,
};
