document.addEventListener('DOMContentLoaded', () => {
    const mainContentArea = document.getElementById('mainContentArea');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');

    const dashboardStatsSection = document.getElementById('dashboardStatsSection');
    const actionCardsSection = document.getElementById('actionCardsSection');

    const dailyGoalElement = document.getElementById('dailyGoal');
    const currentStreakElement = document.getElementById('currentStreak');
    const wordsLearnedElement = document.getElementById('wordsLearned');
    const totalPointsElement = document.getElementById('totalPoints');
    const streakDaysValue = document.getElementById('streakDaysValue');
    const pointsValue = document.getElementById('pointsValue');

    let userStats = {
        dailyGoal: 0,
        totalDailyGoal: 10,
        streakDays: 1,
        wordsLearnedCount: 0,
        totalPoints: 0,
        learnedWords: []
    };

    // כל המילים ללמידה - הועברו ישירות לקוד ה-JavaScript
    const allWords = [
        { id: 'w1', word: 'house', translation: 'בית', pronunciation: '/haʊs/', example: 'I live in a big house.' },
        { id: 'w2', word: 'car', translation: 'מכונית', pronunciation: '/kɑːr/', example: 'I drive a red car.' },
        { id: 'w3', word: 'tree', translation: 'עץ', pronunciation: '/triː/', example: 'The tree is tall.' },
        { id: 'w4', word: 'water', translation: 'מים', pronunciation: '/ˈwɔːtər/', example: 'I need some water.' },
        { id: 'w5', word: 'food', translation: 'אוכל', pronunciation: '/fuːd/', example: 'The food is ready.' },
        { id: 'w6', word: 'time', translation: 'זמן', pronunciation: '/taɪm/', example: 'What time is it?' },
        { id: 'w7', word: 'person', translation: 'אדם', pronunciation: '/ˈpɜːrsn/', example: 'She is a kind person.' },
        { id: 'w8', word: 'man', translation: 'גבר', pronunciation: '/mæn/', example: 'The man is tall.' },
        { id: 'w9', word: 'woman', translation: 'אישה', pronunciation: '/ˈwʊmən/', example: 'The woman smiled.' },
        { id: 'w10', word: 'child', translation: 'ילד/ה', pronunciation: '/tʃaɪld/', example: 'The child is playing.' },
        { id: 'w11', word: 'boy', translation: 'בן', pronunciation: '/bɔɪ/', example: 'The boy is running.' },
        { id: 'w12', word: 'girl', translation: 'בת', pronunciation: '/ɡɜːrl/', example: 'The girl is singing.' },
        { id: 'w13', word: 'friend', translation: 'חבר/ה', pronunciation: '/frend/', example: 'He is my best friend.' },
        { id: 'w14', word: 'family', translation: 'משפחה', pronunciation: '/ˈfæməli/', example: 'I love my family.' },
        { id: 'w15', word: 'mother', translation: 'אמא', pronunciation: '/ˈmʌðər/', example: 'My mother is cooking.' },
        { id: 'w16', word: 'father', translation: 'אבא', pronunciation: '/ˈfɑːðər/', example: 'His father is a doctor.' },
        { id: 'w17', word: 'brother', translation: 'אח', pronunciation: '/ˈbrʌðər/', example: 'I have one brother.' },
        { id: 'w18', word: 'sister', translation: 'אחות', pronunciation: '/ˈsɪstər/', example: 'My sister is older.' },
        { id: 'w19', word: 'home', translation: 'בית (מקום מגורים)', pronunciation: '/hoʊm/', example: 'I\'m going home.' },
        { id: 'w20', word: 'city', translation: 'עיר', pronunciation: '/ˈsɪti/', example: 'Tel Aviv is a big city.' },
        { id: 'w21', word: 'country', translation: 'מדינה / כפר', pronunciation: '/ˈkʌntri/', example: 'Which country are you from?' },
        { id: 'w22', word: 'world', translation: 'עולם', pronunciation: '/wɜːrld/', example: 'The world is vast.' },
        { id: 'w23', word: 'sun', translation: 'שמש', pronunciation: '/sʌn/', example: 'The sun is shining.' },
        { id: 'w24', word: 'moon', translation: 'ירח', pronunciation: '/muːn/', example: 'The moon is full tonight.' },
        { id: 'w25', word: 'star', translation: 'כוכב', pronunciation: '/stɑːr/', example: 'Look at the bright star.' },
        { id: 'w26', word: 'day', translation: 'יום', pronunciation: '/deɪ/', example: 'Have a good day.' },
        { id: 'w27', word: 'night', translation: 'לילה', pronunciation: '/naɪt/', example: 'Good night, sleep well.' },
        { id: 'w28', word: 'morning', translation: 'בוקר', pronunciation: '/ˈmɔːrnɪŋ/', example: 'Good morning everyone.' },
        { id: 'w29', word: 'afternoon', translation: 'צהריים', pronunciation: '/ˌæftərˈnuːn/', example: 'See you this afternoon.' },
        { id: 'w30', word: 'evening', translation: 'ערב', pronunciation: '/ˈiːvnɪŋ/', example: 'Good evening, how are you?' },
        { id: 'w31', word: 'week', translation: 'שבוע', pronunciation: '/wiːk/', example: 'I\'ll see you next week.' },
        { id: 'w32', word: 'month', translation: 'חודש', pronunciation: '/mʌnθ/', example: 'This month has 30 days.' },
        { id: 'w33', word: 'year', translation: 'שנה', pronunciation: '/jɪər/', example: 'Happy New Year!' },
        { id: 'w34', word: 'book', translation: 'ספר', pronunciation: '/bʊk/', example: 'This is an interesting book.' },
        { id: 'w35', word: 'pen', translation: 'עט', pronunciation: '/pen/', example: 'I need a pen.' },
        { id: 'w36', word: 'pencil', translation: 'עיפרון', pronunciation: '/ˈpensl/', example: 'Can I borrow your pencil?' },
        { id: 'w37', word: 'paper', translation: 'נייר', pronunciation: '/ˈpeɪpər/', example: 'Write it on paper.' },
        { id: 'w38', word: 'table', translation: 'שולחן', pronunciation: '/ˈteɪbl/', example: 'Put the book on the table.' },
        { id: 'w39', word: 'chair', translation: 'כיסא', pronunciation: '/tʃeər/', example: 'Sit on the chair.' },
        { id: 'w40', word: 'door', translation: 'דלת', pronunciation: '/dɔːr/', example: 'Close the door, please.' },
        { id: 'w41', word: 'window', translation: 'חלון', pronunciation: '/ˈwɪndoʊ/', example: 'Open the window.' },
        { id: 'w42', word: 'room', translation: 'חדר', pronunciation: '/ruːm/', example: 'This is my room.' },
        { id: 'w43', word: 'bed', translation: 'מיטה', pronunciation: '/bed/', example: 'I\'m going to bed.' },
        { id: 'w44', word: 'shirt', translation: 'חולצה', pronunciation: '/ʃɜːrt/', example: 'He is wearing a blue shirt.' },
        { id: 'w45', word: 'pants', translation: 'מכנסיים', pronunciation: '/pænts/', example: 'I need new pants.' },
        { id: 'w46', word: 'shoes', translation: 'נעליים', pronunciation: '/ʃuːz/', example: 'My shoes are black.' },
        { id: 'w47', word: 'hat', translation: 'כובע', pronunciation: '/hæt/', example: 'He wears a hat.' },
        { id: 'w48', word: 'coat', translation: 'מעיל', pronunciation: '/koʊt/', example: 'Put on your coat, it\'s cold.' },
        { id: 'w49', word: 'money', translation: 'כסף', pronunciation: '/ˈmʌni/', example: 'I need some money.' },
        { id: 'w50', word: 'work', translation: 'עבודה', pronunciation: '/wɜːrk/', example: 'I go to work every day.' },
        { id: 'w51', word: 'school', translation: 'בית ספר', pronunciation: '/skuːl/', example: 'Children go to school.' },
        { id: 'w52', word: 'student', translation: 'תלמיד/ה', pronunciation: '/ˈstuːdənt/', example: 'She is a good student.' },
        { id: 'w53', word: 'teacher', translation: 'מורה', pronunciation: '/ˈtiːtʃər/', example: 'My teacher is nice.' },
        { id: 'w54', word: 'doctor', translation: 'רופא/ה', pronunciation: '/ˈdɒktər/', example: 'Go see a doctor.' },
        { id: 'w55', word: 'police', translation: 'משטרה', pronunciation: '/pəˈliːs/', example: 'Call the police.' },
        { id: 'w56', word: 'hospital', translation: 'בית חולים', pronunciation: '/ˈhɒspɪtl/', example: 'He is in the hospital.' },
        { id: 'w57', word: 'store', translation: 'חנות', pronunciation: '/stɔːr/', example: 'Let\'s go to the store.' },
        { id: 'w58', word: 'market', translation: 'שוק', pronunciation: '/ˈmɑːrkɪt/', example: 'I bought fruit at the market.' },
        { id: 'w59', word: 'road', translation: 'כביש', pronunciation: '/roʊd/', example: 'The road is long.' },
        { id: 'w60', word: 'street', translation: 'רחוב', pronunciation: '/striːt/', example: 'My house is on this street.' },
        { id: 'w61', word: 'park', translation: 'פארק', pronunciation: '/pɑːrk/', example: 'Let\'s go to the park.' },
        { id: 'w62', word: 'garden', translation: 'גינה', pronunciation: '/ˈɡɑːrdn/', example: 'The flowers in the garden are beautiful.' },
        { id: 'w63', word: 'flower', translation: 'פרח', pronunciation: '/ˈflaʊər/', example: 'This flower smells good.' },
        { id: 'w64', word: 'animal', translation: 'חיה', pronunciation: '/ˈænɪml/', example: 'A cat is an animal.' },
        { id: 'w65', word: 'dog', translation: 'כלב', pronunciation: '/dɒɡ/', example: 'My dog is friendly.' },
        { id: 'w66', word: 'cat', translation: 'חתול', pronunciation: '/kæt/', example: 'The cat is sleeping.' },
        { id: 'w67', word: 'bird', translation: 'ציפור', pronunciation: '/bɜːrd/', example: 'A bird is singing.' },
        { id: 'w68', word: 'fish', translation: 'דג', pronunciation: '/fɪʃ/', example: 'I like to eat fish.' },
        { id: 'w69', word: 'air', translation: 'אוויר', pronunciation: '/er/', example: 'Breathe fresh air.' },
        { id: 'w70', word: 'fire', translation: 'אש', pronunciation: '/ˈfaɪər/', example: 'Be careful with fire.' },
        { id: 'w71', word: 'earth', translation: 'אדמה / כדור הארץ', pronunciation: '/ɜːrθ/', example: 'The Earth is round.' },
        { id: 'w72', word: 'sky', translation: 'שמיים', pronunciation: '/skaɪ/', example: 'The sky is blue.' },
        { id: 'w73', word: 'cloud', translation: 'ענן', pronunciation: '/klaʊd/', example: 'There are many clouds today.' },
        { id: 'w74', word: 'rain', translation: 'גשם', pronunciation: '/reɪn/', example: 'It\'s raining outside.' },
        { id: 'w75', word: 'snow', translation: 'שלג', pronunciation: '/snoʊ/', example: 'I love to play in the snow.' },
        { id: 'w76', word: 'wind', translation: 'רוח', pronunciation: '/wɪnd/', example: 'The wind is strong.' },
        { id: 'w77', word: 'love', translation: 'אהבה', pronunciation: '/lʌv/', example: 'Love is a powerful emotion.' },
        { id: 'w78', word: 'joy', translation: 'שמחה', pronunciation: '/dʒɔɪ/', example: 'She felt great joy.' },
        { id: 'w79', word: 'sadness', translation: 'עצב', pronunciation: '/ˈsædnəs/', example: 'Sadness is a common feeling.' },
        { id: 'w80', word: 'anger', translation: 'כעס', pronunciation: '/ˈæŋɡər/', example: 'Control your anger.' },
        { id: 'w81', word: 'fear', translation: 'פחד', pronunciation: '/fɪər/', example: 'He has a fear of heights.' },
        { id: 'w82', word: 'hope', translation: 'תקווה', pronunciation: '/hoʊp/', example: 'Always have hope.' },
        { id: 'w83', word: 'idea', translation: 'רעיון', pronunciation: '/aɪˈdiːə/', example: 'That\'s a great idea!' },
        { id: 'w84', word: 'problem', translation: 'בעיה', pronunciation: '/ˈprɒbləm/', example: 'We have a small problem.' },
        { id: 'w85', word: 'solution', translation: 'פתרון', pronunciation: '/səˈluːʃn/', example: 'We need a solution.' },
        { id: 'w86', word: 'question', translation: 'שאלה', pronunciation: '/ˈkwestʃən/', example: 'Can I ask a question?' },
        { id: 'w87', word: 'answer', translation: 'תשובה', pronunciation: '/ˈænsər/', example: 'What\'s the answer?' },
        { id: 'w88', word: 'news', translation: 'חדשות', pronunciation: '/nuːz/', example: 'What\'s the news today?' },
        { id: 'w89', word: 'voice', translation: 'קול', pronunciation: '/vɔɪs/', example: 'She has a beautiful voice.' },
        { id: 'w90', word: 'music', translation: 'מוזיקה', pronunciation: '/ˈmjuːzɪk/', example: 'I love listening to music.' },
        { id: 'w91', word: 'song', translation: 'שיר', pronunciation: '/sɒŋ/', example: 'Sing your favorite song.' },
        { id: 'w92', word: 'film', translation: 'סרט', pronunciation: '/fɪlm/', example: 'Let\'s watch a film.' },
        { id: 'w93', word: 'game', translation: 'משחק', pronunciation: '/ɡeɪm/', example: 'Do you want to play a game?' },
        { id: 'w94', word: 'sport', translation: 'ספורט', pronunciation: '/spɔːrt/', example: 'Football is a popular sport.' },
        { id: 'w95', word: 'team', translation: 'קבוצה', pronunciation: '/tiːm/', example: 'We are a great team.' },
        { id: 'w96', word: 'ball', translation: 'כדור', pronunciation: '/bɔːl/', example: 'Throw the ball.' },
        { id: 'w97', word: 'hand', translation: 'יד', pronunciation: '/hænd/', example: 'Shake my hand.' },
        { id: 'w98', word: 'foot', translation: 'רגל (כף רגל)', pronunciation: '/fʊt/', example: 'My foot hurts.' },
        { id: 'w99', word: 'leg', translation: 'רגל (כל הרגל)', pronunciation: '/leɡ/', example: 'He broke his leg.' },
        { id: 'w100', word: 'arm', translation: 'זרוע', pronunciation: '/ɑːrm/', example: 'Raise your arm.' },
        { id: 'w101', word: 'head', translation: 'ראש', pronunciation: '/hed/', example: 'He nodded his head.' },
        { id: 'w102', word: 'face', translation: 'פנים', pronunciation: '/feɪs/', example: 'Wash your face.' },
        { id: 'w103', word: 'eye', translation: 'עין', pronunciation: '/aɪ/', example: 'She has blue eyes.' },
        { id: 'w104', word: 'ear', translation: 'אוזן', pronunciation: '/ɪər/', example: 'Listen with your ears.' },
        { id: 'w105', word: 'nose', translation: 'אף', pronunciation: '/noʊz/', example: 'He has a small nose.' },
        { id: 'w106', word: 'mouth', translation: 'פה', pronunciation: '/maʊθ/', example: 'Open your mouth.' },
        { id: 'w107', word: 'hair', translation: 'שיער', pronunciation: '/her/', example: 'She has long hair.' },
        { id: 'w108', word: 'body', translation: 'גוף', pronunciation: '/ˈbɒdi/', example: 'Keep your body healthy.' },
        { id: 'w109', word: 'heart', translation: 'לב', pronunciation: '/hɑːrt/', example: 'My heart is beating fast.' },
        { id: 'w110', word: 'mind', translation: 'מוח / תודעה', pronunciation: '/maɪnd/', example: 'Keep that in mind.' },
        { id: 'w111', word: 'health', translation: 'בריאות', pronunciation: '/helθ/', example: 'Health is important.' },
        { id: 'w112', word: 'life', translation: 'חיים', pronunciation: '/laɪf/', example: 'Enjoy your life.' },
        { id: 'w113', word: 'death', translation: 'מוות', pronunciation: '/deθ/', example: 'Death is part of life.' },
        { id: 'w114', word: 'dream', translation: 'חלום', pronunciation: '/driːm/', example: 'I had a strange dream.' },
        { id: 'w115', word: 'truth', translation: 'אמת', pronunciation: '/truːθ/', example: 'Tell me the truth.' },
        { id: 'w116', word: 'lie', translation: 'שקר', pronunciation: '/laɪ/', example: 'Don\'t tell lies.' },
        { id: 'w117', word: 'story', translation: 'סיפור', pronunciation: '/ˈstɔːri/', example: 'Tell me a story.' },
        { id: 'w118', word: 'letter', translation: 'מכתב / אות', pronunciation: '/ˈletər/', example: 'I wrote a letter.' },
        { id: 'w119', word: 'word', translation: 'מילה', pronunciation: '/wɜːrd/', example: 'What\'s the meaning of this word?' },
        { id: 'w120', word: 'number', translation: 'מספר', pronunciation: '/ˈnʌmbər/', example: 'What\'s your phone number?' },
        { id: 'w121', word: 'color', translation: 'צבע', pronunciation: '/ˈkʌlər/', example: 'My favorite color is blue.' },
        { id: 'w122', word: 'shape', translation: 'צורה', pronunciation: '/ʃeɪp/', example: 'What shape is it?' },
        { id: 'w123', word: 'size', translation: 'גודל', pronunciation: '/saɪz/', example: 'What size are these shoes?' },
        { id: 'w124', word: 'weight', translation: 'משקל', pronunciation: '/weɪt/', example: 'What is your weight?' },
        { id: 'w125', word: 'taste', translation: 'טעם', pronunciation: '/teɪst/', example: 'This food has a good taste.' },
        { id: 'w126', word: 'smell', translation: 'ריח', pronunciation: '/smel/', example: 'I love the smell of coffee.' },
        { id: 'w127', word: 'sound', translation: 'צליל', pronunciation: '/saʊnd/', example: 'What\'s that sound?' },
        { id: 'w128', word: 'light', translation: 'אור', pronunciation: '/laɪt/', example: 'Turn on the light.' },
        { id: 'w129', word: 'darkness', translation: 'חושך', pronunciation: '/ˈdɑːrknəs/', example: 'I don\'t like darkness.' },
        { id: 'w130', word: 'beginning', translation: 'התחלה', pronunciation: '/bɪˈɡɪnɪŋ/', example: 'The beginning of the story.' },
        { id: 'w131', word: 'end', translation: 'סוף', pronunciation: '/end/', example: 'The end of the movie.' },
        { id: 'w132', word: 'middle', translation: 'אמצע', pronunciation: '/ˈmɪdl/', example: 'In the middle of the room.' },
        { id: 'w133', word: 'side', translation: 'צד', pronunciation: '/saɪd/', example: 'On the left side.' },
        { id: 'w134', word: 'top', translation: 'למעלה', pronunciation: '/tɒp/', example: 'On the top shelf.' },
        { id: 'w135', word: 'bottom', translation: 'למטה', pronunciation: '/ˈbɒtəm/', example: 'At the bottom of the page.' },
        { id: 'w136', word: 'front', translation: 'קדימה', pronunciation: '/frʌnt/', example: 'In front of the house.' },
        { id: 'w137', word: 'back', translation: 'אחורה', pronunciation: '/bæk/', example: 'Go back home.' },
        { id: 'w138', word: 'inside', translation: 'בפנים', pronunciation: '/ˌɪnˈsaɪd/', example: 'Stay inside.' },
        { id: 'w139', word: 'outside', translation: 'בחוץ', pronunciation: '/ˌaʊtˈsaɪd/', example: 'Let\'s go outside.' },
        { id: 'w140', word: 'left', translation: 'שמאל', pronunciation: '/left/', example: 'Turn left.' },
        { id: 'w141', word: 'right', translation: 'ימין', pronunciation: '/raɪt/', example: 'Turn right.' },
        { id: 'w142', word: 'north', translation: 'צפון', pronunciation: '/nɔːrθ/', example: 'Go north.' },
        { id: 'w143', word: 'south', translation: 'דרום', pronunciation: '/saʊθ/', example: 'The wind is from the south.' },
        { id: 'w144', word: 'east', translation: 'מזרח', pronunciation: '/iːst/', example: 'The sun rises in the east.' },
        { id: 'w145', word: 'west', translation: 'מערב', pronunciation: '/west/', example: 'The sun sets in the west.' },
        { id: 'w146', word: 'way', translation: 'דרך', pronunciation: '/weɪ/', example: 'Which way should we go?' },
        { id: 'w147', word: 'road', translation: 'כביש', pronunciation: '/roʊd/', example: 'Drive on the road.' },
        { id: 'w148', word: 'path', translation: 'שביל', pronunciation: '/pæθ/', example: 'Follow the path.' },
        { id: 'w149', word: 'bridge', translation: 'גשר', pronunciation: '/brɪdʒ/', example: 'Cross the bridge.' },
        { id: 'w150', word: 'station', translation: 'תחנה', pronunciation: '/ˈsteɪʃn/', example: 'Go to the train station.' },
        { id: 'w151', word: 'airport', translation: 'שדה תעופה', pronunciation: '/ˈerpɔːrt/', example: 'I\'m going to the airport.' },
        { id: 'w152', word: 'train', translation: 'רכבת', pronunciation: '/treɪn/', example: 'Take the train.' },
        { id: 'w153', word: 'bus', translation: 'אוטובוס', pronunciation: '/bʌs/', example: 'Wait for the bus.' },
        { id: 'w154', word: 'taxi', translation: 'מונית', pronunciation: '/ˈtæksi/', example: 'Call a taxi.' },
        { id: 'w155', word: 'bicycle', translation: 'אופניים', pronunciation: '/ˈbaɪsɪkl/', example: 'Ride a bicycle.' },
        { id: 'w156', word: 'engine', translation: 'מנוע', pronunciation: '/ˈendʒɪn/', example: 'The car engine is loud.' },
        { id: 'w157', word: 'wheel', translation: 'גלגל', pronunciation: '/wiːl/', example: 'The car has four wheels.' },
        { id: 'w158', word: 'key', translation: 'מפתח', pronunciation: '/kiː/', example: 'Where are my keys?' },
        { id: 'w159', word: 'lock', translation: 'מנעול', pronunciation: '/lɒk/', example: 'Unlock the lock.' },
        { id: 'w160', word: 'box', translation: 'קופסה', pronunciation: '/bɒks/', example: 'Put it in the box.' },
        { id: 'w161', word: 'bag', translation: 'תיק', pronunciation: '/bæɡ/', example: 'I carry a bag.' },
        { id: 'w162', word: 'bottle', translation: 'בקבוק', pronunciation: '/ˈbɒtl/', example: 'A bottle of water.' },
        { id: 'w163', word: 'cup', translation: 'כוס', pronunciation: '/kʌp/', example: 'Drink from the cup.' },
        { id: 'w164', word: 'plate', translation: 'צלחת', pronunciation: '/pleɪt/', example: 'Put food on the plate.' },
        { id: 'w165', word: 'knife', translation: 'סכין', pronunciation: '/naɪf/', example: 'Cut with a knife.' },
        { id: 'w166', word: 'fork', translation: 'מזלג', pronunciation: '/fɔːrk/', example: 'Eat with a fork.' },
        { id: 'w167', word: 'spoon', translation: 'כף', pronunciation: '/spuːn/', example: 'Stir with a spoon.' },
        { id: 'w168', word: 'bread', translation: 'לחם', pronunciation: '/bred/', example: 'I like fresh bread.' },
        { id: 'w169', word: 'meat', translation: 'בשר', pronunciation: '/miːt/', example: 'Do you eat meat?' },
        { id: 'w170', word: 'milk', translation: 'חלב', pronunciation: '/mɪlk/', example: 'Drink milk every day.' },
        { id: 'w171', word: 'cheese', translation: 'גבינה', pronunciation: '/tʃiːz/', example: 'I love cheese.' },
        { id: 'w172', word: 'egg', translation: 'ביצה', pronunciation: '/eɡ/', example: 'Boil an egg.' },
        { id: 'w173', word: 'fruit', translation: 'פרי', pronunciation: '/fruːt/', example: 'Eat more fruit.' },
        { id: 'w174', word: 'vegetable', translation: 'ירק', pronunciation: '/ˈvedʒtəbl/', example: 'Carrots are vegetables.' },
        { id: 'w175', word: 'sugar', translation: 'סוכר', pronunciation: '/ˈʃʊɡər/', example: 'Add some sugar.' },
        { id: 'w176', word: 'salt', translation: 'מלח', pronunciation: '/sɔːlt/', example: 'Pass the salt.' },
        { id: 'w177', word: 'coffee', translation: 'קפה', pronunciation: '/ˈkɒfi/', example: 'I drink coffee every morning.' },
        { id: 'w178', word: 'tea', translation: 'תה', pronunciation: '/tiː/', example: 'Would you like some tea?' },
        { id: 'w179', word: 'juice', translation: 'מיץ', pronunciation: '/dʒuːs/', example: 'Orange juice is my favorite.' },
        { id: 'w180', word: 'wine', translation: 'יין', pronunciation: '/waɪn/', example: 'Red wine is good.' },
        { id: 'w181', word: 'beer', translation: 'בירה', pronunciation: '/bɪər/', example: 'He likes beer.' },
        { id: 'w182', word: 'restaurant', translation: 'מסעדה', pronunciation: '/ˈrestərɒnt/', example: 'Let\'s go to a restaurant.' },
        { id: 'w183', word: 'hotel', translation: 'מלון', pronunciation: '/hoʊˈtel/', example: 'Stay in a hotel.' },
        { id: 'w184', word: 'bank', translation: 'בנק', pronunciation: '/bæŋk/', example: 'I need to go to the bank.' },
        { id: 'w185', word: 'post office', translation: 'סניף דואר', pronunciation: '/poʊst ˈɒfɪs/', example: 'Send a letter at the post office.' },
        { id: 'w186', word: 'library', translation: 'ספרייה', pronunciation: '/ˈlaɪbrəri/', example: 'Borrow books from the library.' },
        { id: 'w187', word: 'museum', translation: 'מוזיאון', pronunciation: '/mjuːˈziːəm/', example: 'Visit the museum.' },
        { id: 'w188', word: 'church', translation: 'כנסייה', pronunciation: '/tʃɜːrtʃ/', example: 'Go to church on Sunday.' },
        { id: 'w189', word: 'mosque', translation: 'מסגד', pronunciation: '/mɒsk/', example: 'Pray at the mosque.' },
        { id: 'w190', word: 'synagogue', translation: 'בית כנסת', pronunciation: '/ˈsɪnəɡɒɡ/', example: 'Attend services at the synagogue.' },
        { id: 'w191', word: 'police station', translation: 'תחנת משטרה', pronunciation: '/pəˈliːs ˈsteɪʃn/', example: 'Report to the police station.' },
        { id: 'w192', word: 'fire station', translation: 'תחנת כיבוי אש', pronunciation: '/ˈfaɪər ˈsteɪʃn/', example: 'The fire station is nearby.' },
        { id: 'w193', word: 'park', translation: 'פארק', pronunciation: '/pɑːrk/', example: 'Let\'s walk in the park.' },
        { id: 'w194', word: 'beach', translation: 'חוף ים', pronunciation: '/biːtʃ/', example: 'I love going to the beach.' },
        { id: 'w195', word: 'mountain', translation: 'הר', pronunciation: '/ˈmaʊntɪn/', example: 'Climb a high mountain.' },
        { id: 'w196', word: 'river', translation: 'נהר', pronunciation: '/ˈrɪvər/', example: 'Swim in the river.' },
        { id: 'w197', word: 'lake', translation: 'אגם', pronunciation: '/leɪk/', example: 'The lake is calm.' },
        { id: 'w198', word: 'ocean', translation: 'אוקיינוס', pronunciation: '/ˈoʊʃn/', example: 'The ocean is vast.' },
        { id: 'w199', word: 'island', translation: 'אי', pronunciation: '/ˈaɪlənd/', example: 'We visited a beautiful island.' },
        { id: 'w200', word: 'forest', translation: 'יער', pronunciation: '/ˈfɒrɪst/', example: 'Walk through the forest.' },
        { id: 'w201', word: 'desert', translation: 'מדבר', pronunciation: '/ˈdezərt/', example: 'The desert is very dry.' },
        { id: 'w202', word: 'valley', translation: 'עמק', pronunciation: '/ˈvæli/', example: 'The valley is green.' },
        { id: 'w203', word: 'hill', translation: 'גבעה', pronunciation: '/hɪl/', example: 'Climb up the hill.' },
        { id: 'w204', word: 'stone', translation: 'אבן', pronunciation: '/stoʊn/', example: 'Throw a stone.' },
        { id: 'w205', word: 'metal', translation: 'מתכת', pronunciation: '/ˈmetl/', example: 'This table is made of metal.' },
        { id: 'w206', word: 'wood', translation: 'עץ (חומר)', pronunciation: '/wʊd/', example: 'The chair is made of wood.' },
        { id: 'w207', word: 'plastic', translation: 'פלסטיק', pronunciation: '/ˈplæstɪk/', example: 'Plastic bottles are recyclable.' },
        { id: 'w208', word: 'glass', translation: 'זכוכית', pronunciation: '/ɡlɑːs/', example: 'Be careful with glass.' },
        { id: 'w209', word: 'cloth', translation: 'בד', pronunciation: '/klɒθ/', example: 'The cloth is soft.' },
        { id: 'w210', word: 'paper', translation: 'נייר', pronunciation: '/ˈpeɪpər/', example: 'Write on the paper.' },
        { id: 'w211', word: 'thread', translation: 'חוט', pronunciation: '/θred/', example: 'Sew with a thread.' },
        { id: 'w212', word: 'needle', translation: 'מחט', pronunciation: '/ˈniːdl/', example: 'A needle is sharp.' },
        { id: 'w213', word: 'scissors', translation: 'מספריים', pronunciation: '/ˈsɪzərz/', example: 'Cut with scissors.' },
        { id: 'w214', word: 'tool', translation: 'כלי עבודה', pronunciation: '/tuːl/', example: 'He has many tools.' },
        { id: 'w215', word: 'machine', translation: 'מכונה', pronunciation: '/məˈʃiːn/', example: 'This machine is old.' },
        { id: 'w216', word: 'engine', translation: 'מנוע', pronunciation: '/ˈendʒɪn/', example: 'The car\'s engine is strong.' },
        { id: 'w217', word: 'motor', translation: 'מנוע', pronunciation: '/ˈmoʊtər/', example: 'The motor needs repair.' },
        { id: 'w218', word: 'power', translation: 'כוח / חשמל', pronunciation: '/ˈpaʊər/', example: 'Turn on the power.' },
        { id: 'w219', word: 'energy', translation: 'אנרגיה', pronunciation: '/ˈenərdʒi/', example: 'Save energy.' },
        { id: 'w220', word: 'heat', translation: 'חום', pronunciation: '/hiːt/', example: 'Feel the heat.' },
        { id: 'w221', word: 'cold', translation: 'קור', pronunciation: '/koʊld/', example: 'The cold weather.' },
        { id: 'w222', word: 'temperature', translation: 'טמפרטורה', pronunciation: '/ˈtemprətʃər/', example: 'What\'s the temperature?' },
        { id: 'w223', word: 'pressure', translation: 'לחץ', pronunciation: '/ˈpreʃər/', example: 'High pressure.' },
        { id: 'w224', word: 'force', translation: 'כוח', pronunciation: '/fɔːrs/', example: 'Use more force.' },
        { id: 'w225', word: 'speed', translation: 'מהירות', pronunciation: '/spiːd/', example: 'Drive at high speed.' },
        { id: 'w226', word: 'distance', translation: 'מרחק', pronunciation: '/ˈdɪstəns/', example: 'What\'s the distance?' },
        { id: 'w227', word: 'direction', translation: 'כיוון', pronunciation: '/dəˈrekʃn/', example: 'Which direction?' },
        { id: 'w228', word: 'map', translation: 'מפה', pronunciation: '/mæp/', example: 'Look at the map.' },
        { id: 'w229', word: 'flag', translation: 'דגל', pronunciation: '/flæɡ/', example: 'Raise the flag.' },
        { id: 'w230', word: 'border', translation: 'גבול', pronunciation: '/ˈbɔːrdər/', example: 'Cross the border.' },
        { id: 'w231', word: 'capital', translation: 'בירה (עיר)', pronunciation: '/ˈkæpɪtl/', example: 'Paris is the capital of France.' },
        { id: 'w232', word: 'government', translation: 'ממשלה', pronunciation: '/ˈɡʌvərmənt/', example: 'The government made a decision.' },
        { id: 'w233', word: 'law', translation: 'חוק', pronunciation: '/lɔː/', example: 'Obey the law.' },
        { id: 'w234', word: 'right', translation: 'זכות', pronunciation: '/raɪt/', example: 'Everyone has rights.' },
        { id: 'w235', word: 'duty', translation: 'חובה', pronunciation: '/ˈduːti/', example: 'It\'s your duty.' },
        { id: 'w236', word: 'war', translation: 'מלחמה', pronunciation: '/wɔːr/', example: 'Avoid war.' },
        { id: 'w237', word: 'peace', translation: 'שלום', pronunciation: '/piːs/', example: 'We want peace.' },
        { id: 'w238', word: 'army', translation: 'צבא', pronunciation: '/ˈɑːrmi/', example: 'Join the army.' },
        { id: 'w239', word: 'soldier', translation: 'חייל', pronunciation: '/ˈsoʊldʒər/', example: 'A brave soldier.' },
        { id: 'w240', word: 'weapon', translation: 'נשק', pronunciation: '/ˈwepən/', example: 'He carried a weapon.' },
        { id: 'w241', word: 'attack', translation: 'התקפה', pronunciation: '/əˈtæk/', example: 'They launched an attack.' },
        { id: 'w242', word: 'defense', translation: 'הגנה', pronunciation: '/dɪˈfens/', example: 'Self-defense is important.' },
        { id: 'w243', word: 'victory', translation: 'ניצחון', pronunciation: '/ˈvɪktəri/', example: 'Celebrate the victory.' },
        { id: 'w244', word: 'defeat', translation: 'תבוסה', pronunciation: '/dɪˈfiːt/', example: 'Accept defeat gracefully.' },
        { id: 'w245', word: 'freedom', translation: 'חופש', pronunciation: '/ˈfriːdəm/', example: 'Freedom of speech.' },
        { id: 'w246', word: 'justice', translation: 'צדק', pronunciation: '/ˈdʒʌstɪs/', example: 'Seek justice.' },
        { id: 'w247', word: 'crime', translation: 'פשע', pronunciation: '/kraɪm/', example: 'He committed a crime.' },
        { id: 'w248', word: 'police', translation: 'משטרה', pronunciation: '/pəˈliːs/', example: 'Call the police.' },
        { id: 'w249', word: 'prison', translation: 'כלא', pronunciation: '/ˈprɪzn/', example: 'He was sent to prison.' },
        { id: 'w250', word: 'court', translation: 'בית משפט', pronunciation: '/kɔːrt/', example: 'Go to court.' },
        { id: 'w251', word: 'judge', translation: 'שופט', pronunciation: '/dʒʌdʒ/', example: 'The judge made a decision.' },
        { id: 'w252', word: 'lawyer', translation: 'עורך דין', pronunciation: '/ˈlɔːjər/', example: 'Hire a lawyer.' },
        { id: 'w253', word: 'evidence', translation: 'ראיה', pronunciation: '/ˈevɪdəns/', example: 'Gather evidence.' },
        { id: 'w254', word: 'truth', translation: 'אמת', pronunciation: '/truːθ/', example: 'The truth will set you free.' },
        { id: 'w255', word: 'lie', translation: 'שקר', pronunciation: '/laɪ/', example: 'He told a lie.' },
        { id: 'w256', word: 'fact', translation: 'עובדה', pronunciation: '/fækt/', example: 'That\'s a proven fact.' },
        { id: 'w257', word: 'opinion', translation: 'דעה', pronunciation: '/əˈpɪnjən/', example: 'What\'s your opinion?' },
        { id: 'w258', word: 'belief', translation: 'אמונה', pronunciation: '/bɪˈliːf/', example: 'He has strong beliefs.' },
        { id: 'w259', word: 'religion', translation: 'דת', pronunciation: '/rɪˈlɪdʒən/', example: 'Freedom of religion.' },
        { id: 'w260', word: 'God', translation: 'אלוהים', pronunciation: '/ɡɒd/', example: 'Believe in God.' },
        { id: 'w261', word: 'heaven', translation: 'גן עדן / שמיים', pronunciation: '/ˈhevn/', example: 'Angels in heaven.' },
        { id: 'w262', word: 'hell', translation: 'גיהנום', pronunciation: '/hel/', example: 'A hot hell.' },
        { id: 'w263', word: 'angel', translation: 'מלאך', pronunciation: '/ˈeɪndʒəl/', example: 'An angel appeared.' },
        { id: 'w264', word: 'devil', translation: 'שטן', pronunciation: '/ˈdevl/', example: 'The devil is tempting.' },
        { id: 'w265', word: 'spirit', translation: 'רוח', pronunciation: '/ˈspɪrɪt/', example: 'A free spirit.' },
        { id: 'w266', word: 'soul', translation: 'נשמה', pronunciation: '/soʊl/', example: 'A pure soul.' },
        { id: 'w267', word: 'mind', translation: 'מוח / נפש', pronunciation: '/maɪnd/', example: 'A sharp mind.' },
        { id: 'w268', word: 'body', translation: 'גוף', pronunciation: '/ˈbɒdi/', example: 'Keep your body active.' },
        { id: 'w269', word: 'heart', translation: 'לב', pronunciation: '/hɑːrt/', example: 'My heart beats fast.' },
        { id: 'w270', word: 'feeling', translation: 'רגש', pronunciation: '/ˈfiːlɪŋ/', example: 'He hurt my feelings.' },
        { id: 'w271', word: 'emotion', translation: 'רגש', pronunciation: '/ɪˈmoʊʃn/', example: 'Love is a strong emotion.' },
        { id: 'w272', word: 'pain', translation: 'כאב', pronunciation: '/peɪn/', example: 'I feel pain.' },
        { id: 'w273', word: 'pleasure', translation: 'עונג', pronunciation: '/ˈpleʒər/', example: 'It was a great pleasure.' },
        { id: 'w274', word: 'happiness', translation: 'אושר', pronunciation: '/ˈhæpinəs/', example: 'Seek happiness.' },
        { id: 'w275', word: 'sadness', translation: 'עצב', pronunciation: '/ˈsædnəs/', example: 'Feelings of sadness.' },
        { id: 'w276', word: 'anger', translation: 'כעס', pronunciation: '/ˈæŋɡər/', example: 'He showed his anger.' },
        { id: 'w277', word: 'fear', translation: 'פחד', pronunciation: '/fɪər/', example: 'Overcome your fears.' },
        { id: 'w278', word: 'love', translation: 'אהבה', pronunciation: '/lʌv/', example: 'I love you.' },
        { id: 'w279', word: 'hate', translation: 'שנאה', pronunciation: '/heɪt/', example: 'Hate is a strong emotion.' },
        { id: 'w280', word: 'hope', translation: 'תקווה', pronunciation: '/hoʊp/', example: 'Never lose hope.' },
        { id: 'w281', word: 'dream', translation: 'חלום', pronunciation: '/driːm/', example: 'I had a good dream.' },
        { id: 'w282', word: 'memory', translation: 'זיכרון', pronunciation: '/ˈmeməri/', example: 'I have a good memory.' },
        { id: 'w283', word: 'thought', translation: 'מחשבה', pronunciation: '/θɔːt/', example: 'A deep thought.' },
        { id: 'w284', word: 'idea', translation: 'רעיון', pronunciation: '/aɪˈdiːə/', example: 'That\'s a brilliant idea.' },
        { id: 'w285', word: 'knowledge', translation: 'ידע', pronunciation: '/ˈnɒlɪdʒ/', example: 'Knowledge is power.' },
        { id: 'w286', word: 'wisdom', translation: 'חוכמה', pronunciation: '/ˈwɪzdəm/', example: 'He is full of wisdom.' },
        { id: 'w287', word: 'skill', translation: 'מיומנות', pronunciation: '/skɪl/', example: 'He has great skills.' },
        { id: 'w288', word: 'talent', translation: 'כישרון', pronunciation: '/ˈtælənt/', example: 'She has a musical talent.' },
        { id: 'w289', word: 'art', translation: 'אמנות', pronunciation: '/ɑːrt/', example: 'I love modern art.' },
        { id: 'w290', word: 'music', translation: 'מוזיקה', pronunciation: '/ˈmjuːzɪk/', example: 'Listen to music.' },
        { id: 'w291', word: 'song', translation: 'שיר', pronunciation: '/sɒŋ/', example: 'Sing a happy song.' },
        { id: 'w292', word: 'dance', translation: 'ריקוד', pronunciation: '/dæns/', example: 'Learn to dance.' },
        { id: 'w293', word: 'play', translation: 'מחזה / משחק', pronunciation: '/pleɪ/', example: 'Let\'s play a game.' },
        { id: 'w294', word: 'book', translation: 'ספר', pronunciation: '/bʊk/', example: 'Read a book.' },
        { id: 'w295', word: 'story', translation: 'סיפור', pronunciation: '/ˈstɔːri/', example: 'Tell a long story.' },
        { id: 'w296', word: 'poem', translation: 'שיר (פואמה)', pronunciation: '/ˈpoʊɪm/', example: 'Read a beautiful poem.' },
        { id: 'w297', word: 'writer', translation: 'סופר/ת', pronunciation: '/ˈraɪtər/', example: 'He is a famous writer.' },
        { id: 'w298', word: 'artist', translation: 'אמן/ית', pronunciation: '/ˈɑːrtɪst/', example: 'She is a talented artist.' },
        { id: 'w299', word: 'musician', translation: 'מוזיקאי/ת', pronunciation: '/mjuːˈzɪʃn/', example: 'He is a great musician.' },
        { id: 'w300', word: 'actor', translation: 'שחקן/ית', pronunciation: '/ˈæktər/', example: 'He is a Hollywood actor.' },
        { id: 'w301', word: 'singer', translation: 'זמר/ת', pronunciation: '/ˈsɪŋər/', example: 'She is a pop singer.' },
        { id: 'w302', word: 'dancer', translation: 'רקדן/ית', pronunciation: '/ˈdænsər/', example: 'A professional dancer.' },
        { id: 'w303', word: 'student', translation: 'תלמיד/ה', pronunciation: '/ˈstuːdənt/', example: 'She is a university student.' },
        { id: 'w304', word: 'teacher', translation: 'מורה', pronunciation: '/ˈtiːtʃər/', example: 'My teacher is very patient.' },
        { id: 'w305', word: 'doctor', translation: 'רופא/ה', pronunciation: '/ˈdɒktər/', example: 'See the doctor for a check-up.' },
        { id: 'w306', word: 'nurse', translation: 'אחות', pronunciation: '/nɜːrs/', example: 'The nurse took my temperature.' },
        { id: 'w307', word: 'engineer', translation: 'מהנדס/ת', pronunciation: '/ˌendʒɪˈnɪər/', example: 'He works as an engineer.' },
        { id: 'w308', word: 'scientist', translation: 'מדען/ית', pronunciation: '/ˈsaɪəntɪst/', example: 'Scientists study the world.' },
        { id: 'w309', word: 'worker', translation: 'עובד/ת', pronunciation: '/ˈwɜːrkər/', example: 'A hard-working person.' },
        { id: 'w310', word: 'boss', translation: 'בוס/ית', pronunciation: '/bɒs/', example: 'My boss is fair.' },
        { id: 'w311', word: 'colleague', translation: 'עמית/ה לעבודה', pronunciation: '/ˈkɒliːɡ/', example: 'Talk to your colleague.' },
        { id: 'w312', word: 'customer', translation: 'לקוח/ה', pronunciation: '/ˈkʌstəmər/', example: 'Serve the customer.' },
        { id: 'w313', word: 'manager', translation: 'מנהל/ת', pronunciation: '/ˈmænɪdʒər/', example: 'She is the manager of the store.' },
        { id: 'w314', word: 'owner', translation: 'בעל/ת', pronunciation: '/ˈoʊnər/', example: 'Who is the owner of this car?' },
        { id: 'w315', word: 'president', translation: 'נשיא/ה', pronunciation: '/ˈprezɪdənt/', example: 'The president gave a speech.' },
        { id: 'w316', word: 'king', translation: 'מלך', pronunciation: '/kɪŋ/', example: 'The king ruled wisely.' },
        { id: 'w317', word: 'queen', translation: 'מלכה', pronunciation: '/kwiːn/', example: 'The queen wore a crown.' },
        { id: 'w318', word: 'prince', translation: 'נסיך', pronunciation: '/prɪns/', example: 'The prince is next in line.' },
        { id: 'w319', word: 'princess', translation: 'נסיכה', pronunciation: '/prɪnˈses/', example: 'The princess is beautiful.' },
        { id: 'w320', word: 'hero', translation: 'גיבור', pronunciation: '/ˈhɪəroʊ/', example: 'He is a true hero.' },
        { id: 'w321', word: 'villain', translation: 'נבל', pronunciation: '/ˈvɪlən/', example: 'The villain was defeated.' },
        { id: 'w322', word: 'friend', translation: 'חבר/ה', pronunciation: '/frend/', example: 'My best friend.' },
        { id: 'w323', word: 'neighbor', translation: 'שכן/ה', pronunciation: '/ˈneɪbər/', example: 'My neighbor is friendly.' },
        { id: 'w324', word: 'guest', translation: 'אורח/ת', pronunciation: '/ɡest/', example: 'Welcome our guests.' },
        { id: 'w325', word: 'stranger', translation: 'זר/ה', pronunciation: '/ˈstreɪndʒər/', example: 'Don\'t talk to strangers.' },
        { id: 'w326', word: 'group', translation: 'קבוצה', pronunciation: '/ɡruːp/', example: 'A group of students.' },
        { id: 'w327', word: 'team', translation: 'קבוצה', pronunciation: '/tiːm/', example: 'Our team won the game.' },
        { id: 'w328', word: 'crowd', translation: 'קהל / המון', pronunciation: '/kraʊd/', example: 'A large crowd gathered.' },
        { id: 'w329', word: 'meeting', translation: 'פגישה', pronunciation: '/ˈmiːtɪŋ/', example: 'I have a meeting at 10 AM.' },
        { id: 'w330', word: 'party', translation: 'מסיבה', pronunciation: '/ˈpɑːrti/', example: 'We went to a party.' },
        { id: 'w331', word: 'event', translation: 'אירוע', pronunciation: '/ɪˈvent/', example: 'A special event.' },
        { id: 'w332', word: 'holiday', translation: 'חג / חופשה', pronunciation: '/ˈhɒlɪdeɪ/', example: 'Happy holidays!' },
        { id: 'w333', word: 'vacation', translation: 'חופשה', pronunciation: '/veɪˈkeɪʃn/', example: 'I\'m on vacation.' },
        { id: 'w334', word: 'trip', translation: 'טיול', pronunciation: '/trɪp/', example: 'We took a trip to Italy.' },
        { id: 'w335', word: 'journey', translation: 'מסע', pronunciation: '/ˈdʒɜːrni/', example: 'A long journey.' },
        { id: 'w336', word: 'travel', translation: 'נסיעה', pronunciation: '/ˈtrævl/', example: 'I love to travel.' },
        { id: 'w337', word: 'ticket', translation: 'כרטיס', pronunciation: '/ˈtɪkɪt/', example: 'Buy a ticket.' },
        { id: 'w338', word: 'passport', translation: 'דרכון', pronunciation: '/ˈpæspɔːrt/', example: 'Show your passport.' },
        { id: 'w339', word: 'luggage', translation: 'מזוודות', pronunciation: '/ˈlʌɡɪdʒ/', example: 'Carry your luggage.' },
        { id: 'w340', word: 'bag', translation: 'תיק', pronunciation: '/bæɡ/', example: 'My bag is heavy.' },
        { id: 'w341', word: 'map', translation: 'מפה', pronunciation: '/mæp/', example: 'Check the map.' },
        { id: 'w342', word: 'guide', translation: 'מדריך', pronunciation: '/ɡaɪd/', example: 'A tourist guide.' },
        { id: 'w343', word: 'tourist', translation: 'תייר/ת', pronunciation: '/ˈtʊrɪst/', example: 'Many tourists visit.' },
        { id: 'w344', word: 'hotel', translation: 'מלון', pronunciation: '/hoʊˈtel/', example: 'Book a hotel room.' },
        { id: 'w345', word: 'room', translation: 'חדר', pronunciation: '/ruːm/', example: 'My room is clean.' },
        { id: 'w346', word: 'bed', translation: 'מיטה', pronunciation: '/bed/', example: 'Sleep in bed.' },
        { id: 'w347', word: 'food', translation: 'אוכל', pronunciation: '/fuːd/', example: 'Delicious food.' },
        { id: 'w348', word: 'drink', translation: 'שתייה', pronunciation: '/drɪŋk/', example: 'What would you like to drink?' },
        { id: 'w349', word: 'meal', translation: 'ארוחה', pronunciation: '/miːl/', example: 'Enjoy your meal.' },
        { id: 'w350', word: 'breakfast', translation: 'ארוחת בוקר', pronunciation: '/ˈbrekfəst/', example: 'Eat breakfast.' },
        { id: 'w351', word: 'lunch', translation: 'ארוחת צהריים', pronunciation: '/lʌntʃ/', example: 'Have lunch.' },
        { id: 'w352', word: 'dinner', translation: 'ארוחת ערב', pronunciation: '/ˈdɪnər/', example: 'Cook dinner.' },
        { id: 'w353', word: 'snack', translation: 'חטיף', pronunciation: '/snæk/', example: 'I need a snack.' },
        { id: 'w354', word: 'dessert', translation: 'קינוח', pronunciation: '/dɪˈzɜːrt/', example: 'Chocolate cake for dessert.' },
        { id: 'w355', word: 'fruit', translation: 'פרי', pronunciation: '/fruːt/', example: 'An apple is a fruit.' },
        { id: 'w356', word: 'vegetable', translation: 'ירק', pronunciation: '/ˈvedʒtəbl/', example: 'Eat your vegetables.' },
        { id: 'w357', word: 'meat', translation: 'בשר', pronunciation: '/miːt/', example: 'Grilled meat.' },
        { id: 'w358', word: 'fish', translation: 'דג', pronunciation: '/fɪʃ/', example: 'Fresh fish.' },
        { id: 'w359', word: 'chicken', translation: 'עוף', pronunciation: '/ˈtʃɪkɪn/', example: 'Roasted chicken.' },
        { id: 'w360', word: 'bread', translation: 'לחם', pronunciation: '/bred/', example: 'A slice of bread.' },
        { id: 'w361', word: 'rice', translation: 'אורז', pronunciation: '/raɪs/', example: 'Eat rice with chicken.' },
        { id: 'w362', word: 'potato', translation: 'תפוח אדמה', pronunciation: '/pəˈteɪtoʊ/', example: 'Baked potato.' },
        { id: 'w363', word: 'salad', translation: 'סלט', pronunciation: '/ˈsæləd/', example: 'A fresh salad.' },
        { id: 'w364', word: 'soup', translation: 'מרק', pronunciation: '/suːp/', example: 'Hot soup.' },
        { id: 'w365', word: 'sandwich', translation: 'כריך', pronunciation: '/ˈsænwɪtʃ/', example: 'Make a sandwich.' },
        { id: 'w366', word: 'pizza', translation: 'פיצה', pronunciation: '/ˈpiːtsə/', example: 'Order pizza.' },
        { id: 'w367', word: 'pasta', translation: 'פסטה', pronunciation: '/ˈpæstə/', example: 'Cook pasta.' },
        { id: 'w368', word: 'sugar', translation: 'סוכר', pronunciation: '/ˈʃʊɡər/', example: 'Sugar in your coffee.' },
        { id: 'w369', word: 'salt', translation: 'מלח', pronunciation: '/sɔːlt/', example: 'Add salt to taste.' },
        { id: 'w370', word: 'pepper', translation: 'פלפל', pronunciation: '/ˈpepər/', example: 'Black pepper.' },
        { id: 'w371', word: 'oil', translation: 'שמן', pronunciation: '/ɔɪl/', example: 'Cooking oil.' },
        { id: 'w372', word: 'butter', translation: 'חמאה', pronunciation: '/ˈbʌtər/', example: 'Bread and butter.' },
        { id: 'w373', word: 'milk', translation: 'חלב', pronunciation: '/mɪlk/', example: 'Pour milk into a glass.' },
        { id: 'w374', word: 'cheese', translation: 'גבינה', pronunciation: '/tʃiːz/', example: 'A slice of cheese.' },
        { id: 'w375', word: 'egg', translation: 'ביצה', pronunciation: '/eɡ/', example: 'Fry an egg.' },
        { id: 'w376', word: 'water', translation: 'מים', pronunciation: '/ˈwɔːtər/', example: 'Drink plenty of water.' },
        { id: 'w377', word: 'coffee', translation: 'קפה', pronunciation: '/ˈkɒfi/', example: 'A cup of coffee.' },
        { id: 'w378', word: 'tea', translation: 'תה', pronunciation: '/tiː/', example: 'Hot tea.' },
        { id: 'w379', word: 'juice', translation: 'מיץ', pronunciation: '/dʒuːs/', example: 'Apple juice.' },
        { id: 'w380', word: 'wine', translation: 'יין', pronunciation: '/waɪn/', example: 'A glass of wine.' },
        { id: 'w381', word: 'beer', translation: 'בירה', pronunciation: '/bɪər/', example: 'Cold beer.' },
        { id: 'w382', word: 'bottle', translation: 'בקבוק', pronunciation: '/ˈbɒtl/', example: 'Fill the bottle.' },
        { id: 'w383', word: 'cup', translation: 'כוס', pronunciation: '/kʌp/', example: 'A coffee cup.' },
        { id: 'w384', word: 'glass', translation: 'כוס (זכוכית)', pronunciation: '/ɡlɑːs/', example: 'A glass of water.' },
        { id: 'w385', word: 'plate', translation: 'צלחת', pronunciation: '/pleɪt/', example: 'Clean the plate.' },
        { id: 'w386', word: 'knife', translation: 'סכין', pronunciation: '/naɪf/', example: 'Use a sharp knife.' },
        { id: 'w387', word: 'fork', translation: 'מזלג', pronunciation: '/fɔːrk/', example: 'Pick up with a fork.' },
        { id: 'w388', word: 'spoon', translation: 'כף', pronunciation: '/spuːn/', example: 'Eat with a spoon.' },
        // פעלים (Verbs):
        { id: 'w389', word: 'be', translation: 'להיות', pronunciation: '/biː/', example: 'To be or not to be.' },
        { id: 'w390', word: 'have', translation: 'יש ל / לאכול', pronunciation: '/hæv/', example: 'I have a car.' },
        { id: 'w391', word: 'do', translation: 'לעשות', pronunciation: '/duː/', example: 'What do you do?' },
        { id: 'w392', word: 'say', translation: 'לומר', pronunciation: '/seɪ/', example: 'Say hello.' },
        { id: 'w393', word: 'go', translation: 'ללכת', pronunciation: '/ɡoʊ/', example: 'Let\'s go home.' },
        { id: 'w394', word: 'come', translation: 'לבוא', pronunciation: '/kʌm/', example: 'Come here.' },
        { id: 'w395', word: 'see', translation: 'לראות', pronunciation: '/siː/', example: 'I can see you.' },
        { id: 'w396', word: 'make', translation: 'לעשות / להכין', pronunciation: '/meɪk/', example: 'Make a cake.' },
        { id: 'w397', word: 'get', translation: 'לקבל / להגיע', pronunciation: '/ɡet/', example: 'Get a new book.' },
        { id: 'w398', word: 'know', translation: 'לדעת', pronunciation: '/noʊ/', example: 'I know the answer.' },
        { id: 'w399', word: 'think', translation: 'לחשוב', pronunciation: '/θɪŋk/', example: 'Think about it.' },
        { id: 'w400', word: 'take', translation: 'לקחת', pronunciation: '/teɪk/', example: 'Take a break.' },
        { id: 'w401', word: 'give', translation: 'לתת', pronunciation: '/ɡɪv/', example: 'Give me your hand.' },
        { id: 'w402', word: 'find', translation: 'למצוא', pronunciation: '/faɪnd/', example: 'Did you find your keys?' },
        { id: 'w403', word: 'tell', translation: 'לספר', pronunciation: '/tel/', example: 'Tell me a story.' },
        { id: 'w404', word: 'ask', translation: 'לשאול', pronunciation: '/æsk/', example: 'Ask a question.' },
        { id: 'w405', word: 'work', translation: 'לעבוד', pronunciation: '/wɜːrk/', example: 'Work hard.' },
        { id: 'w406', word: 'call', translation: 'לקרוא / להתקשר', pronunciation: '/kɔːl/', example: 'Call me later.' },
        { id: 'w407', word: 'try', translation: 'לנסות', pronunciation: '/traɪ/', example: 'Try your best.' },
        { id: 'w408', word: 'need', translation: 'להזדקק', pronunciation: '/niːd/', example: 'I need help.' },
        { id: 'w409', word: 'feel', translation: 'להרגיש', pronunciation: '/fiːl/', example: 'How do you feel?' },
        { id: 'w410', word: 'become', translation: 'להפוך ל', pronunciation: '/bɪˈkʌm/', example: 'He became a doctor.' },
        { id: 'w411', word: 'leave', translation: 'לעזוב', pronunciation: '/liːv/', example: 'Don\'t leave yet.' },
        { id: 'w412', word: 'put', translation: 'לשים', pronunciation: '/pʊt/', example: 'Put it on the table.' },
        { id: 'w413', word: 'mean', translation: 'להתכוון / לומר', pronunciation: '/miːn/', example: 'What do you mean?' },
        { id: 'w414', word: 'keep', translation: 'לשמור', pronunciation: '/kiːp/', example: 'Keep it safe.' },
        { id: 'w415', word: 'let', translation: 'לתת ל / לאפשר', pronunciation: '/let/', example: 'Let me go.' },
        { id: 'w416', word: 'begin', translation: 'להתחיל', pronunciation: '/bɪˈɡɪn/', example: 'Let\'s begin.' },
        { id: 'w417', word: 'start', translation: 'להתחיל', pronunciation: '/stɑːrt/', example: 'Start now.' },
        { id: 'w418', word: 'show', translation: 'להראות', pronunciation: '/ʃoʊ/', example: 'Show me.' },
        { id: 'w419', word: 'hear', translation: 'לשמוע', pronunciation: '/hɪər/', example: 'Can you hear me?' },
        { id: 'w420', word: 'play', translation: 'לשחק / לנגן', pronunciation: '/pleɪ/', example: 'Play football.' },
        { id: 'w421', word: 'run', translation: 'לרוץ', pronunciation: '/rʌn/', example: 'Run fast.' },
        { id: 'w422', word: 'move', translation: 'לזוז', pronunciation: '/muːv/', example: 'Don\'t move.' },
        { id: 'w423', word: 'live', translation: 'לחיות', pronunciation: '/lɪv/', example: 'Where do you live?' },
        { id: 'w424', word: 'believe', translation: 'להאמין', pronunciation: '/bɪˈliːv/', example: 'I believe you.' },
        { id: 'w425', word: 'bring', translation: 'להביא', pronunciation: '/brɪŋ/', example: 'Bring me water.' },
        { id: 'w426', word: 'happen', translation: 'לקרות', pronunciation: '/ˈhæpən/', example: 'What happened?' },
        { id: 'w427', word: 'write', translation: 'לכתוב', pronunciation: '/raɪt/', example: 'Write a letter.' },
        { id: 'w428', word: 'sit', translation: 'לשבת', pronunciation: '/sɪt/', example: 'Sit down.' },
        { id: 'w429', word: 'stand', translation: 'לעמוד', pronunciation: '/stænd/', example: 'Stand up.' },
        { id: 'w430', word: 'lose', translation: 'לאבד', pronunciation: '/luːz/', example: 'Don\'t lose your keys.' },
        { id: 'w431', word: 'pay', translation: 'לשלם', pronunciation: '/peɪ/', example: 'Pay the bill.' },
        { id: 'w432', word: 'meet', translation: 'לפגוש', pronunciation: '/miːt/', example: 'Meet me at the cafe.' },
        { id: 'w433', word: 'include', translation: 'לכלול', pronunciation: '/ɪnˈkluːd/', example: 'Does it include tax?' },
        { id: 'w434', word: 'continue', translation: 'להמשיך', pronunciation: '/kənˈtɪnjuː/', example: 'Continue working.' },
        { id: 'w435', word: 'set', translation: 'לקבוע / להניח', pronunciation: '/set/', example: 'Set the table.' },
        { id: 'w436', word: 'learn', translation: 'ללמוד', pronunciation: '/lɜːrn/', example: 'Learn English.' },
        { id: 'w437', word: 'change', translation: 'לשנות', pronunciation: '/tʃeɪndʒ/', example: 'Change your clothes.' },
        { id: 'w438', word: 'understand', translation: 'להבין', pronunciation: '/ˌʌndərˈstænd/', example: 'Do you understand?' },
        { id: 'w439', word: 'watch', translation: 'לצפות', pronunciation: '/wɒtʃ/', example: 'Watch a movie.' },
        { id: 'w440', word: 'follow', translation: 'לעקוב', pronunciation: '/ˈfɒloʊ/', example: 'Follow me.' },
        { id: 'w441', word: 'stop', translation: 'לעצור', pronunciation: '/stɒp/', example: 'Stop talking.' },
        { id: 'w442', word: 'create', translation: 'ליצור', pronunciation: '/kriˈeɪt/', example: 'Create something new.' },
        { id: 'w443', word: 'speak', translation: 'לדבר', pronunciation: '/spiːk/', example: 'Speak clearly.' },
        { id: 'w444', word: 'read', translation: 'לקרוא', pronunciation: '/riːd/', example: 'Read a book.' },
        { id: 'w445', word: 'add', translation: 'להוסיף', pronunciation: '/æd/', example: 'Add sugar.' },
        { id: 'w446', word: 'grow', translation: 'לגדול', pronunciation: '/ɡroʊ/', example: 'Plants grow fast.' },
        { id: 'w447', word: 'open', translation: 'לפתוח', pronunciation: '/ˈoʊpən/', example: 'Open the door.' },
        { id: 'w448', word: 'close', translation: 'לסגור', pronunciation: '/kloʊz/', example: 'Close the window.' },
        { id: 'w449', word: 'buy', translation: 'לקנות', pronunciation: '/baɪ/', example: 'Buy new clothes.' },
        { id: 'w450', word: 'sell', translation: 'למכור', pronunciation: '/sel/', example: 'Sell your car.' },
        { id: 'w451', word: 'send', translation: 'לשלוח', pronunciation: '/send/', example: 'Send a message.' },
        { id: 'w452', word: 'build', translation: 'לבנות', pronunciation: '/bɪld/', example: 'Build a house.' },
        { id: 'w453', word: 'fall', translation: 'ליפול', pronunciation: '/fɔːl/', example: 'Don\'t fall.' },
        { id: 'w454', word: 'win', translation: 'לנצח', pronunciation: '/wɪn/', example: 'Win the game.' },
        { id: 'w455', word: 'send', translation: 'לשלוח', pronunciation: '/send/', example: 'Send an email.' },
        { id: 'w456', word: 'receive', translation: 'לקבל', pronunciation: '/rɪˈsiːv/', example: 'Receive a gift.' },
        { id: 'w457', word: 'teach', translation: 'ללמד', pronunciation: '/tiːtʃ/', example: 'Teach English.' },
        { id: 'w458', word: 'learn', translation: 'ללמוד', pronunciation: '/lɜːrn/', example: 'Learn a new language.' },
        { id: 'w459', word: 'help', translation: 'לעזור', pronunciation: '/help/', example: 'Can you help me?' },
        { id: 'w460', word: 'agree', translation: 'להסכים', pronunciation: '/əˈɡriː/', example: 'I agree with you.' },
        { id: 'w461', word: 'disagree', translation: 'לא להסכים', pronunciation: '/ˌdɪsəˈɡriː/', example: 'I disagree.' },
        { id: 'w462', word: 'eat', translation: 'לאכול', pronunciation: '/iːt/', example: 'Eat your dinner.' },
        { id: 'w463', word: 'drink', translation: 'לשתות', pronunciation: '/drɪŋk/', example: 'Drink water.' },
        { id: 'w464', word: 'sleep', translation: 'לישון', pronunciation: '/sliːp/', example: 'Go to sleep.' },
        { id: 'w465', word: 'wake', translation: 'להתעורר', pronunciation: '/weɪk/', example: 'Wake up early.' },
        { id: 'w466', word: 'walk', translation: 'ללכת', pronunciation: '/wɔːk/', example: 'Walk in the park.' },
        { id: 'w467', word: 'run', translation: 'לרוץ', pronunciation: '/rʌn/', example: 'Run a marathon.' },
        { id: 'w468', word: 'jump', translation: 'לקפוץ', pronunciation: '/dʒʌmp/', example: 'Jump high.' },
        { id: 'w469', word: 'swim', translation: 'לשחות', pronunciation: '/swɪm/', example: 'Swim in the pool.' },
        { id: 'w470', word: 'drive', translation: 'לנהוג', pronunciation: '/draɪv/', example: 'Drive a car.' },
        { id: 'w471', word: 'fly', translation: 'לטוס', pronunciation: '/flaɪ/', example: 'Birds fly.' },
        { id: 'w472', word: 'sing', translation: 'לשיר', pronunciation: '/sɪŋ/', example: 'Sing a song.' },
        { id: 'w473', word: 'dance', translation: 'לרקוד', pronunciation: '/dæns/', example: 'Dance all night.' },
        { id: 'w474', word: 'laugh', translation: 'לצחוק', pronunciation: '/lɑːf/', example: 'Laugh loudly.' },
        { id: 'w475', word: 'cry', translation: 'לבכות', pronunciation: '/kraɪ/', example: 'Don\'t cry.' },
        { id: 'w476', word: 'smile', translation: 'לחייך', pronunciation: '/smaɪl/', example: 'She has a beautiful smile.' },
        { id: 'w477', word: 'look', translation: 'להסתכל', pronunciation: '/lʊk/', example: 'Look at me.' },
        { id: 'w478', word: 'listen', translation: 'להקשיב', pronunciation: '/ˈlɪsn/', example: 'Listen to the music.' },
        { id: 'w479', word: 'talk', translation: 'לדבר', pronunciation: '/tɔːk/', example: 'Let\'s talk.' },
        { id: 'w480', word: 'cut', translation: 'לחתוך', pronunciation: '/kʌt/', example: 'Cut the paper.' },
        { id: 'w481', word: 'clean', translation: 'לנקות', pronunciation: '/kliːn/', example: 'Clean your room.' },
        { id: 'w482', word: 'wash', translation: 'לשטוף', pronunciation: '/wɒʃ/', example: 'Wash your hands.' },
        { id: 'w483', word: 'cook', translation: 'לבשל', pronunciation: '/kʊk/', example: 'Cook dinner.' },
        { id: 'w484', word: 'bake', translation: 'לאפות', pronunciation: '/beɪk/', example: 'Bake a cake.' },
        { id: 'w485', word: 'fry', translation: 'לטגן', pronunciation: '/fraɪ/', example: 'Fry an egg.' },
        { id: 'w486', word: 'boil', translation: 'להרתיח', pronunciation: '/bɔɪl/', example: 'Boil water.' },
        { id: 'w487', word: 'mix', translation: 'לערבב', pronunciation: '/mɪks/', example: 'Mix the ingredients.' },
        { id: 'w488', word: 'pour', translation: 'למזוג', pronunciation: '/pɔːr/', example: 'Pour the tea.' },
        { id: 'w489', word: 'spread', translation: 'למרוח', pronunciation: '/spred/', example: 'Spread butter on bread.' },
        { id: 'w490', word: 'use', translation: 'להשתמש', pronunciation: '/juːz/', example: 'Use a pen.' },
        { id: 'w491', word: 'wear', translation: 'ללבוש', pronunciation: '/wer/', example: 'Wear a coat.' },
        { id: 'w492', word: 'put on', translation: 'ללבוש', pronunciation: '/pʊt ɒn/', example: 'Put on your shoes.' },
        { id: 'w493', word: 'take off', translation: 'להוריד (בגד)', pronunciation: '/teɪk ɒf/', example: 'Take off your hat.' },
        { id: 'w494', word: 'turn on', translation: 'להדליק', pronunciation: '/tɜːrn ɒn/', example: 'Turn on the light.' },
        { id: 'w495', word: 'turn off', translation: 'לכבות', pronunciation: '/tɜːrn ɒf/', example: 'Turn off the TV.' },
        { id: 'w496', word: 'open', translation: 'לפתוח', pronunciation: '/ˈoʊpən/', example: 'Open the book.' },
        { id: 'w497', word: 'close', translation: 'לסגור', pronunciation: '/kloʊz/', example: 'Close the door.' },
        { id: 'w498', word: 'push', translation: 'לדחוף', pronunciation: '/pʊʃ/', example: 'Push the door.' },
        { id: 'w499', word: 'pull', translation: 'למשוך', pronunciation: '/pʊl/', example: 'Pull the rope.' },
        { id: 'w500', word: 'lift', translation: 'להרים', pronunciation: '/lɪft/', example: 'Lift the box.' },
        { id: 'w501', word: 'drop', translation: 'להפיל', pronunciation: '/drɒp/', example: 'Don\'t drop your phone.' },
        { id: 'w502', word: 'catch', translation: 'לתפוס', pronunciation: '/kætʃ/', example: 'Catch the ball.' },
        { id: 'w503', word: 'throw', translation: 'לזרוק', pronunciation: '/θroʊ/', example: 'Throw the ball.' },
        { id: 'w504', word: 'break', translation: 'לשבור', pronunciation: '/breɪk/', example: 'Don\'t break the glass.' },
        { id: 'w505', word: 'fix', translation: 'לתקן', pronunciation: '/fɪks/', example: 'Fix the car.' },
        { id: 'w506', word: 'repair', translation: 'לתקן', pronunciation: '/rɪˈper/', example: 'Repair the computer.' },
        { id: 'w507', word: 'paint', translation: 'לצבוע', pronunciation: '/peɪnt/', example: 'Paint the wall.' },
        { id: 'w508', word: 'draw', translation: 'לצייר', pronunciation: '/drɔː/', example: 'Draw a picture.' },
        { id: 'w509', word: 'write', translation: 'לכתוב', pronunciation: '/raɪt/', example: 'Write a poem.' },
        { id: 'w510', word: 'read', translation: 'לקרוא', pronunciation: '/riːd/', example: 'Read a magazine.' },
        { id: 'w511', word: 'study', translation: 'ללמוד', pronunciation: '/ˈstʌdi/', example: 'Study for the exam.' },
        { id: 'w512', word: 'practice', translation: 'לתרגל', pronunciation: '/ˈpræktɪs/', example: 'Practice English daily.' },
        { id: 'w513', word: 'remember', translation: 'לזכור', pronunciation: '/rɪˈmembər/', example: 'Remember my name.' },
        { id: 'w514', word: 'forget', translation: 'לשכוח', pronunciation: '/fərˈɡet/', example: 'Don\'t forget your keys.' },
        { id: 'w515', word: 'understand', translation: 'להבין', pronunciation: '/ˌʌndərˈstænd/', example: 'I don\'t understand.' },
        { id: 'w516', word: 'explain', translation: 'להסביר', pronunciation: '/ɪkˈspleɪn/', example: 'Explain the rules.' },
        { id: 'w517', word: 'describe', translation: 'לתאר', pronunciation: '/dɪˈskraɪb/', example: 'Describe the painting.' },
        { id: 'w518', word: 'compare', translation: 'להשוות', pronunciation: '/kəmˈper/', example: 'Compare the two options.' },
        { id: 'w519', word: 'decide', translation: 'להחליט', pronunciation: '/dɪˈsaɪd/', example: 'Decide quickly.' },
        { id: 'w520', word: 'choose', translation: 'לבחור', pronunciation: '/tʃuːz/', example: 'Choose your favorite color.' },
        { id: 'w521', word: 'plan', translation: 'לתכנן', pronunciation: '/plæn/', example: 'Plan your trip.' },
        { id: 'w522', word: 'prepare', translation: 'להכין', pronunciation: '/prɪˈper/', example: 'Prepare for the meeting.' },
        { id: 'w523', word: 'organize', translation: 'לארגן', pronunciation: '/ˈɔːrɡənaɪz/', example: 'Organize your thoughts.' },
        { id: 'w524', word: 'arrange', translation: 'לסדר', pronunciation: '/əˈreɪndʒ/', example: 'Arrange the books.' },
        { id: 'w525', word: 'manage', translation: 'לנהל', pronunciation: '/ˈmænɪdʒ/', example: 'Manage your time.' },
        { id: 'w526', word: 'lead', translation: 'להוביל', pronunciation: '/liːd/', example: 'Lead the team.' },
        { id: 'w527', word: 'follow', translation: 'לעקוב', pronunciation: '/ˈfɒloʊ/', example: 'Follow the instructions.' },
        { id: 'w528', word: 'wait', translation: 'לחכות', pronunciation: '/weɪt/', example: 'Wait for me.' },
        { id: 'w529', word: 'hope', translation: 'לקוות', pronunciation: '/hoʊp/', example: 'I hope so.' },
        { id: 'w530', word: 'wish', translation: 'לאחל', pronunciation: '/wɪʃ/', example: 'Make a wish.' },
        { id: 'w531', word: 'love', translation: 'לאהוב', pronunciation: '/lʌv/', example: 'I love chocolate.' },
        { id: 'w532', word: 'like', translation: 'לחבב', pronunciation: '/laɪk/', example: 'I like apples.' },
        { id: 'w533', word: 'hate', translation: 'לשנוא', pronunciation: '/heɪt/', example: 'I hate spiders.' },
        { id: 'w534', word: 'enjoy', translation: 'ליהנות', pronunciation: '/ɪnˈdʒɔɪ/', example: 'Enjoy the show.' },
        { id: 'w535', word: 'worry', translation: 'לדאוג', pronunciation: '/ˈwʌri/', example: 'Don\'t worry.' },
        { id: 'w536', word: 'fear', translation: 'לפחד', pronunciation: '/fɪər/', example: 'Do not fear.' },
        { id: 'w537', word: 'trust', translation: 'לסמוך', pronunciation: '/trʌst/', example: 'Trust me.' },
        { id: 'w538', word: 'believe', translation: 'להאמין', pronunciation: '/bɪˈliːv/', example: 'Believe in yourself.' },
        { id: 'w539', word: 'doubt', translation: 'לפקפק', pronunciation: '/daʊt/', example: 'I doubt it.' },
        { id: 'w540', word: 'agree', translation: 'להסכים', pronunciation: '/əˈɡriː/', example: 'We agree on this.' },
        { id: 'w541', word: 'refuse', translation: 'לסרב', pronunciation: '/rɪˈfjuːz/', example: 'I refuse to go.' },
        { id: 'w542', word: 'allow', translation: 'לאפשר', pronunciation: '/əˈlaʊ/', example: 'Allow me to help.' },
        { id: 'w543', word: 'forbid', translation: 'לאסור', pronunciation: '/fərˈbɪd/', example: 'Smoking is forbidden.' },
        { id: 'w544', word: 'permit', translation: 'להתיר', pronunciation: '/pərˈmɪt/', example: 'Permit access.' },
        { id: 'w545', word: 'prevent', translation: 'למנוע', pronunciation: '/prɪˈvent/', example: 'Prevent accidents.' },
        { id: 'w546', word: 'protect', translation: 'להגן', pronunciation: '/prəˈtekt/', example: 'Protect the environment.' },
        { id: 'w547', word: 'save', translation: 'להציל / לחסוך', pronunciation: '/seɪv/', example: 'Save money.' },
        { id: 'w548', word: 'lose', translation: 'לאבד', pronunciation: '/luːz/', example: 'Lose weight.' },
        { id: 'w549', word: 'win', translation: 'לנצח', pronunciation: '/wɪn/', example: 'Win the race.' },
        { id: 'w550', word: 'fail', translation: 'להיכשל', pronunciation: '/feɪl/', example: 'Don\'t fail the exam.' },
        { id: 'w551', word: 'succeed', translation: 'להצליח', pronunciation: '/səkˈsiːd/', example: 'He will succeed.' },
        { id: 'w552', word: 'improve', translation: 'לשפר', pronunciation: '/ɪmˈpruːv/', example: 'Improve your skills.' },
        { id: 'w553', word: 'develop', translation: 'לפתח', pronunciation: '/dɪˈveləp/', example: 'Develop new ideas.' },
        { id: 'w554', word: 'create', translation: 'ליצור', pronunciation: '/kriˈeɪt/', example: 'Create a masterpiece.' },
        { id: 'w555', word: 'discover', translation: 'לגלות', pronunciation: '/dɪˈskʌvər/', example: 'Discover new places.' },
        { id: 'w556', word: 'invent', translation: 'להמציא', pronunciation: '/ɪnˈvent/', example: 'Invent something useful.' },
        { id: 'w557', word: 'research', translation: 'לחקור', pronunciation: '/rɪˈsɜːrtʃ/', example: 'Research the topic.' },
        { id: 'w558', word: 'examine', translation: 'לבחון', pronunciation: '/ɪɡˈzæmɪn/', example: 'Examine the evidence.' },
        { id: 'w559', word: 'analyze', translation: 'לנתח', pronunciation: '/ˈænəlaɪz/', example: 'Analyze the data.' },
        { id: 'w560', word: 'solve', translation: 'לפתור', pronunciation: '/sɒlv/', example: 'Solve the problem.' },
        { id: 'w561', word: 'present', translation: 'להציג', pronunciation: '/ˈpreznt/', example: 'Present your work.' },
        { id: 'w562', word: 'report', translation: 'לדווח', pronunciation: '/rɪˈpɔːrt/', example: 'Report the news.' },
        { id: 'w563', word: 'discuss', translation: 'לדון', pronunciation: '/dɪˈskʌs/', example: 'Discuss the issue.' },
        { id: 'w564', word: 'argue', translation: 'להתווכח', pronunciation: '/ˈɑːrɡjuː/', example: 'Don\'t argue.' },
        { id: 'w565', word: 'debate', translation: 'לדון / להתווכח', pronunciation: '/dɪˈbeɪt/', example: 'Have a debate.' },
        { id: 'w566', word: 'recommend', translation: 'להמליץ', pronunciation: '/ˌrekəˈmend/', example: 'I recommend this book.' },
        { id: 'w567', word: 'suggest', translation: 'להציע', pronunciation: '/səˈdʒest/', example: 'Can I suggest something?' },
        { id: 'w568', word: 'offer', translation: 'להציע', pronunciation: '/ˈɒfər/', example: 'Offer help.' },
        { id: 'w569', word: 'request', translation: 'לבקש', pronunciation: '/rɪˈkwest/', example: 'Make a request.' },
        { id: 'w570', word: 'order', translation: 'להזמין / לפקוד', pronunciation: '/ˈɔːrdər/', example: 'Order food.' },
        { id: 'w571', word: 'command', translation: 'לפקוד', pronunciation: '/kəˈmɑːnd/', example: 'He gave a command.' },
        { id: 'w572', word: 'obey', translation: 'לציית', pronunciation: '/əˈbeɪ/', example: 'Obey the rules.' },
        { id: 'w573', word: 'disobey', translation: 'לא לציית', pronunciation: '/ˌdɪsəˈbeɪ/', example: 'He disobeyed orders.' },
        { id: 'w574', word: 'thank', translation: 'להודות', pronunciation: '/θæŋk/', example: 'Thank you for your help.' },
        { id: 'w575', word: 'apologize', translation: 'להתנצל', pronunciation: '/əˈpɒlədʒaɪz/', example: 'Apologize for your mistake.' },
        { id: 'w576', word: 'forgive', translation: 'לסלוח', pronunciation: '/fərˈɡɪv/', example: 'Forgive me.' },
        { id: 'w577', word: 'welcome', translation: 'לקדם בברכה', pronunciation: '/ˈwelkəm/', example: 'Welcome to our home.' },
        { id: 'w578', word: 'greet', translation: 'לברך', pronunciation: '/ɡriːt/', example: 'Greet your guests.' },
        { id: 'w579', word: 'introduce', translation: 'להציג', pronunciation: '/ˌɪntrəˈduːs/', example: 'Introduce yourself.' },
        { id: 'w580', word: 'visit', translation: 'לבקר', pronunciation: '/ˈvɪzɪt/', example: 'Visit your friends.' },
        { id: 'w581', word: 'travel', translation: 'לנסוע', pronunciation: '/ˈtrævl/', example: 'Travel around the world.' },
        { id: 'w582', word: 'explore', translation: 'לחקור', pronunciation: '/ɪkˈsplɔːr/', example: 'Explore new cultures.' },
        { id: 'w583', word: 'discover', translation: 'לגלות', pronunciation: '/dɪˈskʌvər/', example: 'Discover a new species.' },
        { id: 'w584', word: 'find', translation: 'למצוא', pronunciation: '/faɪnd/', example: 'Find a solution.' },
        { id: 'w585', word: 'lose', translation: 'לאבד', pronunciation: '/luːz/', example: 'Lose hope.' },
        { id: 'w586', word: 'hide', translation: 'להחביא', pronunciation: '/haɪd/', example: 'Hide and seek.' },
        { id: 'w587', word: 'seek', translation: 'לחפש', pronunciation: '/siːk/', example: 'Seek the truth.' },
        { id: 'w588', word: 'look for', translation: 'לחפש', pronunciation: '/lʊk fɔːr/', example: 'Look for your keys.' },
        { id: 'w589', word: 'catch', translation: 'לתפוס', pronunciation: '/kætʃ/', example: 'Catch a fish.' },
        { id: 'w590', word: 'throw', translation: 'לזרוק', pronunciation: '/θroʊ/', example: 'Throw a stone.' },
        { id: 'w591', word: 'hold', translation: 'להחזיק', pronunciation: '/hoʊld/', example: 'Hold my hand.' },
        { id: 'w592', word: 'carry', translation: 'לשאת', pronunciation: '/ˈkæri/', example: 'Carry the bag.' },
        { id: 'w593', word: 'push', translation: 'לדחוף', pronunciation: '/pʊʃ/', example: 'Push the button.' },
        { id: 'w594', word: 'pull', translation: 'למשוך', pronunciation: '/pʊl/', example: 'Pull the rope.' },
        { id: 'w595', word: 'lift', translation: 'להרים', pronunciation: '/lɪft/', example: 'Lift weights.' },
        { id: 'w596', word: 'drop', translation: 'להפיל', pronunciation: '/drɒp/', example: 'Drop the ball.' },
        { id: 'w597', word: 'break', translation: 'לשבור', pronunciation: '/breɪk/', example: 'Break a record.' },
        { id: 'w598', word: 'cut', translation: 'לחתוך', pronunciation: '/kʌt/', example: 'Cut vegetables.' },
        { id: 'w599', word: 'tear', translation: 'לקרוע', pronunciation: '/ter/', example: 'Tear the paper.' },
        { id: 'w600', word: 'bend', translation: 'לכופף', pronunciation: '/bend/', example: 'Bend your knees.' },
        { id: 'w601', word: 'fold', translation: 'לקפל', pronunciation: '/foʊld/', example: 'Fold the laundry.' },
        { id: 'w602', word: 'tie', translation: 'לקשור', pronunciation: '/taɪ/', example: 'Tie your shoelaces.' },
        { id: 'w603', word: 'untie', translation: 'להתיר', pronunciation: '/ˌʌnˈtaɪ/', example: 'Untie the knot.' },
        { id: 'w604', word: 'wrap', translation: 'לעטוף', pronunciation: '/ræp/', example: 'Wrap the gift.' },
        { id: 'w605', word: 'unwrap', translation: 'לפתוח עטיפה', pronunciation: '/ˌʌnˈræp/', example: 'Unwrap the present.' },
        { id: 'w606', word: 'fill', translation: 'למלא', pronunciation: '/fɪl/', example: 'Fill the glass.' },
        { id: 'w607', word: 'empty', translation: 'לרוקן', pronunciation: '/ˈempti/', example: 'Empty the basket.' },
        { id: 'w608', word: 'clean', translation: 'לנקות', pronunciation: '/kliːn/', example: 'Clean the dishes.' },
        { id: 'w609', word: 'dirty', translation: 'ללכלך', pronunciation: '/ˈdɜːrti/', example: 'Don\'t dirty your clothes.' },
        { id: 'w610', word: 'mend', translation: 'לתקן', pronunciation: '/mend/', example: 'Mend the torn shirt.' },
        { id: 'w611', word: 'destroy', translation: 'להרוס', pronunciation: '/dɪˈstrɔɪ/', example: 'Destroy the evidence.' },
        { id: 'w612', word: 'build', translation: 'לבנות', pronunciation: '/bɪld/', example: 'Build a sandcastle.' },
        { id: 'w613', word: 'create', translation: 'ליצור', pronunciation: '/kriˈeɪt/', example: 'Create art.' },
        { id: 'w614', word: 'design', translation: 'לעצב', pronunciation: '/dɪˈzaɪn/', example: 'Design a website.' },
        { id: 'w615', word: 'print', translation: 'להדפיס', pronunciation: '/prɪnt/', example: 'Print the document.' },
        { id: 'w616', word: 'copy', translation: 'להעתיק', pronunciation: '/ˈkɒpi/', example: 'Copy the text.' },
        { id: 'w617', word: 'scan', translation: 'לסרוק', pronunciation: '/skæn/', example: 'Scan the document.' },
        { id: 'w618', word: 'type', translation: 'להקליד', pronunciation: '/taɪp/', example: 'Type a letter.' },
        { id: 'w619', word: 'edit', translation: 'לערוך', pronunciation: '/ˈedɪt/', example: 'Edit the video.' },
        { id: 'w620', word: 'delete', translation: 'למחוק', pronunciation: '/dɪˈliːt/', example: 'Delete the file.' },
        { id: 'w621', word: 'save', translation: 'לשמור', pronunciation: '/seɪv/', example: 'Save your work.' },
        { id: 'w622', word: 'send', translation: 'לשלוח', pronunciation: '/send/', example: 'Send a message.' },
        { id: 'w623', word: 'receive', translation: 'לקבל', pronunciation: '/rɪˈsiːv/', example: 'Receive an email.' },
        { id: 'w624', word: 'upload', translation: 'להעלות', pronunciation: '/ˌʌpˈloʊd/', example: 'Upload photos.' },
        { id: 'w625', word: 'download', translation: 'להוריד', pronunciation: '/ˈdaʊnloʊd/', example: 'Download a file.' },
        { id: 'w626', word: 'connect', translation: 'לחבר', pronunciation: '/kəˈnekt/', example: 'Connect to Wi-Fi.' },
        { id: 'w627', word: 'disconnect', translation: 'לנתק', pronunciation: '/ˌdɪskəˈnekt/', example: 'Disconnect the cable.' },
        { id: 'w628', word: 'turn on', translation: 'להדליק', pronunciation: '/tɜːrn ɒn/', example: 'Turn on the TV.' },
        { id: 'w629', word: 'turn off', translation: 'לכבות', pronunciation: '/tɜːrn ɒf/', example: 'Turn off the light.' },
        { id: 'w630', word: 'start', translation: 'להתחיל', pronunciation: '/stɑːrt/', example: 'Start the engine.' },
        { id: 'w631', word: 'stop', translation: 'לעצור', pronunciation: '/stɒp/', example: 'Stop the music.' },
        { id: 'w632', word: 'pause', translation: 'להשהות', pronunciation: '/pɔːz/', example: 'Pause the video.' },
        { id: 'w633', word: 'resume', translation: 'להמשיך', pronunciation: '/rɪˈzuːm/', example: 'Resume playback.' },
        { id: 'w634', word: 'finish', translation: 'לסיים', pronunciation: '/ˈfɪnɪʃ/', example: 'Finish your homework.' },
        { id: 'w635', word: 'end', translation: 'לסיים', pronunciation: '/end/', example: 'The story will end.' },
        { id: 'w636', word: 'complete', translation: 'להשלים', pronunciation: '/kəmˈpliːt/', example: 'Complete the task.' },
        { id: 'w637', word: 'close', translation: 'לסגור', pronunciation: '/kloʊz/', example: 'Close the file.' },
        { id: 'w638', word: 'open', translation: 'לפתוח', pronunciation: '/ˈoʊpən/', example: 'Open the app.' },
        { id: 'w639', word: 'lock', translation: 'לנעול', pronunciation: '/lɒk/', example: 'Lock the door.' },
        { id: 'w640', word: 'unlock', translation: 'לפתוח (מנעול)', pronunciation: '/ˌʌnˈlɒk/', example: 'Unlock your phone.' },
        // תארים (Adjectives):
        { id: 'w641', word: 'good', translation: 'טוב', pronunciation: '/ɡʊd/', example: 'Have a good day.' },
        { id: 'w642', word: 'bad', translation: 'רע', pronunciation: '/bæd/', example: 'That\'s a bad idea.' },
        { id: 'w643', word: 'big', translation: 'גדול', pronunciation: '/bɪɡ/', example: 'A big house.' },
        { id: 'w644', word: 'small', translation: 'קטן', pronunciation: '/smɔːl/', example: 'A small dog.' },
        { id: 'w645', word: 'new', translation: 'חדש', pronunciation: '/nuː/', example: 'A new car.' },
        { id: 'w646', word: 'old', translation: 'ישן', pronunciation: '/oʊld/', example: 'An old building.' },
        { id: 'w647', word: 'young', translation: 'צעיר', pronunciation: '/jʌŋ/', example: 'A young man.' },
        { id: 'w648', word: 'old', translation: 'זקן', pronunciation: '/oʊld/', example: 'An old woman.' },
        { id: 'w649', word: 'happy', translation: 'שמח', pronunciation: '/ˈhæpi/', example: 'I feel happy.' },
        { id: 'w650', word: 'sad', translation: 'עצוב', pronunciation: '/sæd/', example: 'She is sad.' },
        { id: 'w651', word: 'angry', translation: 'כועס', pronunciation: '/ˈæŋɡri/', example: 'He is angry.' },
        { id: 'w652', word: 'cold', translation: 'קר', pronunciation: '/koʊld/', example: 'It\'s cold outside.' },
        { id: 'w653', word: 'hot', translation: 'חם', pronunciation: '/hɒt/', example: 'The coffee is hot.' },
        { id: 'w654', word: 'warm', translation: 'חם (נעים)', pronunciation: '/wɔːrm/', example: 'A warm blanket.' },
        { id: 'w655', word: 'cool', translation: 'קריר', pronunciation: '/kuːl/', example: 'A cool breeze.' },
        { id: 'w656', word: 'beautiful', translation: 'יפה', pronunciation: '/ˈbjuːtɪfl/', example: 'A beautiful flower.' },
        { id: 'w657', word: 'ugly', translation: 'מכוער', pronunciation: '/ˈʌɡli/', example: 'An ugly sweater.' },
        { id: 'w658', word: 'easy', translation: 'קל', pronunciation: '/ˈiːzi/', example: 'This test is easy.' },
        { id: 'w659', word: 'difficult', translation: 'קשה', pronunciation: '/ˈdɪfɪkəlt/', example: 'A difficult problem.' },
        { id: 'w660', word: 'hard', translation: 'קשה / חזק', pronunciation: '/hɑːrd/', example: 'A hard stone.' },
        { id: 'w661', word: 'soft', translation: 'רך', pronunciation: '/sɒft/', example: 'A soft pillow.' },
        { id: 'w662', word: 'clean', translation: 'נקי', pronunciation: '/kliːn/', example: 'A clean room.' },
        { id: 'w663', word: 'dirty', translation: 'מלוכלך', pronunciation: '/ˈdɜːrti/', example: 'Dirty clothes.' },
        { id: 'w664', word: 'dry', translation: 'יבש', pronunciation: '/draɪ/', example: 'Dry clothes.' },
        { id: 'w665', word: 'wet', translation: 'רטוב', pronunciation: '/wet/', example: 'Wet hair.' },
        { id: 'w666', word: 'empty', translation: 'ריק', pronunciation: '/ˈempti/', example: 'An empty box.' },
        { id: 'w667', word: 'full', translation: 'מלא', pronunciation: '/fʊl/', example: 'A full cup.' },
        { id: 'w668', word: 'fast', translation: 'מהיר', pronunciation: '/fæst/', example: 'A fast car.' },
        { id: 'w669', word: 'slow', translation: 'איטי', pronunciation: '/sloʊ/', example: 'A slow train.' },
        { id: 'w670', word: 'loud', translation: 'רועש', pronunciation: '/laʊd/', example: 'Loud music.' },
        { id: 'w671', word: 'quiet', translation: 'שקט', pronunciation: '/ˈkwaɪət/', example: 'A quiet room.' },
        { id: 'w672', word: 'light', translation: 'בהיר / קל', pronunciation: '/laɪt/', example: 'A light color.' },
        { id: 'w673', word: 'dark', translation: 'כהה', pronunciation: '/dɑːrk/', example: 'A dark room.' },
        { id: 'w674', word: 'strong', translation: 'חזק', pronunciation: '/strɒŋ/', example: 'A strong man.' },
        { id: 'w675', word: 'weak', translation: 'חלש', pronunciation: '/wiːk/', example: 'He feels weak.' },
        { id: 'w676', word: 'tall', translation: 'גבוה (לאדם)', pronunciation: '/tɔːl/', example: 'He is very tall.' },
        { id: 'w677', word: 'short', translation: 'נמוך (לאדם)', pronunciation: '/ʃɔːrt/', example: 'She has short hair.' },
        { id: 'w678', word: 'high', translation: 'גבוה (לדבר)', pronunciation: '/haɪ/', example: 'A high mountain.' },
        { id: 'w679', word: 'low', translation: 'נמוך (לדבר)', pronunciation: '/loʊ/', example: 'Low prices.' },
        { id: 'w680', word: 'long', translation: 'ארוך', pronunciation: '/lɒŋ/', example: 'A long road.' },
        { id: 'w681', word: 'short', translation: 'קצר', pronunciation: '/ʃɔːrt/', example: 'A short story.' },
        { id: 'w682', word: 'wide', translation: 'רחב', pronunciation: '/waɪd/', example: 'A wide river.' },
        { id: 'w683', word: 'narrow', translation: 'צר', pronunciation: '/ˈnæroʊ/', example: 'A narrow street.' },
        { id: 'w684', word: 'thick', translation: 'עבה', pronunciation: '/θɪk/', example: 'A thick book.' },
        { id: 'w685', word: 'thin', translation: 'דק / רזה', pronunciation: '/θɪn/', example: 'A thin slice.' },
        { id: 'w686', word: 'fat', translation: 'שמן', pronunciation: '/fæt/', example: 'A fat cat.' },
        { id: 'w687', word: 'thin', translation: 'רזה', pronunciation: '/θɪn/', example: 'A thin person.' },
        { id: 'w688', word: 'rich', translation: 'עשיר', pronunciation: '/rɪtʃ/', example: 'A rich man.' },
        { id: 'w689', word: 'poor', translation: 'עני', pronunciation: '/pɔːr/', example: 'A poor family.' },
        { id: 'w690', word: 'true', translation: 'נכון', pronunciation: '/truː/', example: 'That\'s true.' },
        { id: 'w691', word: 'false', translation: 'שגוי', pronunciation: '/fɔːls/', example: 'A false statement.' },
        { id: 'w692', word: 'right', translation: 'נכון / ימין', pronunciation: '/raɪt/', example: 'That\'s the right answer.' },
        { id: 'w693', word: 'wrong', translation: 'לא נכון / שגוי', pronunciation: '/rɒŋ/', example: 'You are wrong.' },
        { id: 'w694', word: 'same', translation: 'אותו דבר', pronunciation: '/seɪm/', example: 'They are the same.' },
        { id: 'w695', word: 'different', translation: 'שונה', pronunciation: '/ˈdɪfrənt/', example: 'They are different.' },
        { id: 'w696', word: 'important', translation: 'חשוב', pronunciation: '/ɪmˈpɔːrtnt/', example: 'An important meeting.' },
        { id: 'w697', word: 'unimportant', translation: 'לא חשוב', pronunciation: '/ˌʌnɪmˈpɔːrtnt/', example: 'An unimportant detail.' },
        { id: 'w698', word: 'necessary', translation: 'נחוץ', pronunciation: '/ˈnesəseri/', example: 'It\'s necessary.' },
        { id: 'w699', word: 'unnecessary', translation: 'מיותר', pronunciation: '/ˌʌnˈnesəseri/', example: 'Unnecessary expense.' },
        { id: 'w700', word: 'ready', translation: 'מוכן', pronunciation: '/ˈredi/', example: 'Are you ready?' },
        { id: 'w701', word: 'busy', translation: 'עסוק', pronunciation: '/ˈbɪzi/', example: 'I\'m busy now.' },
        { id: 'w701', word: 'free', translation: 'חופשי / פנוי', pronunciation: '/friː/', example: 'Are you free tonight?' },
        { id: 'w702', word: 'sick', translation: 'חולה', pronunciation: '/sɪk/', example: 'He is sick.' },
        { id: 'w703', word: 'healthy', translation: 'בריא', pronunciation: '/ˈhelθi/', example: 'Eat healthy food.' },
        { id: 'w704', word: 'tired', translation: 'עייף', pronunciation: '/ˈtaɪərd/', example: 'I\'m tired.' },
        { id: 'w705', word: 'awake', translation: 'ער', pronunciation: '/əˈweɪk/', example: 'He is awake.' },
        { id: 'w706', word: 'asleep', translation: 'ישן', pronunciation: '/əˈsliːp/', example: 'The baby is asleep.' },
        { id: 'w707', word: 'hungry', translation: 'רעב', pronunciation: '/ˈhʌŋɡri/', example: 'I\'m hungry.' },
        { id: 'w708', word: 'thirsty', translation: 'צמא', pronunciation: '/ˈθɜːrsti/', example: 'Are you thirsty?' },
        { id: 'w709', word: 'kind', translation: 'אדיב', pronunciation: '/kaɪnd/', example: 'She is a kind person.' },
        { id: 'w710', word: 'mean', translation: 'מרושע / קמצן', pronunciation: '/miːn/', example: 'Don\'t be mean.' },
        { id: 'w711', word: 'nice', translation: 'נחמד', pronunciation: '/naɪs/', example: 'Have a nice day.' },
        { id: 'w712', word: 'polite', translation: 'מנומס', pronunciation: '/pəˈlaɪt/', example: 'He is very polite.' },
        { id: 'w713', word: 'rude', translation: 'גס רוח', pronunciation: '/ruːd/', example: 'Don\'t be rude.' },
        { id: 'w714', word: 'friendly', translation: 'ידידותי', pronunciation: '/ˈfrendli/', example: 'A friendly dog.' },
        { id: 'w715', word: 'unfriendly', translation: 'לא ידידותי', pronunciation: '/ʌnˈfrendli/', example: 'An unfriendly person.' },
        { id: 'w716', word: 'smart', translation: 'חכם', pronunciation: '/smɑːrt/', example: 'A smart student.' },
        { id: 'w717', word: 'stupid', translation: 'טיפש', pronunciation: '/ˈstuːpɪd/', example: 'Don\'t be stupid.' },
        { id: 'w718', word: 'clever', translation: 'פיקח', pronunciation: '/ˈklevər/', example: 'A clever idea.' },
        { id: 'w719', word: 'wise', translation: 'נבון', pronunciation: '/waɪz/', example: 'A wise old man.' },
        { id: 'w720', word: 'brave', translation: 'אמיץ', pronunciation: '/breɪv/', example: 'A brave soldier.' },
        { id: 'w721', word: 'cowardly', translation: 'פחדן', pronunciation: '/ˈkaʊərdli/', example: 'A cowardly act.' },
        { id: 'w722', word: 'happy', translation: 'שמח', pronunciation: '/ˈhæpi/', example: 'A happy family.' },
        { id: 'w723', word: 'lucky', translation: 'בר מזל', pronunciation: '/ˈlʌki/', example: 'You are so lucky!' },
        { id: 'w724', word: 'unlucky', translation: 'חסר מזל', pronunciation: '/ʌnˈlʌki/', example: 'An unlucky day.' },
        { id: 'w725', word: 'easy', translation: 'קל', pronunciation: '/ˈiːzi/', example: 'An easy task.' },
        { id: 'w726', word: 'difficult', translation: 'קשה', pronunciation: '/ˈdɪfɪkəlt/', example: 'A difficult exam.' },
        { id: 'w727', word: 'simple', translation: 'פשוט', pronunciation: '/ˈsɪmpl/', example: 'A simple solution.' },
        { id: 'w728', word: 'complex', translation: 'מורכב', pronunciation: '/ˈkɒmpleks/', example: 'A complex problem.' },
        { id: 'w729', word: 'early', translation: 'מוקדם', pronunciation: '/ˈɜːrli/', example: 'Wake up early.' },
        { id: 'w730', word: 'late', translation: 'מאוחר', pronunciation: '/leɪt/', example: 'Don\'t be late.' },
        { id: 'w731', word: 'first', translation: 'ראשון', pronunciation: '/fɜːrst/', example: 'The first time.' },
        { id: 'w732', word: 'last', translation: 'אחרון', pronunciation: '/lɑːst/', example: 'The last day.' },
        { id: 'w733', word: 'next', translation: 'הבא', pronunciation: '/nekst/', example: 'Next time.' },
        { id: 'w734', word: 'previous', translation: 'קודם', pronunciation: '/ˈpriːviəs/', example: 'The previous page.' },
        { id: 'w735', word: 'own', translation: 'משלו (שלי, שלך וכו\')', pronunciation: '/oʊn/', example: 'My own car.' },
        { id: 'w736', word: 'public', translation: 'ציבורי', pronunciation: '/ˈpʌblɪk/', example: 'Public transport.' },
        { id: 'w737', word: 'private', translation: 'פרטי', pronunciation: '/ˈpraɪvət/', example: 'Private property.' },
        { id: 'w738', word: 'common', translation: 'נפוץ', pronunciation: '/ˈkɒmən/', example: 'A common problem.' },
        { id: 'w739', word: 'rare', translation: 'נדיר', pronunciation: '/rer/', example: 'A rare bird.' },
        { id: 'w740', word: 'general', translation: 'כללי', pronunciation: '/ˈdʒenərəl/', example: 'In general.' },
        { id: 'w741', word: 'specific', translation: 'ספציפי', pronunciation: '/spəˈsɪfɪk/', example: 'A specific answer.' },
        { id: 'w742', word: 'special', translation: 'מיוחד', pronunciation: '/ˈspeʃl/', example: 'A special gift.' },
        { id: 'w743', word: 'regular', translation: 'רגיל', pronunciation: '/ˈreɡjələr/', example: 'Regular exercise.' },
        { id: 'w744', word: 'unusual', translation: 'יוצא דופן', pronunciation: '/ʌnˈjuːʒuəl/', example: 'An unusual event.' },
        { id: 'w745', word: 'present', translation: 'נוכח', pronunciation: '/ˈpreznt/', example: 'He is present.' },
        { id: 'w746', word: 'absent', translation: 'נעדר', pronunciation: '/ˈæbsənt/', example: 'He is absent from school.' },
        { id: 'w747', word: 'available', translation: 'זמין', pronunciation: '/əˈveɪləbl/', example: 'Is it available?' },
        { id: 'w748', word: 'unavailable', translation: 'לא זמין', pronunciation: '/ˌʌnəˈveɪləbl/', example: 'The item is unavailable.' },
        { id: 'w749', word: 'empty', translation: 'ריק', pronunciation: '/ˈempti/', example: 'The glass is empty.' },
        { id: 'w750', word: 'full', translation: 'מלא', pronunciation: '/fʊl/', example: 'The bottle is full.' },
        { id: 'w751', word: 'open', translation: 'פתוח', pronunciation: '/ˈoʊpən/', example: 'The store is open.' },
        { id: 'w752', word: 'closed', translation: 'סגור', pronunciation: '/kloʊzd/', example: 'The door is closed.' },
        { id: 'w753', word: 'broken', translation: 'שבור', pronunciation: '/ˈbroʊkən/', example: 'A broken window.' },
        { id: 'w754', word: 'fixed', translation: 'מתוקן', pronunciation: '/fɪkst/', example: 'The fixed computer.' },
        { id: 'w755', word: 'new', translation: 'חדש', pronunciation: '/nuː/', example: 'A new phone.' },
        { id: 'w756', word: 'used', translation: 'משומש', pronunciation: '/juːzd/', example: 'A used car.' },
        { id: 'w757', word: 'clean', translation: 'נקי', pronunciation: '/kliːn/', example: 'A clean shirt.' },
        { id: 'w758', word: 'dirty', translation: 'מלוכלך', pronunciation: '/ˈdɜːrti/', example: 'Dirty hands.' },
        { id: 'w759', word: 'wet', translation: 'רטוב', pronunciation: '/wet/', example: 'Wet floor.' },
        { id: 'w760', word: 'dry', translation: 'יבש', pronunciation: '/draɪ/', example: 'Dry leaves.' },
        { id: 'w761', word: 'hot', translation: 'חם', pronunciation: '/hɒt/', example: 'Hot weather.' },
        { id: 'w762', word: 'cold', translation: 'קר', pronunciation: '/koʊld/', example: 'Cold water.' },
        { id: 'w763', word: 'warm', translation: 'חם (נעים)', pronunciation: '/wɔːrm/', example: 'Warm clothes.' },
        { id: 'w764', word: 'cool', translation: 'קריר', pronunciation: '/kuːl/', example: 'Cool drink.' },
        { id: 'w765', word: 'light', translation: 'בהיר / קל', pronunciation: '/laɪt/', example: 'Light fabric.' },
        { id: 'w766', word: 'dark', translation: 'כהה', pronunciation: '/dɑːrk/', example: 'Dark chocolate.' },
        { id: 'w767', word: 'bright', translation: 'בהיר', pronunciation: '/braɪt/', example: 'Bright colors.' },
        { id: 'w768', word: 'dim', translation: 'עמום', pronunciation: '/dɪm/', example: 'Dim light.' },
        { id: 'w769', word: 'loud', translation: 'רועש', pronunciation: '/laʊd/', example: 'A loud noise.' },
        { id: 'w770', word: 'quiet', translation: 'שקט', pronunciation: '/ˈkwaɪət/', example: 'Be quiet.' },
        { id: 'w771', word: 'soft', translation: 'רך', pronunciation: '/sɒft/', example: 'Soft skin.' },
        { id: 'w772', word: 'hard', translation: 'קשה', pronunciation: '/hɑːrd/', example: 'A hard surface.' },
        { id: 'w773', word: 'smooth', translation: 'חלק', pronunciation: '/smuːð/', example: 'Smooth road.' },
        { id: 'w774', word: 'rough', translation: 'מחוספס', pronunciation: '/rʌf/', example: 'Rough texture.' },
        { id: 'w775', word: 'sharp', translation: 'חד', pronunciation: '/ʃɑːrp/', example: 'A sharp knife.' },
        { id: 'w776', word: 'blunt', translation: 'קהה', pronunciation: '/blʌnt/', example: 'A blunt pencil.' },
        { id: 'w777', word: 'straight', translation: 'ישר', pronunciation: '/streɪt/', example: 'A straight line.' },
        { id: 'w778', word: 'curved', translation: 'עקום', pronunciation: '/kɜːrvd/', example: 'A curved road.' },
        { id: 'w779', word: 'round', translation: 'עגול', pronunciation: '/raʊnd/', example: 'A round table.' },
        { id: 'w780', word: 'square', translation: 'מרובע', pronunciation: '/skwer/', example: 'A square box.' },
        { id: 'w781', word: 'flat', translation: 'שטוח', pronunciation: '/flæt/', example: 'A flat surface.' },
        { id: 'w782', word: 'deep', translation: 'עמוק', pronunciation: '/diːp/', example: 'A deep ocean.' },
        { id: 'w783', word: 'shallow', translation: 'רדוד', pronunciation: '/ˈʃæloʊ/', example: 'Shallow water.' },
        { id: 'w784', word: 'wide', translation: 'רחב', pronunciation: '/waɪd/', example: 'A wide door.' },
        { id: 'w785', word: 'narrow', translation: 'צר', pronunciation: '/ˈnæroʊ/', example: 'A narrow path.' },
        { id: 'w786', word: 'thick', translation: 'עבה', pronunciation: '/θɪk/', example: 'A thick rope.' },
        { id: 'w787', word: 'thin', translation: 'דק', pronunciation: '/θɪn/', example: 'Thin paper.' },
        { id: 'w788', word: 'heavy', translation: 'כבד', pronunciation: '/ˈhevi/', example: 'A heavy box.' },
        { id: 'w789', word: 'light', translation: 'קל', pronunciation: '/laɪt/', example: 'A light feather.' },
        { id: 'w790', word: 'strong', translation: 'חזק', pronunciation: '/strɒŋ/', example: 'Strong coffee.' },
        { id: 'w791', word: 'weak', translation: 'חלש', pronunciation: '/wiːk/', example: 'Weak signal.' },
        { id: 'w792', word: 'fast', translation: 'מהיר', pronunciation: '/fæst/', example: 'Fast runner.' },
        { id: 'w793', word: 'slow', translation: 'איטי', pronunciation: '/sloʊ/', example: 'Slow movement.' },
        { id: 'w794', word: 'quick', translation: 'מהיר', pronunciation: '/kwɪk/', example: 'A quick response.' },
        { id: 'w795', word: 'dead', translation: 'מת', pronunciation: '/ded/', example: 'A dead tree.' },
        { id: 'w796', word: 'alive', translation: 'חי', pronunciation: '/əˈlaɪv/', example: 'Still alive.' },
        { id: 'w797', word: 'single', translation: 'בודד', pronunciation: '/ˈsɪŋɡl/', example: 'A single flower.' },
        { id: 'w798', word: 'double', translation: 'כפול', pronunciation: '/ˈdʌbl/', example: 'A double room.' },
        { id: 'w799', word: 'male', translation: 'זכר', pronunciation: '/meɪl/', example: 'Male employee.' },
        { id: 'w800', word: 'female', translation: 'נקבה', pronunciation: '/ˈfiːmeɪl/', example: 'Female student.' },
        { id: 'w801', word: 'married', translation: 'נשוי/אה', pronunciation: '/ˈmærid/', example: 'They are married.' },
        { id: 'w802', word: 'single', translation: 'רווק/ה', pronunciation: '/ˈsɪŋɡl/', example: 'I am single.' },
        { id: 'w803', word: 'divorced', translation: 'גרוש/ה', pronunciation: '/dɪˈvɔːrst/', example: 'She is divorced.' },
        { id: 'w804', word: 'widowed', translation: 'אלמן/ה', pronunciation: '/ˈwɪdoʊd/', example: 'He is widowed.' },
        { id: 'w805', word: 'young', translation: 'צעיר', pronunciation: '/jʌŋ/', example: 'Young children.' },
        { id: 'w806', word: 'old', translation: 'זקן', pronunciation: '/oʊld/', example: 'An old man.' },
        { id: 'w807', word: 'new', translation: 'חדש', pronunciation: '/nuː/', example: 'A new computer.' },
        { id: 'w808', word: 'old', translation: 'ישן', pronunciation: '/oʊld/', example: 'Old traditions.' },
        { id: 'w809', word: 'modern', translation: 'מודרני', pronunciation: '/ˈmɒdərn/', example: 'Modern art.' },
        { id: 'w810', word: 'ancient', translation: 'עתיק', pronunciation: '/ˈeɪnʃənt/', example: 'Ancient history.' },
        { id: 'w811', word: 'future', translation: 'עתידי', pronunciation: '/ˈfjuːtʃər/', example: 'Future plans.' },
        { id: 'w812', word: 'past', translation: 'עבר', pronunciation: '/pɑːst/', example: 'In the past.' },
        { id: 'w813', word: 'present', translation: 'הווה', pronunciation: '/ˈpreznt/', example: 'In the present.' },
        { id: 'w814', word: 'future', translation: 'עתיד', pronunciation: '/ˈfjuːtʃər/', example: 'Look to the future.' },
        { id: 'w815', word: 'next', translation: 'הבא', pronunciation: '/nekst/', example: 'Next time.' },
        { id: 'w816', word: 'last', translation: 'אחרון', pronunciation: '/lɑːst/', example: 'The last person.' },
        { id: 'w817', word: 'first', translation: 'ראשון', pronunciation: '/fɜːrst/', example: 'The first chapter.' },
        { id: 'w818', word: 'second', translation: 'שני', pronunciation: '/ˈsekənd/', example: 'The second child.' },
        { id: 'w819', word: 'third', translation: 'שלישי', pronunciation: '/θɜːrd/', example: 'The third time.' },
        { id: 'w820', word: 'many', translation: 'הרבה (לספירה)', pronunciation: '/ˈmeni/', example: 'Many people.' },
        { id: 'w821', word: 'much', translation: 'הרבה (לא לספירה)', pronunciation: '/mʌtʃ/', example: 'Much water.' },
        { id: 'w822', word: 'few', translation: 'מעט (לספירה)', pronunciation: '/fjuː/', example: 'A few friends.' },
        { id: 'w823', word: 'little', translation: 'מעט (לא לספירה)', pronunciation: '/ˈlɪtl/', example: 'A little milk.' },
        { id: 'w824', word: 'some', translation: 'כמה / קצת', pronunciation: '/sʌm/', example: 'Some sugar.' },
        { id: 'w825', word: 'any', translation: 'כלשהו', pronunciation: '/ˈeni/', example: 'Do you have any questions?' },
        { id: 'w826', word: 'all', translation: 'כל', pronunciation: '/ɔːl/', example: 'All the people.' },
        { id: 'w827', word: 'every', translation: 'כל (אחד)', pronunciation: '/ˈevri/', example: 'Every day.' },
        { id: 'w828', word: 'each', translation: 'כל (אחד)', pronunciation: '/iːtʃ/', example: 'Each student.' },
        { id: 'w829', word: 'both', translation: 'שניהם', pronunciation: '/boʊθ/', example: 'Both of us.' },
        { id: 'w830', word: 'either', translation: 'אחד משני', pronunciation: '/ˈaɪðər/', example: 'Either way.' },
        { id: 'w831', word: 'neither', translation: 'אף אחד משני', pronunciation: '/ˈnaɪðər/', example: 'Neither of them.' },
        { id: 'w832', word: 'only', translation: 'רק', pronunciation: '/ˈoʊnli/', example: 'Only one.' },
        { id: 'w833', word: 'most', translation: 'רוב', pronunciation: '/moʊst/', example: 'Most people.' },
        { id: 'w834', word: 'more', translation: 'יותר', pronunciation: '/mɔːr/', example: 'More time.' },
        { id: 'w835', word: 'less', translation: 'פחות', pronunciation: '/les/', example: 'Less sugar.' },
        { id: 'w836', word: 'best', translation: 'הטוב ביותר', pronunciation: '/best/', example: 'The best day.' },
        { id: 'w837', word: 'worst', translation: 'הגרוע ביותר', pronunciation: '/wɜːrst/', example: 'The worst movie.' },
        { id: 'w838', word: 'better', translation: 'טוב יותר', pronunciation: '/ˈbetər/', example: 'Better than before.' },
        { id: 'w839', word: 'worse', translation: 'גרוע יותר', pronunciation: '/wɜːrs/', example: 'Worse than yesterday.' },
        { id: 'w840', word: 'happy', translation: 'שמח', pronunciation: '/ˈhæpi/', example: 'I am happy.' },
        { id: 'w841', word: 'unhappy', translation: 'לא שמח', pronunciation: '/ʌnˈhæpi/', example: 'He is unhappy.' },
        { id: 'w842', word: 'lucky', translation: 'בר מזל', pronunciation: '/ˈlʌki/', example: 'A lucky charm.' },
        { id: 'w843', word: 'unlucky', translation: 'חסר מזל', pronunciation: '/ʌnˈlʌki/', example: 'An unlucky person.' },
        { id: 'w844', word: 'true', translation: 'נכון', pronunciation: '/truː/', example: 'A true story.' },
        { id: 'w845', word: 'untrue', translation: 'לא נכון', pronunciation: '/ʌnˈtruː/', example: 'An untrue statement.' },
        { id: 'w846', word: 'real', translation: 'אמיתי', pronunciation: '/riːəl/', example: 'A real person.' },
        { id: 'w847', word: 'unreal', translation: 'לא אמיתי', pronunciation: '/ʌnˈriːəl/', example: 'An unreal dream.' },
        { id: 'w848', word: 'possible', translation: 'אפשרי', pronunciation: '/ˈpɒsəbl/', example: 'It\'s possible.' },
        { id: 'w849', word: 'impossible', translation: 'בלתי אפשרי', pronunciation: '/ɪmˈpɒsəbl/', example: 'It\'s impossible.' },
        { id: 'w850', word: 'probable', translation: 'סביר', pronunciation: '/ˈprɒbəbl/', example: 'It\'s probable.' },
        { id: 'w851', word: 'improbable', translation: 'לא סביר', pronunciation: '/ɪmˈprɒbəbl/', example: 'Highly improbable.' },
        { id: 'w852', word: 'certain', translation: 'בטוח', pronunciation: '/ˈsɜːrtn/', example: 'I am certain.' },
        { id: 'w853', word: 'uncertain', translation: 'לא בטוח', pronunciation: '/ʌnˈsɜːrtn/', example: 'He is uncertain.' },
        { id: 'w854', word: 'sure', translation: 'בטוח', pronunciation: '/ʃʊər/', example: 'Are you sure?' },
        { id: 'w855', word: 'unsure', translation: 'לא בטוח', pronunciation: '/ʌnˈʃʊər/', example: 'I am unsure.' },
        { id: 'w856', word: 'clear', translation: 'ברור', pronunciation: '/klɪər/', example: 'A clear sky.' },
        { id: 'w857', word: 'unclear', translation: 'לא ברור', pronunciation: '/ʌnˈklɪər/', example: 'Unclear instructions.' },
        { id: 'w858', word: 'visible', translation: 'נראה', pronunciation: '/ˈvɪzəbl/', example: 'The stars are visible.' },
        { id: 'w859', word: 'invisible', translation: 'בלתי נראה', pronunciation: '/ɪnˈvɪzəbl/', example: 'An invisible enemy.' },
        { id: 'w860', word: 'known', translation: 'ידוע', pronunciation: '/noʊn/', example: 'A known fact.' },
        { id: 'w861', word: 'unknown', translation: 'לא ידוע', pronunciation: '/ˌʌnˈnoʊn/', example: 'An unknown artist.' },
        { id: 'w862', word: 'famous', translation: 'מפורסם', pronunciation: '/ˈfeɪməs/', example: 'A famous singer.' },
        { id: 'w863', word: 'unknown', translation: 'לא ידוע', pronunciation: '/ˌʌnˈnoʊn/', example: 'An unknown person.' },
        { id: 'w864', word: 'important', translation: 'חשוב', pronunciation: '/ɪmˈpɔːrtnt/', example: 'An important decision.' },
        { id: 'w865', word: 'unimportant', translation: 'לא חשוב', pronunciation: '/ˌʌnɪmˈpɔːrtnt/', example: 'An unimportant matter.' },
        { id: 'w866', word: 'useful', translation: 'שימושי', pronunciation: '/ˈjuːsfl/', example: 'A useful tool.' },
        { id: 'w867', word: 'useless', translation: 'חסר תועלת', pronunciation: '/ˈjuːsləs/', example: 'A useless object.' },
        { id: 'w868', word: 'helpful', translation: 'מועיל', pronunciation: '/ˈhelpfl/', example: 'A helpful advice.' },
        { id: 'w869', word: 'unhelpful', translation: 'לא מועיל', pronunciation: '/ʌnˈhelpfl/', example: 'An unhelpful comment.' },
        { id: 'w870', word: 'correct', translation: 'נכון', pronunciation: '/kəˈrekt/', example: 'The correct answer.' },
        { id: 'w871', word: 'incorrect', translation: 'לא נכון', pronunciation: '/ˌɪnkəˈrekt/', example: 'An incorrect calculation.' },
        { id: 'w872', word: 'accurate', translation: 'מדויק', pronunciation: '/ˈækjərət/', example: 'Accurate information.' },
        { id: 'w873', word: 'inaccurate', translation: 'לא מדויק', pronunciation: '/ɪnˈækjərət/', example: 'Inaccurate data.' },
        { id: 'w874', word: 'perfect', translation: 'מושלם', pronunciation: '/ˈpɜːrfɪkt/', example: 'A perfect day.' },
        { id: 'w875', word: 'imperfect', translation: 'לא מושלם', pronunciation: '/ɪmˈpɜːrfɪkt/', example: 'An imperfect world.' },
        { id: 'w876', word: 'complete', translation: 'שלם', pronunciation: '/kəmˈpliːt/', example: 'A complete set.' },
        { id: 'w877', word: 'incomplete', translation: 'לא שלם', pronunciation: '/ˌɪnkəmˈpliːt/', example: 'An incomplete task.' },
        { id: 'w878', word: 'easy', translation: 'קל', pronunciation: '/ˈiːzi/', example: 'An easy game.' },
        { id: 'w879', word: 'difficult', translation: 'קשה', pronunciation: '/ˈdɪfɪkəlt/', example: 'A difficult decision.' },
        { id: 'w880', word: 'simple', translation: 'פשוט', pronunciation: '/ˈsɪmpl/', example: 'Simple design.' },
        { id: 'w881', word: 'complicated', translation: 'מסובך', pronunciation: '/ˈkɒmplɪkeɪtɪd/', example: 'A complicated issue.' },
        { id: 'w882', word: 'single', translation: 'יחיד', pronunciation: '/ˈsɪŋɡl/', example: 'A single room.' },
        { id: 'w883', word: 'double', translation: 'כפול', pronunciation: '/ˈdʌbl/', example: 'Double doors.' },
        { id: 'w884', word: 'triple', translation: 'משולש', pronunciation: '/ˈtrɪpl/', example: 'Triple strength.' },
        { id: 'w885', word: 'first', translation: 'ראשון', pronunciation: '/fɜːrst/', example: 'First place.' },
        { id: 'w886', word: 'last', translation: 'אחרון', pronunciation: '/lɑːst/', example: 'Last chance.' },
        { id: 'w887', word: 'next', translation: 'הבא', pronunciation: '/nekst/', example: 'Next stop.' },
        { id: 'w888', word: 'previous', translation: 'קודם', pronunciation: '/ˈpriːviəs/', example: 'Previous error.' },
        { id: 'w889', word: 'front', translation: 'קדמי', pronunciation: '/frʌnt/', example: 'Front door.' },
        { id: 'w890', word: 'back', translation: 'אחורי', pronunciation: '/bæk/', example: 'Back seat.' },
        { id: 'w891', word: 'top', translation: 'עליון', pronunciation: '/tɒp/', example: 'Top floor.' },
        { id: 'w892', word: 'bottom', translation: 'תחתון', pronunciation: '/ˈbɒtəm/', example: 'Bottom of the page.' },
        { id: 'w893', word: 'inside', translation: 'פנימי', pronunciation: '/ˌɪnˈsaɪd/', example: 'Inside pocket.' },
        { id: 'w894', word: 'outside', translation: 'חיצוני', pronunciation: '/ˌaʊtˈsaɪd/', example: 'Outside wall.' },
        { id: 'w895', word: 'left', translation: 'שמאלי', pronunciation: '/left/', example: 'Left hand.' },
        { id: 'w896', word: 'right', translation: 'ימני', pronunciation: '/raɪt/', example: 'Right turn.' },
        { id: 'w897', word: 'north', translation: 'צפוני', pronunciation: '/nɔːrθ/', example: 'North pole.' },
        { id: 'w898', word: 'south', translation: 'דרומי', pronunciation: '/saʊθ/', example: 'South side.' },
        { id: 'w899', word: 'east', translation: 'מזרחי', pronunciation: '/iːst/', example: 'East coast.' },
        { id: 'w900', word: 'west', translation: 'מערבי', pronunciation: '/west/', example: 'West side.' },
        { id: 'w901', word: 'up', translation: 'למעלה', pronunciation: '/ʌp/', example: 'Look up.' },
        { id: 'w902', word: 'down', translation: 'למטה', pronunciation: '/daʊn/', example: 'Go down.' },
        { id: 'w903', word: 'on', translation: 'על', pronunciation: '/ɒn/', example: 'On the table.' },
        { id: 'w904', word: 'off', translation: 'כבוי / מנותק', pronunciation: '/ɒf/', example: 'Turn off.' },
        { id: 'w905', word: 'in', translation: 'בתוך', pronunciation: '/ɪn/', example: 'In the box.' },
        { id: 'w906', word: 'out', translation: 'מחוץ', pronunciation: '/aʊt/', example: 'Go out.' },
        { id: 'w907', word: 'here', translation: 'כאן', pronunciation: '/hɪər/', example: 'Come here.' },
        { id: 'w908', word: 'there', translation: 'שם', pronunciation: '/ðer/', example: 'Go there.' },
        { id: 'w909', word: 'now', translation: 'עכשיו', pronunciation: '/naʊ/', example: 'Do it now.' },
        { id: 'w910', word: 'then', translation: 'אז', pronunciation: '/ðen/', example: 'I was there then.' },
        { id: 'w911', word: 'today', translation: 'היום', pronunciation: '/təˈdeɪ/', example: 'Today is a good day.' },
        { id: 'w912', word: 'yesterday', translation: 'אתמול', pronunciation: '/ˈjestərdeɪ/', example: 'I saw him yesterday.' },
        { id: 'w913', word: 'tomorrow', translation: 'מחר', pronunciation: '/təˈmɒroʊ/', example: 'See you tomorrow.' },
        { id: 'w914', word: 'tonight', translation: 'הלילה', pronunciation: '/təˈnaɪt/', example: 'Tonight is the night.' },
        { id: 'w915', word: 'this morning', translation: 'הבוקר', pronunciation: '/ðɪs ˈmɔːrnɪŋ/', example: 'I woke up this morning.' },
        { id: 'w916', word: 'this afternoon', translation: 'אחר הצהריים', pronunciation: '/ðɪs ˌæftərˈnuːn/', example: 'I\'ll work this afternoon.' },
        { id: 'w917', word: 'this evening', translation: 'הערב', pronunciation: '/ðɪs ˈiːvnɪŋ/', example: 'This evening we eat out.' },
        { id: 'w918', word: 'next week', translation: 'שבוע הבא', pronunciation: '/nekst wiːk/', example: 'Next week is busy.' },
        { id: 'w919', word: 'last week', translation: 'שבוע שעבר', pronunciation: '/lɑːst wiːk/', example: 'I visited last week.' },
        { id: 'w920', word: 'next month', translation: 'חודש הבא', pronunciation: '/nekst mʌnθ/', example: 'Next month is July.' },
        { id: 'w921', word: 'last month', translation: 'חודש שעבר', pronunciation: '/lɑːst mʌnθ/', example: 'Last month was hot.' },
        { id: 'w922', word: 'next year', translation: 'שנה הבאה', pronunciation: '/nekst jɪər/', example: 'Next year will be better.' },
        { id: 'w923', word: 'last year', translation: 'שנה שעברה', pronunciation: '/lɑːst jɪər/', example: 'Last year was difficult.' },
        { id: 'w924', word: 'soon', translation: 'בקרוב', pronunciation: '/suːn/', example: 'See you soon.' },
        { id: 'w925', word: 'later', translation: 'מאוחר יותר', pronunciation: '/ˈleɪtər/', example: 'Call me later.' },
        { id: 'w926', word: 'early', translation: 'מוקדם', pronunciation: '/ˈɜːrli/', example: 'Arrive early.' },
        { id: 'w927', word: 'late', translation: 'מאוחר', pronunciation: '/leɪt/', example: 'Come late.' },
        { id: 'w928', word: 'before', translation: 'לפני', pronunciation: '/bɪˈfɔːr/', example: 'Before dinner.' },
        { id: 'w929', word: 'after', translation: 'אחרי', pronunciation: '/ˈæftər/', example: 'After class.' },
        { id: 'w930', word: 'while', translation: 'בזמן ש', pronunciation: '/waɪl/', example: 'While you wait.' },
        { id: 'w931', word: 'when', translation: 'מתי / כאשר', pronunciation: '/wen/', example: 'When did you arrive?' },
        { id: 'w932', word: 'since', translation: 'מאז', pronunciation: '/sɪns/', example: 'Since then.' },
        { id: 'w933', word: 'until', translation: 'עד ש', pronunciation: '/ʌnˈtɪl/', example: 'Wait until tomorrow.' },
        { id: 'w934', word: 'by', translation: 'על ידי / ליד', pronunciation: '/baɪ/', example: 'By the river.' },
        { id: 'w935', word: 'with', translation: 'עם', pronunciation: '/wɪð/', example: 'Go with me.' },
        { id: 'w936', word: 'without', translation: 'בלי', pronunciation: '/wɪðˈaʊt/', example: 'Without a doubt.' },
        { id: 'w937', word: 'for', translation: 'בשביל / עבור', pronunciation: '/fɔːr/', example: 'This is for you.' },
        { id: 'w938', word: 'from', translation: 'מ', pronunciation: '/frɒm/', example: 'From Jerusalem.' },
        { id: 'w939', word: 'to', translation: 'ל', pronunciation: '/tuː/', example: 'Go to school.' },
        { id: 'w940', word: 'at', translation: 'ב', pronunciation: '/æt/', example: 'At home.' },
        { id: 'w941', word: 'on', translation: 'על', pronunciation: '/ɒn/', example: 'On the wall.' },
        { id: 'w942', word: 'in', translation: 'בתוך', pronunciation: '/ɪn/', example: 'In the box.' },
        { id: 'w943', word: 'under', translation: 'מתחת', pronunciation: '/ˈʌndər/', example: 'Under the bed.' },
        { id: 'w944', word: 'over', translation: 'מעל', pronunciation: '/ˈoʊvər/', example: 'Over the rainbow.' },
        { id: 'w945', word: 'above', translation: 'מעל', pronunciation: '/əˈbʌv/', example: 'Above the clouds.' },
        { id: 'w946', word: 'below', translation: 'מתחת', pronunciation: '/bɪˈloʊ/', example: 'Below sea level.' },
        { id: 'w947', word: 'between', translation: 'בין', pronunciation: '/bɪˈtwiːn/', example: 'Between two trees.' },
        { id: 'w948', word: 'among', translation: 'בין (הרבה)', pronunciation: '/əˈmʌŋ/', example: 'Among friends.' },
        { id: 'w949', word: 'near', translation: 'קרוב', pronunciation: '/nɪər/', example: 'Near the park.' },
        { id: 'w950', word: 'far', translation: 'רחוק', pronunciation: '/fɑːr/', example: 'Far away.' },
        { id: 'w951', word: 'next to', translation: 'ליד', pronunciation: '/nekst tuː/', example: 'Next to the table.' },
        { id: 'w952', word: 'beside', translation: 'ליד', pronunciation: '/bɪˈsaɪd/', example: 'Sit beside me.' },
        { id: 'w953', word: 'behind', translation: 'מאחורי', pronunciation: '/bɪˈhaɪnd/', example: 'Behind the door.' },
        { id: 'w954', word: 'in front of', translation: 'מול', pronunciation: '/ɪn frʌnt ɒv/', example: 'In front of the house.' },
        { id: 'w955', word: 'across', translation: 'מעבר ל', pronunciation: '/əˈkrɒs/', example: 'Across the street.' },
        { id: 'w956', word: 'through', translation: 'דרך', pronunciation: '/θruː/', example: 'Walk through the park.' },
        { id: 'w957', word: 'around', translation: 'מסביב', pronunciation: '/əˈraʊnd/', example: 'Walk around the lake.' },
        { id: 'w958', word: 'into', translation: 'אל תוך', pronunciation: '/ˈɪntuː/', example: 'Jump into the water.' },
        { id: 'w959', word: 'out of', translation: 'מחוץ ל', pronunciation: '/aʊt ɒv/', example: 'Get out of here.' },
        { id: 'w960', word: 'up', translation: 'למעלה', pronunciation: '/ʌp/', example: 'Climb up the ladder.' },
        { id: 'w961', word: 'down', translation: 'למטה', pronunciation: '/daʊn/', example: 'Go down the stairs.' },
        { id: 'w962', word: 'off', translation: 'מ', pronunciation: '/ɒf/', example: 'Take it off the shelf.' },
        { id: 'w963', word: 'onto', translation: 'אל (על)', pronunciation: '/ˈɒntoʊ/', example: 'Put the book onto the table.' },
        { id: 'w964', word: 'from', translation: 'מ', pronunciation: '/frɒm/', example: 'From morning till night.' },
        { id: 'w965', word: 'towards', translation: 'לכיוון', pronunciation: '/təˈwɔːrdz/', example: 'Walk towards the light.' },
        { id: 'w966', word: 'about', translation: 'על אודות / בערך', pronunciation: '/əˈbaʊt/', example: 'About 10 people.' },
        { id: 'w967', word: 'after', translation: 'אחרי', pronunciation: '/ˈæftər/', example: 'After a while.' },
        { id: 'w968', word: 'before', translation: 'לפני', pronunciation: '/bɪˈfɔːr/', example: 'Before noon.' },
        { id: 'w969', word: 'during', translation: 'במהלך', pronunciation: '/ˈdʊrɪŋ/', example: 'During the movie.' },
        { id: 'w970', word: 'since', translation: 'מאז', pronunciation: '/sɪns/', example: 'Since childhood.' },
        { id: 'w971', word: 'until', translation: 'עד', pronunciation: '/ʌnˈtɪl/', example: 'Until next time.' },
        { id: 'w972', word: 'while', translation: 'בזמן ש', pronunciation: '/waɪl/', example: 'Wait while I finish.' },
        { id: 'w973', word: 'and', translation: 'ו', pronunciation: '/ænd/', example: 'Apples and bananas.' },
        { id: 'w974', word: 'but', translation: 'אבל', pronunciation: '/bʌt/', example: 'I want to go, but I can\'t.' },
        { id: 'w975', word: 'or', translation: 'או', pronunciation: '/ɔːr/', example: 'Tea or coffee?' },
        { id: 'w976', word: 'so', translation: 'לכן', pronunciation: '/soʊ/', example: 'I was tired, so I slept.' },
        { id: 'w977', word: 'because', translation: 'כי', pronunciation: '/bɪˈkɒz/', example: 'I\'m here because of you.' },
        { id: 'w978', word: 'if', translation: 'אם', pronunciation: '/ɪf/', example: 'If you want.' },
        { id: 'w979', word: 'unless', translation: 'אלא אם כן', pronunciation: '/ʌnˈles/', example: 'I won\'t go unless you come.' },
        { id: 'w980', word: 'although', translation: 'למרות ש', pronunciation: '/ɔːlˈðoʊ/', example: 'Although it\'s raining.' },
        { id: 'w981', word: 'though', translation: 'למרות ש', pronunciation: '/ðoʊ/', example: 'She went, though she was tired.' },
        { id: 'w982', word: 'while', translation: 'בעוד ש', pronunciation: '/waɪl/', example: 'He read while I cooked.' },
        { id: 'w983', word: 'where', translation: 'איפה / היכן', pronunciation: '/wer/', example: 'Where are you?' },
        { id: 'w984', word: 'when', translation: 'מתי / כאשר', pronunciation: '/wen/', example: 'When can we meet?' },
        { id: 'w985', word: 'why', translation: 'למה', pronunciation: '/waɪ/', example: 'Why did you do that?' },
        { id: 'w986', word: 'how', translation: 'איך', pronunciation: '/haʊ/', example: 'How are you?' },
        { id: 'w987', word: 'what', translation: 'מה', pronunciation: '/wɒt/', example: 'What is this?' },
        { id: 'w988', word: 'which', translation: 'איזה', pronunciation: '/wɪtʃ/', example: 'Which one?' },
        { id: 'w989', word: 'who', translation: 'מי', pronunciation: '/huː/', example: 'Who is he?' },
        { id: 'w990', word: 'whom', translation: 'את מי', pronunciation: '/huːm/', example: 'To whom it may concern.' },
        { id: 'w991', word: 'whose', translation: 'של מי', pronunciation: '/huːz/', example: 'Whose book is this?' },
        { id: 'w992', word: 'that', translation: 'ש (קשר)', pronunciation: '/ðæt/', example: 'The book that I read.' },
        { id: 'w993', word: 'this', translation: 'זה', pronunciation: '/ðɪs/', example: 'This is my car.' },
        { id: 'w994', word: 'that', translation: 'ההוא', pronunciation: '/ðæt/', example: 'Look at that bird.' },
        { id: 'w995', word: 'these', translation: 'אלה', pronunciation: '/ðiːz/', example: 'These are my shoes.' },
        { id: 'w996', word: 'those', translation: 'ההם', pronunciation: '/ðoʊz/', example: 'Those people.' },
        { id: 'w997', word: 'I', translation: 'אני', pronunciation: '/aɪ/', example: 'I am happy.' },
        { id: 'w998', word: 'you', translation: 'אתה / אתם', pronunciation: '/juː/', example: 'You are kind.' },
        { id: 'w999', word: 'he', translation: 'הוא', pronunciation: '/hiː/', example: 'He is strong.' },
        { id: 'w1000', word: 'she', translation: 'היא', pronunciation: '/ʃiː/', example: 'She is beautiful.' },
        { id: 'w1001', word: 'it', translation: 'זה (לדומם/חיה)', pronunciation: '/ɪt/', example: 'It is a dog.' },
        { id: 'w1002', word: 'we', translation: 'אנחנו', pronunciation: '/wiː/', example: 'We are friends.' },
        { id: 'w1003', word: 'they', translation: 'הם / הן', pronunciation: '/ðeɪ/', example: 'They are here.' },
        { id: 'w1004', word: 'me', translation: 'אותי', pronunciation: '/miː/', example: 'Give it to me.' },
        { id: 'w1005', word: 'him', translation: 'אותו', pronunciation: '/hɪm/', example: 'See him.' },
        { id: 'w1006', word: 'her', translation: 'אותה', pronunciation: '/hɜːr/', example: 'Talk to her.' },
        { id: 'w1007', word: 'us', translation: 'אותנו', pronunciation: '/ʌs/', example: 'Join us.' },
        { id: 'w1008', word: 'them', translation: 'אותם / אותן', pronunciation: '/ðem/', example: 'Help them.' },
        { id: 'w1009', word: 'my', translation: 'שלי', pronunciation: '/maɪ/', example: 'My book.' },
        { id: 'w1010', word: 'your', translation: 'שלך / שלכם', pronunciation: '/jɔːr/', example: 'Your name.' },
        { id: 'w1011', word: 'his', translation: 'שלו', pronunciation: '/hɪz/', example: 'His car.' },
        { id: 'w1012', word: 'her', translation: 'שלה', pronunciation: '/hɜːr/', example: 'Her dress.' },
        { id: 'w1013', word: 'its', translation: 'שלו / שלה (לדומם/חיה)', pronunciation: '/ɪts/', example: 'The dog wagged its tail.' },
        { id: 'w1014', word: 'our', translation: 'שלנו', pronunciation: '/ˈaʊər/', example: 'Our house.' },
        { id: 'w1015', word: 'their', translation: 'שלהם / שלהן', pronunciation: '/ðer/', example: 'Their children.' },
        { id: 'w1016', word: 'mine', translation: 'שלי', pronunciation: '/maɪn/', example: 'This is mine.' },
        { id: 'w1017', word: 'yours', translation: 'שלך / שלכם', pronunciation: '/jɔːrz/', example: 'Is this yours?' },
        { id: 'w1018', word: 'his', translation: 'שלו', pronunciation: '/hɪz/', example: 'The book is his.' },
        { id: 'w1019', word: 'hers', translation: 'שלה', pronunciation: '/hɜːrz/', example: 'That bag is hers.' },
        { id: 'w1020', word: 'ours', translation: 'שלנו', pronunciation: '/ˈaʊərz/', example: 'The decision is ours.' },
        { id: 'w1021', word: 'theirs', translation: 'שלהם / שלהן', pronunciation: '/ðerz/', example: 'The house is theirs.' },
        { id: 'w1022', word: 'myself', translation: 'עצמי', pronunciation: '/maɪˈself/', example: 'I did it myself.' },
        { id: 'w1023', word: 'yourself', translation: 'עצמך', pronunciation: '/jʊərˈself/', example: 'Help yourself.' },
        { id: 'w1024', word: 'himself', translation: 'עצמו', pronunciation: '/hɪmˈself/', example: 'He did it himself.' },
        { id: 'w1025', word: 'herself', translation: 'עצמה', pronunciation: '/hɜːrˈself/', example: 'She cooked herself dinner.' },
        { id: 'w1026', word: 'itself', translation: 'עצמו / עצמה (לדומם/חיה)', pronunciation: '/ɪtˈself/', example: 'The door opened by itself.' },
        { id: 'w1027', word: 'ourselves', translation: 'עצמנו', pronunciation: '/ˌaʊərˈselvz/', example: 'We enjoyed ourselves.' },
        { id: 'w1028', word: 'themselves', translation: 'עצמם / עצמן', pronunciation: '/ðemˈselvz/', example: 'They did it themselves.' },
        { id: 'w1029', word: 'one', translation: 'אחד / מישהו', pronunciation: '/wʌn/', example: 'One of them.' },
        { id: 'w1030', word: 'somebody', translation: 'מישהו', pronunciation: '/ˈsʌmbɒdi/', example: 'Somebody called.' },
        { id: 'w1031', word: 'anybody', translation: 'מישהו / אף אחד', pronunciation: '/ˈenibɒdi/', example: 'Is anybody home?' },
        { id: 'w1032', word: 'nobody', translation: 'אף אחד', pronunciation: '/ˈnoʊbɒdi/', example: 'Nobody knows.' },
        { id: 'w1033', word: 'everyone', translation: 'כולם', pronunciation: '/ˈevriwʌn/', example: 'Everyone is here.' },
        { id: 'w1034', word: 'someone', translation: 'מישהו', pronunciation: '/ˈsʌmwʌn/', example: 'Someone is at the door.' },
        { id: 'w1035', word: 'anyone', translation: 'מישהו / כל אחד', pronunciation: '/ˈeniwʌn/', example: 'Can anyone help me?' },
        { id: 'w1036', word: 'no one', translation: 'אף אחד', pronunciation: '/noʊ wʌn/', example: 'No one came.' },
        { id: 'w1037', word: 'everything', translation: 'הכל', pronunciation: '/ˈevriθɪŋ/', example: 'Everything is fine.' },
        { id: 'w1038', word: 'something', translation: 'משהו', pronunciation: '/ˈsʌmθɪŋ/', example: 'I want something to eat.' },
        { id: 'w1039', word: 'anything', translation: 'משהו / כל דבר', pronunciation: '/ˈeniθɪŋ/', example: 'Do you need anything?' },
        { id: 'w1040', word: 'nothing', translation: 'כלום', pronunciation: '/ˈnʌθɪŋ/', example: 'There is nothing left.' },
        { id: 'w1041', word: 'everywhere', translation: 'בכל מקום', pronunciation: '/ˈevriwer/', example: 'He looked everywhere.' },
        { id: 'w1042', word: 'somewhere', translation: 'איפשהו', pronunciation: '/ˈsʌmwer/', example: 'Let\'s go somewhere nice.' },
        { id: 'w1043', word: 'anywhere', translation: 'איפשהו / בשום מקום', pronunciation: '/ˈeniwer/', example: 'I can\'t find it anywhere.' },
        { id: 'w1044', word: 'nowhere', translation: 'בשום מקום', pronunciation: '/ˈnoʊwer/', example: 'There\'s nowhere to go.' },
        { id: 'w1045', word: 'yes', translation: 'כן', pronunciation: '/jes/', example: 'Yes, I agree.' },
        { id: 'w1046', word: 'no', translation: 'לא', pronunciation: '/noʊ/', example: 'No, thank you.' },
        { id: 'w1047', word: 'please', translation: 'בבקשה', pronunciation: '/pliːz/', example: 'Please help me.' },
        { id: 'w1048', word: 'thank you', translation: 'תודה', pronunciation: '/θæŋk juː/', example: 'Thank you for everything.' },
        { id: 'w1049', word: 'excuse me', translation: 'סליחה (לתשומת לב)', pronunciation: '/ɪkˈskjuːs miː/', example: 'Excuse me, is this seat taken?' },
        { id: 'w1050', word: 'sorry', translation: 'סליחה (התנצלות)', pronunciation: '/ˈsɒri/', example: 'I am so sorry.' },
        { id: 'w1051', word: 'hello', translation: 'שלום', pronunciation: '/həˈloʊ/', example: 'Hello, how are you?' },
        { id: 'w1052', word: 'goodbye', translation: 'להתראות', pronunciation: '/ˌɡʊdˈbaɪ/', example: 'Goodbye for now.' },
        { id: 'w1053', word: 'hi', translation: 'היי', pronunciation: '/haɪ/', example: 'Hi there!' },
        { id: 'w1054', word: 'bye', translation: 'ביי', pronunciation: '/baɪ/', example: 'Bye-bye!' },
        { id: 'w1055', word: 'morning', translation: 'בוקר', pronunciation: '/ˈmɔːrnɪŋ/', example: 'Good morning!' },
        { id: 'w1056', word: 'afternoon', translation: 'צהריים', pronunciation: '/ˌæftərˈnuːn/', example: 'See you in the afternoon.' },
        { id: 'w1057', word: 'evening', translation: 'ערב', pronunciation: '/ˈiːvnɪŋ/', example: 'Good evening.' },
        { id: 'w1058', word: 'night', translation: 'לילה', pronunciation: '/naɪt/', example: 'Good night.' },
        { id: 'w1059', word: 'good morning', translation: 'בוקר טוב', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', example: 'Good morning, everyone.' },
        { id: 'w1060', word: 'good afternoon', translation: 'צהריים טובים', pronunciation: '/ɡʊd ˌæftərˈnuːn/', example: 'Good afternoon, class.' },
        { id: 'w1061', word: 'good evening', translation: 'ערב טוב', pronunciation: '/ɡʊd ˈiːvnɪŋ/', example: 'Good evening, ladies and gentlemen.' },
        { id: 'w1062', word: 'good night', translation: 'לילה טוב', pronunciation: '/ɡʊd naɪt/', example: 'Good night, sleep tight.' },
        { id: 'w1063', word: 'Mr.', translation: 'אדון', pronunciation: '/ˈmɪstər/', example: 'Mr. Smith.' },
        { id: 'w1064', word: 'Mrs.', translation: 'גברת', pronunciation: '/ˈmɪsɪz/', example: 'Mrs. Davis.' },
        { id: 'w1065', word: 'Ms.', translation: 'גברת (ללא קשר למצב נישואין)', pronunciation: '/mɪz/', example: 'Ms. Johnson.' },
        { id: 'w1066', word: 'Miss', translation: 'עלמה (רווקה)', pronunciation: '/mɪs/', example: 'Miss White.' },
        { id: 'w1067', word: 'Dr.', translation: 'דוקטור', pronunciation: '/ˈdɒktər/', example: 'Dr. Lee.' },
        { id: 'w1068', word: 'Prof.', translation: 'פרופסור', pronunciation: '/prɒf/', example: 'Prof. Green.' },
        { id: 'w1069', word: 'sir', translation: 'אדוני', pronunciation: '/sɜːr/', example: 'Yes, sir.' },
        { id: 'w1070', word: 'madam', translation: 'גברת', pronunciation: '/ˈmædəm/', example: 'Good morning, madam.' },
        { id: 'w1071', word: 'name', translation: 'שם', pronunciation: '/neɪm/', example: 'What is your name?' },
        { id: 'w1072', word: 'age', translation: 'גיל', pronunciation: '/eɪdʒ/', example: 'What is your age?' },
        { id: 'w1073', word: 'address', translation: 'כתובת', pronunciation: '/əˈdres/', example: 'What is your address?' },
        { id: 'w1074', word: 'phone', translation: 'טלפון', pronunciation: '/foʊn/', example: 'Call me on the phone.' },
        { id: 'w1075', word: 'email', translation: 'אימייל', pronunciation: '/ˈiːmeɪl/', example: 'Send me an email.' },
        { id: 'w1076', word: 'job', translation: 'עבודה', pronunciation: '/dʒɒb/', example: 'What is your job?' },
        { id: 'w1077', word: 'profession', translation: 'מקצוע', pronunciation: '/prəˈfeʃn/', example: 'His profession is teaching.' },
        { id: 'w1078', word: 'student', translation: 'תלמיד/ה', pronunciation: '/ˈstuːdənt/', example: 'A college student.' },
        { id: 'w1079', word: 'teacher', translation: 'מורה', pronunciation: '/ˈtiːtʃər/', example: 'She is a great teacher.' },
        { id: 'w1080', word: 'doctor', translation: 'רופא/ה', pronunciation: '/ˈdɒktər/', example: 'Visit the doctor.' },
        { id: 'w1081', word: 'nurse', translation: 'אחות', pronunciation: '/nɜːrs/', example: 'The nurse helped me.' },
        { id: 'w1082', word: 'police', translation: 'משטרה', pronunciation: '/pəˈliːs/', example: 'The police arrived.' },
        { id: 'w1083', word: 'firefighter', translation: 'כבאי/ת', pronunciation: '/ˈfaɪərfaɪtər/', example: 'A brave firefighter.' },
        { id: 'w1084', word: 'driver', translation: 'נהג/ת', pronunciation: '/ˈdraɪvər/', example: 'A taxi driver.' },
        { id: 'w1085', word: 'pilot', translation: 'טייס/ת', pronunciation: '/ˈpaɪlət/', example: 'An airline pilot.' },
        { id: 'w1086', word: 'engineer', translation: 'מהנדס/ת', pronunciation: '/ˌendʒɪˈnɪər/', example: 'He is a software engineer.' },
        { id: 'w1087', word: 'scientist', translation: 'מדען/ית', pronunciation: '/ˈsaɪəntɪst/', example: 'A brilliant scientist.' },
        { id: 'w1088', word: 'artist', translation: 'אמן/ית', pronunciation: '/ˈɑːrtɪst/', example: 'A famous artist.' },
        { id: 'w1089', word: 'musician', translation: 'מוזיקאי/ת', pronunciation: '/mjuːˈzɪʃn/', example: 'A talented musician.' },
        { id: 'w1090', word: 'writer', translation: 'סופר/ת', pronunciation: '/ˈraɪtər/', example: 'A best-selling writer.' },
        { id: 'w1091', word: 'singer', translation: 'זמר/ת', pronunciation: '/ˈsɪŋər/', example: 'A popular singer.' },
        { id: 'w1092', word: 'actor', translation: 'שחקן/ית', pronunciation: '/ˈæktər/', example: 'A movie actor.' },
        { id: 'w1093', word: 'dancer', translation: 'רקדן/ית', pronunciation: '/ˈdænsər/', example: 'A professional dancer.' },
        { id: 'w1094', word: 'manager', translation: 'מנהל/ת', pronunciation: '/ˈmænɪdʒər/', example: 'The project manager.' },
        { id: 'w1095', word: 'boss', translation: 'בוס/ית', pronunciation: '/bɒs/', example: 'My boss is fair.' },
        { id: 'w1096', word: 'worker', translation: 'עובד/ת', pronunciation: '/ˈwɜːrkər/', example: 'A factory worker.' },
        { id: 'w1097', word: 'colleague', translation: 'עמית/ה', pronunciation: '/ˈkɒliːɡ/', example: 'A trusted colleague.' },
        { id: 'w1098', word: 'customer', translation: 'לקוח/ה', pronunciation: '/ˈkʌstəmər/', example: 'Good customer service.' },
        { id: 'w1099', word: 'client', translation: 'לקוח/ה', pronunciation: '/ˈklaɪənt/', example: 'Meet with a client.' },
        { id: 'w1100', word: 'boss', translation: 'בוס/ית', pronunciation: '/bɒs/', example: 'Your boss called.' }
    ];

    let currentWordsForLearning = []; // המילים שיוצגו בפועל ללמידה בדף הנוכחי

    // פונקציה לטעינת נתונים מ-localStorage
    function loadUserStats() {
        const storedStats = localStorage.getItem('lingoMasterUserStats');
        if (storedStats) {
            userStats = JSON.parse(storedStats);
            if (!userStats.learnedWords) {
                userStats.learnedWords = [];
            }
        }
    }

    // פונקציה לשמירת נתונים ל-localStorage
    function saveUserStats() {
        localStorage.setItem('lingoMasterUserStats', JSON.stringify(userStats));
    }

    // פונקציה לעדכון תצוגת הסטטיסטיקות בלוח המחוונים ובסיידבר
    function updateStatsDisplay() {
        dailyGoalElement.textContent = `${userStats.dailyGoal} / ${userStats.totalDailyGoal}`;
        currentStreakElement.textContent = `יום ${userStats.streakDays}`;
        wordsLearnedElement.textContent = userStats.wordsLearnedCount;
        totalPointsElement.textContent = userStats.totalPoints;
        streakDaysValue.textContent = userStats.streakDays;
        pointsValue.textContent = userStats.totalPoints;
    }

    // פונקציה להשמעת הגייה
    function speakWord(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Your browser does not support speech synthesis.');
            console.warn('SpeechSynthesis API not supported.');
        }
    }

    // פונקציה לבחירת מילים ללמידה בדף הנוכחי
    function selectWordsForCurrentSession(count = 10) {
        // בחר מילים שעדיין לא נלמדו
        const unlearnedWords = allWords.filter(word => !userStats.learnedWords.includes(word.id));
        
        // ערבב את המילים ובחר את ה-count הראשונות
        const shuffledWords = [...unlearnedWords].sort(() => 0.5 - Math.random());
        
        currentWordsForLearning = shuffledWords.slice(0, count);
        console.log(`Selected ${currentWordsForLearning.length} words for this session.`);
    }


    // פונקציה לטעינת תוכן הדפים השונים
    function loadPage(pageName) {
        mainContentArea.innerHTML = '';
        
        if (pageName === 'home') {
            mainTitle.textContent = 'שמואל, ברוך שובך! 👋';
            mainSubtitle.textContent = 'בוא/י ונתקדם היום קצת.';
            mainContentArea.appendChild(dashboardStatsSection);
            mainContentArea.appendChild(actionCardsSection);
            dashboardStatsSection.style.display = 'grid';
            actionCardsSection.style.display = 'grid';
        } else if (pageName === 'learn') {
            mainTitle.textContent = 'ללמוד מילים חדשות';
            mainSubtitle.textContent = 'בחר את המילים שתרצה/י ללמוד היום.';

            dashboardStatsSection.style.display = 'none';
            actionCardsSection.style.display = 'none';

            // בחר מילים חדשות ללמידה עבור הסשן הנוכחי
            selectWordsForCurrentSession(); 

            if (currentWordsForLearning.length === 0) {
                // אם אין מילים חדשות ללמוד
                const noWordsMessage = document.createElement('div');
                noWordsMessage.className = 'page-content info-message';
                noWordsMessage.innerHTML = `
                    <i class="fas fa-check-circle fa-3x"></i>
                    <p>כל הכבוד! נראה שלמדת את כל המילים ברשימה הזו!</p>
                    <p>בקרוב יגיעו מילים חדשות.</p>
                `;
                mainContentArea.appendChild(noWordsMessage);
                return; // יציאה מהפונקציה
            }


            const learnPageContent = document.createElement('div');
            learnPageContent.className = 'page-content learn-page';

            const wordListContainer = document.createElement('div');
            wordListContainer.className = 'word-list';

            currentWordsForLearning.forEach(wordData => {
                const isLearned = userStats.learnedWords.includes(wordData.id);
                const wordCard = document.createElement('div');
                wordCard.className = `word-card ${isLearned ? 'learned' : ''}`;
                wordCard.dataset.wordId = wordData.id;

                wordCard.innerHTML = `
                    <h4>${wordData.word}</h4>
                    <p>${wordData.translation}</p>
                    <div class="pronunciation">
                        <i class="fas fa-volume-up speak-btn"></i> ${wordData.pronunciation}
                    </div>
                    <p class="example">${wordData.example}</p>
                    <button class="mark-learned-btn" ${isLearned ? 'disabled' : ''}>
                        ${isLearned ? 'נלמד!' : 'סמן כנלמד'}
                    </button>
                `;

                wordCard.querySelector('.speak-btn').addEventListener('click', () => {
                    speakWord(wordData.word);
                });

                wordCard.querySelector('.mark-learned-btn').addEventListener('click', (event) => {
                    if (!wordCard.classList.contains('learned')) {
                        wordCard.classList.add('learned');
                        event.target.textContent = 'נלמד!';
                        event.target.disabled = true;
                        
                        userStats.learnedWords.push(wordData.id);
                        userStats.wordsLearnedCount++;
                        userStats.dailyGoal++;
                        userStats.totalPoints += 5;

                        saveUserStats();
                        updateStatsDisplay();
                    }
                });

                wordListContainer.appendChild(wordCard);
            });

            learnPageContent.appendChild(wordListContainer);
            mainContentArea.appendChild(learnPageContent);


        } else if (pageName === 'download') {
            mainTitle.textContent = 'הורדות';
            mainSubtitle.textContent = 'קחו את לימוד האנגלית אתכם לכל מקום!';

            dashboardStatsSection.style.display = 'none';
            actionCardsSection.style.display = 'none';

            const downloadPageContent = document.createElement('div');
            downloadPageContent.className = 'page-content download-page';

            downloadPageContent.innerHTML = `
                <section class="download-section">
                    <h2>אפליקציות ותוספים</h2>
                    <p>אנו עובדים במרץ על פיתוח הכלים הללו כדי להעניק לכם את חווית הלימוד הטובה ביותר. הישארו מעודכנים!</p>
                    <div class="download-items">
                        <div class="download-item">
                            <i class="fab fa-chrome"></i>
                            <h3>תוסף לגוגל כרום</h3>
                            <p>תרגום מילים מהיר תוך כדי גלישה ושמירת מילים לאוצר המילים האישי שלכם.</p>
                            <button class="download-soon-btn" disabled>להורדה בקרוב</button>
                        </div>
                        <div class="download-item">
                            <i class="fab fa-windows"></i>
                            <h3>תוכנה לווינדוס</h3>
                            <p>למדו ותרגלו אנגלית גם ללא חיבור לאינטרנט עם ממשק נוח לשולחן העבודה.</p>
                            <button class="download-soon-btn" disabled>להורדה בקרוב</button>
                        </div>
                        <div class="download-item">
                            <i class="fab fa-android"></i>
                            <h3>אפליקציה לאנדרואיד</h3>
                            <p>לימוד אנגלית בדרכים: שיעורים קצרים ותרגולים מהירים ישירות מהנייד.</p>
                            <button class="download-soon-btn" disabled>להורדה בקרוב</button>
                        </div>
                        <div class="download-item">
                            <i class="fab fa-apple"></i>
                            <h3>אפליקציה ל-iOS</h3>
                            <p>התנסו בחווית לימוד חלקה ואינטואיטיבית במכשירי האייפון והאייפד שלכם.</p>
                            <button class="download-soon-btn" disabled>להורדה בקרוב</button>
                        </div>
                    </div>
                </section>
            `;
            mainContentArea.appendChild(downloadPageContent);

        } else if (pageName === 'practice') {
            mainTitle.textContent = 'תרגול ומשחקים';
            mainSubtitle.textContent = 'חזקו את הידע שלכם עם מגוון תרגילים ומשחקים מהנים.';
            dashboardStatsSection.style.display = 'none';
            actionCardsSection.style.display = 'none';
            const practicePageContent = document.createElement('div');
            practicePageContent.className = 'page-content practice-page';
            practicePageContent.innerHTML = `
                <div class="info-message">
                    <p>דף התרגול והמשחקים נמצא בפיתוח. בקרוב תוכלו ליהנות ממגוון רחב של פעילויות מרתקות!</p>
                    <ul>
                        <li><i class="fas fa-play"></i> משחקי זיכרון</li>
                        <li><i class="fas fa-keyboard"></i> תרגילי כתיבה</li>
                        <li><i class="fas fa-headphones"></i> תרגילי האזנה</li>
                        <li><i class="fas fa-question-circle"></i> חידוני טריוויה</li>
                    </ul>
                    <p>הישארו מעודכנים!</p>
                </div>
            `;
            mainContentArea.appendChild(practicePageContent);
        }
        else {
            mainTitle.textContent = 'הדף עדיין בפיתוח';
            mainSubtitle.textContent = 'אנו עובדים במרץ כדי להביא לכם תכנים חדשים ומרגשים!';
            dashboardStatsSection.style.display = 'none';
            actionCardsSection.style.display = 'none';
            const comingSoonPageContent = document.createElement('div');
            comingSoonPageContent.className = 'page-content coming-soon-page';
            comingSoonPageContent.innerHTML = `
                <div class="info-message">
                    <i class="fas fa-hourglass-half fa-3x"></i>
                    <p>תודה על הסבלנות!</p>
                </div>
            `;
            mainContentArea.appendChild(comingSoonPageContent);
        }
    }

    // טעינה ראשונית של הנתונים
    loadUserStats();
    loadPage('home'); // טען את דף הבית מיד לאחר טעינת הנתונים
    updateStatsDisplay();

    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            event.currentTarget.parentElement.classList.add('active');
            const page = event.currentTarget.dataset.page;
            console.log(`Mapsd to: ${page}`);
            loadPage(page);
        });
    });

    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.currentTarget.dataset.action;
            if (action === 'start-learning') {
                navLinks.forEach(l => {
                    if (l.dataset.page === 'learn') {
                        l.parentElement.classList.add('active');
                    } else {
                        l.parentElement.classList.remove('active');
                    }
                });
                loadPage('learn');
            } else if (action === 'start-practice') {
                navLinks.forEach(l => {
                    if (l.dataset.page === 'practice') {
                        l.parentElement.classList.add('active');
                    } else {
                        l.parentElement.classList.remove('active');
                    }
                });
                loadPage('practice');
            }
        });
    });
});