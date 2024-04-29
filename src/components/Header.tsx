'use client'
import { faBitcoinSign, faMugHot, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { parseFullName } from 'parse-full-name'

export default function Header({ session }: { session: Session | null }) {
	const name = session?.user?.name || ''
	const { first: firstName } = parseFullName(name)

	return (
		<>
			<header className='bg-white'>
				<div className='flex justify-between max-w-2xl mx-auto px-4 py-4'>
					<Link href={'/'} className='inline-flex gap-1 items-center'>
						<FontAwesomeIcon className='h-8' icon={faBitcoinSign} />
						<span className='mt-2'>Send crypto</span>
					</Link>
					<nav className='mt-2 flex gap-6 items-center'>
						<Link href='/about'>About</Link>
						<Link href='/about'>FAQ</Link>
						<Link href='/about'>Contact</Link>
						<div className='flex gap-4'>
							{session && (
								<div className='flex items-center gap-2  rounded-full p-1 pr-4'>
									 <Image src={session.user?.image as string}
                           alt="avatar"
                           width="36" height="36"
                           className="rounded-full"
                    />
									{firstName}
									<button
										onClick={() => signOut()}
										className='rounded-full px-4 py-2 ml-4 bg-yellow-300'
									>
										Logout
									</button>
								</div>
							)}
							{!session && (
								<div className='flex items-center gap-2  rounded-full p-1 pr-4'>
									<button
										onClick={() => signIn('google')}
										className='border-2 rounded-full px-4 py-2 ml-4'
									>
										Login
									</button>
									<button className='bg-yellow-300 rounded-full px-4 py-2'>
										Sign up
									</button>
								</div>
							)}
						</div>
					</nav>
				</div>
			</header>
		</>
	)
}
