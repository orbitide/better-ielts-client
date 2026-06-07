import type { CommunityThread, CommunityReply } from '@/lib/types/community'

export const communityThreads: CommunityThread[] = [
  {
    id: '1',
    category: 'Strategy',
    title: 'How I improved my Writing band from 5.5 to 7.0 in 8 weeks',
    excerpt: 'I want to share the exact approach that helped me improve my Writing score significantly. The key was understanding the marking criteria deeply and writing 2 full tasks every day...',
    author: 'Sarah K.', authorInitials: 'SK', targetBand: 7.5, daysAgo: 2,
    likes: 142, replies: 38, isPinned: true,
  },
  {
    id: '2',
    category: 'Reading',
    title: 'TFNG vs. True/False — how to tell the difference quickly',
    excerpt: 'Many test-takers confuse TRUE with NOT GIVEN. Here is a simple decision tree I developed that has helped my students...',
    author: 'Omar F.', authorInitials: 'OF', targetBand: 8.0, daysAgo: 4,
    likes: 89, replies: 22, isPinned: false,
  },
  {
    id: '3',
    category: 'Speaking',
    title: 'Part 2 cue card practice thread — post your recordings!',
    excerpt: "I thought it would be helpful to start a thread where we can all practise Part 2 together. I'll go first with the topic \"Describe a time you helped someone\"...",
    author: 'Ji-won L.', authorInitials: 'JL', targetBand: 7.0, daysAgo: 1,
    likes: 67, replies: 54, isPinned: false,
  },
  {
    id: '4',
    category: 'Vocabulary',
    title: 'Academic word list — which words actually appear in IELTS?',
    excerpt: 'I analysed 50 past IELTS Academic tests and tracked which AWL words appeared most frequently. Here are the top 100 words you absolutely must know...',
    author: 'Priya M.', authorInitials: 'PM', targetBand: 8.0, daysAgo: 6,
    likes: 203, replies: 41, isPinned: true,
  },
  {
    id: '5',
    category: 'Listening',
    title: 'Section 4 monologue — tips for note-taking under pressure',
    excerpt: "Section 4 is the hardest because it's academic and you can't hear it twice. My strategy: predict the answers before the recording starts using the question stems...",
    author: 'Ahmed R.', authorInitials: 'AR', targetBand: 7.5, daysAgo: 3,
    likes: 78, replies: 17, isPinned: false,
  },
  {
    id: '6',
    category: 'Mock Test',
    title: 'Weekly mock test debrief — share your scores and strategies',
    excerpt: "Every Sunday I'll post a debrief thread for people who took the weekly mock test. Share your estimated band, what went well, and what you are working on...",
    author: 'Better IELTS Team', authorInitials: 'BI', targetBand: 9.0, daysAgo: 0,
    likes: 45, replies: 89, isPinned: false,
  },
]

