
import React, { useState } from "react";
import { FaCalculator, FaPlusCircle } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import footings1 from "../assets/footings1.jpg";
import footings2 from "../assets/footings2.jpg";
import footings3 from "../assets/footings3.jpg";
import footings4 from "../assets/footings4.jpg";
import { GoDotFill } from "react-icons/go";

function Plastering() {
  const [currentImage, setCurrentImage] = useState(0);
  // Form state
  const [formData, setFormData] = useState({
    area: "",
    T: "",

    R1: "",
    R2: "",

  });
  console.log(formData);

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState({

    cementBags: "0",
    sandVolume: "0",



  });

  const blockImages = [footings1, footings2, footings3, footings4];
  const decimalFields = ["area"];

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData["area"] || parseFloat(formData["area"]) <= 0) {
      newErrors["area"] = `Enter valid ${"area"}`;
    }

    if (!formData.R1 || !formData.R2) {
      newErrors.R2 = "Select Ratio";
    }
    if (!formData.T) {
      newErrors.T = "Select Thickness (m)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Input blur formatting for decimals
  const handleBlur = (field, value) => {
    let formatted = value;
    if (decimalFields.includes(field)) {
      if (value === ".") formatted = "0.0";
      else if (value.startsWith(".")) formatted = `0${value}`;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: formatted,
    }));
  };

  // Key down validation to restrict invalid chars
  const handleKeyDown = (e, field) => {
    if (decimalFields.includes(field)) {
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key === "Enter" ||
        e.key === "Escape" ||
        (e.key >= "0" && e.key <= "9") ||
        e.key === "." ||
        e.key === "-"
      ) {
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    }
  };

  // Calculate results based on inputs and provided formulas
  const calculateResults = () => {
    if (!validateForm()) return;

    const {
      area,
      T,
      R1,
      R2,

    } = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
    );
    const thickness = T / 1000

    const DryFactor = 1.33
    const CementBagVolume = 0.035
    const Wastage = 0.05

    const MeanMortar = (area * thickness +area * thickness*DryFactor)/2
     const MeanMortarwate =MeanMortar*(1+Wastage)
    const CementVolume=MeanMortarwate*R1/(R1+R2)
