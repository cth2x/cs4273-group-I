import { NextResponse } from 'next/server';
import connection from '../../lib/db';

export async function GET() {
  return new Promise((resolve) => {
    connection.query(
      'SELECT COUNT(*) as totalCases FROM person',
      (err, results: any) => {
        // Using 'any' for simplicity
        if (err) {
          console.error('Database error fetching stats:', err);
          // Resolve with an error response
          return resolve(
            NextResponse.json(
              { error: 'Failed to fetch statistics' },
              { status: 500 }
            )
          );
        }

        const totalCases = results[0]?.totalCases || 0;
        // Resolve with the count
        return resolve(NextResponse.json({ totalCases }, { status: 200 }));
      }
    );
  });
}
