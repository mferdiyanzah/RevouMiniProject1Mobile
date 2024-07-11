import { EMAIL_REGEX, MAX_EMAIL_LENGTH } from '@constants/general';

const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return `Email address must not exceed ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    if (trimmedEmail.includes(' ')) {
      return 'Email address cannot contain spaces.';
    }
    if (/[()<>,;:"[\]]/.test(trimmedEmail)) {
      return 'Email address contains illegal characters. Avoid using (), <>, ,, ;, :, ", or [].';
    }
    if (!trimmedEmail.includes('@')) {
      return 'Email address must contain an @ symbol.';
    }
    if (!trimmedEmail.includes('.')) {
      return 'Email address must contain a domain (e.g., .com, .org).';
    }
    return 'Invalid email format. Please use a valid email address.';
  }

  return '';
};

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,64}$/;

const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (password.length > 64) {
    return 'Password must not exceed 64 characters.';
  }

  if (!PASSWORD_REGEX.test(password)) {
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must include at least one number.';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])/.test(password)) {
      return 'Password must include at least one special character.';
    }
  }

  return '';
};

const VALIDATOR = {
  email: validateEmail,
  password: validatePassword,
};

export default VALIDATOR;
