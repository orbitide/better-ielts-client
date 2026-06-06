import type { ListeningTest } from '@/lib/types/listening'

export const listeningTests: ListeningTest[] = [
  {
    id: 'test-1',
    title: 'IELTS Listening Practice Test 1',
    durationMinutes: 40,
    sections: [
      {
        id: 'lt1-s1',
        sectionNumber: 1,
        audioUrl: '/audio/section-1-placeholder.mp3',
        audioDurationSeconds: 280,
        transcript: `[Recording starts]\nAgent: Good morning, Riverside Leisure Centre. How can I help you?\nCaller: Hi, I\'d like to enquire about joining the gym. I saw your advertisement online.\nAgent: Of course! Could I take your name please?\nCaller: Yes, it\'s Sarah Mitchell.\nAgent: And are you interested in a monthly or annual membership, Ms Mitchell?\nCaller: I\'m not sure yet. Can you tell me about the different options?\nAgent: We have three tiers. Our Bronze membership is £35 per month and gives you access to the gym floor and changing rooms. Silver is £49 per month and adds group fitness classes. Gold is £65 per month and includes everything plus access to our spa and swimming pool.\nCaller: The Silver sounds good. Do the classes run every day?\nAgent: Yes, we have classes from 6am to 9pm Monday to Friday, and 8am to 6pm on weekends. The timetable changes monthly.\nCaller: And how do I sign up?\nAgent: You can come in and we\'ll set you up in person, or fill in the form on our website. You\'ll need to bring ID and your bank card.\nCaller: Great. What\'s the address?\nAgent: We\'re at 14 Riverside Walk, just next to the bus station. The postcode is BT4 2NR.\nCaller: Thank you so much.\n[Recording ends]`,
        questions: [
          { id: 'lt1-s1-q1', type: 'fill-blank', questionNumber: 1, stem: 'The caller\'s name is Sarah ___', correctAnswer: 'Mitchell' },
          { id: 'lt1-s1-q2', type: 'fill-blank', questionNumber: 2, stem: 'The Silver membership costs £___ per month.', correctAnswer: '49' },
          { id: 'lt1-s1-q3', type: 'fill-blank', questionNumber: 3, stem: 'On weekdays, fitness classes run from 6am to ___', correctAnswer: '9pm' },
          {
            id: 'lt1-s1-q4', type: 'mcq', questionNumber: 4,
            stem: 'What does the caller need to bring to sign up in person?',
            options: [{ label: 'A', text: 'A photograph and a utility bill' }, { label: 'B', text: 'ID and a bank card' }, { label: 'C', text: 'A completed form and cash' }, { label: 'D', text: 'ID and a reference letter' }],
            correctAnswer: 'B',
          },
          { id: 'lt1-s1-q5', type: 'fill-blank', questionNumber: 5, stem: 'The centre is located at 14 Riverside Walk, postcode ___', correctAnswer: 'BT4 2NR' },
        ],
      },
      {
        id: 'lt1-s2',
        sectionNumber: 2,
        audioUrl: '/audio/section-2-placeholder.mp3',
        audioDurationSeconds: 320,
        transcript: `[Recording starts]\nTour guide: Welcome, everyone, to Kingswood Heritage Trail. My name is Mark and I\'ll be your guide today. Our walk covers approximately four kilometres and takes around two hours. You\'ll see some of the most historically significant buildings in this part of the country.\n\nLet me give you a brief overview of what we\'ll see. We start here at Market Square, which dates back to 1287. The cobblestones you\'re standing on are original — they\'ve survived eight centuries of foot traffic. To your left is the Old Guildhall, now converted into a museum of trade and commerce. Admission is free on Sundays.\n\nWe\'ll be heading north along Bridge Street. About halfway along you\'ll see the ruins of St Catherine\'s Chapel on your right. The chapel was built in the fourteenth century but was largely destroyed during the Civil War in 1645. Only the west wall and the tower remain standing.\n\nAt the end of Bridge Street we\'ll reach the River Axe and the medieval stone bridge, which is believed to date from around 1380. You\'re welcome to stop and take photographs.\n\nAny questions before we start? Good. Please stay together as a group and let me know if you need to stop at any point.\n[Recording ends]`,
        questions: [
          { id: 'lt1-s2-q6', type: 'fill-blank', questionNumber: 6, stem: 'The heritage trail covers approximately ___ kilometres.', correctAnswer: 'four' },
          { id: 'lt1-s2-q7', type: 'fill-blank', questionNumber: 7, stem: 'Market Square was established in the year ___', correctAnswer: '1287' },
          {
            id: 'lt1-s2-q8', type: 'mcq', questionNumber: 8,
            stem: 'When is admission to the Old Guildhall museum free?',
            options: [{ label: 'A', text: 'Every day' }, { label: 'B', text: 'On Saturdays' }, { label: 'C', text: 'On Sundays' }, { label: 'D', text: 'During school holidays' }],
            correctAnswer: 'C',
          },
          { id: 'lt1-s2-q9', type: 'fill-blank', questionNumber: 9, stem: 'St Catherine\'s Chapel was largely destroyed during the Civil War in ___', correctAnswer: '1645' },
          { id: 'lt1-s2-q10', type: 'fill-blank', questionNumber: 10, stem: 'The medieval stone bridge is believed to date from around ___', correctAnswer: '1380' },
        ],
      },
      {
        id: 'lt1-s3',
        sectionNumber: 3,
        audioUrl: '/audio/section-3-placeholder.mp3',
        audioDurationSeconds: 350,
        transcript: `[Recording starts]\nTutor: So, let\'s talk about your research project on urban heat islands. You\'ve both been working on this for a few weeks now. How are you getting on, Priya?\nPriya: I think we\'ve made good progress. We\'ve collected temperature data from fifteen monitoring stations across the city centre and compared it with data from four rural stations outside the city.\nTutor: Good. And what were your main findings?\nPriya: The city centre temperatures were consistently higher — on average about 3.2 degrees Celsius warmer than the rural sites, which is actually slightly above the figure cited in the literature.\nJames: We also found that the difference was most pronounced at night, which is consistent with previous studies. During the day, shading from tall buildings actually reduced the effect somewhat.\nTutor: Interesting. And have you thought about the causes?\nJames: We looked at three main factors: the density of impermeable surfaces like roads and car parks, waste heat from buildings and vehicles, and the reduction of vegetation cover compared with rural areas.\nTutor: What about your methodology? Were there any limitations?\nPriya: The main limitation is that we only had data from three summer months, so we can\'t say anything about seasonal variation. We also acknowledge that fifteen monitoring stations may not fully represent the diversity of microclimates within the city.\nTutor: Those are fair points. What are your recommendations for the write-up?\n[Recording ends]`,
        questions: [
          { id: 'lt1-s3-q11', type: 'fill-blank', questionNumber: 11, stem: 'Temperature data was collected from ___ monitoring stations in the city centre.', correctAnswer: 'fifteen' },
          { id: 'lt1-s3-q12', type: 'fill-blank', questionNumber: 12, stem: 'City centre temperatures were on average ___ degrees Celsius warmer than rural sites.', correctAnswer: '3.2' },
          {
            id: 'lt1-s3-q13', type: 'mcq', questionNumber: 13,
            stem: 'According to James, when was the urban heat island effect most pronounced?',
            options: [{ label: 'A', text: 'During the morning rush hour' }, { label: 'B', text: 'In the early afternoon' }, { label: 'C', text: 'At night' }, { label: 'D', text: 'During heatwaves' }],
            correctAnswer: 'C',
          },
          {
            id: 'lt1-s3-q14', type: 'mcq', questionNumber: 14,
            stem: 'What was identified as a limitation of the study?',
            options: [{ label: 'A', text: 'The equipment used was unreliable.' }, { label: 'B', text: 'The data only covered three summer months.' }, { label: 'C', text: 'The rural stations were too far away.' }, { label: 'D', text: 'The students had insufficient academic background.' }],
            correctAnswer: 'B',
          },
        ],
      },
      {
        id: 'lt1-s4',
        sectionNumber: 4,
        audioUrl: '/audio/section-4-placeholder.mp3',
        audioDurationSeconds: 380,
        transcript: `[Recording starts]\nLecturer: Today I want to talk about bioluminescence — the ability of living organisms to produce and emit light. It\'s a phenomenon that\'s found across a remarkable range of life forms, from bacteria and fungi to fish, squid, and fireflies.\n\nBioluminescence is produced through a chemical reaction. An enzyme called luciferase catalyses the oxidation of a molecule called luciferin. This reaction releases energy in the form of light rather than heat, making it extraordinarily efficient — over 90% of the energy is converted directly to light, compared with less than 10% for a typical incandescent light bulb.\n\nIn the ocean, bioluminescence is especially widespread. It\'s estimated that up to 90% of deep-sea organisms are capable of producing light. For these creatures, light serves multiple purposes. Predators use it to attract prey — the anglerfish, for example, dangles a glowing lure above its enormous mouth. Some species use counterillumination to camouflage themselves against the dim light filtering down from the surface. Others use flashes of light for communication, to attract mates, or to warn potential predators that they are toxic.\n\nOn land, the firefly is perhaps the most familiar example. Different species produce flashing patterns that are species-specific, allowing individuals to identify and attract mates of their own kind. Researchers have recently discovered that some species of firefly synchronise their flashes across entire forests — a phenomenon that attracts thousands of tourists each year to the Great Smoky Mountains in the United States.\n[Recording ends]`,
        questions: [
          { id: 'lt1-s4-q15', type: 'fill-blank', questionNumber: 15, stem: 'The enzyme that produces bioluminescent light is called ___', correctAnswer: 'luciferase' },
          { id: 'lt1-s4-q16', type: 'fill-blank', questionNumber: 16, stem: 'Over ___% of the energy in bioluminescent reactions is converted to light.', correctAnswer: '90' },
          {
            id: 'lt1-s4-q17', type: 'mcq', questionNumber: 17,
            stem: 'What technique do some deep-sea species use to camouflage themselves?',
            options: [{ label: 'A', text: 'They mimic the colours of surrounding coral.' }, { label: 'B', text: 'They match the dim surface light using counterillumination.' }, { label: 'C', text: 'They emit darkness-absorbing pigments.' }, { label: 'D', text: 'They sink to greater depths where light cannot reach.' }],
            correctAnswer: 'B',
          },
          { id: 'lt1-s4-q18', type: 'fill-blank', questionNumber: 18, stem: 'Some firefly species synchronise their flashes in forests in the ___ in the United States.', correctAnswer: 'Great Smoky Mountains' },
        ],
      },
    ],
  },
]
