// proxy.js (or proxy.ts)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Define public and protected routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/events(.*)',
  '/api/events(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

// 2. Export clerkMiddleware as proxy handler
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// 3. Keep your matcher configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};