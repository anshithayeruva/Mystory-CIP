export interface StudentInfo {
  id: string;
  name: string;
  rollNo: string;
  regNo: string;
  email: string;
  phone: string;
  program: string;
  department: string;
  semester: number;
  batch: string;
  cgpa: number;
  sgpa: number;
  overallAttendance: number;
  creditsEarned: number;
  creditsRegistered: number;
  classRank: string;
  academicStanding: string;
  advisorName: string;
  advisorEmail: string;
  address: string;
  emergencyContact: string;
}

export const STUDENT_INFO: StudentInfo = {
  id: "STU-2023-0184",
  name: "Nitya Nara",
  rollNo: "AP21110010184",
  regNo: "2023CSE0184",
  email: "nitya_nara@srmap.edu.in",
  phone: "+91 98765 43210",
  program: "B.Tech Computer Science & Engineering",
  department: "Computer Science and Engineering",
  semester: 6,
  batch: "2023 - 2027",
  cgpa: 8.95,
  sgpa: 9.12,
  overallAttendance: 92.4,
  creditsEarned: 112,
  creditsRegistered: 24,
  classRank: "8th of 180",
  academicStanding: "Dean's List - Excellent",
  advisorName: "Dr. Aris Thorne",
  advisorEmail: "aris.thorne@srmap.edu.in",
  address: "SRM AP Campus Hostel 4, Neerukonda, Mangalagiri, Andhra Pradesh 522502",
  emergencyContact: "Ramesh Nara (Father) - +91 98480 12345"
};

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  facultyEmail: string;
  officeHours: string;
  credits: number;
  attendance: number;
  currentGrade: string;
  progress: number;
  bannerColor: string;
  description: string;
  outcomes: string[];
}

