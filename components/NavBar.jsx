import Link from "next/link"
import {  Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'


const NavBar = () => {
  return (
    
          
    <header className="flex justify-between items-center p-2 gap-4 h-16">
        <nav className="felx justify-between">
            <Link href='/' className="logo">
                <img src="/icons/logo.png" alt="logo" width={24} height={24} />

                <p>DevEvent</p>
            </Link>
            <ul>
                <Link href='/'>Home</Link>
                <Link href='/events/all'>Events</Link>
                <Link href='/events/create'>Create Events</Link>
                <Link href={`/events/admin`} prefetch={false}>Admindashboard</Link>
                
                
                
            </ul>
            <div className="  flex item-center justify-center gap-3">
                    <Show when="signed-out">
                     <SignInButton>
                        <button className="cursor-pointer">Sign in</button>
                     </SignInButton>
                     <SignUpButton>
                        <button className="bg-[#25ac97] py-2 text-white rounded-full font-medium text-sm sm:text-base   px-4 sm:px-5 cursor-pointer">
                        Sign Up
                        </button>
                     </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                     <UserButton appearance={{
                            elements: {
                            
                            avatarBox: 'h-15 w-15', 
                            },
                        }} />
                    </Show>
                </div>
        </nav>
        
           
           
    </header>
          
    
    
  )
}

export default NavBar