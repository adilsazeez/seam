import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/wardrobe';

    if (code) {
        const cookieStore = {
            get(name: string) {
                return request.headers.get('cookie')
                    ?.split('; ')
                    .find((row) => row.startsWith(`${name}=`))
                    ?.split('=')[1];
            },
            set(name: string, value: string, options: CookieOptions) {
                // This is a minimal implementation for the callback route to work with createServerClient 
                // in a standard Route Handler context where we need to return a response with Set-Cookie headers.
                // However, properly handling cookies in a Route Handler with @supabase/ssr usually requires
                // a slightly different approach or using a middleware response if manipulating cookies directly.
                // For simplicity in this specific callback pattern:
            },
            remove(name: string, options: CookieOptions) {
            },
        };

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        // Parse cookies from the request headers
                        const cookies = request.headers.get('cookie') || '';
                        const match = cookies.match(new RegExp(`(^| )` + name + `=([^;]+)`));
                        return match ? match[2] : undefined;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        // Note: In Next.js Route Handlers, cannot write cookies directly via this method 
                        // in the same way as Middleware. We need to attach them to the response.
                        // We'll accumulate them and set them on the response object below.
                    },
                    remove(name: string, options: CookieOptions) {
                        // Same as set
                    },
                },
            }
        );

        // We need to use a slightly more complex approach to essentially "intercept" the cookies set by exchangeCodeForSession
        // and apply them to the NextResponse.

        // Re-creating the client properly for a Route Handler to handle cookie operations
        // Since we can't easily pass the response object INTO the createServerClient cookie methods here (chicken/egg),
        // We usually do this:

        const response = NextResponse.redirect(`${origin}${next}`);

        const supabaseWithResponse = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        const cookies = request.headers.get('cookie') || '';
                        const match = cookies.match(new RegExp(`(^| )` + name + `=([^;]+)`));
                        return match ? match[2] : undefined;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        });
                    },
                    remove(name: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        });
                    },
                },
            }
        )

        const { error } = await supabaseWithResponse.auth.exchangeCodeForSession(code);
        if (!error) {
            return response;
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