export const STUDENT_COURSES: Course[] = [
  {
    id: "cs601",
    code: "CSE 301",
    name: "Advanced Data Structures & Algorithms",
    faculty: "Dr. Aris Thorne",
    facultyEmail: "aris.thorne@srmap.edu.in",
    officeHours: "Mon/Wed 3:00 PM - 5:00 PM",
    credits: 4,
    attendance: 94.5,
    currentGrade: "A+",
    progress: 78,
    bannerColor: "linear-gradient(135deg, #00522E 0%, #007A45 100%)",
    description: "Deep dive into dynamic programming, graph algorithms, segment trees, NP-completeness, and advanced algorithmic design patterns.",
    outcomes: [
      "Analyze time and space complexity using asymptotic notation",
      "Design optimal graph algorithms for network flow and shortest paths",
      "Implement advanced data structures including Red-Black and Fenwick trees"
    ]
  },
  {
    id: "cs602",
    code: "CSE 302",
    name: "Database Management Systems & Distributed Databases",
    faculty: "Dr. Sarah Jenkins",
    facultyEmail: "sarah.jenkins@srmap.edu.in",
    officeHours: "Tue/Thu 2:00 PM - 4:00 PM",
    credits: 4,
    attendance: 91.2,
    currentGrade: "A",
    progress: 72,
    bannerColor: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    description: "Relational algebra, SQL optimization, ACID transactions, B+ Tree indexing, NoSQL databases, and distributed consensus algorithms.",
    outcomes: [
      "Construct normalized BCNF relational schemas",
      "Optimize complex SQL queries using query execution plans",
      "Understand CAP theorem and distributed transaction protocols"
    ]
  },
  {
    id: "cs603",
    code: "CSE 303",
    name: "Operating Systems & System Programming",
    faculty: "Prof. Kevin Ellis",
    facultyEmail: "kevin.ellis@srmap.edu.in",
    officeHours: "Fri 10:00 AM - 12:00 PM",
    credits: 4,
    attendance: 88.0,
    currentGrade: "A-",
    progress: 65,
    bannerColor: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    description: "Process synchronization, deadlock avoidance, virtual memory paging, Linux kernel system calls, and file system architecture.",
    outcomes: [
      "Implement thread synchronization using semaphores and mutexes",
      "Analyze page replacement algorithms and TLB cache hit rates",
      "Write low-level POSIX C system utilities"
    ]
  },
  {
    id: "cs604",
    code: "CSE 304",
    name: "Computer Networks & Security",
    faculty: "Dr. Lisa Muller",
    facultyEmail: "lisa.muller@srmap.edu.in",
    officeHours: "Wed 11:00 AM - 1:00 PM",
    credits: 4,
    attendance: 96.0,
    currentGrade: "A+",
    progress: 82,
    bannerColor: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    description: "TCP/IP architecture, BGP routing, congestion control protocols, TLS cryptography, network firewalls, and socket programming.",
    outcomes: [
      "Master network packet analysis using Wireshark",
      "Implement multi-threaded client-server sockets in C/Python",
      "Understand public key infrastructure (PKI) and SSL/TLS handshakes"
    ]
  },
  {
    id: "cs605",
    code: "CSE 305",
    name: "Machine Learning & Statistical Pattern Recognition",
    faculty: "Dr. Robert Vance",
    facultyEmail: "robert.vance@srmap.edu.in",
    officeHours: "Mon/Thu 4:00 PM - 5:30 PM",
    credits: 4,
    attendance: 86.4,
    currentGrade: "B+",
    progress: 60,
    bannerColor: "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)",
    description: "Supervised and unsupervised learning, gradient descent algorithms, SVMs, neural networks, cross-validation, and model evaluation metrics.",
    outcomes: [
      "Build regression and classification models using scikit-learn",
      "Tune hyperparameters using grid search and cross-validation",
      "Implement backpropagation from scratch"
    ]
  },
  {
    id: "cs606",
    code: "CSE 306",
    name: "Software Engineering & Agile Methodologies",
    faculty: "Prof. Anita Desai",
    facultyEmail: "anita.desai@srmap.edu.in",
    officeHours: "Tue 3:00 PM - 5:00 PM",
    credits: 4,
    attendance: 93.0,
    currentGrade: "A",
    progress: 80,
    bannerColor: "linear-gradient(135deg, #9a3412 0%, #f97316 100%)",
    description: "Agile Scrum frameworks, UML design diagrams, CI/CD pipelines, automated testing, design patterns, and software architecture.",
    outcomes: [
      "Execute Sprint cycles using Agile tools",
      "Apply SOLID design principles in software construction",
      "Configure automated GitHub Actions CI/CD workflows"
    ]
  }
];

export interface ScheduleClass {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  room: string;
  time: string;
  type: "Lecture" | "Lab" | "Tutorial";
  status: "COMPLETED" | "LIVE" | "UPCOMING";
  pulseSessionId?: string;
}

export const TODAY_CLASSES: ScheduleClass[] = [
  {
    id: "tc-1",
    courseCode: "CSE 301",
    courseName: "Advanced Data Structures & Algorithms",
    faculty: "Dr. Aris Thorne",
    room: "AB2 - Hall 301",
    time: "09:00 AM - 10:30 AM",
    type: "Lecture",
    status: "COMPLETED"
  },
  {
    id: "tc-2",
    courseCode: "CSE 302",
    courseName: "Database Management Systems",
    faculty: "Dr. Sarah Jenkins",
    room: "AB2 - Hall 405",
    time: "10:45 AM - 12:15 PM",
    type: "Lecture",
    status: "LIVE",
    pulseSessionId: "pulse-live-1"
  },
  {
    id: "tc-3",
    courseCode: "CSE 304",
    courseName: "Computer Networks Lab",
    faculty: "Dr. Lisa Muller",
    room: "CS Lab 3",
    time: "02:00 PM - 04:00 PM",
    type: "Lab",
    status: "UPCOMING"
  },
  {
    id: "tc-4",
    courseCode: "CSE 305",
    courseName: "Machine Learning Tutorial",
    faculty: "Dr. Robert Vance",
    room: "AB1 - Room 204",
    time: "04:15 PM - 05:15 PM",
    type: "Tutorial",
    status: "UPCOMING"
  }
];

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  dueDate: string;
  dueTime: string;
  daysRemaining: number;
  maxMarks: number;
  obtainedMarks?: number;
  status: "PENDING" | "SUBMITTED" | "OVERDUE" | "GRADED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  instructions: string;
  feedback?: string;
  submissionDate?: string;
  fileAttachment?: string;
}

