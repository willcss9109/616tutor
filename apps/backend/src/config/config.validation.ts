import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().required(),
  SUPABASE_URL: Joi.string().uri().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_KEY: Joi.string().optional(),
  SUPABASE_JWT_DISCOVERY_URL: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().optional(),
});