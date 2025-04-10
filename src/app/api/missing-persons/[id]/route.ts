// src/app/api/missing-persons/[id]/route.ts
import { NextResponse } from 'next/server';
import connection from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

//Retrieve persons data from db
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  params = await params;
  const id = await params.id;

  return new Promise((resolve) => {
    connection.query(
      'SELECT * FROM person WHERE case_id = ?',
      [id],
      (err, results: RowDataPacket[]) => {
        if (err) {
          resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
        } else if (results.length === 0) {
          resolve(NextResponse.json({ error: 'Person not found' }, { status: 404 }));
        } else {
          resolve(NextResponse.json(results[0], { status: 200 }));
        }
      }
    );
  });
}