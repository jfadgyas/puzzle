import { NextRequest, NextResponse } from "next/server";

import dbConnect from '@/app/lib/dbConnect'

import Orders from '@/app/models/orders'

export async function GET(req: NextRequest){
    
    dbConnect()
    
    try{
        
        const orders = await Orders.find()
    
        return NextResponse.json(orders)
    }
    catch(err: any){
        return NextResponse.json({
            type: 'error',
            message: err.message,
        })
    }
}

export async function POST(req: NextRequest){
    
    dbConnect()

    try{   
        
        // Process req.body first, then create new order. Finally save and return success response
        const data = await req.json()
        const newOrder = new Orders(data)

        await newOrder.save()      
        return NextResponse.json(newOrder)
    }
    catch(err: any){
        return NextResponse.json({
            type: 'error',
            message: err.message,
        })
    }
}

export async function PATCH(req: NextRequest) {
    
    dbConnect()

    try{   
        
        // Process req.body first, then update order. Finally save and return success response
        const data = await req.json()
        const updatedOrder = await Orders.findOneAndUpdate(
            {
                checkout_id: data.checkout_id
            },
            data,
            {
                upsert: true,
                new: true
            }
        )

        return NextResponse.json(updatedOrder)
    }
    catch(err: any){
        return NextResponse.json({
            type: 'error',
            message: err.message,
        })
    }
}