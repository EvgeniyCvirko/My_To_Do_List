type ValidateFieldType = (value: string) => string | undefined

export const required: ValidateFieldType = (value) => (value ? undefined : 'Required')