export const STUDENT_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-1",
    title: "Graph Traversal & Shortest Path Implementation",
    courseCode: "CSE 301",
    courseName: "Advanced Data Structures",
    faculty: "Dr. Aris Thorne",
    dueDate: "2026-08-02",
    dueTime: "11:59 PM",
    daysRemaining: 2,
    maxMarks: 100,
    status: "PENDING",
    priority: "HIGH",
    instructions: "Implement Dijkstra's and A* search algorithms in C++ or Python. Include benchmark comparisons with sparse and dense graphs."
  },
  {
    id: "asg-2",
    title: "SQL Query Optimization & B+ Tree Indexing Report",
    courseCode: "CSE 302",
    courseName: "Database Management Systems",
    faculty: "Dr. Sarah Jenkins",
    dueDate: "2026-08-05",
    dueTime: "05:00 PM",
    daysRemaining: 5,
    maxMarks: 50,
    status: "PENDING",
    priority: "MEDIUM",
    instructions: "Analyze query execution plans for 5 complex JOIN queries using EXPLAIN ANALYZE in PostgreSQL."
  },
  {
    id: "asg-3",
    title: "POSIX Threads & Mutex Lock Simulation",
    courseCode: "CSE 303",
    courseName: "Operating Systems",
    faculty: "Prof. Kevin Ellis",
    dueDate: "2026-07-28",
    dueTime: "11:59 PM",
    daysRemaining: 0,
    maxMarks: 100,
    obtainedMarks: 94,
    status: "GRADED",
    priority: "MEDIUM",
    instructions: "Solve the Readers-Writers synchronization problem using pthread mutex locks in C.",
    feedback: "Excellent thread safety logic and clean error handling. Good output documentation.",
    submissionDate: "2026-07-27 10:14 PM",
    fileAttachment: "nitya_pthreads_submission.zip"
  },
  {
    id: "asg-4",
    title: "Packet Sniffer & TCP Handshake Analysis",
    courseCode: "CSE 304",
    courseName: "Computer Networks",
    faculty: "Dr. Lisa Muller",
    dueDate: "2026-07-25",
    dueTime: "11:59 PM",
    daysRemaining: 0,
    maxMarks: 75,
    obtainedMarks: 71,
    status: "GRADED",
    priority: "LOW",
    instructions: "Capture Wireshark trace for HTTP vs HTTPS traffic and explain TLS handshake keys.",
    feedback: "Thorough capture analysis. Missing 1 detail on Diffie-Hellman key exchange.",
    submissionDate: "2026-07-24 09:30 PM",
    fileAttachment: "wireshark_analysis_nitya.pdf"
  },
  {
    id: "asg-5",
    title: "Linear & Logistic Regression from Scratch",
    courseCode: "CSE 305",
    courseName: "Machine Learning",
    faculty: "Dr. Robert Vance",
    dueDate: "2026-07-30",
    dueTime: "11:59 PM",
    daysRemaining: 0,
    maxMarks: 100,
    status: "SUBMITTED",
    priority: "HIGH",
    instructions: "Implement Gradient Descent optimization for logistic regression using pure NumPy without sklearn.",
    submissionDate: "2026-07-30 08:45 PM",
    fileAttachment: "logistic_regression_numpy.ipynb"
  }
];

