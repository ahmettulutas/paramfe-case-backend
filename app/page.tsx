"use client";
import React from "react";

export default function Home() {
  const initialFormState = { fullName: "", email: "" };

  const [form, setForm] = React.useState(initialFormState);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ ...form }),
      }).then(res => res.json()).then(res => setData(res));

    } catch (err: any) {
      throw new Error(err);
    }
    setLoading(false);
    setForm(initialFormState);
  };

  return (
    <form className='flex flex-col gap-4 m-10' onSubmit={handleSubmit}>
      <h1 className='text-center text-bold text-violet-900'>TEST SIGN UP ENDPOINTS</h1>
      <input className="border-2 border-gray-800 p-2" name="fullName" onChange={handleChange} type="text" placeholder='name' />
      <input className="border-2 border-gray-800 p-2" name="email" onChange={handleChange} type="text" placeholder='email' />
      <button className="bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2" type="submit">TEST SIGNUP POST</button>
      {loading ? <span>Loading...</span> : null}
      {data ? <span>{JSON.stringify(data)}</span> : null}
    </form>
  );
}
