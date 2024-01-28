import Link from 'next/link'

export default function NotFound() {
  return ( 
  <div className='h-[100vh] w-[100vw] flex flex-col items-center justify-center'>
      <h1 className='text-[#52ab98] text-[80px] font-bold md:text-[72px] sm:text-[50px] xs: text-[32px]'>404</h1>
        <p className='text-black text-[50px] font-medium md:text-[32px] sm:text-[18px] xs: text-[16px]'>The page that you requested does not exist.</p>
      <div>
        <Link href="/" className='mt-[10px] text-[#52ab98] text-[50px] font-medium md:text-[32px] sm:text-[18px] xs: text-[16px]'>Back to Dashboard</Link>
      </div>
  </div> );
}