import type { ReadingTest } from '@/lib/types/reading'

export const readingTests: ReadingTest[] = [
  {
    id: 'test-1',
    title: 'Academic Reading Practice Test 1',
    type: 'academic',
    durationMinutes: 60,
    sections: [
      {
        id: 'rt1-s1',
        passageIndex: 1,
        passage: {
          id: 'rt1-p1',
          title: 'The Psychology of Decision Making',
          wordCount: 820,
          body: `Paragraph A\nThe way humans make decisions has fascinated researchers for decades. Classical economic theory once assumed that people behave as rational actors, always seeking to maximise their utility. However, a growing body of research in behavioural economics and cognitive psychology has challenged this assumption fundamentally.\n\nParagraph B\nDaniel Kahneman, the Nobel Prize-winning psychologist, proposed a dual-process theory of thinking. He described two systems: System 1, which operates automatically and quickly, with little or no effort and no sense of voluntary control; and System 2, which allocates attention to effortful mental activities that demand it, including complex computations. Most everyday decisions are made using System 1, which relies on heuristics — mental shortcuts that generally serve us well but can lead to systematic errors.\n\nParagraph C\nOne of the most extensively studied cognitive biases is the anchoring effect. When people are asked to make numerical estimates, they are heavily influenced by any initial value they have been given, even if that value is entirely arbitrary. In one classic experiment, participants were asked to spin a wheel (secretly fixed to land on either 10 or 65) and then estimate the percentage of African countries in the United Nations. Those who had spun 65 gave significantly higher estimates than those who had spun 10, demonstrating how powerfully an irrelevant anchor can distort subsequent judgement.\n\nParagraph D\nLoss aversion is another powerful bias identified by Kahneman and his colleague Amos Tversky. Their prospect theory shows that people feel the pain of a loss roughly twice as intensely as they feel the pleasure of an equivalent gain. This asymmetry has profound consequences for economic behaviour: investors hold losing stocks too long (hoping to avoid realising a loss) and sell winning stocks too soon (to lock in a gain), a pattern known as the disposition effect.\n\nParagraph E\nThe availability heuristic leads people to overestimate the likelihood of events that are easily recalled — typically recent, dramatic, or emotionally charged events. After a plane crash is widely reported in the media, for example, people consistently overestimate the risk of flying, while the far greater danger of driving goes unnoticed because car accidents are individually unremarkable even though they are collectively devastating.\n\nParagraph F\nNudge theory, developed by Richard Thaler and Cass Sunstein, proposes that by understanding predictable irrationalities in human behaviour, policymakers can design "choice architectures" that steer people towards better decisions without restricting their freedom. Making organ donation opt-out rather than opt-in, for instance, has been shown to dramatically increase donation rates in countries that have adopted this policy.\n\nParagraph G\nCritics of behavioural economics argue that while laboratory experiments reveal interesting anomalies, these effects are often diminished or disappear in real-world settings where people have significant financial stakes, experience, and time to deliberate. Moreover, the field has been challenged by a replication crisis, with several landmark findings failing to reproduce reliably. Nevertheless, the insights of behavioural science continue to influence everything from retirement savings design to public health policy.\n\nParagraph H\nThe future of decision science likely lies in an integration of cognitive psychology, neuroscience, and artificial intelligence. Brain imaging studies are beginning to reveal the neural mechanisms underlying choices, while machine learning algorithms can predict consumer decisions with startling accuracy. Whether these insights will ultimately make us better decision-makers — or simply make us more susceptible to manipulation — remains an open and urgent question.`,
        },
        questions: [
          { id: 'rt1-s1-q1', type: 'tfng', questionNumber: 1, statement: 'Classical economic theory assumed that all individuals make perfectly rational decisions.', correctAnswer: 'TRUE' },
          { id: 'rt1-s1-q2', type: 'tfng', questionNumber: 2, statement: 'System 1 thinking requires significant conscious effort.', correctAnswer: 'FALSE' },
          { id: 'rt1-s1-q3', type: 'tfng', questionNumber: 3, statement: 'Kahneman conducted the spinning wheel experiment personally.', correctAnswer: 'NOT GIVEN' },
          { id: 'rt1-s1-q4', type: 'tfng', questionNumber: 4, statement: 'According to prospect theory, people react more strongly to losses than to equal gains.', correctAnswer: 'TRUE' },
          { id: 'rt1-s1-q5', type: 'tfng', questionNumber: 5, statement: 'The availability heuristic causes people to overestimate common, unremarkable events.', correctAnswer: 'FALSE' },
          {
            id: 'rt1-s1-q6', type: 'mcq', questionNumber: 6,
            stem: 'According to Paragraph F, what was the result of making organ donation opt-out instead of opt-in?',
            options: [{ label: 'A', text: 'It restricted people\'s freedom of choice.' }, { label: 'B', text: 'Donation rates increased significantly.' }, { label: 'C', text: 'It was rejected by most countries.' }, { label: 'D', text: 'Medical outcomes improved overall.' }],
            correctAnswer: 'B',
          },
          {
            id: 'rt1-s1-q7', type: 'mcq', questionNumber: 7,
            stem: 'What criticism of behavioural economics is mentioned in Paragraph G?',
            options: [{ label: 'A', text: 'Its findings are too complex to apply in practice.' }, { label: 'B', text: 'Laboratory results may not apply in real-world situations.' }, { label: 'C', text: 'It ignores the role of emotions in decision making.' }, { label: 'D', text: 'Its researchers lack credentials in economics.' }],
            correctAnswer: 'B',
          },
          {
            id: 'rt1-s1-q8', type: 'matching', questionNumber: 8,
            stem: 'Which paragraph discusses the use of human psychological insights to guide public policy design?',
            options: [{ key: 'A', text: 'Paragraph A' }, { key: 'B', text: 'Paragraph C' }, { key: 'F', text: 'Paragraph F' }, { key: 'G', text: 'Paragraph G' }, { key: 'H', text: 'Paragraph H' }],
            correctAnswer: 'F',
          },
        ],
      },
      {
        id: 'rt1-s2',
        passageIndex: 2,
        passage: {
          id: 'rt1-p2',
          title: 'Urban Vertical Farming: Growing Up',
          wordCount: 750,
          body: `Paragraph A\nAs cities around the world continue to expand and arable land becomes scarcer, vertical farming — the practice of growing crops in stacked layers inside controlled environments — has attracted considerable investment and enthusiasm. Proponents argue that it could revolutionise food production, reducing the environmental footprint of agriculture while bringing fresh produce closer to urban consumers.\n\nParagraph B\nThe concept of vertical farming was popularised by Columbia University professor Dickson Despommier, who argued in the 1990s that a single 30-storey building could theoretically feed 50,000 people year-round. Modern vertical farms typically use hydroponic or aeroponic systems, in which plants are grown without soil, their roots suspended in nutrient-rich water or misted with a fine aerosol. Artificial LED lighting, precisely calibrated to match plant-specific light spectra, replaces sunlight.\n\nParagraph C\nThe advantages of vertical farming are compelling on paper. Crops can be grown year-round regardless of season or climate. Water usage can be reduced by up to 95% compared with conventional agriculture, since water is recycled within closed systems. Because farms are sealed environments, pesticides are rarely needed, reducing both cost and chemical runoff. Yields per square metre can be significantly higher than outdoor farming, and produce can be harvested just hours before sale, maximising freshness.\n\nParagraph D\nHowever, the energy demands of vertical farming are its greatest challenge. Providing artificial light and climate control around the clock requires enormous amounts of electricity. Critics point out that unless this electricity is generated from renewable sources, the carbon footprint of vertical farming can actually exceed that of conventional agriculture. A study published in Nature Food found that lettuce grown in vertical farms produced approximately 15 times more greenhouse gas emissions per kilogram than lettuce grown outdoors in conventional fields.\n\nParagraph E\nThe economics of vertical farming remain challenging. Construction and operational costs are extremely high, and this is reflected in the price of the produce. A bag of lettuce from a vertical farm can cost two to three times the price of conventionally grown equivalents. Investors have poured billions into the sector, but several high-profile companies have gone bankrupt or drastically scaled back operations, citing the difficulty of turning a profit at scale.\n\nParagraph F\nDespite these challenges, the technology continues to improve rapidly. New LED systems are far more energy-efficient than those of a decade ago. The cost of renewable energy is falling. Automation and robotics are reducing labour costs significantly. Optimists believe that within two decades, the economics will have shifted sufficiently to make vertical farming competitive for a wide range of crops, not just the high-value leafy greens and herbs that currently dominate the sector.\n\nParagraph G\nFor now, vertical farming occupies a niche but growing role in the food system. Its true potential may lie not in replacing traditional agriculture wholesale but in complementing it — providing hyper-local, pesticide-free produce in urban areas while conventional farming continues to supply staple grains and field vegetables. Whether the sector can overcome its structural challenges and fulfil its ambitious promise remains to be seen.`,
        },
        questions: [
          { id: 'rt1-s2-q9', type: 'fill-blank', questionNumber: 9, stem: 'Vertical farms use ___ or aeroponic systems instead of soil.', correctAnswer: 'hydroponic', wordLimit: 1 },
          { id: 'rt1-s2-q10', type: 'fill-blank', questionNumber: 10, stem: 'Compared to conventional agriculture, vertical farms can reduce water usage by up to ___.', correctAnswer: '95%', wordLimit: 2 },
          { id: 'rt1-s2-q11', type: 'fill-blank', questionNumber: 11, stem: 'According to a study in Nature Food, vertical farm lettuce produced approximately ___ times more greenhouse gas per kilogram than outdoor lettuce.', correctAnswer: '15', wordLimit: 1 },
          {
            id: 'rt1-s2-q12', type: 'mcq', questionNumber: 12,
            stem: 'According to the passage, what is the main economic problem facing vertical farming?',
            options: [{ label: 'A', text: 'High construction and running costs make it difficult to be profitable.' }, { label: 'B', text: 'Consumers refuse to pay more for vertical farm produce.' }, { label: 'C', text: 'There is no investor interest in the sector.' }, { label: 'D', text: 'Vertical farms cannot match the quality of outdoor produce.' }],
            correctAnswer: 'A',
          },
        ],
      },
      {
        id: 'rt1-s3',
        passageIndex: 3,
        passage: {
          id: 'rt1-p3',
          title: 'The Migration of Languages',
          wordCount: 700,
          body: `Paragraph A\nLanguage is never static. Over centuries and millennia, languages spread, diverge, merge, and disappear as populations migrate, empires rise and fall, and cultures come into contact. Linguistic geography — the study of where languages are spoken and how they got there — offers a window into the deep history of human migration that often complements and sometimes challenges the evidence provided by archaeology and genetics.\n\nParagraph B\nThe Indo-European language family is the world's most widely distributed, encompassing languages from Irish to Bengali. Linguists broadly agree that it originated in a single ancestral language, Proto-Indo-European, spoken perhaps 6,000 to 8,000 years ago. Two competing hypotheses attempt to explain how this single language gave rise to such a geographically dispersed family. The Anatolian hypothesis, championed by archaeologist Colin Renfrew, proposes that Proto-Indo-European spread through Europe with the expansion of Neolithic farming from Anatolia. The rival Steppe hypothesis, favoured by most linguists today, argues that it spread from the Pontic-Caspian steppe through the migration of semi-nomadic pastoralists known as the Yamnaya culture around 5,000 years ago.\n\nParagraph C\nGenetic evidence published in 2015 appeared to strongly support the Steppe hypothesis. Ancient DNA studies showed a massive influx of Yamnaya ancestry into Europe during the Bronze Age, roughly coinciding with the spread of Indo-European languages there. This does not, however, resolve the debate about which came first: the language spread or the genetic admixture.\n\nParagraph D\nLanguage contact does not always result in replacement. Sometimes two languages merge to create a new one: this process is called creolisation. Creole languages typically develop when speakers of mutually unintelligible languages must communicate regularly — most often in colonial contexts involving enslaved or indentured populations. Haitian Creole, for example, emerged from contact between French colonisers and enslaved Africans who spoke dozens of mutually unintelligible languages. Today it is the mother tongue of the vast majority of Haitians.\n\nParagraph E\nAt the other extreme, languages disappear entirely. Of the approximately 7,000 languages spoken in the world today, linguists estimate that half will be extinct by the end of this century. Language death typically accompanies the economic and political marginalisation of a community: when speakers of a minority language find that the dominant language offers better economic opportunities, they shift to using it, and if this shift is complete within a few generations, the minority language dies with the last fluent speaker.\n\nParagraph F\nEfforts to revive dying or extinct languages have met with varying success. Welsh in Britain is considered a relative success story: sustained policy support, compulsory Welsh-medium education, and official bilingual status have stabilised and even increased the number of Welsh speakers over recent decades. Hebrew is perhaps the most remarkable case: a language that had ceased to be a spoken vernacular for nearly two millennia was successfully revived as a living language in the late 19th and early 20th centuries, driven by the Zionist movement's need for a unifying national language.`,
        },
        questions: [
          { id: 'rt1-s3-q13', type: 'tfng', questionNumber: 13, statement: 'Linguistic geography always contradicts the findings of archaeology and genetics.', correctAnswer: 'FALSE' },
          { id: 'rt1-s3-q14', type: 'tfng', questionNumber: 14, statement: 'Most linguists currently favour the Steppe hypothesis over the Anatolian hypothesis.', correctAnswer: 'TRUE' },
          { id: 'rt1-s3-q15', type: 'tfng', questionNumber: 15, statement: 'Haitian Creole is spoken by a minority of the Haitian population.', correctAnswer: 'FALSE' },
          { id: 'rt1-s3-q16', type: 'tfng', questionNumber: 16, statement: 'The revival of Hebrew is described as the most successful language revival in history.', correctAnswer: 'NOT GIVEN' },
          {
            id: 'rt1-s3-q17', type: 'mcq', questionNumber: 17,
            stem: 'What does the author say the 2015 genetic evidence showed about the Steppe hypothesis?',
            options: [{ label: 'A', text: 'It proved the hypothesis beyond doubt.' }, { label: 'B', text: 'It appeared to support but did not fully resolve the debate.' }, { label: 'C', text: 'It contradicted the Steppe hypothesis.' }, { label: 'D', text: 'It was irrelevant to the question of language spread.' }],
            correctAnswer: 'B',
          },
        ],
      },
    ],
  },
]
