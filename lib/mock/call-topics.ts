import type { CallTopic, CallPromptCard } from '@/lib/types/call'

export const callSelectionTopics: CallTopic[] = [
  { id: 'environment', label: 'Environment', icon: 'Leaf', description: 'Climate change, sustainability, and nature' },
  { id: 'technology', label: 'Technology', icon: 'Cpu', description: 'Digital life, AI, and innovation' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', description: 'Schools, learning, and knowledge' },
  { id: 'health', label: 'Health', icon: 'Heart', description: 'Medicine, fitness, and mental health' },
  { id: 'travel', label: 'Travel', icon: 'Plane', description: 'Exploring places and cultures' },
  { id: 'work', label: 'Work', icon: 'Briefcase', description: 'Employment, ambition, and the workplace' },
  { id: 'family', label: 'Family', icon: 'Users', description: 'Social bonds, roles, and dynamics' },
  { id: 'arts', label: 'Arts', icon: 'Palette', description: 'Music, film, literature, and creativity' },
  { id: 'food', label: 'Food', icon: 'UtensilsCrossed', description: 'Eating habits, traditions, and restaurants' },
  { id: 'sport', label: 'Sport', icon: 'Trophy', description: 'Exercise, competition, and hobbies' },
  { id: 'cities', label: 'Cities', icon: 'Building2', description: 'Urban life, architecture, and infrastructure' },
  { id: 'media', label: 'Media', icon: 'Radio', description: 'News, social media, and advertising' },
]

export const callPromptCards: CallPromptCard[] = [
  {
    topicId: 'environment',
    topicLabel: 'Environment',
    prompts: [
      'How has climate change affected daily life where you live?',
      'Do you think individuals or governments are more responsible for protecting the environment?',
      'What sustainable habit have you adopted recently, and why?',
    ],
  },
  {
    topicId: 'technology',
    topicLabel: 'Technology',
    prompts: [
      'In what ways has technology most changed how you communicate?',
      'Do you think AI will create or destroy more jobs over the next decade?',
      'How often do you deliberately switch off from screens, and how does that feel?',
    ],
  },
  {
    topicId: 'education',
    topicLabel: 'Education',
    prompts: [
      'Do you think your education system prepares students well for real life?',
      'What is the most valuable thing you have learned outside a classroom?',
      'Should higher education be free for everyone? What are the trade-offs?',
    ],
  },
  {
    topicId: 'health',
    topicLabel: 'Health',
    prompts: [
      'How much does your daily routine prioritise physical health?',
      'Is mental health taken as seriously as physical health in your society?',
      'What role should governments play in encouraging people to live healthily?',
    ],
  },
  {
    topicId: 'travel',
    topicLabel: 'Travel',
    prompts: [
      'Describe a journey that genuinely changed the way you see the world.',
      'Is mass tourism a net positive or negative for local communities?',
      'How do you think travel will be different in twenty years?',
    ],
  },
  {
    topicId: 'work',
    topicLabel: 'Work',
    prompts: [
      'Do you think working from home is better or worse for productivity?',
      'At what age should people retire, and why?',
      'How important is it to love your job versus being paid well?',
    ],
  },
  {
    topicId: 'family',
    topicLabel: 'Family',
    prompts: [
      'How has the role of the family changed compared to a generation ago?',
      'Is it better for young adults to live independently or with family for longer?',
      'How do you balance personal ambition with family obligations?',
    ],
  },
  {
    topicId: 'arts',
    topicLabel: 'Arts',
    prompts: [
      'Should art that many people find offensive still be publicly funded?',
      'How has streaming changed your relationship with music or film?',
      'Is creativity a skill everyone can develop, or a natural talent?',
    ],
  },
  {
    topicId: 'food',
    topicLabel: 'Food',
    prompts: [
      'How much do you think diet affects mood and productivity?',
      'Is the global spread of fast food a cultural loss or simply consumer freedom?',
      'Should governments tax unhealthy foods the way they tax cigarettes?',
    ],
  },
  {
    topicId: 'sport',
    topicLabel: 'Sport',
    prompts: [
      'Does competitive sport teach more positive or negative lessons to children?',
      'How has watching sport changed now that highlights are available on demand?',
      'Should performance-enhancing drugs be allowed in professional sport?',
    ],
  },
  {
    topicId: 'cities',
    topicLabel: 'Cities',
    prompts: [
      'What makes a city genuinely liveable beyond economic opportunity?',
      'Will most people live in mega-cities by the end of this century?',
      'How should cities balance preserving historic architecture with building new housing?',
    ],
  },
  {
    topicId: 'media',
    topicLabel: 'Media',
    prompts: [
      'How do you decide whether a news story is trustworthy?',
      'Has social media made public debate more or less constructive overall?',
      'Should there be stricter regulation of what can be posted online?',
    ],
  },
]
