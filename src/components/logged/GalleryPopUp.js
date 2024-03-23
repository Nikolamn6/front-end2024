import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { addGallery } from '../../helper/helper';
import useFetch from '../../hooks/fetch.hook';

function GalleryPopUp(props) {
    const [{ apiData }] = useFetch();

    const [files, setFiles] = useState(null);
    const [description, setDescription] = useState('');

    async function createNewPost(ev) {
        ev.preventDefault();
  
          const formData = new FormData();
          formData.append('description', description);
          formData.append('image', files);
          formData.append('author', apiData.username);
  
          let galleryPromise = addGallery(formData);
  
          // console.log(blogPromise);
  
          toast.promise(galleryPromise, {
            loading: 'Добавяне ...',
            success : <b>Успешна добавяне ...!</b>,
            error : <b>Опитай пак.</b>
          });
  
          galleryPromise.then(() => {
            setFiles('');
            setDescription('');
            props.setPopupOpen(false);
          });
  
        }

  return (
    <div
    className={`fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4 ${
      props.popupOpen === true ? 'block' : 'hidden'
    }`}
  >
    <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
      <button
        onClick={() => props.setPopupOpen(false)}
        className="absolute right-1 top-1 sm:right-5 sm:top-5"
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
            fill=""
          />
        </svg>
      </button>

      <p className='my-5'>Въведете данните, за да може да видите публикацията.</p>

      {/* <form onSubmit={formik.handleSubmit}> */}
      <form onSubmit={createNewPost}>
      <div className="mb-5">
            <label
              htmlFor="taskDescription"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Описание
            </label>
            <textarea
              name="taskDescription"
              id="taskDescription"
              cols={30}
              rows={7}
              placeholder="Enter task description"
              value={description}
              onChange={ev => setDescription(ev.target.value)} 
              className="w-full rounded-sm border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            ></textarea>
          </div>


          <div className="mb-5">
            <label
              htmlFor="taskImg"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Добави снимка
            </label>
            <div>
              <div
                id="FileUpload"
                className="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white py-4 px-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
              >
                <input
                  type="file"
                  accept="image/*"
                  name='photo'
                  className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
                  onChange={(event) => setFiles(event.target.files[0])}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_75_12841)">
                        <path
                          d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                          fill="#3C50E0"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_75_12841">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <p className="text-xs">
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
              </div>

              {files !== null && (
                <div className="mt-4.5 border border-stroke bg-white py-3 px-4 dark:border-strokedark dark:bg-boxdark">
                  <div className="flex items-center justify-between">
                    <span>{files.name}</span>

                    <button>
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>


        
        <button className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2.5 px-4.5 font-medium text-white">
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_60_9740)">
              <path
                d="M18.75 9.3125H10.7187V1.25C10.7187 0.875 10.4062 0.53125 10 0.53125C9.625 0.53125 9.28125 0.84375 9.28125 1.25V9.3125H1.25C0.875 9.3125 0.53125 9.625 0.53125 10.0312C0.53125 10.4062 0.84375 10.75 1.25 10.75H9.3125V18.75C9.3125 19.125 9.625 19.4687 10.0312 19.4687C10.4062 19.4687 10.75 19.1562 10.75 18.75V10.7187H18.75C19.125 10.7187 19.4687 10.4062 19.4687 10C19.4687 9.625 19.125 9.3125 18.75 9.3125Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_60_9740">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Добави
        </button>
      </form>
    </div>
  </div>
  )
}

export default GalleryPopUp