import type { ExamGuideData } from '@/lib/types/exam-guide'

export const examGuideData: ExamGuideData = {
  overview:
    'IELTS (International English Language Testing System) measures your English language proficiency across four skills: Listening, Reading, Writing, and Speaking. It is accepted by over 11,000 organisations in 140+ countries, including universities, employers, and immigration authorities.',
  examOrder: ['Listening', 'Reading', 'Writing', 'Speaking'],
  academicVsGeneral: {
    sharedSkills: ['Listening', 'Speaking'],
    differingSkills: ['Reading', 'Writing'],
    notes:
      'The Listening and Speaking sections are identical for both IELTS Academic and General Training. The Reading section differs in text complexity and topics, and the Writing section differs in Task 1 (graph/diagram for Academic; letter-writing for General Training). Task 2 in Writing is the same essay format for both.',
  },
  skills: [
    {
      skill: 'listening',
      label: 'Listening',
      duration: '30 min + 10 min transfer',
      totalQuestions: 40,
      scoringMethod:
        'Raw score (0–40) is converted to a band (1–9) using the official conversion table. Each correct answer earns 1 mark.',
      format:
        'The Listening test consists of four recorded sections of increasing difficulty. Sections 1 and 2 deal with everyday social contexts, while Sections 3 and 4 cover educational and academic situations. You hear each recording once and answer questions as you listen. After the recording, you have 10 minutes to transfer your answers to the answer sheet.',
      questionTypes: [
        { name: 'Multiple Choice', description: 'Select the correct answer from three options (A, B, or C), or choose two or three answers from a list.' },
        { name: 'Matching', description: 'Match a list of items (e.g. questions, statements) to a set of options from the recording.' },
        { name: 'Plan / Map / Diagram Labelling', description: 'Label a plan, map, or diagram using words from the recording (within a word limit).' },
        { name: 'Form / Note / Table / Flow-chart Completion', description: 'Complete gaps in a form, notes, table, or flow-chart using words and/or numbers from the recording.' },
        { name: 'Sentence Completion', description: 'Complete sentences using words from the recording, staying within a specified word limit.' },
        { name: 'Short-answer Questions', description: 'Answer questions using words from the recording within a word limit (usually no more than three words and/or a number).' },
      ],
      tips: [
        'Read the questions before the recording starts — this helps you predict what to listen for.',
        'Pay attention to word limits on completion tasks; writing more words than allowed will be marked wrong.',
        'Answers are often paraphrased from the recording — the exact wording may not appear.',
        'Check your spelling carefully during the transfer time.',
        'Sections 3 and 4 use academic vocabulary, so practise listening to lectures and discussions.',
      ],
    },
    {
      skill: 'reading',
      label: 'Reading',
      duration: '60 minutes',
      totalQuestions: 40,
      scoringMethod:
        'Raw score (0–40) is converted to a band (1–9) using separate tables for Academic and General Training. No marks are deducted for wrong answers.',
      format:
        'Academic: Three long passages (totalling approximately 2,000–2,750 words) from books, journals, magazines, and newspapers. Texts deal with issues relevant to university study and are written for a general audience. General Training: Three sections of increasing length and complexity; texts include advertisements, official documents, workplace materials, and longer descriptive or argumentative passages.',
      questionTypes: [
        { name: 'Multiple Choice', description: 'Select one answer from four options, or multiple answers from a longer list.' },
        { name: 'True / False / Not Given', description: 'Decide whether a statement agrees with the passage (True), contradicts it (False), or is not addressed (Not Given).' },
        { name: 'Yes / No / Not Given', description: 'Decide whether a statement reflects the writer\'s views (Yes), contradicts them (No), or is not covered (Not Given). Used with opinion-based passages.' },
        { name: 'Matching Headings', description: 'Match a list of headings to the correct section or paragraph of the passage.' },
        { name: 'Matching Information', description: 'Identify which paragraph contains specific information, an example, or a description.' },
        { name: 'Matching Features', description: 'Match a list of statements to a set of options from the passage (e.g. which researcher made which claim).' },
        { name: 'Matching Sentence Endings', description: 'Match the beginning of sentences with the correct ending from a box.' },
        { name: 'Sentence / Summary / Note / Table / Flow-chart Completion', description: 'Complete gaps using words taken directly from the passage, within a specified word limit.' },
        { name: 'Short-answer Questions', description: 'Answer questions using words from the passage (usually no more than three words).' },
      ],
      tips: [
        'Skim each passage first to understand the main idea before reading the questions.',
        'For T/F/NG questions, the "Not Given" option is correct if the text simply does not address the statement — do not assume.',
        'Answers for most question types follow the order of the passage.',
        'You do not lose marks for wrong answers — always attempt every question.',
        'Matching Headings is often the most time-consuming — leave it for last within that passage if needed.',
      ],
    },
    {
      skill: 'writing',
      label: 'Writing',
      duration: '60 minutes',
      totalQuestions: 0,
      scoringMethod:
        'Both tasks are marked by a trained examiner on four criteria: Task Achievement / Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Task 2 carries double the weighting of Task 1 in the final Writing band score.',
      format:
        'Two tasks must be completed within 60 minutes. Task 1 (minimum 150 words) asks you to describe visual information (Academic: graph, chart, table, map, diagram, or process) or write a letter (General Training). Task 2 (minimum 250 words) is an essay responding to a point of view, argument, or problem. Spending approximately 20 minutes on Task 1 and 40 minutes on Task 2 is recommended.',
      questionTypes: [
        { name: 'Task 1 — Describing Visual Data (Academic)', description: 'Summarise, describe, or explain information in a graph, chart, table, map, or diagram. You must highlight key features and compare data where relevant.' },
        { name: 'Task 1 — Letter Writing (General Training)', description: 'Write a letter to request information, explain a situation, or respond to a scenario. The tone may be formal, semi-formal, or informal.' },
        { name: 'Task 2 — Opinion / Argumentative Essay', description: 'Discuss a point of view, present an argument, or evaluate a problem and propose solutions. Common prompts include "agree or disagree", "discuss both views", "advantages and disadvantages", and "problem and solution".' },
      ],
      tips: [
        'Always address the exact question — going off-topic heavily penalises your Task Achievement score.',
        'Plan before you write: spend 2–3 minutes outlining your main ideas.',
        'Use a range of vocabulary and avoid repeating the same words — lexical variety is directly assessed.',
        'Check your work in the final minutes for grammatical errors, especially tense consistency and subject-verb agreement.',
        'Task 2 carries more weight — if you run short on time, prioritise finishing Task 2 over perfecting Task 1.',
      ],
    },
    {
      skill: 'speaking',
      label: 'Speaking',
      duration: '11–14 minutes',
      totalQuestions: 0,
      scoringMethod:
        'A trained examiner scores four criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Each criterion is equally weighted.',
      format:
        'The Speaking test is a face-to-face interview with a certified examiner, conducted separately from the other three sections (sometimes on a different day). It has three parts: Part 1 (4–5 min) covers familiar topics such as home, family, work, and hobbies. Part 2 (3–4 min) gives you a cue card with a topic and 1 minute to prepare before speaking for 1–2 minutes. Part 3 (4–5 min) is a two-way discussion on abstract topics related to the Part 2 theme.',
      questionTypes: [
        { name: 'Part 1 — Introduction & Interview', description: 'The examiner asks general questions about your life, interests, and experiences. Answers should be extended (not one-word) but natural.' },
        { name: 'Part 2 — Individual Long Turn', description: 'You receive a cue card with a topic and bullet points to cover. After 1 minute of preparation, you speak for 1–2 minutes. The examiner may ask 1–2 follow-up questions.' },
        { name: 'Part 3 — Two-way Discussion', description: 'The examiner asks more abstract, analytical questions related to the Part 2 topic. You are expected to discuss ideas, opinions, and implications.' },
      ],
      tips: [
        'Speak at a natural pace — rushing reduces clarity and hurts your fluency score.',
        'Use a variety of grammatical structures, not just simple sentences.',
        'Do not memorise scripted answers — examiners are trained to detect rehearsed responses and will ask follow-up questions that deviate from scripts.',
        'In Part 2, use all 1 minute of preparation time to organise your ideas and note key vocabulary.',
        'It is acceptable to ask the examiner to repeat a question if you did not understand it.',
      ],
    },
  ],
}
