import { Article } from '../types/article';

// Contextual, copyright-safe image tags are used for the media arrays.
export const articlesData: { sections: Article[] } = {
  sections: [
   {
  id: 1,
  title: 'Three Years That Changed Everything',
  author: 'Abu',
  date: 'November 2024',
  read_time: '5 min read',
  views: 350,
  institution: 'Sadakathullah Appa College',
  course: 'BCA',
  duration: '2021 to 2024',
  summary: 'I walked into Sadakathullah Appa College not knowing who I\'d become. Here\'s what I left with — and why those 1,095 days were worth every sleepless night.',
  content_points: [
    {
      heading: '🌱 The Day Everything Felt Possible',
      description: 'I still remember standing at the college gate on day one — backpack too heavy, directions unclear, heart pounding. The campus stretched out like a world I hadn\'t earned yet. New faces everywhere. New rules. New version of me. The mix of terror and excitement was something I\'d never felt before. That first walk across the grounds wasn\'t just orientation — it was the quiet beginning of the best three years of my life.',
      media: ['Campus view of Sadakathullah Appa College in Tirunelveli']
    },
    {
      heading: '💻 When the Screen Finally Made Sense',
      description: 'Nobody tells you how satisfying it is when broken code suddenly works at 2 AM. The BCA curriculum wasn\'t gentle — late submissions, semester crunch, logic errors that made no sense — but every grind built something real. I wasn\'t just learning to code. I was learning how to think. By third year, problems that once paralysed me became puzzles I actually enjoyed.',
      media: ['Students deep in a coding lab session']
    },
    {
      heading: '🤝 The People Who Made It Unforgettable',
      description: 'Here\'s what the syllabus never taught: friendship is its own kind of curriculum. Group studies that turned into midnight snack runs. Cultural fest rehearsals that went completely off-script. The inside jokes that still land over WhatsApp today. The friends I found in those corridors showed me how much easier life is when you have people who genuinely get you.',
      media: ['The gang — a candid group photo full of laughter']
    },
    {
      heading: '🎓 The Moment I Realised It Was Over',
      description: 'Walking across that stage to collect my degree, I expected to feel triumphant. Instead, I felt something quieter — a kind of grateful ache. Three years in one handshake. The hard nights, the exams, the friendships, the growth — all of it folded into a single certificate and a photograph. College didn\'t just give me a BCA. It gave me a blueprint for who I want to be.',
      media: ['Graduation day — gowns, grins, and something bittersweet']
    }
  ],
  note: 'Some chapters don\'t end — they just become the foundation everything else is built on. Sadakathullah Appa College is mine.',
},
    {
      id: 2,
      title: 'Teaching Arabic & Islamic Lessons (My Morning Routine)',
      author: 'Abu',
      date: '28 Dec 2024',
      read_time: '5 min read',
      views: 203,
      teaching_schedule: 'Every morning from 6 AM to 7 AM',
      summary: 'I started teaching Arabic every morning from 6 AM to 7 AM during my college days, and I continue to teach it part-time even now. Teaching has always been my way of sharing knowledge and connecting with students.',
      content_points: [
        { 
          heading: '📖 Teaching and Learning', 
          details: 'Teaching Arabic goes far beyond the language itself — it includes:', 
          lessons: [
            'How to read the Quran correctly', 
            'Life lessons from Prophet Muhammad (SAW)', 
            'Facing problems with patience and kindness', 
            'Understanding Islamic teachings for everyday life'
          ], 
          media: ['An open Quran and Islamic prayer beads'] 
        },
        { 
          heading: '🌟 Life Lessons', 
          details: 'Teaching has shaped my mindset in ways I never expected. It has taught me many important values:', 
          values: [
            'The importance of consistency and discipline', 
            'Sharing knowledge strengthens your own understanding', 
            'Patience, kindness, and humility are essential in both teaching and life'
          ], 
          media: ['A peaceful morning setting with sunlight'] 
        },
      ],
    },
    {
      id: 3,
      title: 'My First Job: Work Visa Executer at Hameed Air Travels',
      author: 'Abu',
      date: '10 Nov 2024',
      read_time: '6 min read',
      views: 483,
      role: 'Work Visa Executer',
      company: 'Hameed Air Travels, Chennai',
      duration: 'Aug 2024 – July 2025',
      summary: 'After college and improving my skills, I joined Hameed Air Travels in Chennai as a Work Visa Executer. This role bridged the gap between student life and professional life.',
      content_points: [
        { 
          heading: '📝 Learning on the Job', 
          description: 'I assisted clients in visa processing, prepared documents, and ensured applications met government requirements. Accuracy and attention to detail were essential.', 
          media: ['Desk with travel documents and visa forms'] 
        },
        { 
          heading: '🤝 Client Interaction', 
          description: 'Interacting with clients taught me the value of clear and polite communication, patience, and professionalism. Every successful visa was a small victory.',
          media: ['Professional illustration of client service and consulting']
        },
        { 
          heading: '🌟 Skills I Gained', 
          skills: [
            'Organizational and documentation skills', 
            'Problem-solving under pressure', 
            'Client handling and communication', 
            'Knowledge of visa rules and international travel'
          ],
          media: ['Icons representing professional skills like organization and communication']
        },
      ],
      note: 'This job taught me responsibility, accuracy, and confidence. It was a memorable first step into my professional world.',
    },
    {
      id: 4,
      title: 'Learning English at Al Amanath English Academy (Every Night)',
      author: 'Abu',
      date: '5 Oct 2024',
      read_time: '4 min read',
      views: 780,
      institution: 'Al Amanath English Academy',
      summary: 'I joined Al Amanath English Academy to improve my spoken English. This experience transformed my confidence and communication skills.',
      content_points: [
        { 
          heading: '💬 Overcoming Nervousness', 
          description: 'Every day, I spoke for 2–3 minutes on different topics in front of the class. At first, my voice shook and I was scared, but gradually, with guidance, I became more confident. Today, I can speak fluently and clearly.', 
          media: ['Student giving a presentation in a classroom'] 
        },
        { 
          heading: '🌟 Skills I Gained', 
          skills: [
            'Fluent spoken English', 
            'Confidence in public speaking', 
            'Ability to express thoughts clearly', 
            'Overcoming nervousness and self-doubt'
          ], 
          media: ['A visual of a person speaking confidently at a podium'] 
        },
      ],
      note: 'This academy helped me unlock my potential and prepared me for professional communication.',
    },
  ],
};