import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    faculty: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignin,
}: Props) {
  return (
    <div>
      {isSignin ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="ชื่อจริง"
            value={inputs.firstName}
            onChange={handleChangeInput}
            name="firstName" // name attribute is used to identify the input field
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="นามสกุล"
            value={inputs.lastName}
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="text"
          className="w-full p-2 py-3 border rounded"
          placeholder="อีเมล"
          value={inputs.email}
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      {isSignin ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="เบอร์"
            value={inputs.phone}
            onChange={handleChangeInput}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="คณะ"
            value={inputs.faculty}
            onChange={handleChangeInput}
            name="faculty"
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="password"
          className="w-full p-2 py-3 border rounded"
          placeholder="รหัสผ่าน"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  );
}
