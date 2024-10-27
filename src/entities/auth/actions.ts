'use server';

import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { type z } from 'zod';

import { signIn } from '@/auth';
import { db } from '@/config/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { getUserByEmail } from '@/entities/user';

import { loginSchema, registerSchema } from './schemas';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedField = loginSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Неверные поля!' };
  }
  const { email, password } = validatedField.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Неверные логины или пароль' };
      } else {
        return { error: 'Пользователь с данным email не найден' };
      }
    }
    throw error;
  }

  return { success: 'Вы вошли в аккаунт!' };
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedField = registerSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Неверные поля!' };
  }

  const { email, password, name } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email уже занят!' };
  }

  const hashedPassword = await hash(password, 8);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'Успех!' };
};
