const { Prisma } = require('@prisma/client');
const _ = require('yup');
const __ = require('lodash');

const NAME_VALIDATOR = _.string()
  .typeError('Name must be string')
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters');

const EMAIL_VALIDATOR = _.string()
  .typeError('Email is required')
  .required('Email is required')
  .email()
  .typeError('Invalid email format');

const PASSWORD_VALIDATOR = _.string()
  .typeError('Password must be string')
  .required('Password is required')
  .min(1, 'Password must be at least one character');

const PASSWORD_CONFRIM_VALIDATOR = _.string()
  .typeError('Password confirmation must be string')
  .required('Password confirmation is required')
  .min(1, 'Password confirmation must be at least one character')
  .oneOf([_.ref('password'), null], 'Password does not match!');

const Schemas = {
  session: _.object().shape({
    token: _.string().typeError('Token must be string'),
  }),
  login: _.object().shape({
    email: EMAIL_VALIDATOR,
    password: PASSWORD_VALIDATOR,
  }),
  register: _.object().shape({
    name: NAME_VALIDATOR,
    email: EMAIL_VALIDATOR,
    password: PASSWORD_VALIDATOR,
    passwordConfirm: PASSWORD_CONFRIM_VALIDATOR,
  }),
  id: _.object().shape({
    id: _.array()
      .of(_.number())
      .typeError('ID must be number')
      .required('ID is required!'),
  }),
};

module.exports = {
  async validator({ response, schema, body }, func) {
    try {
      const validated = await Schemas[schema].camelCase().validate(body, {
        strict: true,
        stripUnknown: true,
        abortEarly: false,
      });

      const { data, error, message } = await func(validated);

      if (error) {
        throw new Error(error);
      }

      return response.status(200).json({
        message: message || 'Successful',
        status: 'success',
        code: 200,
        ...data,
      });
    } catch (err) {
      let errors = err.errors || [];

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          const column = __.capitalize(err.meta.target.split('_')[1]);
          errors.push(`${column} is already exist`);
        }
      }

      return response.status(422).json({
        message: `${err}`,
        errors: errors.length > 0 ? errors : undefined,
        status: 'failed',
        code: 422,
      });
    }
  },
};
