export type Category =
'Tadbirlar' |
"E'lonlar" |
'Sport' |
'Stipendiyalar' |
'Talabalar hayoti' |
'Maqola';

export const CATEGORIES: Category[] = [
'Tadbirlar',
"E'lonlar",
'Sport',
'Stipendiyalar',
'Talabalar hayoti',
'Maqola'];


export interface ArticleTranslation {
  title: string;
  description: string;
  content: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  imageUrl: string;
  author: string;
  date: string;
  views: number;
  isDraft: boolean;
  translations?: {
    en?: ArticleTranslation;
    ru?: ArticleTranslation;
  };
}

export const INITIAL_NEWS: NewsArticle[] = [
{
  id: '1',
  title: 'University Launches New AI Research Center',
  description:
  'A state-of-the-art facility dedicated to artificial intelligence research opens its doors to students and faculty.',
  content:
  'The university is proud to announce the opening of the new AI Research Center. This facility will provide students and faculty with access to cutting-edge technology and resources to advance the field of artificial intelligence. The center features high-performance computing clusters, collaborative workspaces, and a dedicated team of researchers. "This is a major milestone for our university," said the President. "We are committed to preparing our students for the future of technology."',
  category: 'Tadbirlar',
  imageUrl: 'https://picsum.photos/800/400?random=1',
  author: 'Dr. Sarah Smith',
  date: '2023-10-15',
  views: 0,
  isDraft: false
},
{
  id: '2',
  title: 'Fall Semester Scholarship Applications Open',
  description:
  'Students can now apply for various merit-based and need-based scholarships for the upcoming semester.',
  content:
  'Applications for the Fall Semester scholarships are now open. The university offers a wide range of scholarships to support students in their academic journey. From merit-based awards for high achievers to need-based grants for those facing financial hardship, there is an opportunity for everyone. Students are encouraged to review the eligibility criteria and submit their applications before the deadline on November 30th. Visit the financial aid office for more details.',
  category: 'Stipendiyalar',
  imageUrl: 'https://picsum.photos/800/400?random=2',
  author: 'Financial Aid Office',
  date: '2023-10-18',
  views: 0,
  isDraft: false
},
{
  id: '3',
  title: 'Varsity Basketball Team Wins Regional Championship',
  description:
  'In a thrilling final match, our university team secured victory against their long-time rivals.',
  content:
  'The university varsity basketball team has done it again! In a nail-biting final against State College, our team emerged victorious with a score of 89-86. The game was intense from start to finish, with both teams displaying exceptional skill and sportsmanship. "I am incredibly proud of the team," said Coach Johnson. "They worked hard all season for this moment." The victory parade will be held on campus this Friday.',
  category: 'Sport',
  imageUrl: 'https://picsum.photos/800/400?random=3',
  author: 'Sports Desk',
  date: '2023-10-20',
  views: 0,
  isDraft: false
},
{
  id: '4',
  title: 'Campus Library Extends Hours for Finals Week',
  description:
  'To support students during exams, the main library will remain open 24/7 starting next Monday.',
  content:
  'As finals week approaches, the university library is extending its hours to accommodate students\' study schedules. Starting next Monday, the main library will be open 24 hours a day, 7 days a week. Additional study spaces have been opened in the student center as well. "We want to ensure students have a quiet and safe place to prepare for their exams," said the Head Librarian. Free coffee and snacks will be provided at midnight during the extended hours.',
  category: "E'lonlar",
  imageUrl: 'https://picsum.photos/800/400?random=4',
  author: 'Library Administration',
  date: '2023-10-22',
  views: 0,
  isDraft: false
},
{
  id: '5',
  title: 'Annual Cultural Festival Set for Next Weekend',
  description:
  'Join us for a celebration of diversity with food, music, and performances from around the world.',
  content:
  'Get ready for the biggest event of the year! The Annual Cultural Festival is back, promising a weekend filled with vibrant performances, delicious food, and cultural exchange. Student organizations from over 50 countries will be showcasing their traditions. The event will kick off with a parade on Saturday morning and conclude with a concert on Sunday night. Everyone is welcome to attend and celebrate the rich diversity of our campus community.',
  category: 'Talabalar hayoti',
  imageUrl: 'https://picsum.photos/800/400?random=5',
  author: 'Student Council',
  date: '2023-10-25',
  views: 0,
  isDraft: false
},
{
  id: '6',
  title: 'New Dormitory Complex Construction Begins',
  description:
  'Groundbreaking ceremony held for the new eco-friendly student housing project.',
  content:
  'Construction has officially begun on the new dormitory complex, which aims to provide modern, eco-friendly housing for over 500 students. The building will feature solar panels, rainwater harvesting systems, and energy-efficient appliances. "Sustainability is a core value of our university," said the Director of Facilities. The project is expected to be completed by the Fall 2025 semester.',
  category: "E'lonlar",
  imageUrl: 'https://picsum.photos/800/400?random=6',
  author: 'Campus News',
  date: '2023-10-28',
  views: 0,
  isDraft: false
},
{
  id: '7',
  title: 'Guest Lecture: The Future of Space Exploration',
  description:
  'Renowned astronaut Dr. Emily Chen to speak at the Science Auditorium this Thursday.',
  content:
  "Don't miss the opportunity to hear from Dr. Emily Chen, a veteran astronaut who has spent over 200 days in space. She will be discussing the future of space exploration, including the upcoming missions to Mars. The lecture will take place in the Science Auditorium at 4:00 PM this Thursday. A Q&A session will follow the presentation. Seats are limited, so arrive early!",
  category: 'Tadbirlar',
  imageUrl: 'https://picsum.photos/800/400?random=7',
  author: 'Physics Department',
  date: '2023-11-01',
  views: 0,
  isDraft: false
},
{
  id: '8',
  title: 'University Football Team Qualifies for Nationals',
  description:
  'After a perfect season, the team is heading to the national championship.',
  content:
  'The university football team has secured their spot in the national championship after a stunning victory in the playoffs. The team remains undefeated this season, a feat not achieved in over a decade. Fans are ecstatic, and plans are underway for a massive tailgate party before the big game. "We are ready," said the team captain. "We are bringing the trophy home."',
  category: 'Sport',
  imageUrl: 'https://picsum.photos/800/400?random=8',
  author: 'Sports Desk',
  date: '2023-11-05',
  views: 0,
  isDraft: false
},
{
  id: '9',
  title: 'Student Art Exhibition Opens in Gallery A',
  description:
  'Showcasing the best works from the Fine Arts department seniors.',
  content:
  'The annual Senior Art Exhibition is now open in Gallery A. The exhibition features a diverse range of mediums, including painting, sculpture, digital art, and photography. "The talent this year is exceptional," said the Dean of Arts. The gallery is open to the public from 10:00 AM to 6:00 PM daily. Admission is free.',
  category: 'Talabalar hayoti',
  imageUrl: 'https://picsum.photos/800/400?random=9',
  author: 'Arts Department',
  date: '2023-11-08',
  views: 0,
  isDraft: false
},
{
  id: '10',
  title: 'Important Update on Campus Parking Regulations',
  description:
  'New zoning rules and digital permits to be implemented next month.',
  content:
  'The university is implementing a new parking management system to improve traffic flow and availability. Starting next month, all parking permits will be digital, and new zoning rules will be enforced. Students and staff are advised to update their vehicle information in the online portal. "These changes will make parking easier and more efficient for everyone," said the Parking Services Manager.',
  category: "E'lonlar",
  imageUrl: 'https://picsum.photos/800/400?random=10',
  author: 'Administration',
  date: '2023-11-10',
  views: 0,
  isDraft: false
},
{
  id: '11',
  title: 'Draft: Upcoming Science Fair',
  description: 'Internal draft for the science fair announcement.',
  content:
  'Details to be confirmed. Need to check with the biology department about the venue.',
  category: 'Tadbirlar',
  imageUrl: 'https://picsum.photos/800/400?random=11',
  author: 'Admin',
  date: '2023-11-12',
  views: 0,
  isDraft: true
}];
