import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the extension zip file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'Final-Extension-main.zip');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Extension file not found' },
        { status: 404 }
      );
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Create response with appropriate headers
    const response = new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="EcoMit-Extension.zip"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error downloading extension:', error);
    return NextResponse.json(
      { error: 'Failed to download extension' },
      { status: 500 }
    );
  }
} 