const sandVolume=(MeanMortarwate*R2/(R1+R2)).toFixed(2)

    const cementBags=(CementVolume/CementBagVolume).toFixed(2)
    
    setResults({
sandVolume,cementBags
    });

    // Log values for debug

  };



  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % blockImages.length);
  };
  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + blockImages.length) % blockImages.length);
  };

  return (
    <>
      <div className="min-h-screen md:h-screen bg-gradient-to-br from-gray-50 to-gray-100 lg:overflow-hidden">
        {/* Mobile Layout (Original) */}
        <div className="lg:hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Calculator Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 lg:p-8 bg-gradient-to-r from-emerald-500 to-teal-600">
                  <div className="flex items-center mb-2">
                    <FaCalculator className="w-8 h-8 text-white mr-3" />
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">BlockLength</h1>
                  </div>
                </div>
                {/* Description */}
                <div className="p-6 bg-emerald-50 border-b border-emerald-100">
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    Providing and laying manually batched, machine-mixed M-25 grade design mix concrete for RCC works, including pumping, centering, shuttering, finishing, and approved admixtures as per IS:9103 to modify setting time and improve workability, including reinforcement, as directed by the Engineer-in-charge
                  </p>
                </div>
                {/* Input Fields */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  {[
                    { label: 'area', indata: ' (m²)', field: 'area', },


                  ].map(({ label, field, step, indata }) => (
                    <div key={field} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="text-sm font-semibold text-gray-700 flex items-center sm:w-56 sm:flex-shrink-0">
                        <GoDotFill className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{label}</span>
                      </label>
                      <input
                        type="text"
                        step="any"
                        onKeyDown={(e) => handleKeyDown(e, field)}
                        onWheel={(e) => e.target.blur()}
                        placeholder="0"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={(e) => handleBlur(field, e.target.value)}
                        className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                      />
                      {errors[field] && (
                        <span className="text-red-500 text-xs">{errors[field]}</span>
                      )}
                      <span className="text-xs sm:text-sm">{indata}</span>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <label className="text-sm font-semibold text-gray-700 flex items-center sm:w-56 sm:flex-shrink-0">
                      <GoDotFill className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Thickness </span>
                    </label>
                    <select onChange={(e) => handleInputChange("T", e.target.value)}
                      className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                      value={formData['T'] || ''}>
                      <option hidden>select  </option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>

                    </select>
                    {errors.T && (
                      <span className="text-red-500 text-xs">{errors.T}</span>
                    )}
                    <span className="text-xs sm:text-sm">  (mm)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <label className="text-sm font-semibold text-gray-700 flex items-center sm:w-56 sm:flex-shrink-0">
                      <GoDotFill className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Ratio</span>
                    </label>
                    <select
                      onChange={(e) => {
                        const [r1, r2] = e.target.value.split(":").map(Number);
                        setFormData((prev) => ({ ...prev, R1: r1, R2: r2 }));
                      }}
                      className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                      value={formData.R1 && formData.R2 ? `${formData.R1}:${formData.R2}` : ''}
                    >
                      <option hidden>select  </option>
                      <option value="1:3">1:3</option>
                      <option value="1:4">1:4</option>
                      <option value="1:5">1:5</option>
                      <option value="1:6">1:6</option>
                    </select>
                    {errors.R2 && (
                      <span className="text-red-500 text-xs">{errors.R2}</span>
                    )}
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculateResults}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all transform hover:scale-[1.02] shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
                  >
                    <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Calculate Quantities
                  </button>
                </div>
              </div>
            </div>
            {/* Image Slider Section */}
            <div className="p-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {blockImages.map((image, index) => (
                    <img key={index} src={image} alt="" className="w-full h-64 object-contain flex-shrink-0" />
                  ))}
                </div>
                <button onClick={previousImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow">
                  <MdChevronLeft />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow">
                  <MdChevronRight />
                </button>
              </div>
            </div>
          </div>
          {/* Results Section */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
              {/* Results Header */}
              <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white flex items-center">
                  <FaCalculator className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-2 md:mr-3" />
                  Calculation Results
                </h2>
                <p className="text-xs md:text-sm lg:text-base text-blue-100 mt-1 md:mt-2">
                  Material quantities required for your project
                </p>
              </div>
              {/* Results Content */}
              <div className="p-4 md:p-6 lg:p-8">
                {/* Project Summary */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl md:rounded-2xl border border-emerald-200">
                  <h4 className="text-base md:text-lg font-bold text-emerald-800 mb-2 md:mb-3">Project Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                    
                    <div>
                      <span className="text-gray-600">Cement bags (50kg):</span>
                      <span className="font-semibold text-orange-600 ml-1 md:ml-2">{results.cementBags} bags</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Sand volume:</span>
                      <span className="font-semibold text-gray-600 ml-1 md:ml-2 whitespace-nowrap">
                        {results.sandVolume} m³
                      </span>
                    </div>

                  </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50">
                  <div className="flex justify-center space-x-3 md:space-x-4">
                    <button className="flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      <FaPlusCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Add
                    </button>
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Medium+ Layout (No Scroll) */}
        <div className="hidden lg:block h-full">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2 p-2">
            {/* Calculator Section - 1/3 width on large screens */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Header - Fixed Height */}
              <div className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 flex-shrink-0">
                <div className="flex items-center">
                  <FaCalculator className="w-6 h-6 text-white mr-2" />
                  <h1 className="text-lg font-bold text-white">BlockLength</h1>
                </div>
              </div>
              {/* Description - Fixed Height */}
              <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex-shrink-0">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Providing and laying manually batched, machine-mixed M-25 grade design mix concrete for RCC works, including pumping, centering, shuttering, finishing, and approved admixtures as per IS:9103 to modify setting time and improve workability, including reinforcement, as directed by the Engineer-in-charge
                </p>
              </div>
              {/* Input Fields - Scrollable if needed */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {[
                  { label: 'area', indata: '(m²)', field: 'area', },

                ].map(({ label, field, step, indata }) => (
                  <div key={field} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                        <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                        {label}
                      </label>
                      <input
                        type="text"
                        step={step || "any"}
                        placeholder="0"
                        value={formData[field]}
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) => handleKeyDown(e, field)}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={(e) => handleBlur(field, e.target.value)}
                        className={`w-20 bg-emerald-50 px-2 py-1 border rounded text-xs focus:ring-1 
                    ${errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-emerald-400 focus:border-emerald-500"}`}
                      />
                      <div className="text-xs font-medium text-gray-700 flex items-center w-24 flex-shrink-0">
                        {indata}
                      </div>
                    </div>
                    {errors[field] && (
                      <span className="text-[10px] text-red-500 ml-32">{errors[field]}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                    <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                    Thickness
                  </label>
                  <select onChange={(e) => handleInputChange("T", e.target.value)}
                    className="w-20 bg-emerald-50  px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                    value={formData['T'] || ''}>
                    <option hidden>select  </option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select>
                  <div className="text-xs font-medium text-gray-700 flex items-center w-24 flex-shrink-0">
                    mm
                  </div>

                </div>
                {errors["T"] && (
                  <span className="text-[10px] text-red-500 ml-32">{errors["T"]}</span>
                )}
                <div className="flex items-center space-x-2">
                  <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                    <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                    Ratio
                  </label>
                  <select
                    onChange={(e) => {
                      const [r1, r2] = e.target.value.split(":").map(Number);
                      setFormData((prev) => ({ ...prev, R1: r1, R2: r2 }));
                    }}
                    className="w-20 bg-emerald-50  px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                    value={formData.R1 && formData.R2 ? `${formData.R1}:${formData.R2}` : ''}
                  >
                    <option hidden>select  </option>
                    <option value="1:3">1:3</option>
                    <option value="1:4">1:4</option>
                    <option value="1:5">1:5</option>
                    <option value="1:6">1:6</option>
                  </select>

                </div>


                {errors["R2"] && (
                  <span className="text-[10px] text-red-500 ml-32">{errors["R2"]}</span>
                )}

                <div className="px-4 py-3 flex-shrink-0">
                  <button
                    onClick={calculateResults}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded transition-all text-xs"
                  >
                    <FaCalculator className="w-4 h-4 mr-1 inline" />
                    Calculate
                  </button>
                </div>
              </div>
              {/* Calculate Button - Fixed at bottom */}
            </div>
            {/* Image Slider Section - 1/3 width */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
              <div
                className="flex transition-transform duration-500 ease-in-out flex-1"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {blockImages.map((image, index) => (
                  <img key={index} src={image} alt="" className="w-full h-full object-contain flex-shrink-0" />
                ))}
              </div>
              <button onClick={previousImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow">
                <MdChevronLeft />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow">
                <MdChevronRight />
              </button>
            </div>
            {/* Results Section - 1/3 width */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Results Header - Fixed Height */}
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <FaCalculator className="w-6 h-6 mr-2" />
                  Results
                </h2>
                <p className="text-blue-100 text-xs mt-1">Material quantities required</p>
              </div>
              {/* Results Content - Flexible Height */}
              <div className="flex-1 p-4 space-y-4">
                {/* Project Summary */}
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h4 className="text-sm font-bold text-emerald-800 mb-2">Summary</h4>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cement bags (50kg):</span>
                      <span className="font-semibold text-orange-600">{results.cementBags} bags</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sand volume:</span>
                      <span className="font-semibold text-gray-600">{results.sandVolume} m³</span>
                    </div>

                  </div>
                </div>
                <div className="p-3 bg-gray-50 flex justify-center space-x-2 flex-shrink-0">
                  <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-2 rounded font-medium transition-all text-xs">
                    <FaPlusCircle className="w-3 h-3 mr-1 inline" />
                    Add
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2 rounded font-medium transition-all text-xs">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Plastering;
