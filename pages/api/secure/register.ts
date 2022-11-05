import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../util/db';
import bcrypt from 'bcryptjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = `
      INSERT INTO secure_user(username, hash)
      VALUES($1, $2)
    `;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const values = [req.body.username, hash];

    const result = await conn.query(
      query,
      values
    );
    
    res.status(201).send("Ok");
  } catch ( error ) {
    res.status(400).send({registerInfo: "Korisničko ime je zauzeto!"});
  }
};
