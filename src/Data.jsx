// src/Data/data.jsx
export const courses = [
  {
    courseId:1,
    id: 1,
    title: "Vite + React + Tailwind",
    instructor: "Aditya Singh",
    rating: 4.1,
    ratingCount: 75,
    price: "6,999 Rs",
    imageUrl: "https://repository-images.githubusercontent.com/574161536/1c002254-32d8-48b5-a4de-c0ed1511f2ee",
    lastUpdated: "June 2024",
    duration: "80 hours",
    lectureCount: 15,
    description: "Master modern web development with Vite, React, and Tailwind CSS.",
    highlights: [
      'Fast Development with Vite',
      'Component-based Architecture in React',
      'Responsive Design with Tailwind CSS',
      'Advanced State Management',
      'Building Production-Ready Apps',
    ],
    roadmap: [
      {
        month: "Month 1",
        weeks: [
          {
            week: "Week 1: Prerequisites",
            topics: [
              'HTML Basics',
              'CSS Basics',
              'JavaScript Basics',
            ]
          },
          {
            week: "Week 2: React Basics",
            topics: [
              'Create React App',
              'JSX (JavaScript Syntax Extension)',
              'Props',
              'Handling States / useState Hook',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 2",
        weeks: [
          {
            week: "Week 1: Advanced Topics",
            topics: [
              'Debugging and logging',
              'Fetching & displaying data from external API',
              'Browser\'s local storage',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 3",
        weeks: [
          {
            week: "Project Assignment",
            topics: [
              'Developing a full-fledged React application',
              'Implementing state management with Redux',
              'Utilizing React Router for navigation',
              'Fetching and displaying data from APIs',
            ]
          }
        ]
      }
    ]
  },
  {
    courseId:2,
    id: 2,
    title: "React + Next.js Tutorial",
    instructor: "Aditya Singh",
    rating: 4.5,
    ratingCount: 200,
    price: "6,999 Rs",
    imageUrl: "https://i.ytimg.com/vi/T3iLrmO8TmY/maxresdefault.jpg",
    lastUpdated: "June 2024",
    duration: "80 hours",
    lectureCount: 20,
    description: "Learn the power of server-side rendering and static site generation with Next.js.",
    highlights: [
      'Introduction to Next.js',
      'Server-side Rendering',
      'Static Site Generation',
      'API Routes in Next.js',
      'Deploying Next.js Apps',
    ],
    roadmap: [
      {
        month: "Month 1",
        weeks: [
          {
            week: "Week 1: Getting Started with Next.js",
            topics: [
              'Setting up Next.js',
              'Understanding Pages and Routing',
              'Creating your first Next.js app',
            ]
          },
          {
            week: "Week 2: Static Site Generation (SSG)",
            topics: [
              'Understanding SSG',
              'Creating static pages with Next.js',
              'Using getStaticProps and getStaticPaths',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 2",
        weeks: [
          {
            week: "Week 1: Server-side Rendering (SSR)",
            topics: [
              'Understanding SSR',
              'Implementing SSR in Next.js',
              'Using getServerSideProps',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 3",
        weeks: [
          {
            week: "Project Assignment",
            topics: [
              'Building a complete Next.js application',
              'Deploying the application',
              'Optimizing for performance',
            ]
          }
        ]
      }
    ]
  },
  {
    courseId:3,
    id: 3,
    title: "JavaScript Essentials",
    instructor: "Ravi Kumar",
    rating: 3.9,
    ratingCount: 150,
    price: "4,999 Rs",
    imageUrl: "https://media.licdn.com/dms/image/D4D12AQGwFBk-2Q0b2g/article-cover_image-shrink_600_2000/0/1657533146499?e=2147483647&v=beta&t=TCnqljBnc_m3DA07XYqRF5Fb_NRBpKMyJcR3uo-DfWc",
    lastUpdated: "May 2024",
    duration: "60 hours",
    lectureCount: 25,
    description: "Get a solid foundation in JavaScript, the most popular programming language.",
    highlights: [
      'Variables and Data Types',
      'Functions and Scope',
      'Asynchronous Programming',
      'DOM Manipulation',
      'Event Handling',
    ],
    roadmap: [
      {
        month: "Month 1",
        weeks: [
          {
            week: "Week 1: Introduction to JavaScript",
            topics: [
              'JavaScript Syntax',
              'Variables and Data Types',
              'Operators and Expressions',
            ]
          },
          {
            week: "Week 2: Control Structures",
            topics: [
              'Conditional Statements',
              'Loops and Iteration',
              'Functions and Scope',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 2",
        weeks: [
          {
            week: "Week 1: Working with DOM",
            topics: [
              'DOM Manipulation',
              'Event Handling',
              'Building interactive web pages',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 3",
        weeks: [
          {
            week: "Week 1: Asynchronous JavaScript",
            topics: [
              'Promises',
              'Async/Await',
              'Handling asynchronous operations',
            ]
          },
          // Add more weeks as needed
        ]
      }
    ]
  },
  {
    courseId:4,
    id: 4,
    title: "Advanced CSS & SASS",
    instructor: "Priya Singh",
    rating: 3.9,
    ratingCount: 188,
    price: "5,499 Rs",
    imageUrl: "https://www.ringcentral.co.uk/gb/en/blog/wp-content/uploads/2020/12/how-does-saas-work.png",
    lastUpdated: "April 2024",
    duration: "70 hours",
    lectureCount: 18,
    description: "Take your CSS skills to the next level with SASS and advanced styling techniques.",
    highlights: [
      'Advanced Selectors',
      'CSS Grid and Flexbox',
      'Responsive Design Principles',
      'SASS Preprocessing',
      'Animations and Transitions',
    ],
    roadmap: [
      {
        month: "Month 1",
        weeks: [
          {
            week: "Week 1: Advanced CSS Selectors",
            topics: [
              'Pseudo-classes and Pseudo-elements',
              'Attribute Selectors',
              'Advanced Combinators',
            ]
          },
          {
            week: "Week 2: CSS Grid Layout",
            topics: [
              'Introduction to CSS Grid',
              'Building complex layouts with Grid',
              'Responsive Design with Grid',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 2",
        weeks: [
          {
            week: "Week 1: Flexbox Deep Dive",
            topics: [
              'Understanding Flexbox',
              'Building flexible layouts',
              'Flexbox vs. Grid',
            ]
          },
          {
            week: "Week 2: Introduction to SASS",
            topics: [
              'SASS Basics',
              'Using SASS Variables and Mixins',
              'Nesting and Extending with SASS',
            ]
          },
          // Add more weeks as needed
        ]
      },
      {
        month: "Month 3",
        weeks: [
          {
            week: "Week 1: CSS Animations and Transitions",
            topics: [
              'Creating animations with CSS',
              'Using keyframes and transitions',
              'Building interactive UI elements',
            ]
          },
          // Add more weeks as needed
        ]
      }
    ]
  }
];

export const categories = [
  {
    name: "Web Development",
    imageUrl: "https://images.livemint.com/img/2022/11/29/1600x900/1df36746-700f-11ed-9470-6981fab06e1e_1669744728301.jpg"
  },
  {
    name: "Data Science",
    imageUrl: "https://images.livemint.com/img/2022/11/29/1600x900/1df36746-700f-11ed-9470-6981fab06e1e_1669744728301.jpg"
  },
  {
    name: "Business",
    imageUrl: "https://images.livemint.com/img/2022/11/29/1600x900/1df36746-700f-11ed-9470-6981fab06e1e_1669744728301.jpg"
  },
  {
    name: "Design",
    imageUrl: "https://images.livemint.com/img/2022/11/29/1600x900/1df36746-700f-11ed-9470-6981fab06e1e_1669744728301.jpg"
  }
];