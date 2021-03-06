import bcrypt from 'bcryptjs'

const students = [
  {
    roll: 11706038,
    name: 'NVSS MANEESH GUPTA',
    yearOfJoining: 2017,
    gender: 'male',
    department: 'Computer Science and Engineering',
    cgpa: 8.39,
    githubHandle: 'ManeeshGuptaNvss',
    tenthMarks: 10,
    interMarks: 97.8,
    email: 'nvsmaneesh8@gmail.com',
    mobile: '7981776225',
    isAdmin: true,
    isScrutinised: true,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    roll: 11706004,
    name: 'Banda Shashi Kumar',
    yearOfJoining: 2017,
    gender: 'male',
    department: 'Computer Science and Engineering',
    cgpa: 8.39,
    githubHandle: 'ManeeshGuptaNvss',
    tenthMarks: 10,
    interMarks: 97.8,
    email: 'nvsmaneesh8@gmail.com',
    mobile: '7981776220',
    isAdmin: false,
    isScrutinised: true,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    roll: 11706050,
    name: 'SVS Surya Prakash',
    yearOfJoining: 2017,
    gender: 'male',
    department: 'Computer Science and Engineering',
    cgpa: 8.39,
    githubHandle: 'ManeeshGuptaNvss',
    tenthMarks: 10,
    interMarks: 97.8,
    email: 'nvsmaneesh8@gmail.com',
    mobile: '7981776224',
    isAdmin: false,
    isScrutinised: false,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    roll: 11706022,
    name: 'KVS Tarun Teja',
    yearOfJoining: 2017,
    gender: 'male',
    department: 'Computer Science and Engineering',
    cgpa: 8.39,
    githubHandle: 'ManeeshGuptaNvss',
    tenthMarks: 10,
    interMarks: 97.8,
    email: 'nvsmaneesh8@gmail.com',
    mobile: '7981776226',
    isAdmin: false,
    isScrutinised: true,
    password: bcrypt.hashSync('123456', 10),
  },
]
// console.log(students.find((p)=>p.roll===11706038))
export default students
