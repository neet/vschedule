import { SuperTest, Test } from 'supertest';

export const login = async (
  request: SuperTest<Test>,
): Promise<Record<string, string>> => {
  const res = await request
    .post(`/auth/login`)
    .send({ email: 'test@example.com', password: 'password' });
  const cookie = res.headers['set-cookie'].join('');
  return { cookie };
};