export interface Announcement {
  id: string;
  title: string;
  category: "University" | "Department" | "Course" | "Scholarships" | "Placements" | "Events";
  author: string;
  date: string;
  isUnread: boolean;
  isPinned: boolean;
  content: string;
}

export const STUDENT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Mid-Semester Examination Schedule - Fall 2026",
    category: "University",
    author: "Controller of Examinations",
    date: "July 30, 2026",
    isUnread: true,
    isPinned: true,
    content: "The official timetable for Fall 2026 Mid-Semester Examinations has been published. Exams commence on August 18, 2026. Hall tickets will be available for download 5 days prior."
  },
  {
    id: "ann-2",
    title: "Campus Placement Drive: Google & Microsoft Internship 2027",
    category: "Placements",
    author: "Career Development Centre",
    date: "July 29, 2026",
    isUnread: true,
    isPinned: true,
    content: "Applications are open for 3rd year CSE students for Summer 2027 Software Engineering Internships. Minimum CGPA requirement: 8.0. Deadline to apply: August 10, 2026."
  },
  {
    id: "ann-3",
    title: "CSE 301 - Extra Problem Solving Session Scheduled",
    category: "Course",
    author: "Dr. Aris Thorne",
    date: "July 28, 2026",
    isUnread: false,
    isPinned: false,
    content: "We will hold an optional review session on Dynamic Programming on Friday at 5:00 PM in Lab 301. Practice problem set is uploaded to the resources tab."
  },
  {
    id: "ann-4",
    title: "Annual Hackathon 'HackCIP 2026' Registration Open",
    category: "Events",
    author: "SRM ACM Student Chapter",
    date: "July 27, 2026",
    isUnread: false,
    isPinned: false,
    content: "36-hour hackathon with prize pool of INR 2,50,000. Registration is free for all SRM AP students. Form teams of 2 to 4."
  }
];

export interface PulseSession {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  startTime: string;
  duration: string;
  studentsPresent: number;
  totalStudents: number;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  topic: string;
  recordingUrl?: string;
  aiSummary?: string;
  keyConcepts?: string[];
}

export const LIVE_PULSE_SESSIONS: PulseSession[] = [
  {
    id: "pulse-1",
    courseCode: "CSE 302",
    courseName: "Database Management Systems",
    faculty: "Dr. Sarah Jenkins",
    startTime: "10:45 AM",
    duration: "90 min",
    studentsPresent: 54,
    totalStudents: 60,
    status: "LIVE",
    topic: "B+ Tree Index Insertion & Deletion Algorithms",
    aiSummary: "The session covers B+ tree structure, node splitting during overflow, and merging during underflow. Dr. Jenkins demonstrated manual trace of 3-level tree index.",
    keyConcepts: ["B+ Tree Node Split", "Internal vs Leaf Nodes", "Disk I/O Reduction"]
  },
  {
    id: "pulse-2",
    courseCode: "CSE 301",
    courseName: "Advanced Data Structures",
    faculty: "Dr. Aris Thorne",
    startTime: "July 30, 2026",
    duration: "90 min",
    studentsPresent: 58,
    totalStudents: 60,
    status: "COMPLETED",
    topic: "Dynamic Programming: Matrix Chain Multiplication",
    recordingUrl: "#",
    aiSummary: "Dr. Thorne derived the recurrence relation for Matrix Chain Multiplication, step-by-step table filling, and parenthesization reconstruction algorithm.",
    keyConcepts: ["Optimal Substructure", "Overlapping Subproblems", "MCM Cost Matrix"]
  },
  {
    id: "pulse-3",
    courseCode: "CSE 304",
    courseName: "Computer Networks",
    faculty: "Dr. Lisa Muller",
    startTime: "July 29, 2026",
    duration: "90 min",
    studentsPresent: 57,
    totalStudents: 60,
    status: "COMPLETED",
    topic: "TCP Congestion Control: Slow Start & Fast Recovery",
    recordingUrl: "#",
    aiSummary: "Comprehensive overview of TCP Tahoe vs Reno congestion window adjustment logic during packet loss events.",
    keyConcepts: ["Congestion Window (cwnd)", "Slow Start Threshold (ssthresh)", "Fast Retransmit"]
  }
];

