import React, { useContext } from 'react'
import Hero from '../../../components/default/Hero'
import Features from '../../../components/default/Features'
import AdoutSection from '../../../components/default/AdoutSection'
import Testemonials from '../../../components/default/Testemonials'
import BottomContact from '../../../components/default/BottomContact'
import { MenuContext } from '../../../contexts/MenuContext'


function Index() {
  localStorage.setItem("loggedIn", false);

  const { setMenu } = useContext(MenuContext);
  setMenu(false);

  return (
    <>
    <Hero />
    <Features />
    <AdoutSection />
    <Testemonials />
    <BottomContact />
    </>
  )
}

export default Index