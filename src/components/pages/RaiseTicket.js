import React, { useContext, useState } from 'react';
import GetAssistance from '../../assets/Get assistance.svg';
import { DContext } from '../../context/Datacontext';

export const RaiseTicket = () => {
  const {RaiseTicket} = useContext(DContext) 
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const subjectCharCount = formData.subject.trim().length; 
    const messageCharCount = formData.message.trim().length; 
    return subjectCharCount >= 10 && messageCharCount >= 20;
  };


  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      RaiseTicket(formData);
      setFormData({ subject: "", message: "" });
    }
  };
  return (
    <div className="md:mt-12 mt-5 flex flex-col md:flex-row justify-between items-start px-4 sm:px-8 md:px-20 lg:px-52 gap-8">

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-bold mb-2">
          Need help with your account or job search?
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Fill out the form and our team will reach out via email or send updates in your Notifications.
        </p>

        <form >
          {/* Subject */}
          <div className="space-y-6 sm:ml-16 md:ml-0 lg:ml-16">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your subject (min 10 letters)"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject"
                value={formData?.subject}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Character count : {formData.subject.trim().length} / 10
              </p>
            </div>
            {/* Describe Issue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Issue <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Write details about your issue here... (max 20 characters)"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="message"
                value={formData?.message}
                onChange={handleChange}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Character count : {formData.message.trim().length} / 20
              </p>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleRaiseTicket}
              disabled={!isFormValid()}
              className={`px-5 py-2 rounded-md transition-colors duration-200 w-full sm:w-auto 
                ${isFormValid()
                  ? "bg-primary-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Submit Ticket
            </button>
           </div>
        </form>
      </div>

      {/* Right Side - Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={GetAssistance}
          alt="Assistance Illustration"
          className="w-3/4 sm:w-2/3 md:w-full max-w-xs"
        />
      </div>

    </div>
  );
};
