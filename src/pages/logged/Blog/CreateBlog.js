import React, { useState } from 'react'
import Editor from '../../../components/logged/Editor'
import 'react-quill/dist/quill.snow.css';
import Breadcrumb from '../../../components/logged/Breadcrumb';
// import axios from 'axios';
import useFetch from '../../../hooks/fetch.hook';
import toast ,{ Toaster } from 'react-hot-toast';
import { addBlog } from '../../../helper/helper';

function CreateBlog() {
  const [{ apiData }] = useFetch();

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');

    console.log(apiData?.username);

    async function createNewPost(ev) {
      ev.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('image', files);
        formData.append('author', apiData?.username);

        let blogPromise = addBlog(formData);

        // console.log(blogPromise);

        toast.promise(blogPromise, {
          loading: 'Добавяне ...',
          success : <b>Успешна добавяне ...!</b>,
          error : <b>Опитай пак.</b>
        });

        blogPromise.then(() => {
          setTitle('');
          setSummary('');
          setContent('');
          setFiles('');
        });

      }
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <Breadcrumb pageName="Добави блог" />

    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Добави блог
              </h3>
            </div>
            <form onSubmit={createNewPost}>
              <div className="p-6.5">

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Заглавие <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Заглавие"
                    name="title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Резюме
                  </label>
                  <input
                    type="text"
                    placeholder="Резюме"
                    name='summary'
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)} 
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Снимка
                  </label>
                  <input
                    type="file"
                    name='photo'
                    onChange={ev => setFiles(ev.target.files[0])}
                    accept='image/*'
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Съдържание
                  </label>

                  <Editor value={content} onChange={setContent} />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Добави Блог
                </button>
              </div>
            </form>
          </div>

    </>
  )
}

export default CreateBlog