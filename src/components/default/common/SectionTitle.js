import React from 'react'

function SectionTitle(props) {
    const width = "570px";
    const mb = props.mb;
    const center = props.center;
  return (
    <>
    <div
      className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
      data-wow-delay=".1s"
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        {props.title}
      </h2>
      <p className="text-base !leading-relaxed text-body-color md:text-lg">
        {props.paragraph}
      </p>
    </div>
  </>
  )
}

export default SectionTitle