import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){

    // If success(?) delete cart cookie
    if (req.nextUrl.pathname === '/success'){

        // Delete cookie from req header 
        req.cookies.delete('cart')
    
        // Create new header for the site
        const res = NextResponse.next({
            request: {
            headers: req.headers,
            },
        })
      
        // Delete response cookies (delete cookie from the browser)
        res.cookies.delete('cart')
    
        return res
    }
}