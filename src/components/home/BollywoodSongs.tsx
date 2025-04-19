import React from 'react'

const courses = [
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/398168d8-edc5-4af7-888f-f1a662d2773a.png',
    title: 'Sitar Fundamentals',
    instructor: 'Instructed by Ravi Shankar',
  },
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/d4fe8863-82b7-4fb6-b9d4-3af4daa407b1.png',
    title: 'Carnatic Vocal Basics',
    instructor: 'Instructed by M.S. Subbulakshmi',
  },
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/a49e1ce6-b0d9-4053-bfc2-831e1d4f86fa.png',
    title: 'Tabla Technique',
    instructor: 'Instructed by Zakir Hussain',
  },
]

const BollywoodSongs
 = () => {
  return (
    <>
      <h2 className="text-[#201A09] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Popular Courses
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {courses.map((course, index) => (
          <div key={index} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style={{ backgroundImage: `url("${course.image}")` }}
            />
            <div>
              <p className="text-[#201A09] text-base font-medium leading-normal">{course.title}</p>
              <p className="text-[#A07D1C] text-sm font-normal leading-normal">
                {course.instructor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BollywoodSongs

