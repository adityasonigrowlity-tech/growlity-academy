/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {string} duration
 * @property {'video' | 'article' | 'quiz'} type
 * @property {boolean} [isPreview]
 * @property {string} [videoUrl]
 * @property {boolean} [isLocked]
 */

/**
 * @typedef {Object} CurriculumSection
 * @property {string} id
 * @property {string} title
 * @property {Lesson[]} lessons
 */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} user
 * @property {string} avatar
 * @property {number} rating
 * @property {string} date
 * @property {string} comment
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {Object} instructor
 * @property {string} instructor.id
 * @property {string} instructor.name
 * @property {string} instructor.avatar
 * @property {string} instructor.title
 * @property {string} thumbnail
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {number} rating
 * @property {number} reviewCount
 * @property {number} studentCount
 * @property {string} duration
 * @property {'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'} level
 * @property {string} category
 * @property {string[]} tags
 * @property {boolean} [isTrending]
 * @property {boolean} [isBestseller]
 * @property {boolean} [isSubscriptionOnly]
 * @property {string} lastUpdated
 * @property {string} description
 * @property {string[]} whatYouWillLearn
 * @property {string[]} requirements
 * @property {CurriculumSection[]} curriculum
 * @property {Review[]} reviews
 */

export const courses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2026',
    subtitle: 'Master HTML, CSS, JavaScript, React, Node.js, and more',
    instructor: {
      id: 'i1',
      name: 'Dr. Angela Yu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angela',
      title: 'Lead Instructor, App Brewery'
    },
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    price: 84.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 284567,
    studentCount: 856234,
    duration: '65 hours',
    level: 'All Levels',
    category: 'Development',
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    isTrending: true,
    isBestseller: true,
    lastUpdated: '02/2026',
    description: 'Become a full-stack web developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps.',
     whatYouWillLearn: [
      'Build 16 web development projects for your portfolio',
      'Learn the latest technologies, including Javascript, React, Node and even Web3 development',
      'After the course you will be able to build ANY website you want',
      'Build fully-fledged websites and web apps for your startup or business',
      'Master frontend development with React',
      'Master backend development with Node'
    ],
    requirements: [
      'No programming experience needed - I\'ll teach you everything you need to know',
      'A Mac or PC computer with access to the internet',
      'No paid software required',
      'I\'ll walk you through, step-by-step how to get all the software installed and set up'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Front-End Web Development',
        lessons: [
          { id: 'l1', title: 'Introduction to HTML', duration: '12:34', type: 'video', isPreview: true },
          { id: 'l2', title: 'Intermediate HTML', duration: '18:45', type: 'video', isPreview: true },
          { id: 'l3', title: 'Introduction to CSS', duration: '22:18', type: 'video' },
          { id: 'l4', title: 'CSS Flexbox & Grid', duration: '28:56', type: 'video' },
          { id: 'l5', title: 'HTML & CSS Quiz', duration: '10 questions', type: 'quiz' }
        ]
      },
      {
        id: 's2',
        title: 'JavaScript Fundamentals',
        lessons: [
          { id: 'l6', title: 'Variables and Data Types', duration: '15:22', type: 'video' },
          { id: 'l7', title: 'Functions and Scope', duration: '19:45', type: 'video' },
          { id: 'l8', title: 'Arrays and Objects', duration: '24:33', type: 'video' },
          { id: 'l9', title: 'DOM Manipulation', duration: '31:12', type: 'video' },
          { id: 'l10', title: 'JavaScript Quiz', duration: '15 questions', type: 'quiz' }
        ]
      },
      {
        id: 's3',
        title: 'React - The Complete Guide',
        lessons: [
          { id: 'l11', title: 'React Basics', duration: '26:15', type: 'video' },
          { id: 'l12', title: 'Components & Props', duration: '22:48', type: 'video' },
          { id: 'l13', title: 'State & Hooks', duration: '35:20', type: 'video' },
          { id: 'l14', title: 'Building a React Project', duration: '45:30', type: 'video' }
        ]
      }
    ],
    reviews: [
      {
        id: 'r1',
        user: 'Sarah M.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 5,
        date: '2 weeks ago',
        comment: 'This course is absolutely amazing! Angela explains everything so clearly and the projects are really practical. I went from zero to building my own web apps!'
      },
      {
        id: 'r2',
        user: 'Michael K.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        rating: 5,
        date: '1 month ago',
        comment: 'Best investment I\'ve made in my career. The content is comprehensive and up-to-date. Landed a junior developer job after completing this course!'
      }
    ]
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: AI, Python & R',
    subtitle: 'Learn to create Machine Learning Algorithms in Python and R',
    instructor: {
      id: 'i2',
      name: 'Kirill Eremenko',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kirill',
      title: 'Data Science Expert'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
    price: 94.99,
    originalPrice: 189.99,
    rating: 4.5,
    reviewCount: 156890,
    studentCount: 765432,
    duration: '44 hours',
    level: 'Intermediate',
    category: 'Data Science',
    tags: ['Machine Learning', 'Python', 'AI', 'Data Science'],
    isTrending: true,
    isBestseller: true,
    lastUpdated: '01/2026',
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.',
    whatYouWillLearn: [
      'Master Machine Learning on Python & R',
      'Make accurate predictions',
      'Make powerful analysis',
      'Make robust Machine Learning models',
      'Create strong added value to your business',
      'Use Machine Learning for personal purpose'
    ],
    requirements: [
      'Just some high school mathematics level',
      'Basic Python & R coding knowledge is helpful but not required'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Data Preprocessing',
        lessons: [
          { id: 'l1', title: 'Welcome to the Course', duration: '5:23', type: 'video', isPreview: true },
          { id: 'l2', title: 'Get the Dataset', duration: '3:45', type: 'video' },
          { id: 'l3', title: 'Importing Libraries', duration: '8:12', type: 'video' },
          { id: 'l4', title: 'Missing Data', duration: '12:34', type: 'video' }
        ]
      },
      {
        id: 's2',
        title: 'Regression',
        lessons: [
          { id: 'l5', title: 'Simple Linear Regression', duration: '18:45', type: 'video' },
          { id: 'l6', title: 'Multiple Linear Regression', duration: '22:18', type: 'video' },
          { id: 'l7', title: 'Polynomial Regression', duration: '16:33', type: 'video' }
        ]
      }
    ],
    reviews: [
      {
        id: 'r1',
        user: 'David L.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Excellent course! The instructors break down complex concepts into easy-to-understand pieces.'
      }
    ]
  },
  {
    id: '3',
    title: 'The Complete Digital Marketing Course',
    subtitle: '12 Courses in 1: SEO, Social Media, Email, YouTube, Google Ads',
    instructor: {
      id: 'i3',
      name: 'Rob Percival',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rob',
      title: 'Marketing Expert & Entrepreneur'
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    price: 74.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 89234,
    studentCount: 423156,
    duration: '23 hours',
    level: 'All Levels',
    category: 'Marketing',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Marketing'],
    isBestseller: true,
    lastUpdated: '02/2026',
    description: 'Learn to market your business with social media marketing, SEO, YouTube, email, Facebook marketing, and analytics.',
    whatYouWillLearn: [
      'Set up a professional blog with WordPress',
      'Rank on the 1st page of Google for any keyword',
      'Grow an email list from 0 to 10,000+ subscribers',
      'Run profitable Facebook and Instagram ad campaigns',
      'Master YouTube SEO and grow a channel',
      'Track and analyze marketing performance'
    ],
    requirements: [
      'No prior marketing knowledge required',
      'Access to a computer and internet'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Market Research & Analysis',
        lessons: [
          { id: 'l1', title: 'Introduction to Digital Marketing', duration: '8:45', type: 'video', isPreview: true },
          { id: 'l2', title: 'Finding Your Target Audience', duration: '14:22', type: 'video' }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect',
    subtitle: 'Pass the AWS Solutions Architect Associate Exam',
    instructor: {
      id: 'i4',
      name: 'Stephane Maarek',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=stephane',
      title: 'AWS Certified Expert'
    },
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
    price: 89.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviewCount: 234567,
    studentCount: 654321,
    duration: '28 hours',
    level: 'Intermediate',
    category: 'Cloud Computing',
    tags: ['AWS', 'Cloud', 'DevOps', 'Certification'],
    isTrending: true,
    isSubscriptionOnly: true,
    lastUpdated: '02/2026',
    description: 'Learn AWS from an AWS Certified Solutions Architect & Developer Associate. Pass the exam!',
    whatYouWillLearn: [
      'Pass the AWS Certified Solutions Architect Associate Certification',
      'Understand the AWS ecosystem',
      'Learn about AWS services like EC2, S3, RDS, Lambda',
      'Design and deploy scalable cloud applications'
    ],
    requirements: [
      'Basic IT knowledge',
      'Some programming experience recommended'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'AWS Fundamentals',
        lessons: [
          { id: 'l1', title: 'AWS Overview', duration: '10:12', type: 'video', isPreview: true },
          { id: 'l2', title: 'IAM Basics', duration: '15:34', type: 'video', isLocked: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '5',
    title: 'iOS & Swift - Complete iOS App Development',
    subtitle: 'From Beginner to iOS App Developer with Just One Course',
    instructor: {
      id: 'i1',
      name: 'Dr. Angela Yu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angela',
      title: 'Lead Instructor, App Brewery'
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    price: 79.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewCount: 123456,
    studentCount: 456789,
    duration: '58 hours',
    level: 'Beginner',
    category: 'Mobile Development',
    tags: ['iOS', 'Swift', 'Mobile', 'App Development'],
    isBestseller: true,
    lastUpdated: '01/2026',
    description: 'Learn iOS app development from scratch. Build real apps using Swift and iOS 17.',
    whatYouWillLearn: [
      'Build iOS apps from scratch',
      'Master Swift programming',
      'Learn SwiftUI and UIKit',
      'Publish apps to the App Store'
    ],
    requirements: [
      'A Mac with macOS',
      'No programming experience needed'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Swift Fundamentals',
        lessons: [
          { id: 'l1', title: 'Introduction to Swift', duration: '12:45', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '6',
    title: 'Complete Python Developer in 2026',
    subtitle: 'Zero to Mastery: Learn Python, Build 12+ Projects',
    instructor: {
      id: 'i5',
      name: 'Andrei Neagoie',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=andrei',
      title: 'Senior Software Developer'
    },
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
    price: 84.99,
    originalPrice: 174.99,
    rating: 4.7,
    reviewCount: 98765,
    studentCount: 345678,
    duration: '31 hours',
    level: 'All Levels',
    category: 'Programming',
    tags: ['Python', 'Programming', 'Backend', 'Automation'],
    isTrending: true,
    lastUpdated: '02/2026',
    description: 'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications.',
    whatYouWillLearn: [
      'Master Python programming',
      'Build 12+ real-world Python projects',
      'Learn automation and scripting',
      'Work with databases and APIs'
    ],
    requirements: [
      'A computer with internet access',
      'No programming experience required'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Python Basics',
        lessons: [
          { id: 'l1', title: 'Python Fundamentals', duration: '15:30', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '7',
    title: 'Graphic Design Masterclass',
    subtitle: 'Learn Photoshop, Illustrator, Adobe XD & InDesign',
    instructor: {
      id: 'i6',
      name: 'Lindsay Marsh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lindsay',
      title: 'Design Professional'
    },
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    price: 69.99,
    originalPrice: 139.99,
    rating: 4.6,
    reviewCount: 67890,
    studentCount: 234567,
    duration: '19 hours',
    level: 'Beginner',
    category: 'Design',
    tags: ['Design', 'Photoshop', 'Illustrator', 'Graphics'],
    lastUpdated: '12/2025',
    description: 'Learn Graphic Design Theory and Practical Skills with the Adobe Creative Cloud.',
    whatYouWillLearn: [
      'Master Adobe Photoshop',
      'Master Adobe Illustrator',
      'Learn graphic design theory',
      'Create professional designs'
    ],
    requirements: [
      'Access to Adobe Creative Cloud',
      'A creative mind!'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Design Fundamentals',
        lessons: [
          { id: 'l1', title: 'Introduction to Design', duration: '11:20', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '8',
    title: 'Excel Skills for Business Specialization',
    subtitle: 'Master Excel from Beginner to Advanced',
    instructor: {
      id: 'i7',
      name: 'Kyle Pew',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kyle',
      title: 'Business Analytics Expert'
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    price: 59.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 54321,
    studentCount: 198765,
    duration: '18 hours',
    level: 'All Levels',
    category: 'Business',
    tags: ['Excel', 'Data Analysis', 'Business', 'Productivity'],
    lastUpdated: '01/2026',
    description: 'Master Excel formulas, functions, and advanced features to boost your productivity.',
    whatYouWillLearn: [
      'Master Excel formulas and functions',
      'Create professional dashboards',
      'Analyze data with PivotTables',
      'Automate tasks with macros'
    ],
    requirements: [
      'Microsoft Excel installed',
      'Basic computer skills'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Excel Basics',
        lessons: [
          { id: 'l1', title: 'Getting Started with Excel', duration: '9:15', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '9',
    title: 'Ethical Hacking & Penetration Testing',
    subtitle: 'Learn Cybersecurity from Scratch',
    instructor: {
      id: 'i8',
      name: 'Zaid Sabih',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zaid',
      title: 'Cybersecurity Expert'
    },
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    price: 94.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 76543,
    studentCount: 287654,
    duration: '15 hours',
    level: 'Intermediate',
    category: 'IT & Software',
    tags: ['Cybersecurity', 'Hacking', 'Security', 'Networking'],
    isTrending: true,
    lastUpdated: '02/2026',
    description: 'Learn ethical hacking and penetration testing from scratch with Kali Linux.',
    whatYouWillLearn: [
      'Learn ethical hacking techniques',
      'Master penetration testing',
      'Understand network security',
      'Use Kali Linux tools'
    ],
    requirements: [
      'Basic IT knowledge',
      'A computer with virtualization support'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Introduction to Ethical Hacking',
        lessons: [
          { id: 'l1', title: 'What is Ethical Hacking?', duration: '13:45', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '10',
    title: 'Photography Masterclass',
    subtitle: 'A Complete Guide to Photography',
    instructor: {
      id: 'i9',
      name: 'Phil Ebiner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phil',
      title: 'Professional Photographer'
    },
    thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop',
    price: 64.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 43210,
    studentCount: 156789,
    duration: '13 hours',
    level: 'Beginner',
    category: 'Photography',
    tags: ['Photography', 'Camera', 'Lightroom', 'Creative'],
    lastUpdated: '11/2025',
    description: 'Master photography - from beginner to expert level. Learn composition, lighting, and editing.',
    whatYouWillLearn: [
      'Master camera settings',
      'Understand composition',
      'Learn lighting techniques',
      'Edit photos professionally'
    ],
    requirements: [
      'A camera (DSLR, mirrorless, or smartphone)',
      'Passion for photography'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Photography Basics',
        lessons: [
          { id: 'l1', title: 'Camera Fundamentals', duration: '14:30', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '11',
    title: 'Blockchain & Cryptocurrency Course',
    subtitle: 'Build Blockchain Applications with Ethereum and Solidity',
    instructor: {
      id: 'i10',
      name: 'Stephen Grider',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=stephen',
      title: 'Blockchain Developer'
    },
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
    price: 99.99,
    originalPrice: 209.99,
    rating: 4.5,
    reviewCount: 32109,
    studentCount: 123456,
    duration: '24 hours',
    level: 'Advanced',
    category: 'Blockchain',
    tags: ['Blockchain', 'Cryptocurrency', 'Ethereum', 'Web3'],
    isTrending: true,
    isSubscriptionOnly: true,
    lastUpdated: '01/2026',
    description: 'Learn blockchain technology and build decentralized applications with Ethereum.',
    whatYouWillLearn: [
      'Understand blockchain technology',
      'Build smart contracts with Solidity',
      'Create decentralized apps (DApps)',
      'Work with Ethereum and Web3'
    ],
    requirements: [
      'JavaScript knowledge required',
      'Basic understanding of web development'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Blockchain Fundamentals',
        lessons: [
          { id: 'l1', title: 'What is Blockchain?', duration: '16:20', type: 'video', isPreview: true },
          { id: 'l2', title: 'Ethereum Basics', duration: '19:45', type: 'video', isLocked: true }
        ]
      }
    ],
    reviews: []
  },
  {
    id: '12',
    title: 'UI/UX Design Bootcamp',
    subtitle: 'Learn Figma, User Research, Wireframing & Prototyping',
    instructor: {
      id: 'i11',
      name: 'Daniel Scott',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniel',
      title: 'UX/UI Design Expert'
    },
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    price: 74.99,
    originalPrice: 154.99,
    rating: 4.7,
    reviewCount: 54321,
    studentCount: 198765,
    duration: '21 hours',
    level: 'Beginner',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Design', 'Prototyping'],
    isBestseller: true,
    lastUpdated: '02/2026',
    description: 'Master UI/UX design with Figma. Learn user research, wireframing, and create beautiful interfaces.',
    whatYouWillLearn: [
      'Master Figma design tool',
      'Conduct user research',
      'Create wireframes and prototypes',
      'Design responsive interfaces'
    ],
    requirements: [
      'No design experience needed',
      'A computer with internet access'
    ],
    curriculum: [
      {
        id: 's1',
        title: 'Design Thinking',
        lessons: [
          { id: 'l1', title: 'Introduction to UX Design', duration: '10:45', type: 'video', isPreview: true }
        ]
      }
    ],
    reviews: []
  }
];

export const categories = [
  { id: 'development', name: 'Development', icon: 'Code' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
  { id: 'design', name: 'Design', icon: 'Palette' },
  { id: 'marketing', name: 'Marketing', icon: 'Megaphone' },
  { id: 'data-science', name: 'Data Science', icon: 'BarChart' },
  { id: 'photography', name: 'Photography', icon: 'Camera' },
  { id: 'health', name: 'Health & Fitness', icon: 'Heart' },
  { id: 'music', name: 'Music', icon: 'Music' }
];
