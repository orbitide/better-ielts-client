import type { SpeakingSession } from '@/lib/types/speaking'

export const speakingSessions: SpeakingSession[] = [
  {
    id: 'session-1',
    title: 'Environment & Climate Change',
    parts: [
      {
        part: 1,
        topic: 'Your Local Environment',
        speakingMinutes: 4,
        questions: [
          'Do you live in a city or in the countryside?',
          'What do you like most about the area where you live?',
          'Have you noticed any changes to the natural environment in your area in recent years?',
          'Do you think people in your country care enough about the environment?',
          'Have you ever taken part in any environmental activities such as recycling or community clean-ups?',
        ],
      },
      {
        part: 2,
        topic: 'Describe a time when you did something to help protect the environment',
        cueCardPrompt: 'You should say:\n• what you did\n• when and where you did it\n• why you decided to do it\n• and explain how you felt about it afterwards.',
        preparationSeconds: 60,
        speakingMinutes: 2,
        questions: ['Describe a time when you did something to help protect the environment.'],
      },
      {
        part: 3,
        topic: 'Environmental Issues and Solutions',
        speakingMinutes: 5,
        questions: [
          'Do you think individuals or governments have a greater responsibility to protect the environment?',
          'What measures do you think are most effective in reducing carbon emissions?',
          'Some people argue that economic development is more important than protecting the environment. To what extent do you agree?',
          'How do you think climate change will affect your country in the coming decades?',
          'Do you think international cooperation on climate change has been effective so far?',
        ],
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Technology & Modern Life',
    parts: [
      {
        part: 1,
        topic: 'Technology in Daily Life',
        speakingMinutes: 4,
        questions: [
          'What kinds of technology do you use most in your everyday life?',
          'Do you think you spend too much time looking at screens?',
          'Has technology changed the way you communicate with friends and family?',
          'Do you prefer to buy things online or in physical shops? Why?',
          'What piece of technology would you find it most difficult to live without?',
        ],
      },
      {
        part: 2,
        topic: 'Describe a website or app that you find particularly useful',
        cueCardPrompt: 'You should say:\n• what the website or app is\n• what you use it for\n• how often you use it\n• and explain why you find it so useful.',
        preparationSeconds: 60,
        speakingMinutes: 2,
        questions: ['Describe a website or app that you find particularly useful.'],
      },
      {
        part: 3,
        topic: 'Technology and Society',
        speakingMinutes: 5,
        questions: [
          'Do you think the rise of artificial intelligence is more of a benefit or a threat to society?',
          'How has social media changed the way people form their opinions?',
          'Some people believe that technology has made people less creative. Do you agree?',
          'Should governments regulate the internet more strictly? Why or why not?',
          'How do you think technology will change the nature of work in the next 20 years?',
        ],
      },
    ],
  },
  {
    id: 'session-3',
    title: 'Education & Learning',
    parts: [
      {
        part: 1,
        topic: 'Your Experience of Education',
        speakingMinutes: 4,
        questions: [
          'Do you enjoy studying? Why or why not?',
          'What was your favourite subject at school?',
          'Do you think the way you study has changed over the years?',
          'Do you prefer studying alone or with others?',
          'What do you think makes a good teacher?',
        ],
      },
      {
        part: 2,
        topic: 'Describe an important lesson you have learned outside of school',
        cueCardPrompt: 'You should say:\n• what the lesson was\n• how and where you learned it\n• who taught it to you or how you discovered it\n• and explain why it has been important to you.',
        preparationSeconds: 60,
        speakingMinutes: 2,
        questions: ['Describe an important lesson you have learned outside of school.'],
      },
      {
        part: 3,
        topic: 'Education Systems and Purposes',
        speakingMinutes: 5,
        questions: [
          'Do you think the purpose of education has changed in recent decades?',
          'Should universities focus more on practical skills or theoretical knowledge?',
          'How important is it for children to learn about other cultures and languages at school?',
          'Do you think examinations are the best way to measure a student\'s abilities?',
          'What role should technology play in modern education?',
        ],
      },
    ],
  },
]
