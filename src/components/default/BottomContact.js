import React from 'react'
import NewsLatterBox from './NewsLatterBox'
import { Link } from 'react-router-dom'

function BottomContact() {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
    <div className="container mx-auto">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
          <div
            className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s
            "
          >
            <h2 className="mb-3 text-2xl font-bold text-center text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Започни сега
            </h2>
            <p className="mb-12 text-base font-medium text-center text-body-color">
              Колкото по-скоро, толкова по-добре!
            </p>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                to='/signup'
                  className="rounded-sm bg-primary px-11 py-5 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Регистрирай се
                </Link>
                <Link
                  to='/signin'
                  className="inline-block rounded-sm bg-black px-11 py-5 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  Влез
                </Link>
        </div>

          </div>
        </div>
        <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
          <NewsLatterBox />
        </div>
      </div>
    </div>
  </section>
  )
}

export default BottomContact