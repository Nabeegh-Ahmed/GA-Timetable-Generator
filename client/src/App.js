import React from 'react'
import Select from 'react-select'

const days = [
  { value: '0', label: 'Monday' },
  { value: '1', label: 'Teusday' },
  { value: '2', label: 'Wednesday' },
  { value: '3', label: 'Thursday' },
  { value: '4', label: 'Friday' },
  { value: '5', label: 'Saturday' },
]

const timeSlots = [
  {
    value: '0',
    label: '8:30-10:00'
  },
  {
    value: '1',
    label: '10:00-11:30'
  },
  {
    value: '2',
    label: '11:30-1:00'
  },
  {
    value: '3',
    label: '1:00-2:30'
  },
  {
    value: '4',
    label: '2:30-4:00'
  },
  {
    value: '5',
    label: '4:00-5:30'
  },
  {
    value: '6',
    label: '5:30-7:00'
  },
]

const App = () => {
  const [offDay, setOffDay] = React.useState('')
  const [firstClass, setFirstClass] = React.useState('')
  const [lastClass, setLastClass] = React.useState('')
  const [consecutives, setConsecutives] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [APIRes, setAPIRes] = React.useState()

  const requestHandler = () => {
    setLoading(true)
    fetch(`http://localhost:5000/timetable?dayOff=${offDay}&consecutives=${consecutives}&lastClass=${lastClass}&firstClass=${firstClass}`)
    .then(res => res.json())
    .then(res => {
      setAPIRes(res)
      console.log(res)
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="bg-gray-900 p-8 h-screen">
      
      <div className='container mx-auto'>
        <div className="text-4xl text-green-500 font-bold">FAST-NU Timetable Generator</div>
        <div className='lg:flex'>
          <div className="my-4 lg:my-8 lg:w-1/2 w-full lg:pr-4">
            <div className="text-2xl text-green-500 my-2">Select Off Day </div>
            <Select 
              options={days} 
              onChange={(e) => setOffDay(e.value)} 
              value={days.filter(function(option) {
                return option.value === offDay;
              })}
            />

            <div className="text-2xl text-green-500 my-2">Number of Consecutive Classes </div>
            <input className='w-full p-2 rounded-md outline-none' placeholder='2 etc' value={consecutives} onChange={(e) => setConsecutives(e.target.value)} type="number" />
          </div>

          <div className='mb-4 lg:my-8 lg:w-1/2 w-full lg:px-4'>
          <div className="text-2xl text-green-500 my-2">Select First Class Time </div>
            <Select 
              options={timeSlots} 
              onChange={(e) => setFirstClass(e.value)}
              value={timeSlots.filter(function(option) {
                return option.value === firstClass;
              })}
            />

            <div className="text-2xl text-green-500 my-2">Select Last Class Time </div>
            <Select 
              options={timeSlots} 
              onChange={(e) => setLastClass(e.value)} 
              value={timeSlots.filter(function(option) {
                return option.value === lastClass;
              })}
            />
            
          </div>

        </div>
        <div 
          className='p-4 text-center text-xl rounded-md bg-green-500 font-bold text-gray-900 cursor-pointer'  
          onClick={requestHandler}
        >Generate</div>
      </div>

      {
        loading && <div className='text-center text-xl font-bold text-green-500 my-4'>Our AI is generating a timetable for you</div>
      }
      
        
      <div className='bg-black p-2 rounded-md container mx-auto my-8 text-white'>
        <div>Monday:</div>
        
        {
          APIRes && (
            
          APIRes.timetable0.Monday.map((item, index) => {
              return item.map(clss => {
                return (
                  <div className='flex space-x-4'>
                    <div>{clss.name[0]}</div>
                    <div>{clss.time}</div>
                  </div>
                )
              })
          })
          )
        }

      
        <div className='mt-4'>Tuesday:</div>
        
          {
            APIRes && (
              
            APIRes.timetable0.Tuesday.map((item, index) => {
                return item.map(clss => {
                  return (
                    <div className='flex space-x-4'>
                      <div>{clss.name[0]}</div>
                      <div>{clss.time}</div>
                    </div>
                  )
                })
            })
            )
          }

        

        <div className='mt-4'>Wednesday:</div>
      
        {
          APIRes && (
            
          APIRes.timetable0.Wednesday.map((item, index) => {
              return item.map(clss => {
                return (
                  <div className='flex space-x-4'>
                    <div>{clss.name[0]}</div>
                    <div>{clss.time}</div>
                  </div>
                )
              })
          })
          )
        }

        <div className='mt-4'>Thursday:</div>
        
        {
          APIRes && (
            
          APIRes.timetable0.Thursday.map((item, index) => {
              return item.map(clss => {
                return (
                  <div className='flex space-x-4'>
                    <div>{clss.name[0]}</div>
                    <div>{clss.time}</div>
                  </div>
                )
              })
          })
          )
        }

        <div className='mt-4'>Friday:</div>
      
        {
          APIRes && (
            
          APIRes.timetable0.Friday.map((item, index) => {
              return item.map(clss => {
                return (
                  <div className='flex space-x-4'>
                    <div>{clss.name[0]}</div>
                    <div>{clss.time}</div>
                  </div>
                )
              })
          })
          )
        }

      </div>


      
    </div>
  );
}

export default App;
