import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-[100vh] w-[100vw] flex flex-col items-center justify-center'>

      <div className='absolute top-0 right-[0vw] z-[-1]'>
        <svg width="974" height="296" viewBox="0 0 974 296" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M770.861 -122.979C845.207 -113.496 927.83 -114.39 973.678 -67.9415C1018.82 -22.2104 996.589 38.9058 987.069 96.0599C975.421 165.995 992.299 253.047 914.225 289.011C833.502 326.194 709.423 197.301 620.5 174C502.98 143.206 50.6693 229.04 6.49999 139C-39.8222 44.5709 202.731 -75.0721 306.5 -136C392.744 -186.637 664.188 -136.585 770.861 -122.979Z" fill="#419E8A" fill-opacity="0.5" />
        </svg>
      </div>
      <div className='absolute top-[30vh] right-[0vw] z-[-1]'>
        <svg width="473" height="458" viewBox="0 0 473 458" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M353.284 33.0106C411.028 42.4905 475.199 41.5966 510.809 88.0307C545.869 133.747 528.603 194.844 521.21 251.981C512.163 321.894 525.272 408.918 464.633 444.87C401.937 482.043 329.408 429.941 260.343 406.647C169.066 375.863 45.129 381.829 10.8233 291.817C-25.1545 197.418 33.4913 83.8086 114.088 22.8999C181.072 -27.7217 270.432 19.4086 353.284 33.0106Z" fill="#79EAD2" fill-opacity="0.5" />
        </svg>
      </div>
      <div className='absolute bottom-[0vh] right-[0vw] z-[-1]'>
        <svg width="568" height="400" viewBox="0 0 568 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M460.605 0.540408C540.052 6.10567 554.167 115.191 595.21 183.442C625.534 233.868 672.972 278.986 662.91 336.96C652.381 397.624 602.144 442.859 545.855 467.808C491.839 491.749 432.651 484.517 377.436 463.488C313.705 439.216 18.4904 426.366 1.49999 360.32C-15.7745 293.169 260.734 219.862 300.076 162.767C345.491 96.8608 380.762 -5.05263 460.605 0.540408Z" fill="#97D1C5" fill-opacity="0.5" />
        </svg>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[#52ab98] text-[80px] font-bold md:text-[72px] sm:text-[50px] xs: text-[32px]'>404</h1>
        <p className='text-black text-[50px] font-medium md:text-[32px] sm:text-[18px] xs: text-[16px]'>The page that you requested does not exist.</p>
        <div>
          <Link href="/" className='mt-[10px] text-[#52ab98] text-[50px] font-medium md:text-[32px] sm:text-[18px] xs: text-[16px]'>Back to Dashboard</Link>
        </div>
      </div>

      <div className='absolute bottom-[0vh] left-0 z-[-1]'>
        <svg width="466" height="616" viewBox="0 0 466 616" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M129.632 20.0819C206.748 12.3632 289.24 -22.0131 350.56 25.3829C427.168 84.5954 478.652 182.095 462.824 277.617C383.897 520.048 453.014 559.221 361 603.5C269.023 647.761 70.7999 558.619 -18.5459 509.261C-103.495 462.333 -143.744 362.047 -148.862 265.132C-153.063 185.582 -101.828 117.301 -42.0231 64.6776C4.67142 23.5905 67.7433 26.2765 129.632 20.0819Z" fill="#52AB98" fill-opacity="0.5" />
        </svg>
      </div>

      <div className='absolute top-[0vh] left-[0vw] z-[-1]'>
        <svg width="462" height="480" viewBox="0 0 462 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M137.586 0.0562087C198.679 2.50308 206.413 90.7335 251.463 132.073C320.272 195.216 468.982 203.629 460.807 296.66C452.85 387.214 311.594 375.221 227.142 408.853C155.494 437.386 89.1819 500.4 16.9311 473.429C-59.9724 444.721 -114.758 362.842 -115.989 280.764C-117.059 209.456 -36.1402 175.39 11.6653 122.469C52.9499 76.7671 76.0468 -2.40849 137.586 0.0562087Z" fill="#97D1C5" fill-opacity="0.5" />
        </svg>
      </div>

    </div>);
}