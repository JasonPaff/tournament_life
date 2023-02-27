import validator from 'validator';

export const zodErrors = {
    boolean: (fieldName: string, description?: string) => {
        const firstLetterVowel = fieldName.charAt(0).match('/(\\b[AaEeIiOoUu]+[\\w]*\\b)/g') !== null;
        const options = {
            required_error: `${firstLetterVowel ? 'An' : 'A'} ${fieldName} is required.`,
            invalid_type_error: `${fieldName} must be a boolean.`,
        };
        return description ? { description: description, ...options } : options;
    },
    date: (fieldName: string, description?: string) => {
        const firstLetterVowel = fieldName.charAt(0).match('/(\\b[AaEeIiOoUu]+[\\w]*\\b)/g') !== null;
        const options = {
            required_error: `${firstLetterVowel ? 'An' : 'A'} ${fieldName} is required.`,
            invalid_type_error: `${fieldName} must be an ISO 8601 compatible string.`,
        };
        return description ? { description: description, ...options } : options;
    },
    email: (email: string) => `${email} is not a valid email address.`,
    invalidEmail: (email: string) => ({
        message: `${email} is not a valid email address.`,
        path: ['email'],
    }),
    max: (fieldName: string, max: number) => `${fieldName} must be less than ${max} characters.`,
    min: (fieldName: string, min: number) => `${fieldName} must be at least ${min} characters.`,
    number: (fieldName: string, description?: string) => {
        const firstLetterVowel = fieldName.charAt(0).match('/(\\b[AaEeIiOoUu]+[\\w]*\\b)/g') !== null;
        const options = {
            required_error: `${firstLetterVowel ? 'An' : 'A'} ${fieldName} is required.`,
            invalid_type_error: `${fieldName} must be a number`,
        };
        return description ? { description: description, ...options } : options;
    },
    string: (fieldName: string, description?: string) => {
        const options = {
            required_error: `A ${fieldName} is required.`,
            invalid_type_error: `${fieldName} must be a string`,
        };
        return description ? { description: description, ...options } : options;
    },
};

export const zodHelpers = {
    lowercase: (string: string) => string.toLowerCase(),
    normalizeEmail: (email: string) => validator.normalizeEmail(email) || email,
    validateEmail: (email: string) => validator.isEmail(email),
};