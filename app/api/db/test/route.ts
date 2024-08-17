import { NextRequest, NextResponse } from "next/server";

import dbConnect from '@/app/lib/dbConnect'

import Puzzles from "@/app/models/puzzles";

dbConnect()

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