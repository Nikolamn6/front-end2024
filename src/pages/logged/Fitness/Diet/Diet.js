import React, { useEffect, useState } from 'react'
import useFetch from '../../../../hooks/fetch.hook'

import CardItemOne from './CardItemOne'
import Breadcrumb from '../../../../components/logged/Breadcrumb'


import userEleven from '../../../../images/users/user-11.png'
import userTwelve from '../../../../images/users/user-12.png'
import userThirteen from '../../../../images/users/user-13.png'

import CardsOne from '../../../../images/cards/cards-01.png'
import CardsTwo from '../../../../images/cards/cards-02.png'
import CardsThree from '../../../../images/cards/cards-03.png'
import Loader from '../../../../components/logged/common/Loader'

import AddKilos from '../../../../components/logged/AddKilos'

function Diet() {
  const [{ isLoading, apiData, serverError }] = useFetch();

  // const [checkKilos, setCheckKilos] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);


  useEffect(() => {
    if (apiData?.kilos < 10 || apiData?.goalKilos < 10) {
      setPopupOpen(true);
    }
  }, [apiData]);

  
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!popupOpen || keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [popupOpen]);


  // console.log(checkKilos);


  if(isLoading) return <h1 className='text-2xl font-bold'><Loader /></h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <>
    <Breadcrumb pageName="Хранителни режими" />
    <AddKilos popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

    {/* {checkKilos ? <AddKilos popupOpen={popupOpen} setPopupOpen={setPopupOpen} /> : <AddKilos popupOpen={popupOpen} setPopupOpen={setPopupOpen} />} */}
    {/* {checkKilos ? <AddKilos popupOpen={popupOpen} setPopupOpen={setPopupOpen} />: ""} */}

    <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
      <CardItemOne
        imageSrc={userEleven}
        name="Naimur Rahman"
        role="Content Writer"
        cardImageSrc={CardsOne}
        cardTitle="Card Title here"
        cardContent="Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et."
      />

      <CardItemOne
        imageSrc={userTwelve}
        name="Musharof Chy"
        role="Web Developer"
        cardImageSrc={CardsTwo}
        cardTitle="Card Title here"
        cardContent="Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et."
      />

      <CardItemOne
        imageSrc={userThirteen}
        name="Shafiq Hammad"
        role="Front-end Developer"
        cardImageSrc={CardsThree}
        cardTitle="Card Title here"
        cardContent="Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et."
      />
    </div>
    </>
  )
}

export default Diet