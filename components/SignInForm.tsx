"use client";
import { HTTP_METHODS } from "next/dist/server/web/http";
import React, { ChangeEventHandler, FormEventHandler } from "react";

import { UserResponse } from "@/app/api/auth/sign-in/route";
import useFetchData from "@/hooks/useFetchData";

import JsonContainer from "./JsonContainer";

export default function SignInForm() {
  const initialFormState = { email: "", code: "" };
  const [userInfo, setUserInfo] = React.useState(initialFormState);
  const { data, loading, error, trigger } = useFetchData<UserResponse>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo(prev  => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e:React.FormEvent) => {
    e.preventDefault();
    await trigger({ url: "/api/auth/sign-in", body: userInfo, method: HTTP_METHODS[3] });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-800 p-4 relative">
        <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
        <form onSubmit={handleSubmit} className="my-2">
          <div className="mb-2">
            <label className="block text-gray-800 mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              value={userInfo.email}
              className="border-2 border-gray-800 p-2 w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-800 mb-2" htmlFor="password">
              Code
            </label>
            <input
              onChange={handleChange}
              value={userInfo.code}
              className="border-2 border-gray-800 p-2 w-full"
              type="text"
              id="code"
              name="code"
              placeholder="XYAD-09"
            />
          </div>
          <button
            className="font-bold bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-2 flex items-center"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="w-2/5">
        {loading ? <span>Loading...</span> : null}
        {error ? <span>{error}</span> : null}
        {data ? 
          <section className="p-4 bg-gray-200">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Response:</span>
              <JsonContainer formattedJSON={JSON.stringify(data, null, 2)} />
            </div>
        
            <div className="flex flex-col gap-1">
              <span className="font-bold">Bearer Token:</span>
              {data?.token && <JsonContainer formattedJSON={data?.token} />}
            </div>
          </section>
          : null
        }
      </div>
    </div>
  );
}
