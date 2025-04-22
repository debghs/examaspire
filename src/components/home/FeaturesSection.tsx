// import React from 'react'

// const features = [
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
//         <path d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l25.58,17ZM216,40H40A16,16,0,0,0,24,56V168a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,128H40V56H216V168Zm16,40a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Z" />
//       </svg>
//     ),
//     title: 'Comprehensive Song Notations for Easy Learning',
//     description: 'Access a wide range of song notations that simplify your practice.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
//         <path d="M212.92,25.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,64V174.08A36,36,0,1,0,88,204V118.25l112-28v51.83A36,36,0,1,0,216,172V32A8,8,0,0,0,212.92,25.69ZM52,224a20,20,0,1,1,20-20A20,20,0,0,1,52,224ZM88,101.75V70.25l112-28v31.5ZM180,192a20,20,0,1,1,20-20A20,20,0,0,1,180,192Z" />
//       </svg>
//     ),
//     title: 'In-Depth Raag Descriptions for Better Understanding',
//     description: 'Explore detailed descriptions of various raags to enhance your knowledge.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
//         <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z" />
//       </svg>
//     ),
//     title: 'Engaging Learning Videos to Enhance Skills',
//     description: 'Watch our instructional videos to improve your musical techniques.',
//   },
// ]

// const FeaturesSection = () => {
//   return (
//     <div className="flex flex-col gap-16 px-5 md:px-12 py-12 md:py-24 @container">
//       <div className="flex flex-col gap-6">
//         <span className="text-bianca-700 text-base font-medium">Explore</span>
//         <h1 className="text-gray-900 text-2xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
//           Discover the Essence of Indian Classical Music
//         </h1>
//         <p className="text-gray-700 text-small font-normal leading-normal max-w-[720px]">
//           AGK Sangeet offers a comprehensive platform for learning Indian classical music. Our
//           website features detailed song notations, in-depth raag descriptions, and engaging
//           learning videos. Whether you are a beginner or an advanced learner, we provide resources
//           tailored to your musical journey.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//         {features.map((feature, index) => (
//           <div key={index} className="flex flex-col gap-8">
//             <div className="text-gray-900 w-10 h-10">{feature.icon}</div>
//             <div className="flex flex-col gap-4">
//               <h2 className="text-gray-900 text-xl font-bold leading-tight">{feature.title}</h2>
//               <p className="text-gray-600 text-base font-normal leading-normal">
//                 {feature.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="flex gap-4">
//         <button className="flex items-center justify-center px-6 py-3 rounded-xl border border-[#201A09]  text-[#201A09] hover:bg-[#F5EFDB] transition-colors text-base font-bold ">
//           Learn
//         </button>
//         <button className="flex items-center justify-center px-6 py-3  text-base font-bold gap-2 text-[#201A09]  hover:opacity-80 transition-opacity">
//           Join
//           <span className="text-lg">→</span>
//         </button>
//       </div> */}
//     </div>
//   )
// }

// export default FeaturesSection
