import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = `
      INSERT INTO insecure_user(username, password)
      VALUES($1, $2)
    `;
    const values =  Object.values(req.body);

    const result = await conn.query(
      query,
      values
    );
    
    res.status(201).send("Ok");
  } catch ( error ) {
    res.status(400).send({registerInfo: "Korisničko ime je zauzeto!"});
  }
};
