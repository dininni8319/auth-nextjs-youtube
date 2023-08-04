import connect from "@/DBConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest, res: NextResponse) {
   try {
      connect()

      const { email, password } = await req.json()
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Please fill all fields' },
          { status: 400 }
        )
      }
      
      const userExists = await User.findOne({ email })
      
      if (!userExists) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 400 }
        )
      }

      const isMatch = await bcrypt.compare(password, userExists.password)
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 400 }
        )
      }
      // create token data
      const tokenData = {
        id: userExists._id,
        username: userExists.username,
        email: userExists.email
      }
      const token = await jwt.sign(
        tokenData, 
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
      )
      // send token to client
      const response = NextResponse.json(
        { message: 'User logged in successfully',
          success: true,
          status: 200
        }
      )
      response.cookies.set(
        'token',
        token,
        {
          httpOnly: true,
        }
      )
      return response
   } catch (error) {
    
    console.log('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
   }
}