export interface LearningResource {
  id: string;
  title: string;
  courseCode: string;
  faculty: string;
  fileType: "PDF" | "PPTX" | "MP4" | "ZIP" | "DOCX";
  category: "Slides" | "Notes" | "Books" | "Papers" | "Manuals" | "Past Papers";
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  isBookmarked: boolean;
}

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: "res-1",
    title: "Graph Algorithms Complete Lecture Notes (Ch 1-6)",
    courseCode: "CSE 301",
    faculty: "Dr. Aris Thorne",
    fileType: "PDF",
    category: "Notes",
    fileSize: "8.4 MB",
    uploadDate: "July 25, 2026",
    downloadCount: 142,
    isBookmarked: true
  },
  {
    id: "res-2",
    title: "SQL Query Tuning & Indexing Presentation Deck",
    courseCode: "CSE 302",
    faculty: "Dr. Sarah Jenkins",
    fileType: "PPTX",
    category: "Slides",
    fileSize: "14.2 MB",
    uploadDate: "July 22, 2026",
    downloadCount: 98,
    isBookmarked: false
  },
  {
    id: "res-3",
    title: "Linux Kernel Process Management Reference Guide",
    courseCode: "CSE 303",
    faculty: "Prof. Kevin Ellis",
    fileType: "PDF",
    category: "Books",
    fileSize: "22.1 MB",
    uploadDate: "July 18, 2026",
    downloadCount: 210,
    isBookmarked: true
  },
  {
    id: "res-4",
    title: "Computer Networks Lab Manual - Wireshark Experiments",
    courseCode: "CSE 304",
    faculty: "Dr. Lisa Muller",
    fileType: "PDF",
    category: "Manuals",
    fileSize: "4.5 MB",
    uploadDate: "July 15, 2026",
    downloadCount: 180,
    isBookmarked: false
  },
  {
    id: "res-5",
    title: "Previous Year Mid-Semester Question Papers (2023-2025)",
    courseCode: "CSE 301",
    faculty: "Department Office",
    fileType: "ZIP",
    category: "Past Papers",
    fileSize: "18.6 MB",
    uploadDate: "July 10, 2026",
    downloadCount: 340,
    isBookmarked: true
  }
];

export interface MessageThread {
  id: string;
  name: string;
  role: string;
  avatar: string;
  unreadCount: number;
  isOnline: boolean;
  lastMessage: string;
  lastTime: string;
  type: "Faculty" | "Class" | "Group";
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: "msg-1",
    name: "Dr. Aris Thorne",
    role: "Faculty Advisor & CSE 301 Lead",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Aris%20Thorne&backgroundColor=00522E&textColor=ffffff",
    unreadCount: 2,
    isOnline: true,
    lastMessage: "Your Dijkstra analysis looks solid. Please check the review feedback on assignment 3.",
    lastTime: "10:15 AM",
    type: "Faculty"
  },
  {
    id: "msg-2",
    name: "CSE 2023 Batch Official",
    role: "Department Announcement Group",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CSE%20Batch&backgroundColor=1e3a8a&textColor=ffffff",
    unreadCount: 5,
    isOnline: true,
    lastMessage: "CR Note: Tomorrow's DBMS lab is shifted to Computer Lab 4.",
    lastTime: "09:40 AM",
    type: "Class"
  },
  {
    id: "msg-3",
    name: "DBMS Capstone Project Group 4",
    role: "Nitya, Rohan, Sneha, Vikram",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Project%20Group&backgroundColor=4c1d95&textColor=ffffff",
    unreadCount: 0,
    isOnline: false,
    lastMessage: "Rohan: I have committed the BCNF schema migration scripts to GitHub.",
    lastTime: "Yesterday",
    type: "Group"
  }
];
