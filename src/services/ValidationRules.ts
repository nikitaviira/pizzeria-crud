export default {
    required: (value: string) => !!value || 'This field is required.',
    min: (value: string) => value.length >= 6 || 'Password has to be minimum 6 chars.',
    atLeastOneCapCharAndNum: (value: string) => new RegExp('^[A-Z].*\\d|\\d.*[A-Z]$').test(value)
        || 'At least one capitalized letter and one number.',
    moneyMatch: (value: string) => new RegExp('^[0-9]+(\\.[0-9][0-9])?$').test(value)
        || 'Wrong money pattern (2 decimal digits, only numbers).',
    numberMatch: (value: string) => new RegExp('^[1-9][0-9]?$').test(value) || 'Value from 1 to 99.',
    charMatch: (value: string) => new RegExp('^[a-zA-Z]+$') .test(value) || 'Use only alphabetical chars.',
    emailMatch: (value: string) => new RegExp('^\\S+@\\S+\\.[a-z]+$').test(value) || 'Wrong email format.',
}