export const communityReplies: CommunityReply[] = [
  // Thread 1 — Strategy
  { id: 'r1-1', threadId: '1', author: 'Alex T.', authorInitials: 'AT', targetBand: 7.0, content: 'This is incredibly helpful! Could you share which task types you practised most — Task 1 or Task 2?', daysAgo: 1, likes: 12 },
  { id: 'r1-2', threadId: '1', author: 'Mei L.', authorInitials: 'ML', targetBand: 6.5, content: 'I tried a similar approach for Reading and it worked well. The key is consistency every single day.', daysAgo: 2, likes: 7 },
  { id: 'r1-3', threadId: '1', author: 'Deepak S.', authorInitials: 'DS', targetBand: 7.5, content: 'Did you get feedback from a tutor or use AI tools to assess your writing? I find it hard to judge my own work objectively.', daysAgo: 2, likes: 5 },

  // Thread 2 — Reading
  { id: 'r2-1', threadId: '2', author: 'Lena K.', authorInitials: 'LK', targetBand: 7.0, content: 'The decision tree idea is genius. I always second-guess NOT GIVEN — this makes it so much cleaner.', daysAgo: 3, likes: 18 },
  { id: 'r2-2', threadId: '2', author: 'Yusuf B.', authorInitials: 'YB', targetBand: 6.5, content: 'Could you share the decision tree as an image? Hard to visualise from the description alone.', daysAgo: 4, likes: 9 },
  { id: 'r2-3', threadId: '2', author: 'Chloe W.', authorInitials: 'CW', targetBand: 8.0, content: 'One thing that helped me: NOT GIVEN means the passage is silent on the topic entirely. If it mentions it but contradicts — that is FALSE.', daysAgo: 4, likes: 22 },

  // Thread 3 — Speaking
  { id: 'r3-1', threadId: '3', author: 'Fatima H.', authorInitials: 'FH', targetBand: 7.0, content: 'I posted my recording for "Describe a place you love visiting". Would love feedback on fluency!', daysAgo: 0, likes: 4 },
  { id: 'r3-2', threadId: '3', author: 'Marco R.', authorInitials: 'MR', targetBand: 6.5, content: 'Great initiative! My biggest struggle is using the full 2 minutes without running out of things to say.', daysAgo: 1, likes: 8 },
  { id: 'r3-3', threadId: '3', author: 'Ji-won L.', authorInitials: 'JL', targetBand: 7.0, content: 'Tip for Marco — use the PEEL structure: Point, Example, Explanation, Link. It naturally stretches your answer to 2 minutes.', daysAgo: 1, likes: 31 },

  // Thread 4 — Vocabulary
  { id: 'r4-1', threadId: '4', author: 'Aisha N.', authorInitials: 'AN', targetBand: 7.5, content: 'This is exactly the resource I needed. I have been studying the full 570-word AWL but most of them never appear!', daysAgo: 5, likes: 14 },
  { id: 'r4-2', threadId: '4', author: 'Tom G.', authorInitials: 'TG', targetBand: 6.0, content: 'Could you break it down by skill? I want to know which words appear most in Reading vs. Listening.', daysAgo: 6, likes: 11 },
  { id: 'r4-3', threadId: '4', author: 'Priya M.', authorInitials: 'PM', targetBand: 8.0, content: 'Good idea Tom — I will update the list with frequency counts per skill section next week.', daysAgo: 6, likes: 19 },

  // Thread 5 — Listening
  { id: 'r5-1', threadId: '5', author: 'Nadia C.', authorInitials: 'NC', targetBand: 7.0, content: 'The prediction strategy is a game changer. I went from 6.5 to 7.5 in Listening just from pre-reading the questions carefully.', daysAgo: 2, likes: 16 },
  { id: 'r5-2', threadId: '5', author: 'Ben O.', authorInitials: 'BO', targetBand: 6.5, content: 'What do you do when the speaker uses a synonym instead of the exact word from the question?', daysAgo: 3, likes: 7 },
  { id: 'r5-3', threadId: '5', author: 'Ahmed R.', authorInitials: 'AR', targetBand: 7.5, content: 'Ben — that is exactly what IELTS is testing! Predict the meaning of the answer, not the exact words. Listen for paraphrases.', daysAgo: 3, likes: 24 },

  // Thread 6 — Mock Test
  { id: 'r6-1', threadId: '6', author: 'Clara M.', authorInitials: 'CM', targetBand: 7.0, content: "This week's mock: R 7.5, L 7.0, W 6.5, S 7.0. Writing is still my weak point — ran out of time on Task 1.", daysAgo: 0, likes: 3 },
  { id: 'r6-2', threadId: '6', author: 'Kwame A.', authorInitials: 'KA', targetBand: 6.5, content: 'Got a 6.0 overall. Disappointed but using this as a baseline. Plan to focus on Listening and Writing this week.', daysAgo: 0, likes: 6 },
  { id: 'r6-3', threadId: '6', author: 'Better IELTS Team', authorInitials: 'BI', targetBand: 9.0, content: 'Great scores this week everyone! Remember: consistency beats cramming. Keep up the daily practice and the band scores will follow.', daysAgo: 0, likes: 41 },
]
