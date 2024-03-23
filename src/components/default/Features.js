import React from 'react'
import featuresData from './featuresData'
import SingleFeature from './SingleFeature'
import SectionTitle from './common/SectionTitle'


function Features() {
  return (
    <>
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container mx-auto">
        <SectionTitle
          title="Услуги"
          paragraph="В приложението има различни услуги, които ще ви подпомогнат личностното развитие."
          mb="100px"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  </>
  )
}

export default Features