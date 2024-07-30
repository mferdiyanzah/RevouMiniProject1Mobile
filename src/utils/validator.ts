import { EMAIL_REGEX, MAX_EMAIL_LENGTH } from '@constants/general';

const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return `Alamat email tidak boleh melebihi ${MAX_EMAIL_LENGTH} karakter.`;
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    if (trimmedEmail.includes(' ')) {
      return 'Alamat email tidak boleh mengandung spasi.';
    }
    if (/[()<>,;:"[\]]/.test(trimmedEmail)) {
      return 'Alamat email mengandung karakter ilegal. Hindari penggunaan (), <>, ,, ;, :, ", atau [].';
    }
    if (!trimmedEmail.includes('@')) {
      return 'Alamat email harus mengandung simbol @.';
    }
    if (!trimmedEmail.includes('.')) {
      return 'Alamat email harus mengandung domain (contoh: .com, .org).';
    }
    return 'Format email tidak valid. Mohon gunakan alamat email yang valid.';
  }

  return '';
};

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,64}$/;

const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'Kata sandi harus memiliki panjang minimal 8 karakter.';
  }

  if (password.length > 64) {
    return 'Kata sandi tidak boleh melebihi 64 karakter.';
  }

  if (!PASSWORD_REGEX.test(password)) {
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Kata sandi harus mengandung setidaknya satu huruf kecil.';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Kata sandi harus mengandung setidaknya satu huruf besar.';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Kata sandi harus mengandung setidaknya satu angka.';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])/.test(password)) {
      return 'Kata sandi harus mengandung setidaknya satu karakter khusus.';
    }
  }

  return '';
};

const VALIDATOR = {
  email: validateEmail,
  password: validatePassword,
};

export default VALIDATOR;
