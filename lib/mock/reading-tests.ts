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
  {
    id: 'test-2',
    title: 'Academic Reading Practice Test 2',
    type: 'academic',
    durationMinutes: 60,
    sections: [
      {
        id: 'rt2-s1',
        passageIndex: 1,
        passage: {
          id: 'rt2-p1',
          title: 'The Science of Sleep',
          wordCount: 810,
          body: `Paragraph A\nSleep is one of the most fundamental biological processes, yet its purpose remained poorly understood until relatively recently. Far from being a passive state of unconsciousness, sleep is a period of intense neurological activity during which the brain performs critical maintenance, consolidation, and restoration functions.\n\nParagraph B\nSleep is divided into two broad categories: rapid eye movement (REM) sleep and non-REM sleep. Non-REM sleep itself is subdivided into three stages, progressing from light sleep to deep slow-wave sleep. A typical night involves four to six cycles, each lasting approximately 90 minutes, with the proportion of REM sleep increasing in the later cycles.\n\nParagraph C\nDuring slow-wave sleep, the brain clears metabolic waste products through the glymphatic system, a network of channels surrounding blood vessels that flushes cerebrospinal fluid through brain tissue. Researchers at the University of Rochester discovered this mechanism in 2013, finding that the glymphatic system is nearly ten times more active during sleep than during wakefulness. Of particular significance is the clearance of amyloid-beta, a protein whose accumulation in the brain is associated with Alzheimer's disease.\n\nParagraph D\nMemory consolidation is another critical function of sleep. Studies have demonstrated that both REM sleep and slow-wave sleep contribute to the conversion of experiences from fragile short-term memory traces into durable long-term memories. Sleep spindles — brief bursts of neural activity occurring during light non-REM sleep — appear to be particularly important for the transfer of information from the hippocampus to the neocortex for long-term storage.\n\nParagraph E\nChronic sleep deprivation has been linked to a wide range of adverse health outcomes. Even moderate sleep restriction — defined as sleeping six hours per night over two weeks — produces cognitive impairments equivalent to those seen after two full nights without sleep. More seriously, persistent insufficient sleep is associated with increased risk of cardiovascular disease, type 2 diabetes, obesity, and impaired immune function.\n\nParagraph F\nThe timing of sleep is regulated by two interacting mechanisms: the circadian clock and sleep pressure. The circadian clock, governed by the suprachiasmatic nucleus in the hypothalamus, generates roughly 24-hour rhythms in physiology and behaviour, promoting wakefulness during the day and sleepiness at night in response to light cues. Sleep pressure is driven by the gradual accumulation of adenosine — a byproduct of neural activity — in the brain during waking hours.\n\nParagraph G\nCaffeine works by blocking adenosine receptors, thereby masking the sensation of sleepiness without reducing the underlying sleep pressure. This explains why people who rely heavily on caffeine often experience a sudden wave of fatigue once the caffeine is metabolised. Although caffeine can be a useful short-term aid to alertness, its ability to delay sleep onset means it can contribute to a cycle of sleep deprivation if consumed late in the day.\n\nParagraph H\nAdolescents represent a population of particular concern. During puberty, the circadian clock shifts later, making it biologically natural for teenagers to fall asleep later and wake later than adults. When school start times force adolescents to wake early, the resulting chronic sleep deprivation impairs academic performance, emotional regulation, and physical health. A growing number of schools have responded by moving start times later, with studies reporting significant improvements in attendance, grades, and wellbeing.`,
        },
        questions: [
          { id: 'rt2-s1-q1', type: 'tfng', questionNumber: 1, statement: 'Sleep is now understood to be a period of active neurological processing.', correctAnswer: 'TRUE' },
          { id: 'rt2-s1-q2', type: 'tfng', questionNumber: 2, statement: 'The glymphatic system was discovered by researchers in the United Kingdom.', correctAnswer: 'FALSE' },
          { id: 'rt2-s1-q3', type: 'tfng', questionNumber: 3, statement: 'Amyloid-beta accumulation in the brain has been linked to Alzheimer\'s disease.', correctAnswer: 'TRUE' },
          { id: 'rt2-s1-q4', type: 'tfng', questionNumber: 4, statement: 'Sleep spindles occur exclusively during REM sleep.', correctAnswer: 'FALSE' },
          { id: 'rt2-s1-q5', type: 'tfng', questionNumber: 5, statement: 'People who are sleep-deprived typically overestimate how impaired they are.', correctAnswer: 'FALSE' },
          {
            id: 'rt2-s1-q6', type: 'mcq', questionNumber: 6,
            stem: 'According to Paragraph F, what role does the suprachiasmatic nucleus play?',
            options: [{ label: 'A', text: 'It stores long-term memories during sleep.' }, { label: 'B', text: 'It regulates the body\'s circadian rhythms.' }, { label: 'C', text: 'It produces adenosine to induce sleepiness.' }, { label: 'D', text: 'It controls the glymphatic system.' }],
            correctAnswer: 'B',
          },
          {
            id: 'rt2-s1-q7', type: 'mcq', questionNumber: 7,
            stem: 'What does the author say about caffeine\'s effect on sleepiness?',
            options: [{ label: 'A', text: 'It permanently removes the need for sleep.' }, { label: 'B', text: 'It increases adenosine production in the brain.' }, { label: 'C', text: 'It masks sleepiness without eliminating underlying sleep pressure.' }, { label: 'D', text: 'It has no meaningful effect on alertness.' }],
            correctAnswer: 'C',
          },
          {
            id: 'rt2-s1-q8', type: 'matching', questionNumber: 8,
            stem: 'Which paragraph explains why adolescents naturally tend to sleep and wake later than adults?',
            options: [{ key: 'B', text: 'Paragraph B' }, { key: 'D', text: 'Paragraph D' }, { key: 'F', text: 'Paragraph F' }, { key: 'G', text: 'Paragraph G' }, { key: 'H', text: 'Paragraph H' }],
            correctAnswer: 'H',
          },
        ],
      },
      {
        id: 'rt2-s2',
        passageIndex: 2,
        passage: {
          id: 'rt2-p2',
          title: 'Coral Reef Ecosystems Under Pressure',
          wordCount: 760,
          body: `Paragraph A\nCoral reefs cover less than one percent of the ocean floor yet support an estimated 25% of all known marine species. Often called the "rainforests of the sea," they provide essential services not only to ocean biodiversity but also to hundreds of millions of people who depend on them for food, coastal protection, and livelihoods.\n\nParagraph B\nDespite their ecological importance, coral reefs are in serious decline. The primary threat is rising ocean temperatures caused by climate change. Corals are colonial animals whose tissues harbour microscopic photosynthetic algae called zooxanthellae. This symbiotic relationship provides corals with up to 90% of their energy. When water temperatures rise even 1–2°C above seasonal averages for several weeks, corals expel their zooxanthellae in a process known as bleaching. Without their algal partners, corals are severely weakened and will die if thermal stress persists.\n\nParagraph C\nMass bleaching events have increased dramatically in frequency and severity. Prior to 1980, mass bleaching events were essentially unrecorded. The Great Barrier Reef, the world's largest coral reef system, experienced its most severe bleaching on record in 2022, with surveys finding bleaching on more than 91% of reefs assessed.\n\nParagraph D\nOcean acidification presents a second major threat. The oceans absorb approximately one quarter of all CO₂ emissions, and as CO₂ dissolves in seawater it forms carbonic acid, reducing ocean pH. Since the industrial revolution, ocean pH has fallen from approximately 8.2 to 8.1 — a small numerical change that represents a 26% increase in acidity. This acidification reduces the availability of calcium carbonate minerals that corals use to build their skeletons, slowing growth and weakening reef structures.\n\nParagraph E\nLocal human pressures compound the problem. Overfishing removes herbivorous fish that control algae growth, allowing algae to outcompete corals for space on the reef. Agricultural runoff carries excess nutrients and sediment that fuel algal blooms and reduce water clarity, cutting off the sunlight that zooxanthellae need to photosynthesise. Coastal development and destructive fishing practices cause direct physical damage.\n\nParagraph F\nRestoration efforts are underway at dozens of sites globally. Coral gardening — raising coral fragments in underwater nurseries before transplanting them onto degraded reefs — has been deployed successfully in Florida, the Caribbean, and parts of the Indo-Pacific. Some researchers are attempting to develop heat-resistant coral strains through selective breeding and genetic modification. However, most marine biologists emphasise that restoration can only buy time: without drastic reductions in greenhouse gas emissions, reef systems face an existential threat.\n\nParagraph G\nEconomic projections underscore the urgency of action. A study published in the journal Science estimated that global coral reef systems generate approximately $375 billion annually in goods and services, primarily through tourism and fisheries. The World Resources Institute has calculated that if global temperatures rise 2°C above pre-industrial levels, 98% of the world's reef areas would experience bleaching-level thermal stress annually.`,
        },
        questions: [
          { id: 'rt2-s2-q9', type: 'tfng', questionNumber: 9, statement: 'Coral reefs support about a quarter of all known marine species.', correctAnswer: 'TRUE' },
          { id: 'rt2-s2-q10', type: 'tfng', questionNumber: 10, statement: 'Mass bleaching events were common occurrences before 1980.', correctAnswer: 'FALSE' },
          { id: 'rt2-s2-q11', type: 'fill-blank', questionNumber: 11, stem: 'Corals gain up to ___% of their energy from their symbiotic algae called zooxanthellae.', correctAnswer: '90', wordLimit: 1 },
          { id: 'rt2-s2-q12', type: 'fill-blank', questionNumber: 12, stem: 'Since the industrial revolution, ocean pH has fallen from 8.2 to ___.', correctAnswer: '8.1', wordLimit: 1 },
          {
            id: 'rt2-s2-q13', type: 'mcq', questionNumber: 13,
            stem: 'What is the main point the author makes about coral restoration efforts?',
            options: [{ label: 'A', text: 'They are too expensive to be worth pursuing.' }, { label: 'B', text: 'They can delay but not prevent reef loss without emission reductions.' }, { label: 'C', text: 'They have been proven fully effective in the Indo-Pacific.' }, { label: 'D', text: 'They focus exclusively on genetic modification of corals.' }],
            correctAnswer: 'B',
          },
        ],
      },
      {
        id: 'rt2-s3',
        passageIndex: 3,
        passage: {
          id: 'rt2-p3',
          title: 'The Rise of the Gig Economy',
          wordCount: 710,
          body: `Paragraph A\nThe term "gig economy" describes a labour market characterised by short-term contracts and freelance work as opposed to permanent employment. While the concept is not entirely new — day labourers, seasonal farmhands, and freelance journalists have existed for centuries — digital platforms have transformed the scale and visibility of gig work, enabling millions of workers to sell their services through apps and websites.\n\nParagraph B\nCompanies such as Uber, Deliveroo, and Upwork have built multibillion-dollar businesses by acting as intermediaries between workers and customers while classifying their workers as independent contractors rather than employees. This classification has allowed platform companies to avoid providing benefits such as health insurance, paid leave, pensions, and minimum wage guarantees that are typically owed to employees in most jurisdictions.\n\nParagraph C\nProponents of the gig economy argue that it offers workers unprecedented flexibility. Workers can choose when and how much they work, enabling them to combine income from multiple sources, pursue creative projects, or care for family members. A survey by the McKinsey Global Institute found that a significant portion of gig workers — around 30% — participate by choice as a primary source of income, valuing flexibility over stability.\n\nParagraph D\nCritics, however, argue that this narrative of empowerment obscures the precariousness experienced by many gig workers. Income is volatile and unpredictable, and workers bear costs — vehicle maintenance, fuel, equipment — that are typically borne by employers in traditional employment. Without sick pay or paid annual leave, illness means zero income. Studies have found that many gig workers, once costs are accounted for, earn below the minimum wage.\n\nParagraph E\nThe legal status of gig workers has been fiercely contested in courts around the world. In the United Kingdom, the Supreme Court ruled in 2021 that Uber drivers were "workers" rather than independent contractors, entitling them to minimum wage and paid holiday. California passed Proposition 22 in 2020, classifying app-based drivers as contractors, only for a court to later strike down the law as unconstitutional. This legal patchwork reflects deep uncertainty about how to apply 20th-century labour law to 21st-century working arrangements.\n\nParagraph F\nPolicymakers face the challenge of balancing worker protection with maintaining flexibility that both workers and businesses value. Some economists propose extending portable benefits — such as pro-rated pensions, health contributions, and paid leave — to all workers regardless of classification. Others advocate for a new intermediate employment status granting gig workers a defined set of rights without full employee status. No consensus has yet emerged, and the regulatory landscape continues to evolve rapidly across different jurisdictions.`,
        },
        questions: [
          { id: 'rt2-s3-q14', type: 'tfng', questionNumber: 14, statement: 'Gig work is a phenomenon that only became possible with digital technology.', correctAnswer: 'FALSE' },
          { id: 'rt2-s3-q15', type: 'tfng', questionNumber: 15, statement: 'All gig workers participate in platform work because they have no other employment options.', correctAnswer: 'FALSE' },
          {
            id: 'rt2-s3-q16', type: 'mcq', questionNumber: 16,
            stem: 'According to Paragraph E, what was the result of the UK Supreme Court ruling in 2021?',
            options: [{ label: 'A', text: 'Uber was forced to close its UK operations.' }, { label: 'B', text: 'Gig workers were granted full employee status.' }, { label: 'C', text: 'Uber drivers became entitled to minimum wage and paid holiday.' }, { label: 'D', text: 'Platform companies were required to pay corporate taxes.' }],
            correctAnswer: 'C',
          },
          {
            id: 'rt2-s3-q17', type: 'mcq', questionNumber: 17,
            stem: 'What approach do some economists recommend to improve gig worker protections?',
            options: [{ label: 'A', text: 'Banning gig platforms entirely.' }, { label: 'B', text: 'Extending portable benefits to all workers regardless of classification.' }, { label: 'C', text: 'Reducing minimum wage requirements for all workers.' }, { label: 'D', text: 'Requiring gig workers to form trade unions.' }],
            correctAnswer: 'B',
          },
        ],
      },
    ],
  },
  {
    id: 'test-3',
    title: 'General Training Reading Practice Test 1',
    type: 'general',
    durationMinutes: 60,
    sections: [
      {
        id: 'rt3-s1',
        passageIndex: 1,
        passage: {
          id: 'rt3-p1',
          title: 'The Remote Work Revolution',
          wordCount: 660,
          body: `Paragraph A\nRemote working — performing one's job from a location other than a central office, typically from home — is not a new phenomenon, but the COVID-19 pandemic of 2020 transformed it from a niche arrangement to a mainstream reality almost overnight. When lockdowns forced the closure of offices worldwide, employers that had long resisted flexible working discovered that many operations could continue largely uninterrupted from employees' homes.\n\nParagraph B\nThe productivity debate has been one of the most studied aspects of remote work. Early research during the pandemic produced broadly positive findings: a study by Stanford economist Nicholas Bloom found a 13% increase in productivity among call centre workers who shifted to home working. However, more recent analyses have produced mixed results, suggesting that the productivity impact depends heavily on the nature of the work, the individual worker's home environment, and the quality of management.\n\nParagraph C\nFor many workers, the most valued benefit of remote work is the elimination of the commute. In the United Kingdom, the average commuter spends approximately one hour per day commuting; in some large cities the figure is considerably higher. By working from home, employees reclaim this time for personal activities or additional work. Research found that remote workers were more likely to report good work-life balance and were less likely to report anxiety.\n\nParagraph D\nRemote work is not equally accessible or beneficial for all workers. Those in professional and managerial roles, whose work primarily involves creating and analysing information, are far better placed to work remotely than those in manual, retail, or care work, which requires physical presence. Within knowledge worker roles, those in junior positions may suffer disproportionately, missing out on the informal mentoring, observation, and networking that occurs naturally in shared office environments.\n\nParagraph E\nEmployers, particularly in the technology sector, have responded to the normalisation of remote work by embracing distributed team models, hiring from a global talent pool without geographic constraint. This has had significant consequences: workers in lower-cost locations can now compete for high-paid knowledge jobs previously accessible only to those willing to relocate to major cities. At the same time, it has put downward pressure on wages in high-cost cities where technology workers were once able to command a premium for their location.\n\nParagraph F\nThe long-term future of work appears to be hybrid — a blend of remote and in-office working tailored to the needs of different tasks and individuals. Many organisations have adopted formal hybrid policies requiring employees to attend the office two or three days per week. Whether this represents a stable equilibrium or simply an uneasy compromise between employer preference for collaboration and employee preference for flexibility remains to be seen.`,
        },
        questions: [
          { id: 'rt3-s1-q1', type: 'tfng', questionNumber: 1, statement: 'Remote working was invented as a direct result of the COVID-19 pandemic.', correctAnswer: 'FALSE' },
          { id: 'rt3-s1-q2', type: 'tfng', questionNumber: 2, statement: 'Nicholas Bloom\'s study found a productivity increase among remote call centre workers.', correctAnswer: 'TRUE' },
          { id: 'rt3-s1-q3', type: 'tfng', questionNumber: 3, statement: 'UK commuters spend an average of two hours per day commuting.', correctAnswer: 'FALSE' },
          { id: 'rt3-s1-q4', type: 'tfng', questionNumber: 4, statement: 'Junior employees may miss out on informal learning opportunities when working remotely.', correctAnswer: 'TRUE' },
          {
            id: 'rt3-s1-q5', type: 'mcq', questionNumber: 5,
            stem: 'According to Paragraph E, what has been one effect of remote work on labour markets?',
            options: [{ label: 'A', text: 'Technology companies have stopped hiring internationally.' }, { label: 'B', text: 'Workers in lower-cost locations can access jobs previously limited by geography.' }, { label: 'C', text: 'Wages in major cities have increased significantly.' }, { label: 'D', text: 'Remote work has reduced overall employment in the technology sector.' }],
            correctAnswer: 'B',
          },
          { id: 'rt3-s1-q6', type: 'fill-blank', questionNumber: 6, stem: 'Many organisations have adopted formal ___ policies requiring employees to attend the office two or three days per week.', correctAnswer: 'hybrid', wordLimit: 1 },
          {
            id: 'rt3-s1-q7', type: 'mcq', questionNumber: 7,
            stem: 'What does the author suggest about the future of hybrid work arrangements?',
            options: [{ label: 'A', text: 'They will be fully replaced by fully remote work.' }, { label: 'B', text: 'They represent a permanent and stable solution.' }, { label: 'C', text: 'They may represent an uneasy compromise rather than a stable equilibrium.' }, { label: 'D', text: 'They will be abandoned as offices fully reopen.' }],
            correctAnswer: 'C',
          },
          {
            id: 'rt3-s1-q8', type: 'matching', questionNumber: 8,
            stem: 'Which paragraph discusses how remote work allowed workers in lower-cost areas to compete for high-paying jobs globally?',
            options: [{ key: 'B', text: 'Paragraph B' }, { key: 'C', text: 'Paragraph C' }, { key: 'D', text: 'Paragraph D' }, { key: 'E', text: 'Paragraph E' }, { key: 'F', text: 'Paragraph F' }],
            correctAnswer: 'E',
          },
        ],
      },
      {
        id: 'rt3-s2',
        passageIndex: 2,
        passage: {
          id: 'rt3-p2',
          title: 'Public Libraries in the Digital Age',
          wordCount: 720,
          body: `Paragraph A\nThe public library, once considered an institution in terminal decline in the face of the internet, has surprised many observers by adapting and in some cases thriving. Far from becoming obsolete in the digital age, many libraries have reinvented themselves as community hubs offering services that extend well beyond lending physical books.\n\nParagraph B\nThe lending of e-books and digital audiobooks has become a significant part of what libraries offer. In the United States, library borrowing of digital titles through platforms such as OverDrive and Libby grew by over 30% during the pandemic years and has not returned to pre-pandemic levels, suggesting a lasting shift in how patrons access library content. Physical book lending has declined, but overall library usage — including digital — remains robust in many countries.\n\nParagraph C\nLibraries have also expanded their role as providers of digital access for communities that might otherwise lack it. Public computers, free Wi-Fi, and digital literacy training programmes help bridge the so-called "digital divide" — the gap between those who have easy access to technology and those who do not. For job seekers, students, elderly citizens, and those on low incomes, the library often represents the most accessible point of connection to the digital world.\n\nParagraph D\nThe "third place" concept — a social setting distinct from home (the first place) and work or school (the second place) — has become a framework through which many librarians and urban planners think about the library's social function. Libraries provide a free, welcoming, non-commercial space where community members can gather, study, work, and connect without being required to purchase anything. In an era of increasing privatisation of public spaces, this function has arguably become more valuable.\n\nParagraph E\nSome libraries have expanded their services in unexpected directions. Library of Things programmes allow borrowers to check out tools, musical instruments, kitchen equipment, camping gear, and even scientific instruments, applying the lending model to physical objects rather than information. Maker spaces equipped with 3D printers, laser cutters, sewing machines, and recording studios have been added to many branches, positioning libraries as centres of creativity as well as knowledge.\n\nParagraph F\nFinancial pressures pose a persistent challenge. Public libraries are funded by local and national government, and austerity policies have led to significant budget cuts, branch closures, and reduced opening hours in many countries. Critics argue that cuts to libraries disproportionately affect the most disadvantaged communities, who depend on them most. Campaigners have fought closure proposals with varying degrees of success, often marshalling evidence that libraries generate substantial social and economic value.\n\nParagraph G\nDespite financial pressures, the library as an institution has demonstrated remarkable resilience. Its survival into the 21st century speaks to the enduring value communities place on free, universal access to knowledge and information, and on the physical spaces in which this access is provided. As cities grapple with social isolation, inequality, and the challenges of the digital transition, the well-resourced public library may be more relevant than at any point in its history.`,
        },
        questions: [
          { id: 'rt3-s2-q9', type: 'tfng', questionNumber: 9, statement: 'Digital library borrowing fell permanently after the pandemic ended.', correctAnswer: 'FALSE' },
          { id: 'rt3-s2-q10', type: 'tfng', questionNumber: 10, statement: 'The "third place" concept was originally developed by librarians.', correctAnswer: 'NOT GIVEN' },
          { id: 'rt3-s2-q11', type: 'fill-blank', questionNumber: 11, stem: 'Library of ___ programmes allow borrowers to check out physical objects such as tools and musical instruments.', correctAnswer: 'Things', wordLimit: 1 },
          { id: 'rt3-s2-q12', type: 'fill-blank', questionNumber: 12, stem: 'Libraries help bridge the digital divide by offering free Wi-Fi, public computers, and ___ literacy training.', correctAnswer: 'digital', wordLimit: 1 },
          {
            id: 'rt3-s2-q13', type: 'mcq', questionNumber: 13,
            stem: 'What does the author suggest about the library\'s relevance in the 21st century?',
            options: [{ label: 'A', text: 'Libraries are becoming less relevant as internet access improves.' }, { label: 'B', text: 'Despite financial pressures, libraries may be more relevant than ever.' }, { label: 'C', text: 'Libraries should focus exclusively on digital services.' }, { label: 'D', text: 'Library funding should be moved to private organisations.' }],
            correctAnswer: 'B',
          },
        ],
      },
      {
        id: 'rt3-s3',
        passageIndex: 3,
        passage: {
          id: 'rt3-p3',
          title: 'Urban Green Spaces and Human Wellbeing',
          wordCount: 730,
          body: `Paragraph A\nAs the world's urban population continues to grow — with more than half of humanity now living in cities and that proportion expected to reach two-thirds by 2050 — the availability of green space within cities has become an increasingly important concern for urban planners and public health professionals. Green space encompasses parks, gardens, street trees, green roofs, and any other area of vegetation within the built environment.\n\nParagraph B\nThe mental health benefits of access to green space are now supported by a substantial body of research. Studies using a range of methodologies have consistently found that people who live near or regularly use urban green spaces report lower rates of depression, anxiety, and perceived stress. A landmark study published in Scientific Reports analysed 20,000 participants and found that spending at least 120 minutes per week in nature was associated with significantly better health and wellbeing.\n\nParagraph C\nThe mechanisms through which green space promotes wellbeing are not fully understood, but several explanations have been proposed. Attention Restoration Theory suggests that natural environments offer a form of gentle, involuntary attention that allows the directed attention used in work and problem-solving to recover from fatigue. Stress Recovery Theory emphasises the psychophysiological response to natural stimuli: exposure to nature rapidly reduces cortisol levels, heart rate, and blood pressure.\n\nParagraph D\nGreen space also provides significant physical health benefits. Trees and vegetation absorb particulate pollution and produce oxygen, improving air quality in urban areas. The urban heat island effect — the tendency of built-up areas to be significantly warmer than surrounding rural areas due to heat-absorbing concrete and asphalt — is mitigated by vegetation, which cools the air through evapotranspiration. During periods of extreme heat, access to parks can be a life-saving resource for vulnerable populations.\n\nParagraph E\nDespite their benefits, urban green spaces are distributed very unequally. In many cities, affluent neighbourhoods have significantly more and better-quality green space than lower-income areas. This inequity compounds existing health disparities, as socioeconomically disadvantaged populations — who are already more likely to experience poor health outcomes — are denied access to one of the most cost-effective public health interventions available. The environmental justice movement has highlighted this pattern and called for more equitable distribution of green infrastructure.\n\nParagraph F\nUrban greening initiatives face significant practical challenges. Land in cities is expensive and scarce. Maintaining parks and public gardens requires ongoing public funding that is often vulnerable to budget cuts. Green roofs and green walls, while effective at providing vegetation in dense urban environments, have high installation costs. Novel approaches such as pocket parks — small patches of green space created in gaps between buildings or on underused land — have been adopted by some cities as a cost-effective way to expand green provision.\n\nParagraph G\nThe case for urban green space is becoming increasingly compelling as the scientific evidence accumulates and as climate change increases the urgency of addressing urban heat and flooding. Many cities have set ambitious targets for green coverage, with some committing to ensuring all residents live within a short walk of accessible green space. Achieving these targets will require sustained political will, creative use of urban land, and a genuine commitment to addressing the inequities in current provision.`,
        },
        questions: [
          { id: 'rt3-s3-q14', type: 'tfng', questionNumber: 14, statement: 'More than half of the world\'s population currently lives in cities.', correctAnswer: 'TRUE' },
          { id: 'rt3-s3-q15', type: 'tfng', questionNumber: 15, statement: 'The study in Scientific Reports found benefits from spending at least 60 minutes per week in nature.', correctAnswer: 'FALSE' },
          {
            id: 'rt3-s3-q16', type: 'mcq', questionNumber: 16,
            stem: 'According to Attention Restoration Theory, what does exposure to natural environments provide?',
            options: [{ label: 'A', text: 'A form of intense mental stimulation.' }, { label: 'B', text: 'A gentle form of attention that allows directed attention to recover.' }, { label: 'C', text: 'A reduction in the need for sleep.' }, { label: 'D', text: 'An increase in problem-solving ability.' }],
            correctAnswer: 'B',
          },
          {
            id: 'rt3-s3-q17', type: 'mcq', questionNumber: 17,
            stem: 'What does the author say about the distribution of urban green space?',
            options: [{ label: 'A', text: 'It is spread equally across all city neighbourhoods.' }, { label: 'B', text: 'Wealthier areas typically have access to more and better-quality green space.' }, { label: 'C', text: 'Lower-income areas have been prioritised in recent urban planning.' }, { label: 'D', text: 'The quality of green space has no effect on health outcomes.' }],
            correctAnswer: 'B',
          },
        ],
      },
    ],
  },
]
