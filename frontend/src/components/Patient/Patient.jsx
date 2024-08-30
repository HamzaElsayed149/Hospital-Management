import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function Patient() {
  const [patient, setpatient] = useState([]);
  const [apiError, setApiError] = useState('');
  const [apiSucces, setApiSucces] = useState('');

  useEffect(() => {
    getPatient();
  }, []);

  async function getPatient() {
    try {
      let { data } = await axios.get('http://localhost:5555/patient');
      setpatient(data);
    } catch (err) {
      setApiError('Error fetching patient');
    }
  }

  async function handleAddpatient(values) {
    setApiError('');
    setApiSucces('');
  
    if (!values.name || !values.age || !values.gender) {
      setApiError('All fields are required');
      return;
    }
  
    try {
      const { data } = await axios.post('http://localhost:5555/addPatient', {
        name: values.name,
        age: values.age,
        gender: values.gender
      });
      setApiSucces(data.message);
      getPatient(); // Refresh the list of patients
    } catch (err) {
      setApiError('Error adding patient');
    }
  }
  

  async function handleDeletepatient(id) {
    try {
      await axios.delete(`http://localhost:5555/deletpatient/${id}`);
      setApiSucces('patient deleted successfully');
      getPatient(); // Refresh the list of doctors
    } catch (err) {
      setApiError('Error deleting patient');
    }
  }

  const formik = useFormik({
    initialValues: { name: '', age: '', gender: '' },
    onSubmit: handleAddpatient,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-0 mt-8 max-w-md space-y-4 mb-9">
        <h1>Add Doctor</h1>
        {apiError && <div className="text-red-600">{apiError}</div>}
        {apiSucces && <div className="text-green-600">{apiSucces}</div>}

        <div>
          <label htmlFor="name" className="sr-only">Patient Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="text-stone-800 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Patient Name"
          />
        </div>

        <div>
          <label htmlFor="age" className="sr-only">age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            className="text-stone-800 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Patient age"
          />
        </div>

        <div>
          <label htmlFor="gender" className="sr-only">gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            className="text-stone-800 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Patient gender"
          />
          
        </div>
      




      
        <button
          type="submit"
          className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white bg-blue-500"
        >
          Add patient
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">age</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">gender</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {patient?.map((patient) => (
              <tr key={patient._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{patient.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{patient.age}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{patient.gender}</td>

                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleDeletepatient(patient._id)}
                    className="bg-red-700 p-3 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
