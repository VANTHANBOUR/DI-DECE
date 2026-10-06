import { LessonPlan } from '../types';

interface PlanTemplate {
  week: number;
  startDate: string;
  endDate: string;
  themeTitle: string;
  themeDescription: string;
  domains: string[];
  learningObjectives: string[];
  circleTime: string;
  centers: Array<{ name: string; activity: string; materials: string }>;
  outdoorPlay: string;
  englishVocab: string[];
  khmerVocab: string[];
  chineseVocab: string[];
  song: string;
  storyBook: string;
}

const WEEKLY_CURRICULUM_TEMPLATES: PlanTemplate[] = [
  {
    week: 1,
    startDate: '2026-06-15',
    endDate: '2026-06-19',
    themeTitle: 'Welcome to Dewey: All About Me & My Classroom Family',
    themeDescription: 'Settling into routines, friendship building, self-identity, and classroom navigation in a multilingual setting.',
    domains: ['Personal, Social & Emotional Development', 'Language & Early Literacy', 'Creative Arts & Music'],
    learningObjectives: [
      'Recognize and share own name in English and Khmer.',
      'Identify 4 core classroom areas (Cubby, Reading Nook, Sensory Table, Rest Area).',
      'Sing the "Hello Friends" multilingual circle time song.'
    ],
    circleTime: 'Name-ball toss greeting in 3 languages, emotions mirror game, morning routine calendar.',
    centers: [
      { name: 'Self-Portrait Art Studio', activity: 'Drawing mirror reflections with skin-tone crayons and collage hair yarn.', materials: 'Mirrors, skin-tone markers, textured yarn, glue.' },
      { name: 'Identity & Fine Motor Trays', activity: 'Building first letter of own name using wooden playdough stamps.', materials: 'Soft non-toxic playdough, letter stamps, name cards.' },
      { name: 'Feelings & Socio-Emotional Corner', activity: 'Emotion photo card matching with plush emotion puppets.', materials: 'Plush emotion dolls, photo flashcards.' }
    ],
    outdoorPlay: 'Parachute greetings, playground safety obstacle circuit, bubble popping.',
    englishVocab: ['Friend', 'Teacher', 'Happy', 'School', 'Smile'],
    khmerVocab: ['មិត្តភក្តិ (Mit-pheak)', 'អ្នកគ្រូ (Neak-kru)', 'សប្បាយ (Sabay)', 'សាលារៀន (Sala-rean)', 'ញញឹម (Nhom-nhem)'],
    chineseVocab: ['朋友 (Péngyǒu)', '老师 (Lǎoshī)', '开心 (Kāixīn)', '学校 (Xuéxiào)', '微笑 (Wēixiào)'],
    song: 'The More We Get Together / មិត្តល្អជួបគ្នា / 找朋友',
    storyBook: '"The Kissing Hand" by Audrey Penn'
  },
  {
    week: 2,
    startDate: '2026-06-22',
    endDate: '2026-06-26',
    themeTitle: 'The Five Senses: Exploring Our World with Wonder',
    themeDescription: 'Hands-on sensory inquiry exploring sight, sound, touch, smell, and taste with natural ingredients.',
    domains: ['Sensory & Discovery Science', 'Language & Early Literacy', 'Physical & Motor Skills'],
    learningObjectives: [
      'Identify 5 human sense organs (Eyes, Ears, Nose, Tongue, Hands).',
      'Distinguish rough vs. soft and sweet vs. sour in taste/touch stations.',
      'Express sensory observations using descriptive trilingual vocabulary.'
    ],
    circleTime: 'Blindfolded sound guessing box, fragrance bottles aroma challenge, five senses fingerplay rhyme.',
    centers: [
      { name: 'Discovery Science Table', activity: 'Magnifying lens exploration of natural leaves, feathers, and rough bark.', materials: 'Magnifiers, pinecones, fabric swatches, textured stones.' },
      { name: 'Taste & Smell Laboratory', activity: 'Safe sampling of citrus lemon vs. sweet honey slice and mint leaves.', materials: 'Safe disposable sampling cups, lemon slices, mint leaves.' },
      { name: 'Rhythm & Acoustic Corner', activity: 'Sorting loud vs. quiet shaker eggs made with rice, bells, and cotton.', materials: 'Plastic eggs, bells, beans, sand.' }
    ],
    outdoorPlay: 'Barefoot sensory path walk on grass, smooth river stones, and soft sand.',
    englishVocab: ['Eyes', 'Ears', 'Nose', 'Touch', 'Taste'],
    khmerVocab: ['ភ្នែក (Pnaek)', 'ត្រចៀក (Tro-chiek)', 'ច្រមុះ (Chro-mohs)', 'ប៉ះ (Pah)', 'ភ្លក្ស (Phleuk)'],
    chineseVocab: ['眼睛 (Yǎnjīng)', '耳朵 (Ěrduo)', '鼻子 (Bízi)', '触摸 (Chùmō)', '品尝 (Pǐncháng)'],
    song: 'Five Senses Song / អាយតនៈទាំងប្រាំ / 我的五官',
    storyBook: '"My Five Senses" by Aliki'
  },
  {
    week: 3,
    startDate: '2026-06-29',
    endDate: '2026-07-03',
    themeTitle: 'Color Symphony: Primary Colors & Pigment Alchemy',
    themeDescription: 'Color identification, color mixing with water droppers, and sensory chromatography art.',
    domains: ['Creative Arts & Music', 'Mathematics & Logic', 'Sensory & Discovery Science'],
    learningObjectives: [
      'Name Red, Blue, Yellow, Green, Orange, Purple in English, Khmer, and Mandarin.',
      'Predict secondary color outcome when blending Red + Yellow and Blue + Yellow.',
      'Sort colored counters into corresponding color cups with jumbo tweezers.'
    ],
    circleTime: 'Rainbow color wheel spin, color mystery silk scarves dancing, color song chant.',
    centers: [
      { name: 'Color Chemistry Station', activity: 'Water dropper mixing of primary dyed waters on absorbent paper.', materials: 'Pipettes, test tubes, food coloring, watercolor paper.' },
      { name: 'Light Table Sensory Studio', activity: 'Overlapping translucent acrylic color paddles to create new hues.', materials: 'LED light box, colorful acrylic sheets.' },
      { name: 'Sorting & Classification Nook', activity: 'Color sorting beads and pom-poms with color matching bowls.', materials: 'Tongs, rainbow pom-poms, partitioned wooden trays.' }
    ],
    outdoorPlay: 'Color scavenger hunt in the campus garden, rainbow chalk hopscotch.',
    englishVocab: ['Red', 'Blue', 'Yellow', 'Green', 'Rainbow'],
    khmerVocab: ['ក្រហម (Kro-hom)', 'ខៀវ (Khiev)', 'លឿង (Loeung)', 'បៃតង (Baitong)', 'ឥន្ទធនូ (Ent-tho-nu)'],
    chineseVocab: ['红色 (Hóngsè)', '蓝色 (Lánsè)', '黄色 (Huángsè)', '绿色 (Lǜsè)', '彩虹 (Cǎihóng)'],
    song: 'I Can Sing a Rainbow / ឥន្ទធនូប្រាំពីពណ៌ / 彩虹之歌',
    storyBook: '"Mouse Paint" by Ellen Stoll Walsh'
  },
  {
    week: 4,
    startDate: '2026-07-06',
    endDate: '2026-07-10',
    themeTitle: 'Shapes & Structures: Geometry in Our Environment',
    themeDescription: '2D and 3D shapes, architectural block building, spatial awareness, and tangible geometry.',
    domains: ['Mathematics & Logic', 'Physical & Motor Skills', 'Language & Early Literacy'],
    learningObjectives: [
      'Identify Circle, Square, Triangle, Rectangle, and Sphere in everyday objects.',
      'Build stable 3D towers with geometric wooden blocks and foam shapes.',
      'Trace geometric shapes in sensory cornmeal trays.'
    ],
    circleTime: 'Geometric mystery bag tactile feel, shape parade movement, shape song.',
    centers: [
      { name: 'Architectural Construction Zone', activity: 'Building bridges and houses using unit blocks and blueprint cards.', materials: 'Hardwood unit blocks, wooden cars, miniature people figurines.' },
      { name: 'Tactile Shape Studio', activity: 'Stretching rubber bands over wooden geoboards to form shapes.', materials: 'Geoboards, colored rubber bands, shape pattern cards.' },
      { name: 'Collage & Geometry Art', activity: 'Creating abstract animal shapes from cut geometric construction paper.', materials: 'Pre-cut shape papers, child safety scissors, glue sticks.' }
    ],
    outdoorPlay: 'Shape jump circuit drawn with sidewalk chalk, giant foam block stacking.',
    englishVocab: ['Circle', 'Square', 'Triangle', 'Rectangle', 'Tower'],
    khmerVocab: ['រង្វង់ (Rong-vong)', 'ការ៉េ (Ka-re)', 'ត្រីកោណ (Trei-kaon)', 'ចតុកោណ (Cho-to-kaon)', 'ប៉ម (Porm)'],
    chineseVocab: ['圆形 (Yuánxíng)', '正方形 (Zhèngfāngxíng)', '三角形 (Sānjiǎoxíng)', '长方形 (Chángfāngxíng)', '高塔 (Gāotǎ)'],
    song: 'Shape Song with Motions / ចម្រៀងរូបរាងធរណីមាត្រ / 形状歌',
    storyBook: '"The Shape of Things" by Dayle Ann Dodds'
  },
  {
    week: 5,
    startDate: '2026-07-13',
    endDate: '2026-07-17',
    themeTitle: 'Gentle Farm Friends: Animal Sounds & Caretakers',
    themeDescription: 'Animal empathy, farm animal habitats, animal sound mimicry, and sensory hay/mud play.',
    domains: ['Sensory & Discovery Science', 'Language & Early Literacy', 'Creative Arts & Music'],
    learningObjectives: [
      'Imitate animal sounds (Cow, Duck, Sheep, Horse, Pig) in 3 languages.',
      'Categorize mother farm animals with their baby offspring.',
      'Wash plastic farm animals in bubbly water and dry them with towels.'
    ],
    circleTime: 'Old MacDonald trilingual puppet show, farm animal sound riddle box, flannel story.',
    centers: [
      { name: 'Farm Animal Sensory Basin', activity: 'Cleaning farm animals in chocolate pudding "mud" followed by bubbly wash basin.', materials: 'Toy farm animals, edible cocoa mud, sponges, brushes.' },
      { name: 'Barnyard Phonics & Vocabulary', activity: 'Matching farm animal figurines to real photo flashcards with names.', materials: 'Schleich farm animals, bilingual word cards.' },
      { name: 'Woolly Sheep Craft Corner', activity: 'Pasting soft fluffy cotton balls onto paper plate sheep silhouettes.', materials: 'Cotton balls, paper plates, non-toxic paste, googly eyes.' }
    ],
    outdoorPlay: 'Galloping horses obstacle course, duck waddle relay race in grass area.',
    englishVocab: ['Cow', 'Duck', 'Sheep', 'Horse', 'Farm'],
    khmerVocab: ['គោ (Ko)', 'ទា (Tea)', 'ចៀម (Chiem)', 'សេះ (Seh)', 'កសិដ្ឋាន (Ka-se-than)'],
    chineseVocab: ['奶牛 (Nǎiniú)', '鸭子 (Yāzi)', '绵羊 (Miányáng)', '马 (Mǎ)', '农场 (Nóngchǎng)'],
    song: 'Old MacDonald Had a Farm / ពូម៉ាក់ដូណាល់មានកសិដ្ឋាន / 王老先生有块地',
    storyBook: '"Big Red Barn" by Margaret Wise Brown'
  },
  {
    week: 6,
    startDate: '2026-07-20',
    endDate: '2026-07-24',
    themeTitle: 'Wild Safari: Jungle Giants & Animal Camouflage',
    themeDescription: 'Exploring wild savanna and jungle animals, patterns (stripes/spots), footprints, and roaring music.',
    domains: ['Sensory & Discovery Science', 'Creative Arts & Music', 'Physical & Motor Skills'],
    learningObjectives: [
      'Distinguish savanna animals (Lion, Elephant, Giraffe, Zebra, Monkey).',
      'Compare animal footprints and textures using playdough stamping.',
      'Practice rhythmic animal walking (heavy elephant stomps vs. stealthy tiger creep).'
    ],
    circleTime: 'Jungle binoculars mystery safari, animal movement dance, animal roar chorus.',
    centers: [
      { name: 'Safari Animal Footprint Lab', activity: 'Pressing animal footprint stamps into clay and identifying matching animal.', materials: 'Clay dough, miniature savanna animal stamps, footprint charts.' },
      { name: 'Jungle Vines & Sensory Bin', activity: 'Searching for hidden animals in green shredded paper with binoculars.', materials: 'Cardboard tube binoculars, animal figurines, green paper foliage.' },
      { name: 'Giraffe Spots Fingerprinting', activity: 'Dipping cork stoppers in brown paint to stamp spots onto long-necked giraffes.', materials: 'Wine corks, brown/yellow tempera, cardboard giraffes.' }
    ],
    outdoorPlay: 'Jungle obstacle safari, crossing pretend crocodile river on foam stepping stones.',
    englishVocab: ['Lion', 'Elephant', 'Giraffe', 'Zebra', 'Jungle'],
    khmerVocab: ['តោ (Tao)', 'ដំរី (Dom-rei)', 'សត្វហ្ស៊ីរ៉ាហ្វ (Giraffe)', 'សេះបង្កង់ (Seh-bong-korgn)', 'ព្រៃជ្រៅ (Prey-chrou)'],
    chineseVocab: ['狮子 (Shīzi)', '大象 (Dàxiàng)', '长颈鹿 (Chángjǐnglù)', '斑马 (Bānmǎ)', '丛林 (Cónglín)'],
    song: 'We\'re Going on a Lion Hunt / យើងទៅស្វែងរកសត្វតោ / 狮子舞曲',
    storyBook: '"Dear Zoo" by Rod Campbell'
  },
  {
    week: 7,
    startDate: '2026-07-27',
    endDate: '2026-07-31',
    themeTitle: 'Under the Sea: Ocean Biodiversity & Water Density',
    themeDescription: 'Marine biology inquiry, ocean depth sensory tubes, sea creature anatomy, and trilingual sea songs.',
    domains: ['Sensory & Discovery Science', 'Language & Early Literacy', 'Creative Arts & Music'],
    learningObjectives: [
      'Name 5 sea creatures (Fish, Whale, Crab, Turtle, Octopus) in 3 languages.',
      'Investigate buoyancy (Float vs. Sink) with real ocean artifacts.',
      'Practice pincer grasp using tweezers to rescue sea stars from ice.'
    ],
    circleTime: 'Ocean wave drum immersion, Rainbow Fish felt puppet story, trilingual greeting.',
    centers: [
      { name: 'Sensory Water Ocean Table', activity: 'Blue spirulina water table with coral rocks, scoops, and sea figurines.', materials: 'Water basin, marine figurines, strainers, blue food coloring.' },
      { name: 'Paper Plate Jellyfish Studio', activity: 'Decorating jellyfish with satin ribbons and iridescent glitter paste.', materials: 'Paper plates, ribbon tentacles, non-toxic tempera, googly eyes.' },
      { name: 'Phonics & Sand Tracing Nook', activity: 'Tracing letter "O" for Octopus in kinetic sand with bamboo styluses.', materials: 'Blue kinetic sand, wooden trays, letter flashcards.' }
    ],
    outdoorPlay: 'Ocean blue parachute games, sponge water squeeze bucket relay.',
    englishVocab: ['Fish', 'Ocean', 'Turtle', 'Whale', 'Crab'],
    khmerVocab: ['ត្រី (Trei)', 'មហាសមុទ្រ (Mo-ha-samut)', 'អណ្ដើក (An-daek)', 'បាឡែន (Ba-laen)', 'ក្ដាម (Kdam)'],
    chineseVocab: ['鱼 (Yú)', '海洋 (Hǎiyáng)', '乌龟 (Wūguī)', '鲸鱼 (Jīngyú)', '螃蟹 (Pángxiè)'],
    song: 'Down by the Bay / ត្រីហែលក្នុងទឹកថ្លា / 小小海龟',
    storyBook: '"The Rainbow Fish" by Marcus Pfister'
  },
  {
    week: 8,
    startDate: '2026-08-03',
    endDate: '2026-08-07',
    themeTitle: 'Botanical Gardens: Seed Sprouting & Plant Life Cycles',
    themeDescription: 'Hands-on gardening, potting seeds, soil microbiology, sunflower tracking, and botanist observation.',
    domains: ['Sensory & Discovery Science', 'Mathematics & Logic', 'Physical & Motor Skills'],
    learningObjectives: [
      'Sequence the 4 plant life stages: Seed -> Sprout -> Plant -> Flower.',
      'Use water spray bottles to gently water seedlings developing fine motor strength.',
      'Measure stem growth with unifix interlocking cubes.'
    ],
    circleTime: 'Sunflower flannel board growth story, garden sensory smelling tray with fresh herbs.',
    centers: [
      { name: 'Botanist Planting Laboratory', activity: 'Planting fast-germinating mung beans in transparent cups with cotton & soil.', materials: 'Clear cups, organic soil, mung beans, spray bottles.' },
      { name: 'Pressed Flower Botany Art', activity: 'Arranging real pressed petals onto sticky contact paper suncatchers.', materials: 'Pressed garden flowers, transparent contact paper, paper frames.' },
      { name: 'Seed Sorting & Counting Station', activity: 'Classifying sunflower, pumpkin, and bean seeds with tweezers into egg cartons.', materials: 'Egg cartons, mixed dried seeds, child tweezers.' }
    ],
    outdoorPlay: 'Digging in garden planting beds, observing earthworms with magnifying pots.',
    englishVocab: ['Seed', 'Flower', 'Leaf', 'Sun', 'Water'],
    khmerVocab: ['គ្រាប់ពូជ (Kroap Pouch)', 'ផ្កា (Pka)', 'ស្លឹក (Sloek)', 'ព្រះអាទិត្យ (Preah Ah-tit)', 'ទឹក (Toek)'],
    chineseVocab: ['种子 (Zhǒngzi)', '花朵 (Huāduǒ)', '树叶 (Shùyè)', '太阳 (Tàiyáng)', '浇水 (Jiāoshuǐ)'],
    song: 'The Sunflower Song / ផ្កាឈូករ័ត្នរីក / 小小种子发芽了',
    storyBook: '"The Tiny Seed" by Eric Carle'
  },
  {
    week: 9,
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    themeTitle: 'Community Helpers & Caring Neighborhood Heroes',
    themeDescription: 'Doctors, firefighters, teachers, police, and sanitation workers; empathy, safety, and community roles.',
    domains: ['Personal, Social & Emotional Development', 'Language & Early Literacy', 'Creative Arts & Music'],
    learningObjectives: [
      'Identify uniforms and special tools of 4 community helpers.',
      'Roleplay compassionate patient care and emergency response teamwork.',
      'Practice dialing institutional emergency assistance numbers on pretend dialers.'
    ],
    circleTime: 'Dress-up helper parade, siren sound matching game, thank you card circle.',
    centers: [
      { name: 'Hospital & Clinic Dramatic Center', activity: 'Checking teddy bear heartbeats with stethoscopes and applying band-aids.', materials: 'Child medical kit, plush bears, fabric bandages, clipboard charts.' },
      { name: 'Fire Station Emergency Zone', activity: 'Extinguishing pretend construction paper fires with blue ribbon hoses.', materials: 'Firefighter hats, felt fire flames, cardboard hoses.' },
      { name: 'Postal Service Letter Writing', activity: 'Stamping letters with sponge inkers and posting into red mailbox.', materials: 'Envelopes, stamps, wooden postbox, colored markers.' }
    ],
    outdoorPlay: 'Fire truck tricycle rescue race, police traffic light stop-and-go game.',
    englishVocab: ['Doctor', 'Firefighter', 'Teacher', 'Police', 'Help'],
    khmerVocab: ['វេជ្ជបណ្ឌិត (Vejja-bondit)', 'ពន្លត់អគ្គីភ័យ (Pon-loot Ak-ki-phey)', 'អ្នកគ្រូ (Neak-kru)', 'ប៉ូលីស (Police)', 'ជួយ (Chuoy)'],
    chineseVocab: ['医生 (Yīshēng)', '消防员 (Xiāofángyuán)', '老师 (Lǎoshī)', '警察 (Jǐngchá)', '帮助 (Bāngzhù)'],
    song: 'Community Helpers on the Go / អ្នកជួយសហគមន៍ / 社区小帮手',
    storyBook: '"Whose Hat Is This?" by Sharon Katz Cooper'
  },
  {
    week: 10,
    startDate: '2026-08-17',
    endDate: '2026-08-21',
    themeTitle: 'Nourishing Bites: Healthy Food & Rainbow Nutrition',
    themeDescription: 'Nutritional food groups, colorful fruits, vegetable stamping, mindful eating, and kitchen hygiene.',
    domains: ['Physical & Motor Skills', 'Sensory & Discovery Science', 'Language & Early Literacy'],
    learningObjectives: [
      'Name 5 tropical fruits (Mango, Banana, Dragon Fruit, Watermelon, Papaya).',
      'Classify foods into "Everyday Healthy Fuel" vs. "Occasional Treats".',
      'Cut soft peeled bananas using child-safe wooden serrated knives.'
    ],
    circleTime: 'Mystery fruit sensory touch box, healthy lunchbox flannel sorting, fruit song.',
    centers: [
      { name: 'Little Chefs Sensory Kitchen', activity: 'Slicing safe cucumbers and bananas and arranging fruit kabobs.', materials: 'Wooden fruit knives, safe cutting boards, sliced organic fruits.' },
      { name: 'Vegetable Stamp Art Studio', activity: 'Stamping bell pepper and celery ends into acrylic paint to create flower bouquets.', materials: 'Sliced bell peppers, celery bases, tempera paints, thick cardstock.' },
      { name: 'Grocery Market Dramatic Nook', activity: 'Weighing pretend vegetables on mechanical scales and balancing baskets.', materials: 'Play fruits/veg, scale, shopping baskets, play currency.' }
    ],
    outdoorPlay: 'Apple picking relay race with bushel baskets, fruit salad tag game.',
    englishVocab: ['Apple', 'Banana', 'Vegetable', 'Water', 'Healthy'],
    khmerVocab: ['ផ្លែប៉ោម (Plae Paom)', 'ចេក (Chek)', 'បន្លែ (Bon-lae)', 'ទឹកស្អាត (Toek S\'at)', 'សុខភាព (Sokha-pheap)'],
    chineseVocab: ['苹果 (Píngguǒ)', '香蕉 (Xiāngjiāo)', '蔬菜 (Shūcài)', '水 (Shuǐ)', '健康 (Jiànkāng)'],
    song: 'Fruit Salad Yummy Yummy / ផ្លែឈើស្រស់ផ្អែមឆ្ងាញ់ / 水果沙拉歌',
    storyBook: '"The Very Hungry Caterpillar" by Eric Carle'
  },
  {
    week: 11,
    startDate: '2026-08-24',
    endDate: '2026-08-28',
    themeTitle: 'Space Odyssey: Stargazing & The Solar System',
    themeDescription: 'Cosmic curiosity, planet orbits, sun/moon cycles, constellation dot tracing, and rocket physics.',
    domains: ['Sensory & Discovery Science', 'Mathematics & Logic', 'Creative Arts & Music'],
    learningObjectives: [
      'Name Sun, Moon, Earth, and Stars in English, Khmer, and Mandarin.',
      'Count backwards 5-4-3-2-1 Blast Off for rocket launch gross motor jump.',
      'Create glowing constellation star maps using glow-in-the-dark star stickers.'
    ],
    circleTime: 'Blackout tent planetarium with fiber-optic star light, astronaut countdown song.',
    centers: [
      { name: 'Lunar Surface Sensory Tray', activity: 'Making moon craters in grey flour-oil moon dough with bouncing marbles.', materials: 'Grey moon sand, silver marbles, plastic astronaut figurines.' },
      { name: 'Cosmic Rocket Launch Pad', activity: 'Assembling geometric paper towel roll rockets with foil and tissue flames.', materials: 'Cardboard tubes, foil, red/orange crepe paper, glue.' },
      { name: 'Constellation Geoboard Lab', activity: 'Recreating the Big Dipper and Orion using silver star pegs and elastic bands.', materials: 'Pegboards, silver star beads, black elastic bands.' }
    ],
    outdoorPlay: 'Astronaut gravity moonwalk on bouncy balance cushions, rocket running relays.',
    englishVocab: ['Sun', 'Moon', 'Star', 'Rocket', 'Earth'],
    khmerVocab: ['ព្រះអាទិត្យ (Preah Ah-tit)', 'ព្រះច័ន្ទ (Preah Chan)', 'ផ្កាយ (Pka)', 'រ៉ុក្កែត (Rocket)', 'ផែនដី (Phaen-dei)'],
    chineseVocab: ['太阳 (Tàiyáng)', '月亮 (Yuèliàng)', '星星 (Xīngxīng)', '火箭 (Huǒjiàn)', '地球 (Dìqiú)'],
    song: 'Twinkle Twinkle Little Star / ផ្កាយរះភ្លឺផ្លេក / 小星星',
    storyBook: '"Papa, Please Get the Moon for Me" by Eric Carle'
  },
  {
    week: 12,
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    themeTitle: 'Khmer Heritage & Silk Weaving Crafts: Culture & Colors',
    themeDescription: 'Traditional Cambodian weaving patterns, holistic silk culture, traditional folk rhymes, and trilingual arts.',
    domains: ['Creative Arts & Music', 'Language & Early Literacy', 'Personal, Social & Emotional Development'],
    learningObjectives: [
      'Identify 3 natural silk dye colors from plants (Turmeric Yellow, Indigo Blue, Sappan Red).',
      'Practice simple under-over cardboard loom weaving using thick colorful yarns.',
      'Sing and clap traditional Khmer children folk rhyme "ពងមាន់ពងទា (Hen Egg, Duck Egg)".'
    ],
    circleTime: 'Khmer silk scarf feeling circle, traditional Roneat xylophone acoustic sound, blessing chant.',
    centers: [
      { name: 'Cardboard Loom Weaving Station', activity: 'Threaded yarn over-under weaving on notched cardboard looms.', materials: 'Notched cardboard, chunky natural yarn, wooden blunt needles.' },
      { name: 'Natural Plant Pigment Painting', activity: 'Painting with extracted turmeric root and butterfly pea flower watercolor.', materials: 'Natural organic dye teas, bamboo brushes, mulberry paper.' },
      { name: 'Traditional Khmer Rhythm Corner', activity: 'Practicing clapping rhythms to traditional folk tunes with wooden coconut shells.', materials: 'Polished coconut shell clappers, miniature wooden Roneat.' }
    ],
    outdoorPlay: 'Traditional Khmer children games "លាក់កន្សែង (Hide the Krama Scarf)" in grassy courtyard.',
    englishVocab: ['Silk', 'Weaving', 'Color', 'Culture', 'Cambodia'],
    khmerVocab: ['សូត្រ (Sotr)', 'តម្បាញ (Tom-banh)', 'ពណ៌ (Poa)', 'វប្បធម៌ (Vob-ba-thor)', 'កម្ពុជា (Kam-pu-chea)'],
    chineseVocab: ['丝绸 (Sīchóu)', '编织 (Biānzhī)', '颜色 (Yánsè)', '文化 (Wénhuà)', '柬埔寨 (Jiǎnpǔzhài)'],
    song: 'Hide the Krama Scarf Song / លាក់កន្សែងឆ្លងដែន / 丝绸之歌',
    storyBook: '"The Cambodian Silk Weaver" adapted for early childhood'
  },
  {
    week: 13,
    startDate: '2026-09-08',
    endDate: '2026-09-12',
    themeTitle: 'Water Wonders: Fluid Dynamics, Bubbles & Rain Cycles',
    themeDescription: 'Water states, bubble physics, raindrop counting, pipettes, and water conservation empathy.',
    domains: ['Sensory & Discovery Science', 'Mathematics & Logic', 'Physical & Motor Skills'],
    learningObjectives: [
      'Demonstrate water surface tension creating giant bubbles with string wands.',
      'Count raindrop glass beads placed on numbered cloud foam mats.',
      'Transfer water between beakers using squeeze pipettes without spilling.'
    ],
    circleTime: 'Rainstick sound simulation, raindrop fingerplay, water cycle cloud jar demonstration.',
    centers: [
      { name: 'Giant Bubble Laboratory', activity: 'Mixing glycerin bubble solution and testing geometric bubble wands.', materials: 'Bubble concentrate, pipe cleaner wands, shallow pans.' },
      { name: 'Rain Cloud Density Jar', activity: 'Dripping blue food color through shaving cream clouds into clear water.', materials: 'Mason jars, shaving foam, droppers, blue color.' },
      { name: 'Water Siphon & Funnel Wall', activity: 'Pouring tinted water through interconnected clear tubes and spinning wheels.', materials: 'Water wall, clear tubing, funnels, measuring pitchers.' }
    ],
    outdoorPlay: 'Water maze navigation, puddle jumping on rubber foam pads, bubble chasing.',
    englishVocab: ['Water', 'Bubble', 'Rain', 'Cloud', 'Clean'],
    khmerVocab: ['ទឹក (Toek)', 'ពពុះ (Po-puh)', 'ទឹកភ្លៀង (Toek Phleang)', 'ពពក (Po-pok)', 'ស្អាត (S\'at)'],
    chineseVocab: ['水 (Shuǐ)', '气泡 (Qìpào)', '下雨 (Xiàyǔ)', '白云 (Báiyún)', '干净 (Gānjìng)'],
    song: 'Rain Rain Go Away / ភ្លៀងធ្លាក់មកហើយ / 小雨沙沙',
    storyBook: '"Worm Weather" by Jean Taft'
  },
  {
    week: 14,
    startDate: '2026-09-15',
    endDate: '2026-09-19',
    themeTitle: 'Dinosaur Explorers: Paleontology & Prehistoric Fossils',
    themeDescription: 'Dinosaur classification (herbivore/carnivore), excavation brushes, fossil clay molds, and giant footprints.',
    domains: ['Sensory & Discovery Science', 'Physical & Motor Skills', 'Language & Early Literacy'],
    learningObjectives: [
      'Differentiate T-Rex, Triceratops, and Brachiosaurus by features.',
      'Gently excavate hidden dinosaur skeletons in kinetic sand using soft bristle brushes.',
      'Compare giant footprint sizes to own child footprint.'
    ],
    circleTime: 'Dino roar volume control game, dinosaur bone riddle box, trilingual paleontologist song.',
    centers: [
      { name: 'Paleontology Sand Dig Site', activity: 'Uncovering resin dinosaur fossils with magnifying glasses and excavation brushes.', materials: 'Kinetic sand, fossil replicas, bamboo brushes, identification charts.' },
      { name: 'Fossil Salt Dough Impression Studio', activity: 'Pressing textured dino toys into terracotta clay to create fossil stones.', materials: 'Air-dry clay, plastic dinosaurs, protective sealer.' },
      { name: 'Dino Scale Measurement Table', activity: 'Measuring lengths of dinosaur tails using interlocking counting blocks.', materials: 'Plastic dinosaurs, measuring tape, centimeter cubes.' }
    ],
    outdoorPlay: 'Giant dinosaur footprint hopscotch in sandpit, dino egg hunt in garden.',
    englishVocab: ['Dinosaur', 'Fossil', 'Big', 'Footprint', 'Bones'],
    khmerVocab: ['ដាយណូស័រ (Dinosaur)', 'ផូស៊ីល (Fossil)', 'ធំ (Thom)', 'ស្នាមជើង (Snam-cheung)', 'ឆ្អឹង (Ch\'eung)'],
    chineseVocab: ['恐龙 (Kǒnglóng)', '化石 (Huàshí)', '巨大 (Jùdà)', '脚印 (Jiǎoyìn)', '骨头 (Gǔtou)'],
    song: 'Dinosaur Stomp / ដាយណូស័រដើរ / 恐龙大步走',
    storyBook: '"How Do Dinosaurs Say Good Night?" by Jane Yolen'
  },
  {
    week: 15,
    startDate: '2026-09-22',
    endDate: '2026-09-26',
    themeTitle: 'Rhythm & Harmony: Multilingual Music & Movement',
    themeDescription: 'Orchestral instruments, percussion beats, acoustic rhythm patterns, and multicultural folk dance.',
    domains: ['Creative Arts & Music', 'Physical & Motor Skills', 'Personal, Social & Emotional Development'],
    learningObjectives: [
      'Match tempo (Fast Allegro vs. Slow Adagio) with body movements and rhythm sticks.',
      'Construct a DIY maraca shaker with dried seeds and decorated cardboard.',
      'Perform coordinated trilingual rhythm clapping in circle time.'
    ],
    circleTime: 'Live instrument showcase (Ukulele, Xylophone, Drum), conductor freeze game.',
    centers: [
      { name: 'DIY Sound Maker Studio', activity: 'Filling clear bottles with dried corn, rice, and beads and sealing for maracas.', materials: 'Plastic bottles, funnel, dried beans, colorful washi tape.' },
      { name: 'Water Glass Xylophone Lab', activity: 'Tapping glasses with varying water levels with wooden mallets to test pitch.', materials: 'Glass beakers, tinted water, wooden mallets.' },
      { name: 'Dancing Ribbon Streamers Corner', activity: 'Spinning colorful satin ribbon wands to classical multicultural music.', materials: 'Silk dance ribbons, music player, spacious soft mats.' }
    ],
    outdoorPlay: 'Musical statues with tambourine stops, rhythm marching band parade on campus.',
    englishVocab: ['Music', 'Drum', 'Dance', 'Sing', 'Rhythm'],
    khmerVocab: ['តន្ត្រី (Tontrei)', 'ស្គរ (Sko)', 'រាំ (Roam)', 'ច្រៀង (Chreang)', 'ចង្វាក់ (Chong-vak)'],
    chineseVocab: ['音乐 (Yīnyuè)', '打鼓 (Dǎgǔ)', '跳舞 (Tiàowǔ)', '唱歌 (Chànggē)', '节奏 (Jiézòu)'],
    song: 'If You\'re Happy and You Know It / បើអ្នកសប្បាយចិត្តទះដៃ / 如果感到幸福你就拍拍手',
    storyBook: '"Zin! Zin! Zin! A Violin" by Lloyd Moss'
  },
  {
    week: 16,
    startDate: '2026-09-29',
    endDate: '2026-10-03',
    themeTitle: 'Celebration of Learning: Learning Portfolios & Reflection',
    themeDescription: 'Showcasing term growth, portfolio presentations, gratitude for friends, and school readiness.',
    domains: ['Personal, Social & Emotional Development', 'Language & Early Literacy', 'Creative Arts & Music'],
    learningObjectives: [
      'Select and present favorite artwork or writing piece from student portfolio.',
      'Express gratitude and appreciation to classmates and educators.',
      'Demonstrate mastery of core trilingual greetings and routines.'
    ],
    circleTime: 'Student award ceremony, memory photo slideshow, celebration singing chorus.',
    centers: [
      { name: 'Learning Portfolio Gallery Studio', activity: 'Decorating personal Term 1 portfolio binders with memory stickers & stamps.', materials: 'Portfolio binders, photograph prints, glitter markers, ribbon.' },
      { name: 'Friendship Keepsake Station', activity: 'Making friendship handprint canvases for classroom community memory wall.', materials: 'Stretched canvas, non-toxic tempera paints, permanent inkers.' },
      { name: 'Reflection & Audio Recording Nook', activity: 'Recording student voice memories answering "What was your favorite discovery?".', materials: 'Child-safe microphone, story recording station.' }
    ],
    outdoorPlay: 'Graduation relay races, celebration parachute confetti toss, family picnic picnic.',
    englishVocab: ['Celebrate', 'Proud', 'Learn', 'Grow', 'Thank You'],
    khmerVocab: ['អបអរសាទរ (Orp-or-sa-tor)', 'មោទនភាព (Moute-na-pheap)', 'រៀន (Rean)', 'ធំធាត់ (Thom-thoat)', 'អរគុណ (Or-kun)'],
    chineseVocab: ['庆祝 (Qìngzhù)', '自豪 (Zìháo)', '学习 (Xuéxí)', '成长 (Chéngzhǎng)', '谢谢 (Xièxiè)'],
    song: 'Graduation Celebration Song / អបអរសាទរជោគជ័យ / 毕业歌',
    storyBook: '"Oh, the Places You\'ll Go!" by Dr. Seuss'
  }
];

