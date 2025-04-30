import { NextResponse } from 'next/server';
import {getSession} from '@/lib/session'
import connection from '@/lib/db';


export async function POST(req: Request) {

  
  try {
    const data = await req.json();
    
    const {
      case_id,
      first_name,      
      last_name,       
      age,
      gender,
      race,
      height,
      weight,
      missing_date,
      missing_location,
      circumstances,
      contact_info,
      eye_color,
      hair_color,
      classification,
    } = data;

    // Combine first_name and last_name
    const name = `${first_name} ${last_name}`;  

    // Validate required fields
    if (!case_id || !name || !age || !gender || !race) {
      return NextResponse.json({ success: false, error: 'Case ID, Name, Age, Gender, and Race are required' }, { status: 400 });
    }

    const sql = `
      INSERT INTO person (
        case_id, name, age, gender, race, height, weight,
        missing_date, missing_location, circumstances, contact_info,
        eye_color, hair_color, classification
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      case_id,
      name,        
      age,
      gender,
      race,
      height || "", 
      weight || "", 
      missing_date || "", 
      missing_location || "",
      circumstances || "",
      contact_info || "",
      eye_color || "",
      hair_color || "",
      classification || "Unknown", 
    ];

    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        resolve(NextResponse.json({ success: true, message: 'Person deleted successfully' }));
      });
    });
  } catch (err) {
    console.error('Server Error:', err);  
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
