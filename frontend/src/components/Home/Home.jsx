import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patient, setpatient] = useState([]);

  useEffect(() => {
    getDoctors();
    getPatient()
  }, []);
  async function getDoctors() {

      let { data } = await axios.get('http://localhost:5555/doctors');
      setDoctors(data);
    
  }
  async function getPatient() {
  
      let { data } = await axios.get('http://localhost:5555/patient');
      setpatient(data);
  
  }
  return (
    <div className="flex">
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
  <div className="h-12 rounded-lg bg-gray-200">
    <h1 className='font-bold  text-xl p-2'>Doctors: <span className=' text-red-700'> {doctors.length}</span> </h1>
  </div>
  <div className="h-12 rounded-lg bg-gray-200">    <h1 className='font-bold  text-xl p-2'>Patient: <span className=' text-red-700'> {patient.length}</span> </h1>
  </div>
</div>
      </div>
    </div>
  );
}
