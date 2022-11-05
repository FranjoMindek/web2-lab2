import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = `
      SELECT username, password FROM insecure_user
      WHERE username = $1
    `;
    console.log(req.body);
    const values = [req.body.username];
    
    const result = await conn.query(
      query,
      values
    );

    if (result.rowCount > 0) {
      const row = result.rows[0];
      if (row.password === req.body.password) {
        res.status(200).send("Ok");
      } else {
        res.status(404).send({passwordInfo: "Netočna loznika za korisničko ime!", usernameInfo: ""});
      }
    } else {
      res.status(404).send({passwordInfo: "", usernameInfo: "Nepostojano korisničko ime!"});
    }
  } catch ( error ) {
    console.log( error );
  }
};
