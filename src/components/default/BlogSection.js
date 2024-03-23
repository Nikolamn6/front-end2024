import React from 'react'
import SectionTitle from './common/SectionTitle'
import blogData from './blogData'
import SingleBlog from './SingleBlog'

function BlogSection() {
  return (
    <section
    id="blog"
    className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
  >
    <div className="container mx-auto">
      <SectionTitle
        title="Блог"
        paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
        center
        mb="100px"
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
        {blogData.map((blog) => (
          <div key={blog.id} className="w-full">
            <SingleBlog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default BlogSection