import { JwtService } from '@nestjs/jwt';
require('dotenv').config();


const { SECRET_KEY_ACCESS = "", SECRET_KEY_REFRESH = "" } = process.env;


const createToken = (_id:string) => {
  const payload = {
    id: _id,
  };
  const jwtService = new JwtService({
    secret: SECRET_KEY_ACCESS,
    signOptions: { expiresIn: '45m' },
  });
  const accessToken = jwtService.sign(payload);

  const refreshToken = jwtService.sign(payload, {
    secret: SECRET_KEY_REFRESH,
    expiresIn: '1w',
  });

  return { accessToken, refreshToken };
};

export default createToken;