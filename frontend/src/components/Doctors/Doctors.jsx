import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [apiError, setApiError] = useState('');
  const [apiSucces, setApiSucces] = useState('');

  useEffect(() => {
    getDoctors();
  }, []);

  async function getDoctors() {
    try {
      let { data } = await axios.get('http://localhost:5555/doctors');
      setDoctors(data);
    } catch (err) {
      setApiError('Error fetching doctors');
    }
  }

  async function handleAddDoctor(values) {
    setApiError('');
    setApiSucces('');

    if (!values.name || !values.specialty || !values.image) {
      setApiError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('specialty', values.specialty);
    formData.append('image', values.image);

    try {
      const { data } = await axios.post('http://localhost:5555/addDoctor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setApiSucces(data.message);
      getDoctors(); // Refresh the list of doctors
    } catch (err) {
      setApiError('Error adding doctor');
    }
  }

  async function handleDeleteDoctor(id) {
    try {
      await axios.delete(`http://localhost:5555/deleteDoctor/${id}`);
      setApiSucces('Doctor deleted successfully');
      getDoctors(); // Refresh the list of doctors
    } catch (err) {
      setApiError('Error deleting doctor');
    }
  }

  const formik = useFormik({
    initialValues: { name: '', specialty: '', image: null },
    onSubmit: handleAddDoctor,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-0 mt-8 max-w-md space-y-4 mb-9">
        <h1>Add Doctor</h1>
        {apiError && <div className="text-red-600">{apiError}</div>}
        {apiSucces && <div className="text-green-600">{apiSucces}</div>}

        <div>
          <label htmlFor="name" className="sr-only">Doctor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="text-stone-800 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Doctor Name"
          />
        </div>

        <div>
          <label htmlFor="specialty" className="sr-only">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formik.values.specialty}
            onChange={formik.handleChange}
            className="text-stone-800 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Doctor Specialty"
          />
        </div>

        <div>
          <label htmlFor="image" className="sr-only">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
            className="text-stone-800 w-full rounded-lg border-gray-900 p-4 pe-12 text-sm shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white bg-blue-500"
        >
          Add Doctor
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Specialty</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y  divide-gray-200">
            {doctors.map((doctor) => (
              <tr  key={doctor._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{doctor.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{doctor.specialty}</td>
                <td className="whitespace-nowrap px-4 py-2">
                <img className='rounded-full w-28' src={`http://localhost:5555${doctor.imageUrl}`} alt="Doctor" />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
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
