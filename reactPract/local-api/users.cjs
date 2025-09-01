const users = [
  {
    id: 1,
    password: 61353,
    fullName: 'Emma Johnson',
    about: 'Traveler and foodie',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Canada', city: 'Toronto' },
    posts: [
      { id: '$1001', likesCount: 243, message: 'Exploring the best coffee spots in Toronto.' },
      { id: '$1002', likesCount: 87, message: 'Sunset walks are my therapy.' },
    ],
    followed: { it: [2, 3, 4], they: [29, 30, 31] },
    status: ''
  },
  {
    id: 2,
    password: 12345,
    fullName: 'Lucas Müller',
    about: 'Frontend developer',
    avatar: 'https://i.pinimg.com/736x/2a/b0/57/2ab057f4c2b62828c0ad110f77d02628.jpg',
    profilePhoto: '',
    location: { country: 'Germany', city: 'Berlin' },
    posts: [
      { id: '$1003', likesCount: 145, message: 'Just deployed a new project!' },
      { id: '$1004', likesCount: 321, message: 'Berlin’s street art never gets old.' },
    ],
    followed: { it: [3, 4, 5], they: [1, 30, 31] },
    status: ''
  },
  {
    id: 3,
    password: 52290,
    fullName: 'Aiko Tanaka',
    about: 'Nature photographer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Japan', city: 'Osaka' },
    posts: [
      { id: '$1005', likesCount: 402, message: 'Captured a stunning sunrise this morning.' },
      { id: '$1006', likesCount: 198, message: 'Cherry blossom season is magical.' },
    ],
    followed: { it: [4, 5, 6], they: [1, 2, 31] },
    status: ''
  },
  {
    id: 4,
    password: 55613,
    fullName: 'Mateo García',
    about: 'Cycling enthusiast',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Spain', city: 'Barcelona' },
    posts: [
      { id: '$1007', likesCount: 99, message: 'Weekend cycling trip through the hills.' },
      { id: '$1008', likesCount: 256, message: 'Barcelona sunrise rides are unbeatable.' },
    ],
    followed: { it: [5, 6, 7], they: [1, 2, 3] },
    status: ''
  },
  {
    id: 5,
    password: 79407,
    fullName: 'Lina Kovalenko',
    about: 'UX designer and cat lover',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Ukraine', city: 'Lviv' },
    posts: [
      { id: '$1009', likesCount: 321, message: 'New app design finally ready to test!' },
      { id: '$1010', likesCount: 150, message: 'My cat decided to help me work today.' },
    ],
    followed: { it: [6, 7, 8], they: [2, 3, 4] },
    status: ''
  },
  {
    id: 6,
    password: 14505,
    fullName: 'James Smith',
    about: 'Enjoys cooking and hiking',
    avatar: '',
    profilePhoto: '',
    location: { country: 'USA', city: 'Seattle' },
    posts: [
      { id: '$1011', likesCount: 74, message: 'Tried a new pasta recipe – delicious!' },
      { id: '$1012', likesCount: 289, message: 'Mountain hiking this weekend was perfect.' },
    ],
    followed: { it: [7, 8, 9], they: [3, 4, 5] },
    status: ''
  },
  {
    id: 7,
    password: 67456,
    fullName: 'Chiara Rossi',
    about: 'Architecture student',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Italy', city: 'Milan' },
    posts: [
      { id: '$1013', likesCount: 178, message: 'Visited an incredible modern art museum.' },
      { id: '$1014', likesCount: 265, message: 'Sketching buildings for my final project.' },
    ],
    followed: { it: [8, 9, 10], they: [4, 5, 6] },
    status: ''
  },
  {
    id: 8,
    password: 33126,
    fullName: 'Pierre Dubois',
    about: 'Coffee addict and tech geek',
    avatar: '',
    profilePhoto: '',
    location: { country: 'France', city: 'Lyon' },
    posts: [
      { id: '$1015', likesCount: 204, message: 'Best espresso I’ve ever had in Lyon.' },
      { id: '$1016', likesCount: 109, message: 'Experimenting with new coding stacks.' },
    ],
    followed: { it: [9, 10, 11], they: [5, 6, 7] },
    status: ''
  },
  {
    id: 9,
    password: 12359,
    fullName: 'Noura El-Amin',
    about: 'Digital artist and gamer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Egypt', city: 'Cairo' },
    posts: [
      { id: '$1017', likesCount: 355, message: 'Finished my new digital art series!' },
      { id: '$1018', likesCount: 187, message: 'Late-night gaming is the best.' },
    ],
    followed: { it: [10, 11, 12], they: [6, 7, 8] },
    status: ''
  },
  {
    id: 10,
    password: 28502,
    fullName: 'Igor Petrov',
    about: 'History buff and writer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Russia', city: 'Moscow' },
    posts: [
      { id: '$1019', likesCount: 97, message: 'Researching medieval history again.' },
      { id: '$1020', likesCount: 276, message: 'Started writing my next book.' },
    ],
    followed: { it: [11, 12, 13], they: [7, 8, 9] },
    status: ''
  },
  {
    id: 11,
    password: 10441,
    fullName: 'Marta Nowak',
    about: 'Fitness and health coach',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Poland', city: 'Warsaw' },
    posts: [
      { id: '$1021', likesCount: 189, message: 'New workout routine is paying off.' },
      { id: '$1022', likesCount: 95, message: 'Nutrition tips for busy people.' },
    ],
    followed: { it: [12, 13, 14], they: [8, 9, 10] },
    status: ''
  },
  {
    id: 12,
    password: 40984,
    fullName: 'Andreas Jensen',
    about: 'Data analyst and music lover',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Denmark', city: 'Copenhagen' },
    posts: [
      { id: '$1023', likesCount: 157, message: 'Analyzing trends in music streaming.' },
      { id: '$1024', likesCount: 214, message: 'Concert last night was amazing!' },
    ],
    followed: { it: [13, 14, 15], they: [9, 10, 11] },
    status: ''
  },
  {
    id: 13,
    password: 15030,
    fullName: 'Isabella Silva',
    about: 'Yoga and wellness enthusiast',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Brazil', city: 'São Paulo' },
    posts: [
      { id: '$1025', likesCount: 302, message: 'Morning yoga routine to start the day.' },
      { id: '$1026', likesCount: 134, message: 'Healthy eating tips from my coach.' },
    ],
    followed: { it: [14, 15, 16], they: [10, 11, 12] },
    status: ''
  },
  {
    id: 14,
    password: 84979,
    fullName: 'Ali Reza',
    about: 'Backend dev and chess fan',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Iran', city: 'Tehran' },
    posts: [
      { id: '$1027', likesCount: 210, message: 'Working on new API improvements.' },
      { id: '$1028', likesCount: 178, message: 'Chess tournament coming up soon.' },
    ],
    followed: { it: [15, 16, 17], they: [11, 12, 13] },
    status: ''
  },
  {
    id: 15,
    password: 79260,
    fullName: 'Elena Georgieva',
    about: 'Books and tea person',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Bulgaria', city: 'Sofia' },
    posts: [
      { id: '$1029', likesCount: 121, message: 'Currently reading a fascinating novel.' },
      { id: '$1030', likesCount: 89, message: 'Tea blends for every season.' },
    ],
    followed: { it: [16, 17, 18], they: [12, 13, 14] },
    status: ''
  },
  {
    id: 16,
    password: 19022,
    fullName: 'John Miller',
    about: 'Car mechanic and vlogger',
    avatar: '',
    profilePhoto: '',
    location: { country: 'USA', city: 'Chicago' },
    posts: [
      { id: '$1031', likesCount: 264, message: 'Fixing classic cars is my passion.' },
      { id: '$1032', likesCount: 146, message: 'New vlog about car maintenance.' },
    ],
    followed: { it: [17, 18, 19], they: [13, 14, 15] },
    status: ''
  },
  {
    id: 17,
    password: 31582,
    fullName: 'Sophie Dubois',
    about: 'Fashion blogger',
    avatar: '',
    profilePhoto: '',
    location: { country: 'France', city: 'Paris' },
    posts: [
      { id: '$1033', likesCount: 319, message: 'Spring fashion trends are here!' },
      { id: '$1034', likesCount: 201, message: 'Sharing my favorite outfit ideas.' },
    ],
    followed: { it: [18, 19, 20], they: [14, 15, 16] },
    status: ''
  },
  {
    id: 18,
    password: 53921,
    fullName: 'Ahmed Hassan',
    about: 'Startup founder and mentor',
    avatar: '',
    profilePhoto: '',
    location: { country: 'UAE', city: 'Dubai' },
    posts: [
      { id: '$1035', likesCount: 282, message: 'Pitching at the tech conference.' },
      { id: '$1036', likesCount: 174, message: 'Mentoring new entrepreneurs.' },
    ],
    followed: { it: [19, 20, 21], they: [15, 16, 17] },
    status: ''
  },
  {
    id: 19,
    password: 17939,
    fullName: 'Yuki Nakamura',
    about: 'Anime fan and developer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Japan', city: 'Kyoto' },
    posts: [
      { id: '$1037', likesCount: 223, message: 'Watching classic anime series.' },
      { id: '$1038', likesCount: 156, message: 'Working on a new game project.' },
    ],
    followed: { it: [20, 21, 22], they: [16, 17, 18] },
    status: ''
  },
  {
    id: 20,
    password: 34766,
    fullName: 'Petra Novak',
    about: 'Journalist and activist',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Czech Republic', city: 'Prague' },
    posts: [
      { id: '$1039', likesCount: 198, message: 'Covering local community events.' },
      { id: '$1040', likesCount: 132, message: 'Advocating for human rights.' },
    ],
    followed: { it: [21, 22, 23], they: [17, 18, 19] },
    status: ''
  },
{
    id: 21,
    password: 25781,
    fullName: 'Alex Kim',
    about: 'Guitarist and sound engineer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'South Korea', city: 'Seoul' },
    posts: [
      { id: '$1041', likesCount: 255, message: 'Recording new tracks in the studio.' },
      { id: '$1042', likesCount: 190, message: 'Live concert next weekend!' },
    ],
    followed: { it: [22, 23, 24], they: [18, 19, 20] },
    status: ''
  },
  {
    id: 22,
    password: 64916,
    fullName: 'Daniela Almeida',
    about: 'Graphic designer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Portugal', city: 'Lisbon' },
    posts: [
      { id: '$1043', likesCount: 176, message: 'Working on a branding project.' },
      { id: '$1044', likesCount: 143, message: 'Design inspiration from nature.' },
    ],
    followed: { it: [23, 24, 25], they: [19, 20, 21] },
    status: ''
  },
  {
    id: 23,
    password: 82564,
    fullName: 'Tomasz Zielinski',
    about: 'Craft beer lover',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Poland', city: 'Krakow' },
    posts: [
      { id: '$1045', likesCount: 210, message: 'Trying out new local breweries.' },
      { id: '$1046', likesCount: 168, message: 'Organizing a beer tasting event.' },
    ],
    followed: { it: [24, 25, 26], they: [20, 21, 22] },
    status: ''
  },
  {
    id: 24,
    password: 60090,
    fullName: 'Natalie Berg',
    about: 'Marketing specialist',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Sweden', city: 'Stockholm' },
    posts: [
      { id: '$1047', likesCount: 129, message: 'Launching a new campaign soon.' },
      { id: '$1048', likesCount: 94, message: 'Networking at the marketing summit.' },
    ],
    followed: { it: [25, 26, 27], they: [21, 22, 23] },
    status: ''
  },
  {
    id: 25,
    password: 74670,
    fullName: 'Omar Farouk',
    about: 'Crypto enthusiast',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Turkey', city: 'Istanbul' },
    posts: [
      { id: '$1049', likesCount: 301, message: 'Bitcoin prices are volatile today.' },
      { id: '$1050', likesCount: 210, message: 'Exploring blockchain applications.' },
    ],
    followed: { it: [26, 27, 28], they: [22, 23, 24] },
    status: ''
  },
  {
    id: 26,
    password: 86888,
    fullName: 'Kristina Ivanova',
    about: 'Painter and gallery curator',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Ukraine', city: 'Odesa' },
    posts: [
      { id: '$1051', likesCount: 195, message: 'Preparing for the new exhibition.' },
      { id: '$1052', likesCount: 112, message: 'Inspiring art workshops this week.' },
    ],
    followed: { it: [27, 28, 29], they: [23, 24, 25] },
    status: ''
  },
  {
    id: 27,
    password: 12163,
    fullName: 'William Brown',
    about: 'Nature explorer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Canada', city: 'Vancouver' },
    posts: [
      { id: '$1053', likesCount: 237, message: 'Hiking the coastal trails.' },
      { id: '$1054', likesCount: 153, message: 'Captured amazing wildlife photos.' },
    ],
    followed: { it: [28, 29, 30], they: [24, 25, 26] },
    status: ''
  },
  {
    id: 28,
    password: 73101,
    fullName: 'Sana Kapoor',
    about: 'Tech reviewer',
    avatar: '',
    profilePhoto: '',
    location: { country: 'India', city: 'Mumbai' },
    posts: [
      { id: '$1055', likesCount: 186, message: 'Reviewing the latest smartphone model.' },
      { id: '$1056', likesCount: 124, message: 'Unboxing gadgets live tomorrow.' },
    ],
    followed: { it: [29, 30, 1], they: [25, 26, 27] },
    status: ''
  },
  {
    id: 29,
    password: 59910,
    fullName: 'Zhang Wei',
    about: 'Startup CTO',
    avatar: '',
    profilePhoto: '',
    location: { country: 'China', city: 'Shanghai' },
    posts: [
      { id: '$1057', likesCount: 298, message: 'Scaling our app infrastructure.' },
      { id: '$1058', likesCount: 214, message: 'Tech talks and networking.' },
    ],
    followed: { it: [30, 1, 2], they: [26, 27, 28] },
    status: ''
  },
  {
    id: 30,
    password: 85295,
    fullName: 'Greta Maier',
    about: 'Photographer and climber',
    avatar: '',
    profilePhoto: '',
    location: { country: 'Austria', city: 'Vienna' },
    posts: [
      { id: '$1059', likesCount: 174, message: 'Climbing the Alps was breathtaking.' },
      { id: '$1060', likesCount: 138, message: 'Editing photos from my last trip.' },
    ],
    followed: { it: [1, 2, 3], they: [27, 28, 29] },
    status: ''
  }
];


module.exports = users;