interface TeacherConfig {
  id: string;
  name: string;
  avatar: string;
  email: string;
  campusId: string;
  classId: string;
  className: string;
  ageGroup: 'Pre-Nursery' | 'Nursery' | 'Pre-School' | 'Kindergarten';
}

export const TEACHERS_CONFIG: TeacherConfig[] = [];

export const generateLessonPlansForTeacher = (
  teacher: {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
    campusId?: any;
    classId?: string;
    className?: string;
    ageGroup?: any;
  },
  tIdx: number = 0
): LessonPlan[] => {
  const cleanId = (teacher.id || '').replace(/^teacher_/, '').replace(/^fb_/, '');
  const teacherId = teacher.id;
  const teacherName = teacher.name;
  const teacherAvatar = teacher.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80';
  const teacherEmail = teacher.email || `${cleanId}@deweychildcare.edu.kh`;
  const campusId = teacher.campusId || 'DCH_SYW';
  const classId = teacher.classId || 'cls_butterflies';
  const className = teacher.className || 'Pre-School';
  const ageGroup = teacher.ageGroup || 'Pre-School';

  return WEEKLY_CURRICULUM_TEMPLATES.map((tmpl) => {
    const planId = `lp_2026_w${tmpl.week}_${cleanId}`;

    // Determine realistic review status based on week number and teacher
    let status: LessonPlan['status'] = 'approved';
    if (tmpl.week === 12) {
      if (tIdx % 7 === 1) status = 'revision_requested';
      else if (tIdx % 7 === 2 || tIdx % 7 === 3) status = 'submitted';
      else status = 'approved';
    } else if (tmpl.week === 13) {
      status = tIdx % 2 === 0 ? 'submitted' : 'under_review';
    } else if (tmpl.week > 13) {
      status = 'draft';
    }

    const plan: LessonPlan = {
      id: planId,
      teacherId,
      teacherName,
      teacherAvatar,
      teacherEmail,
      campusId: campusId as any,
      classId,
      className,
      ageGroup,
      weekNumber: tmpl.week,
      term: 'Term 1 (Academic Year 2026)',
      startDate: tmpl.startDate,
      endDate: tmpl.endDate,
      themeTitle: tmpl.themeTitle,
      themeDescription: tmpl.themeDescription,
      domains: tmpl.domains as any,
      learningObjectives: tmpl.learningObjectives,
      circleTimeActivities: tmpl.circleTime,
      learningCenters: tmpl.centers.map((c, idx) => ({
        id: `lc_${tmpl.week}_${idx}`,
        centerName: c.name,
        activityDescription: c.activity,
        materials: c.materials,
      })),
      outdoorSensoryPlay: tmpl.outdoorPlay,
      trilingualFocus: {
        englishVocab: tmpl.englishVocab,
        khmerVocab: tmpl.khmerVocab,
        chineseVocab: tmpl.chineseVocab,
        songOrRhyme: tmpl.song,
        storyBook: tmpl.storyBook,
      },
      assessmentMethods: 'Anecdotal notes, checklist rubric, and visual portfolio photos.',
      materialsAndSupplies: tmpl.centers.map(c => c.materials),
      planDate: tmpl.startDate,
      timeStart: '08:00 AM',
      timeEnd: '11:30 AM',
      warmUpCircleTime: tmpl.circleTime,
      firstSession: {
        subject: `${tmpl.domains[0] || 'Early Discovery'}: Core Inquiry`,
        activities: [
          {
            id: `act_${tmpl.week}_1`,
            topicActivity: tmpl.centers[0]?.activity || 'Inquiry exploration activity',
            objectives: tmpl.learningObjectives[0] || 'Understand core topic concept',
            materialsSources: tmpl.centers[0]?.materials || 'Activity resources',
            durationMins: 30,
          }
        ]
      },
      secondSession: {
        subject: `${tmpl.domains[1] || 'Creative Arts'}: Guided Expression`,
        activities: [
          {
            id: `act_${tmpl.week}_2`,
            topicActivity: tmpl.centers[1]?.activity || 'Creative hands-on workshop',
            objectives: tmpl.learningObjectives[1] || 'Express creativity and fine motor coordination',
            materialsSources: tmpl.centers[1]?.materials || 'Art resources',
            durationMins: 30,
          }
        ]
      },
      closing: 'Reflective circle time sharing, cooperative clean-up, and farewell rhyme.',
      attachments: [
        {
          id: `att_${tmpl.week}_1`,
          name: `Week_${tmpl.week}_Curriculum_Guide.pdf`,
          size: '1.8 MB',
          type: 'pdf',
          uploadedAt: `${tmpl.startDate} 08:30`,
        }
      ],
      status: status,
      createdAt: `${tmpl.startDate} 07:45`,
      updatedAt: `${tmpl.startDate} 08:00`,
      submittedAt: status !== 'draft' ? `${tmpl.startDate} 08:15` : undefined,
      reviewedAt: status === 'approved' ? `${tmpl.startDate} 16:30` : undefined,
      feedbackHistory: status === 'approved' ? [
        {
          id: `fb_${tmpl.week}`,
          reviewerId: 'officer_piseth',
          reviewerName: 'Mr. Piseth Vanthan Bour',
          reviewerRole: 'academic_officer',
          date: `${tmpl.startDate} 16:30`,
          comment: `Exceptional adherence to early childhood EYFS and trilingual immersion standards for Week ${tmpl.week}. Approved for institutional implementation.`,
          actionTaken: 'approved',
          rubricScores: {
            curriculumAlignment: 5,
            trilingualIntegration: 5,
            sensorySafety: 5,
            differentiation: 5,
          },
        }
      ] : status === 'revision_requested' ? [
        {
          id: `fb_rev_${tmpl.week}`,
          reviewerId: 'officer_piseth',
          reviewerName: 'Mr. Piseth Vanthan Bour',
          reviewerRole: 'academic_officer',
          date: `${tmpl.startDate} 14:20`,
          comment: `Please incorporate additional safety measures for small manipulative materials and specify Mandarin phonics reinforcement.`,
          actionTaken: 'revision_requested',
          rubricScores: {
            curriculumAlignment: 4,
            trilingualIntegration: 3,
            sensorySafety: 3,
            differentiation: 4,
          },
        }
      ] : [],
    };

    return plan;
  });
};

export const generateAllLessonPlans = (): LessonPlan[] => {
  const allPlans: LessonPlan[] = [];

  TEACHERS_CONFIG.forEach((teacher, tIdx) => {
    allPlans.push(...generateLessonPlansForTeacher(teacher, tIdx));
  });

  return allPlans;
};

export const MASTER_LESSON_PLANS: LessonPlan[] = generateAllLessonPlans();
