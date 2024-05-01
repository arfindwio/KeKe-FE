import { useState, useRef, useEffect } from "react";

const OtpInput = ({ onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef(Array(6).fill(null));

  const finalOtp = otp.join("");

  useEffect(() => {
    onOtpChange(finalOtp);
  }, [onOtpChange, finalOtp]);

  const handleChange = (index, value) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text/plain");
    if (/^\d{6}$/.test(clipboardData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = clipboardData.charAt(i);
      }
      setOtp(newOtp);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="outline-neutral-1 h-10 w-10 rounded-2xl border text-center"
          />
        ))}
      </div>
    </>
  );
};

export default OtpInput;
