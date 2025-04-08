import { NextResponse } from 'next/server';
import connection from '../../lib/db';

export async function DELETE(req: Request) {
  try {
    const { case_id } = await req.json();

    const sql = 'DELETE FROM person WHERE case_id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, [case_id], (err, results) => {
          resolve(NextResponse.json({ success: true, message: 'Person deleted successfully' }));
      });
    });
  } catch (err) {
    console.error('Server Error:', err); 
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
