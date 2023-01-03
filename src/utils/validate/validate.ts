type ValidateFieldType = (value: string) => string | undefined

export const required: ValidateFieldType = (value) => (value ? undefined : 'Required')

export const email: ValidateFieldType = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined