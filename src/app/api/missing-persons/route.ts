// src/app/api/missing-persons/route.ts
import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2';
import connection from '../../lib/db';

export async function GET() {
  return new Promise((resolve) => {
    // Use GROUP_CONCAT to aggregate multiple tribes
    connection.query(
      `SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT t.tribe_name) as tribes,
        GROUP_CONCAT(DISTINCT pt.tribe_status) as tribe_statuses
      FROM 
        person p
      LEFT JOIN 
        person_tribe pt ON p.case_id = pt.case_id 
      LEFT JOIN 
        tribe t ON pt.tribe_id = t.tribe_id
      GROUP BY 
        p.case_id`,
      (err, results: RowDataPacket[]) => {
        if (err) {
          console.error("Database error:", err);
          return resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
        }

        // Transform results to handle multiple tribes
        const transformedResults = results.map(result => ({
          ...result,
          tribes: result.tribes ? result.tribes.split(',') : [],
          tribe_statuses: result.tribe_statuses ? result.tribe_statuses.split(',') : []
        }));

        resolve(NextResponse.json(transformedResults, { status: 200 }));
      }
    );
  });
}