import React, { useEffect, useState } from 'react';
import { FaCalculator, FaRuler, FaHome, FaWrench, FaHammer, FaPlusCircle } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import footings1 from '../assets/footings1.jpg'
import footings2 from '../assets/footings2.jpg'
import footings3 from '../assets/footings3.jpg'
import footings4 from '../assets/footings4.jpg'
import { GoDotFill } from 'react-icons/go';
import { GiConcreteBag, GiSteelClaws } from 'react-icons/gi';
function Footings() {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    numberOfFootings: "",
    L: "",
    W: "",
    H: "",
    l: "",
    w: "",
    h: "",
    diameterMat: "",
    spacing: "",
    Grade: "",
  });
  const [errors, setErrors] = useState({});

  const [results, setResults] = useState({
    steelQuantity: 0,
    concreteQuantity: 0,
    Grade: 0,
    cement: 0,
    couresaggregate:0,
    fineaggregate:0

  });
  const validateForm = () => {
    const newErrors = {};

    if (!formData.numberOfFootings || parseInt(formData.numberOfFootings) <= 0) {
      newErrors.numberOfFootings = "Enter valid number of footings";
    }

    ["L", "W", "H", "l", "w", "h",].forEach(field => {
      if (!formData[field] || parseFloat(formData[field]) <= 0) {
        newErrors[field] = `Enter valid ${field}`;
      }
    });

    if (!formData.diameterMat) {
      newErrors.diameterMat = "Select diameter";
    }

    if (!formData.spacing || parseFloat(formData.spacing) <= 0) {
      newErrors.spacing = "Enter valid spacing";
    }

    if (!formData.Grade) {
      newErrors.Grade = "Select Grade";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  const flooringImages = [footings1, footings2, footings3, footings4];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % flooringImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + flooringImages.length) % flooringImages.length);
  };

  const decimalFields = ["L", "W", "H", "l", "w", "h", "spacing"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value   // keep raw string
    }));
  };

  const handleBlur = (field, value) => {
    if (decimalFields.includes(field)) {
      let formatted = value;
      if (value === ".") {
        formatted = "0.0";
      } else if (value.startsWith(".")) {
        formatted = `0${value}`;
      }
      setFormData(prev => ({
        ...prev,
        [field]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateResults = () => {
    if (!validateForm()) return;
    const { numberOfFootings, L, W, H, l, w, h, diameterMat, spacing, Grade } = formData;

    // parse safely
    const n = parseInt(numberOfFootings) || 0;
    const Lm = parseFloat(L) || 0;
    const Wm = parseFloat(W) || 0;
    const Hm = parseFloat(H) || 0;
    const lm = parseFloat(l) || 0;
    const wm = parseFloat(w) || 0;
    const hm = parseFloat(h) || 0;
    const d = parseFloat(diameterMat) || 0;
    const s = parseFloat(spacing) || 1; // avoid /0

    // Steel formula
    const steelQuantity =
      ((((Lm / s) + 1) * Wm + ((Wm / s) + 1) * Lm) *
        ((d * d) / 162)) *
      n;

    // Concrete formula
    const concreteQuantity =
      (Lm * Wm * Hm) +
      (((hm / 3) * ((Lm * Wm) + (lm * wm) + Math.sqrt(Lm * Wm * lm * wm))) * n);
    const totalsell = steelQuantity * 1.03
    const totalcon = concreteQuantity * 1.03
const cement=(concreteQuantity*7.5).toFixed(2)
const fineaggregate=((concreteQuantity*0.425)*1.03).toFixed(2)
const couresaggregate=((concreteQuantity*0.850)*1.03).toFixed(2)
    setResults({
      steelQuantity: totalsell.toFixed(2),
      concreteQuantity: totalcon.toFixed(2),
      Grade,
      cement,
      fineaggregate,couresaggregate
    });
  };

  // optional: auto-calc on every input change
  const handleKeyDown = (e, field) => {
    // Allow normal typing, backspace, delete, tab, enter, escape
    if (decimalFields.includes(field) || field === "numberOfFootings" || field === "spacing") {
      if (
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'Enter' ||
        e.key === 'Escape' ||
        (e.key >= '0' && e.key <= '9') ||
        e.key === '.' ||
        e.key === '-'
      ) {
        return; // Allow these keys
      }

      // Prevent arrow keys and other navigation keys from changing the value
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    }
  };
  return (
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
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">Sloped Footings</h1>
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
                  { label: 'Footings', indata: ' (nos)', field: 'numberOfFootings', },
                  { label: 'L', indata: ' (m)', field: 'L', },
                  { label: 'W', indata: ' (m)', field: 'W', },
                  { label: 'H', indata: ' (m)', field: 'H', },
                  { label: 'l', indata: ' (m)', field: 'l', },
                  { label: 'w', indata: ' (m)', field: 'w', },
                  { label: 'h ', indata: '(m)', field: 'h', },

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
                    <span className="text-xs sm:text-sm">Diameter of mat</span>
                  </label>
                  <select onChange={(e) => handleInputChange("diameterMat", e.target.value)}
                    className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                    value={formData['diameterMat'] || ''}>
                    <option hidden>select  </option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                    <option value="32">32</option>
                  </select>
                  {errors.diameterMat && (
                    <span className="text-red-500 text-xs">{errors.diameterMat}</span>
                  )}
                  <span className="text-xs sm:text-sm">  (mm)</span>
                </div>

                <div key={'spacing'} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center sm:w-56 sm:flex-shrink-0">
                    <GoDotFill className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm"> Spacing of mat</span>
                  </label>
                  <input
                    type="text"
                    step="any"
                    onWheel={(e) => e.target.blur()}
                    placeholder="0"
                    value={formData['spacing']}
                    onChange={(e) => handleInputChange('spacing', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "spacing")}

                    onBlur={(e) => handleBlur('spacing', e.target.value)}

                    className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                  />
                  {errors["spacing"] && (
                    <span className="text-red-500 text-xs">{errors["spacing"]}</span>
                  )}
                  <span className="text-xs sm:text-sm">(m)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center sm:w-56 sm:flex-shrink-0">
                    <GoDotFill className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Grade:</span>
                  </label>
                  <select onChange={(e) => handleInputChange("Grade", e.target.value)}
                    className="w-full bg-emerald-50  sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                    value={formData['Grade'] || ''}>
                    <option hidden>select  </option>
                    <option value="20">M-20</option>
                    <option value="25">M-25</option>
                  </select>
                  {errors.Grade && (
                    <span className="text-red-500 text-xs">{errors.Grade}</span>
                  )}
                  <span className="text-xs sm:text-sm">  (mm)</span>
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

          {/* Image Slider */}
          <div className="p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {flooringImages.map((image, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Steel Quantity */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-orange-500 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                      <GiSteelClaws className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Steel Quantity</h3>
                      <p className="text-xs md:text-sm text-gray-600">10mm Steel Bars</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-bold text-orange-600">{results.steelQuantity}</div>
                    <div className="text-orange-500 font-semibold text-xs md:text-sm">kg</div>
                  </div>
                </div>

                {/* Concrete Quantity */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-gray-500 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                      <GiConcreteBag className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Concrete Quantity</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-bold text-gray-600">{results.concreteQuantity}</div>
                    <div className="text-gray-500 font-semibold text-xs md:text-sm">cu.m</div>
                  </div>
                </div>
              </div>

              {/* Additional Info - Project Summary */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl md:rounded-2xl border border-emerald-200">
                <h4 className="text-base md:text-lg font-bold text-emerald-800 mb-2 md:mb-3">Project Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                  <div>
                    <span className="text-gray-600">Footings:</span>
                    <span className="font-semibold text-gray-800 ml-1 md:ml-2">{formData.numberOfFootings} nos</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Steel {formData.diameterMat} mm::</span>
                    <span className="font-semibold text-orange-600 ml-1 md:ml-2">{results.steelQuantity} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Concrete:</span>
                    <span className="font-semibold text-gray-600 ml-1 md:ml-2 whitespace-nowrap">
                      {results.concreteQuantity} cu.m
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold text-emerald-600 ml-1 md:ml-2">M-{results.Grade}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">cement:</span>
                    <span className="font-semibold text-emerald-600 ml-1 md:ml-2">{results.cement} bages</span>
                  </div>
                  <div>
                    <span className="text-gray-600">fine aggregate (M sand):</span>
                    <span className="font-semibold text-emerald-600 ml-1 md:ml-2">{results.fineaggregate} m³</span>
                  </div>
                  <div>
                    <span className="text-gray-600">coures aggregate(metal):</span>
                    <span className="font-semibold text-emerald-600 ml-1 md:ml-2">{results.couresaggregate} m³</span>
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
                <h1 className="text-lg font-bold text-white">Sloped Footings</h1>
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
                { label: 'Footings', indata: ' nos', field: 'numberOfFootings' },
                { label: 'L', indata: ' m', field: 'L', step: '0.01' },
                { label: 'W', indata: ' m', field: 'W' },
                { label: 'H', indata: ' m', field: 'H' },
                { label: 'l', indata: ' m', field: 'l' },
                { label: 'w', indata: ' m', field: 'w' },
                { label: 'h', indata: ' m', field: 'h' },
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
                  Diameter of mat
                </label>
                <select onChange={(e) => handleInputChange("diameterMat", e.target.value)}
                  className="w-20 bg-emerald-50  px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                  value={formData['diameterMat'] || ''}>
                  <option hidden>select  </option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="20">20</option>
                  <option value="32">32</option>
                </select>
                <div className="text-xs font-medium text-gray-700 flex items-center w-24 flex-shrink-0">
                  mm
                </div>

              </div>

              {errors["diameterMat"] && (
                <span className="text-[10px] text-red-500 ml-32">{errors["diameterMat"]}</span>
              )}
              <div key={'spacing'} className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                  <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                  Spacing of mat
                </label>
                <input
                  type="text"
                  step="any"
                  onKeyDown={(e) => handleKeyDown(e, "spacing")}

                  onWheel={(e) => e.target.blur()}
                  placeholder="0"
                  value={formData['spacing']}
                  onChange={(e) => handleInputChange("spacing", e.target.value)}
                  onBlur={(e) => handleBlur("spacing", e.target.value)}


                  className="w-20 px-2 py-1 bg-emerald-50  border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                />
                <div className="text-xs font-medium text-gray-700 flex items-center w-24 flex-shrink-0">
                  m
                </div>

              </div>
              {errors["spacing"] && (
                <span className="text-[10px] text-red-500 ml-32">{errors["spacing"]}</span>
              )}
              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                  <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                  Grade:
                </label>
                <select onChange={(e) => handleInputChange("Grade", e.target.value)}
                  className="w-20 bg-emerald-50  px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                  value={formData['Grade'] || ''}>
                  <option hidden>select  </option>
                  <option value="20">M-20</option>
                  <option value="25">M-25</option>

                </select>
                <div className="text-xs font-medium text-gray-700 flex items-center w-24 flex-shrink-0">
                  mm
                </div>

              </div>

              {errors["Grade"] && (
                <span className="text-[10px] text-red-500 ml-32">{errors["Grade"]}</span>
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
              {flooringImages.map((image, index) => (
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
              {/* Steel Quantity */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <GiSteelClaws className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800">Steel Quantity</h3>
                    <p className="text-xs text-gray-600">10mm Steel Bars</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{results.steelQuantity}</div>
                  <div className="text-orange-500 font-medium text-sm">kg</div>
                </div>
              </div>

              {/* Concrete Quantity */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                    <GiConcreteBag className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">Concrete Quantity</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-600">{results.concreteQuantity}</div>
                  <div className="text-gray-500 font-medium text-sm">cu.m</div>
                </div>
              </div>

              {/* Project Summary */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <h4 className="text-sm font-bold text-emerald-800 mb-2">Summary</h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Footings:</span>
                    <span className="font-semibold text-gray-800">{formData.numberOfFootings} nos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Steel {formData.diameterMat} mm:</span>
                    <span className="font-semibold text-orange-600">{results.steelQuantity} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Concrete:</span>
                    <span className="font-semibold text-gray-600">{results.concreteQuantity} cu.m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold text-emerald-600">M-{results.Grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">cement:</span>
                    <span className="font-semibold text-emerald-600">{results.cement} bags</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">fine aggregate(m sand):</span>
                    <span className="font-semibold text-emerald-600">{results.fineaggregate} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">coures aggregate (metal):</span>
                    <span className="font-semibold text-emerald-600">{results.couresaggregate} m³</span>
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
  );
}

export default Footings;
