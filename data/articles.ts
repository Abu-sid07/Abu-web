import { Article } from '../types/article';

// Contextual, copyright-safe image tags are used for the media arrays.
export const articlesData: { sections: Article[] } = {
  sections: [
    {
      id: 1,
      title: 'My College Days (2021–2024)',
      author: 'Abu',
      date: 'Novemebr 2024',
      read_time: '5 min read',
      views: 350,
      institution: 'Sadakathullah Appa College',
      course: 'BCA',
      duration: '2021 to 2024',
      summary: 'I pursued my BCA at Sadakathullah Appa College from 2021 to 2024. College life was full of learning, fun, and unforgettable memories.',
      content_points: [
        { 
          heading: '🌱 The Beginning', 
          description: 'The first day was a mix of excitement and nervousness. Meeting new friends, exploring the campus, and imagining the next three years made me both anxious and thrilled.', 
          media: ['Campus view of Sadakathullah Appa College in Tirunelveli'] 
        },
        { 
          heading: '💻 Learning and Growing', 
          description: 'The BCA course taught me coding, teamwork, and problem-solving. From late-night assignments to final-year projects, every challenge strengthened my skills. That feeling when your code finally runs successfully? Unmatched!', 
          media: ['Students coding in a computer lab'] 
        },
        { 
          heading: '🤝 Friendship and Fun', 
          description: 'College was also about friendships — group studies, cultural events, and laughter-filled moments. These relationships made college life vibrant and memorable.', 
          media: ['Group photo of college friends laughing together'] 
        },
        { 
          heading: '🎉 Graduation Day', 
          description: 'Receiving my degree certificate in the graduation ceremony was a proud moment, marking the end of an important chapter and the beginning of my next journey.', 
          media: ['Graduation ceremony with students wearing gowns'] 
        },
      ],
      note: 'These three years gave me memories that will stay with me forever.',
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