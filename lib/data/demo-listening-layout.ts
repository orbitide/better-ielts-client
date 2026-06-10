import type { ListeningTest } from '@/lib/types/listening'

// Hand-authored demo test exercising the new structured layout node types
// (table, mcq_group, gap_fill, image_label) end-to-end, including grading.
// Bypasses the API entirely — see app/(app)/listening/demo-layout/page.tsx.
export const demoListeningLayoutTest: ListeningTest = {
  id: 'demo-layout-listening',
  title: 'Demo: Structured Question Types',
  durationMinutes: 30,
  sections: [
    {
      id: 'demo-section-1',
      sectionNumber: 1,
      audioUrl: '',
      audioDurationSeconds: 60,
      transcript:
        "Good morning, Sunrise Hotel, how can I help you?\n\nHi, I'd like to make a booking please. My name is Sarah Thompson — that's S-A-R-A-H, T-H-O-M-P-S-O-N.\n\nThanks Sarah. And what date would you like to check in?\n\nThe fourteenth of March, please, for three nights.\n\nGreat, three nights from the fourteenth of March. And would you like a standard or a deluxe room?\n\nA deluxe room, please — we'd like the extra space.",
      questions: [],
      layout: {
        nodes: [
          {
            type: 'table',
            id: 'demo-table-1',
            title: 'Hotel Booking Form',
            headers: ['Detail', 'Information'],
            rows: [
              {
                id: 'demo-table-1-row-1',
                cells: [
                  { type: 'text', value: 'Guest name' },
                  { type: 'input', inputId: 'q1', questionNumber: 1, correctAnswer: 'Sarah Thompson' },
                ],
              },
              {
                id: 'demo-table-1-row-2',
                cells: [
                  { type: 'text', value: 'Check-in date' },
                  { type: 'input', inputId: 'q2', questionNumber: 2, correctAnswer: '14 March' },
                ],
              },
              {
                id: 'demo-table-1-row-3',
                cells: [
                  { type: 'text', value: 'Number of nights' },
                  { type: 'input', inputId: 'q3', questionNumber: 3, correctAnswer: '3' },
                ],
              },
              {
                id: 'demo-table-1-row-4',
                cells: [
                  { type: 'text', value: 'Room type' },
                  { type: 'input', inputId: 'q4', questionNumber: 4, correctAnswer: 'Deluxe' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'demo-section-2',
      sectionNumber: 2,
      audioUrl: '',
      audioDurationSeconds: 60,
      transcript:
        "Welcome everyone to the introductory photography course. The course starts on Monday and runs for six weeks in total. All of our classes take place in the Main Hall, just across from reception, and each session lasts two hours.\n\nNow, the first class begins at six thirty in the evening — that's session B on your timetable. If you ever need extra help with your assignments, our tutors hold a drop-in session in the library every Friday afternoon.",
      questions: [],
      layout: {
        nodes: [
          {
            type: 'gap_fill',
            id: 'demo-gapfill-1',
            title: 'Course Summary',
            blocks: [
              { type: 'text', value: 'The course starts on ' },
              { type: 'input', inputId: 'q5', questionNumber: 5, correctAnswer: 'Monday' },
              { type: 'text', value: ' and runs for ' },
              { type: 'input', inputId: 'q6', questionNumber: 6, correctAnswer: 'six' },
              { type: 'text', value: ' weeks. Classes take place in the ' },
              { type: 'input', inputId: 'q7', questionNumber: 7, correctAnswer: 'Main Hall' },
              { type: 'text', value: ', and each session lasts ' },
              { type: 'input', inputId: 'q8', questionNumber: 8, correctAnswer: 'two' },
              { type: 'text', value: ' hours.' },
            ],
          },
          {
            type: 'mcq_group',
            id: 'demo-mcq-1',
            title: 'Questions 9 and 10',
            instructions: 'Choose the correct letter, A, B or C.',
            questions: [
              {
                id: 'demo-mcq-1-q9',
                inputId: 'q9',
                questionNumber: 9,
                text: 'What time does the first class begin?',
                options: [
                  { label: 'A', text: '5:30 pm' },
                  { label: 'B', text: '6:30 pm' },
                  { label: 'C', text: '7:30 pm' },
                ],
                correctAnswer: 'B',
              },
              {
                id: 'demo-mcq-1-q10',
                inputId: 'q10',
                questionNumber: 10,
                text: 'Where can students get extra help with assignments?',
                options: [
                  { label: 'A', text: 'In the library' },
                  { label: 'B', text: 'In the Main Hall' },
                  { label: 'C', text: 'At reception' },
                ],
                correctAnswer: 'A',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'demo-section-3',
      sectionNumber: 3,
      audioUrl: '',
      audioDurationSeconds: 60,
      transcript:
        "Tutor: So, for your group project on renewable energy, I'd recommend focusing on wind power rather than solar — there's more recent research available.\n\nStudent: Okay, and should we submit a written report or give a presentation?\n\nTutor: A written report, about two thousand words. The deadline is the end of week eight, not week six as originally planned. Make sure you include at least five academic sources, and try to find some from outside the UK to give it a more international perspective.",
      questions: [],
      layout: {
        nodes: [
          {
            type: 'mcq_group',
            id: 'demo-mcq-2',
            title: 'Questions 11–15',
            instructions: 'Choose the correct letter, A, B or C.',
            questions: [
              {
                id: 'demo-mcq-2-q11',
                inputId: 'q11',
                questionNumber: 11,
                text: 'What topic does the tutor recommend?',
                options: [
                  { label: 'A', text: 'Solar power' },
                  { label: 'B', text: 'Wind power' },
                  { label: 'C', text: 'Hydro power' },
                ],
                correctAnswer: 'B',
              },
              {
                id: 'demo-mcq-2-q12',
                inputId: 'q12',
                questionNumber: 12,
                text: 'What format should the project take?',
                options: [
                  { label: 'A', text: 'A presentation' },
                  { label: 'B', text: 'A poster' },
                  { label: 'C', text: 'A written report' },
                ],
                correctAnswer: 'C',
              },
              {
                id: 'demo-mcq-2-q13',
                inputId: 'q13',
                questionNumber: 13,
                text: 'Approximately how many words should the project be?',
                options: [
                  { label: 'A', text: '1,000' },
                  { label: 'B', text: '2,000' },
                  { label: 'C', text: '3,000' },
                ],
                correctAnswer: 'B',
              },
              {
                id: 'demo-mcq-2-q14',
                inputId: 'q14',
                questionNumber: 14,
                text: 'When is the project due?',
                options: [
                  { label: 'A', text: 'End of week six' },
                  { label: 'B', text: 'End of week seven' },
                  { label: 'C', text: 'End of week eight' },
                ],
                correctAnswer: 'C',
              },
              {
                id: 'demo-mcq-2-q15',
                inputId: 'q15',
                questionNumber: 15,
                text: 'What does the tutor say about the sources?',
                options: [
                  { label: 'A', text: 'They should all be from the UK' },
                  { label: 'B', text: 'Some should be from outside the UK' },
                  { label: 'C', text: 'At least ten are required' },
                ],
                correctAnswer: 'B',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'demo-section-4',
      sectionNumber: 4,
      audioUrl: '',
      audioDurationSeconds: 60,
      transcript:
        "Right, let me describe the layout of the community centre. As you come in through the entrance, the reception desk is straight ahead — that's where you check in when you arrive.\n\nTo the left of reception is the car park, where visitors can leave their cars. On the right-hand side of the building is the reading room, where you can borrow books. Down at the bottom-left of the building is the cafe, where you can buy a snack or a drink. And finally, the large area on the bottom-right is the garden, which is a lovely outdoor seating area.",
      questions: [],
      layout: {
        nodes: [
          {
            type: 'image_label',
            id: 'demo-image-1',
            title: 'Community Centre Floor Plan',
            imageUrl: '/images/listening-demo-map.svg',
            points: [
              {
                label: 'Where you check in when you arrive',
                inputId: 'q16',
                questionNumber: 16,
                correctAnswer: 'Reception',
                x: 50,
                y: 18,
              },
              {
                label: 'Where visitors leave their cars',
                inputId: 'q17',
                questionNumber: 17,
                correctAnswer: 'Car Park',
                x: 15,
                y: 22,
              },
              {
                label: 'Where you can borrow books',
                inputId: 'q18',
                questionNumber: 18,
                correctAnswer: 'Reading Room',
                x: 85,
                y: 25,
              },
              {
                label: 'Where you can buy a snack or drink',
                inputId: 'q19',
                questionNumber: 19,
                correctAnswer: 'Cafe',
                x: 22.5,
                y: 70,
              },
              {
                label: 'Outdoor seating area',
                inputId: 'q20',
                questionNumber: 20,
                correctAnswer: 'Garden',
                x: 72.5,
                y: 73,
              },
            ],
          },
        ],
      },
    },
  ],
}
