import React, { useCallback, useEffect, useRef, useState } from "react";

export default function PasswordGenerator() {
  let [length, setLength] = useState(6);
  let [numPass, setNumPass] = useState(false);
  let [charPass, setCharPass] = useState(false);
  let [password, setPassword] = useState("");

  //useRef hook
  let passwordRef = useRef(null);

  //useCallback hook
  let generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numPass) str += "1234567890";
    if (charPass) str += "~`!@#$%^&*(){}[]?/|:;<>,.-=+_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numPass, charPass, setPassword]);

  //for copy password
  let handelCopyPassword = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  };

  //useEffect hook
  useEffect(() => {
    generatePassword();
  }, [length, numPass, charPass, generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={handelCopyPassword}
        >
          copy
        </button>
      </div>
      <div className="flex flex-wrap text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numPass}
            onChange={() => {
              setNumPass((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={charPass}
            onChange={() => {
              setCharPass((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
