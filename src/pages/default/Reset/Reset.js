import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { resetPasswordValidation } from '../../../helper/validate'
import { resetPassword } from '../../../helper/helper'
import { useAuthStore } from '../../../store/store'
import { Navigate, useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/fetch.hook'

function Reset() {
    const { username } = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const [{ isLoading, status, serverError }] = useFetch('createResetSession')
  
    const formik = useFormik({
      initialValues : {
        password : '',
        confirm_pwd: ''
      },
      validate : resetPasswordValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        
        let resetPromise = resetPassword({ username, password: values.password })
  
        toast.promise(resetPromise, {
          loading: 'Преработване...',
          success: <b>Успешно...!</b>,
          error : <b>Неуспешно!</b>
        });
  
        resetPromise.then(function(){ navigate('/password') })
  
      }
    })
  
  
    if(isLoading) return <h1 className='text-2xl font-bold'>Зареждане...</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>

      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Смени паролата си
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Въведето кота, който получихте по вашият Email.
                </p>

                <form onSubmit={formik.handleSubmit}>

                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Парола
                    </label>
                    <input
                    {...formik.getFieldProps('password')}
                      type="text"
                      name="password"
                      placeholder="Въведи нова парола"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="onfirm_pwd"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Повтори паролата
                    </label>
                    <input
                    {...formik.getFieldProps('confirm_pwd')}
                      type="text"
                      name="confirm_pwd"
                      placeholder="Повтори новата парола"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90" type='submit'>
                      Влез
                    </button>
                  </div>
                </form>
                {/* <p className="text-center text-base font-medium text-body-color">
                  Нямаш код?{" "}
                  <p onClick={resendOTP}  className="text-primary hover:underline">
                    Изпрати нов
                  </p>
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  )
}

export default Reset