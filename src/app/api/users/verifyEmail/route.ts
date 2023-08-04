import connect from "@/DBConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { token } = reqBody
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpire: {$gt: Date.now()}
    })
    
    if (!user) {
      return NextResponse.json({error: "Invalid token"}, {status: 400})
    }
    console.log(user, 'user');
    
    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpire = undefined
    await user.save()

    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    })
  } catch (error) {
     return NextResponse.json({error: error.message}, {status: 500})
  }
}