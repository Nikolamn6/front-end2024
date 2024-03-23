import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../../../components/logged/Breadcrumb'
import AddKilos from '../../../../components/logged/AddKilos';
import useFetch from '../../../../hooks/fetch.hook';

function Programs() {
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

  return (
    <>
    <Breadcrumb pageName="Тренировъчни програми" />
    <AddKilos popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

    </>
  )
}

export default Programs