import { NextRequest, NextResponse } from "next/server";

import dbConnect from '@/app/lib/dbConnect'

import Puzzles from "@/app/models/puzzles";
import Helpers from '@/app/models/helpers'

dbConnect()

// Get orders
export async function GET(){
    
    try{
        
        const orders = await Puzzles.find()
    
        return NextResponse.json(orders)
    }
    catch(err: any){
        return NextResponse.json({
            type: 'error',
            message: err.message,
        })
    }
}


// Create brands and tags for filters
export async function POST(req: NextRequest){
    const data = await req.json()
    console.log(data)

    const newHelpers = new Helpers(data)
    await newHelpers.save()

    return NextResponse.json(newHelpers)

}