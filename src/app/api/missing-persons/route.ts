// src/app/api/missing-persons/route.ts
import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2';
import connection from '../../lib/db';


export async function GET() {
  return new Promise((resolve) => {
    // Retrieves data from person, person_tribe, and tribe tables
    // If case_id from person and person_tribe match get tribe name
    connection.query(
      `SELECT 
        p.*, 
        pt.*, 
        t.tribe_name 
      FROM 
        person p
      JOIN 
        person_tribe pt ON p.case_id = pt.case_id 
      JOIN 
        tribe t ON pt.tribe_id = t.tribe_id`,
      (err, results: RowDataPacket[]) => {
        if (err) {
          console.error("Database error:", err);
          return resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
        }

        resolve(NextResponse.json(results, { status: 200 }));
      }
    );
  });
}
