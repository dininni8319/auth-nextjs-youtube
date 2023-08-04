import { connect } from "@/DBConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {

  try {
    const { username, email, password } = await request.json()

    console.log('====================================');
    console.log(username, email, password);
    console.log('====================================');

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Please fill all fields' },
        { status: 400 }
      )
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password should be at least 6 characters' },
        { status: 400 }
      )
    }

    const findUser = await User.findOne({email})
    if(findUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)


    const newUser = await User.create({
        email,
        password: hashedPassword,
        username
    })
    
    return NextResponse.json(
      { message: 'User created successfully',
        user: newUser,
        success: true,
        status: 201
      } 
    )
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

}