import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../util/db';
import bcrypt from 'bcryptjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = `
      SELECT username, hash FROM secure_user
      WHERE username = $1
    `;
    const values = [req.body.username];
    const result = await conn.query(
      query,
      values
    );

    if (result.rowCount > 0) {
      const row = result.rows[0];
      if (bcrypt.compareSync(req.body.password, row.hash)) {
        res.status(200).send("Ok");
      } else {
        res.status(404).send("Not ok");
      }
    } else {
      res.status(404).send("Not ok");
    }
  } catch ( error ) {
    console.log( error );
  }
};
