import Link from "next/link"

const NavBar = () => {
  return (
    <header>
        <nav>
            <Link href='/' className="logo">
                <img src="/icons/logo.png" alt="logo" width={24} height={24} />

                <p>DevEvent</p>
            </Link>
            <ul>
                <Link href='/'>Home</Link>
                <Link href='/events/all'>Events</Link>
                <Link href='/events/create'>Create Events</Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar