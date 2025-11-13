import React, { useEffect, useState } from 'react';
import { FaCalculator, FaRuler, FaHome, FaWrench, FaHammer, FaPlusCircle } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import footings1 from '../assets/footings1.jpg'
import footings2 from '../assets/footings2.jpg'
import footings3 from '../assets/footings3.jpg'
import footings4 from '../assets/footings4.jpg'
import { GoDotFill } from 'react-icons/go';
import { GiConcreteBag, GiSteelClaws } from 'react-icons/gi';
import { IoMdRemove } from 'react-icons/io';

function Pile() {
  const [currentImage, setCurrentImage] = useState(0);
  const [totalsteel, settotalsteel] = useState(0);

  const [formData, setFormData] = useState({
    D: "",
    H: "",
    noOfPile: "",
    noofverticalbars: "",
    diameterofverticalbars: "",
    diameterStirrups: "",
    spacingStirrups: ""
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState({
    steel16mm: 0,
    steel8mm: 0,
    concrete: 0,
    cement: 0,
    couresaggregate: 0,
    fineaggregate: 0
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.noOfPile || parseInt(formData.noOfPile) <= 0) {
      newErrors.noOfPile = "Enter valid number of Pile";
    }
    if (!formData.noofverticalbars || parseInt(formData.noofverticalbars) <= 0) {
      newErrors.noofverticalbars = "Enter valid number of vertical bars";
    }
    ["D", "H", "noofverticalbars", "noOfPile", "diameterofverticalbars", "diameterStirrups", "spacingStirrups"].forEach(field => {
      if (!formData[field] || parseFloat(formData[field]) <= 0) {
        newErrors[field] = `Enter valid ${field}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const flooringImages = [footings1, footings2, footings3, footings4];

  const nextImage = () => { setCurrentImage(prev => (prev + 1) % flooringImages.length); };
  const previousImage = () => { setCurrentImage(prev => (prev - 1 + flooringImages.length) % flooringImages.length); };

  const decimalFields = ["D", "H", "noofverticalbars", "noOfPile", "diameterofverticalbars", "diameterStirrups", "spacingStirrups"]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field, value) => {
    let formatted = value;
    if (decimalFields.includes(field)) {
      if (value === ".") formatted = "0.0";
      else if (value.startsWith(".")) formatted = `0${value}`;
    }
    setFormData(prev => ({
      ...prev,
      [field]: formatted
    }));
  };

  const calculateResults = () => {
    if (!validateForm()) return;
    console.log("okannu");

    const { D, H, noOfPile, noofverticalbars, diameterofverticalbars, diameterStirrups, spacingStirrups } = formData;
    const Dm = parseFloat(D) || 0;
    const Hm = parseFloat(H) || 0;
    const numpile = parseInt(noOfPile) || 0;
    const numvertical = parseInt(noofverticalbars) || 0;

    const diaMain = parseFloat(diameterofverticalbars) || 0;
    const diaStir = parseFloat(diameterStirrups) || 0;
    const spacing = parseFloat(spacingStirrups) || 1;

    // Concrete
    const concrete = ((3.14 * (Dm / 2) * (Dm / 2) * Hm) * numpile);

    const steel16mm = (((diaMain * diaMain) / 162) * (Hm + 1.5) * numvertical * numpile)
    const steel8mm = ((diaStir * diaStir / 162) * (((Dm - 0.1) * 3.14) + 0.16) * (Hm / spacing) * numpile)
    const cement = (concrete * 7.5).toFixed(2)
    const fineaggregate = ((concrete * 0.425) * 1.03).toFixed(2)
    const couresaggregate = ((concrete * 0.850) * 1.03).toFixed(2)
    setResults({
      steel16mm: steel16mm.toFixed(2),
      steel8mm: steel8mm.toFixed(2),
      concrete: concrete.toFixed(2), cement, fineaggregate, couresaggregate

    });
  };

  const handleKeyDown = (e, field) => {
    if (decimalFields.includes(field)) {
      if (
        e.key === 'Backspace' || e.key === 'Delete' ||
        e.key === 'Tab' || e.key === 'Enter' || e.key === 'Escape' ||
        (e.key >= '0' && e.key <= '9') || e.key === '.' || e.key === '-'
      ) {
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    }
  };
  useEffect(() => {
    const total =
      Number(Number(results.steel16mm).toFixed(2)) +
      Number(Number(results.steel8mm).toFixed(2));

    settotalsteel(Number(total.toFixed(1)));
  }, [results.steel16mm, results.steel8mm]);

  return (
    <div className="min-h-screen md:h-screen bg-gradient-to-br from-gray-50 to-gray-100 lg:overflow-hidden">
      {/* The layout and UI, input fields and results, image slider and summary remain unchanged */}
      <div className="lg:hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-6 lg:p-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 lg:p-8 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center mb-2">
                <FaCalculator className="w-8 h-8 text-white mr-3" />
                <h1 className="text-2xl lg:text-3xl font-bold text-white">pile</h1>
              </div>
              <div className="p-6 bg-emerald-50 border-b border-emerald-100">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Providing and laying manually batched, machine-mixed M-25 grade design mix concrete for RCC works, including pumping, centering, shuttering, finishing, and approved admixtures as per IS:9103 to modify setting time and improve workability, including reinforcement, as directed by the Engineer-in-charge                                </p>
              </div>
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

                {/* Input fields for the beam */}
                {[
                  { label: 'Diameter of pile D', indata: ' (m)', field: 'D' },
                  { label: 'Height of pile H', indata: ' (m)', field: 'H' },
                  { label: 'No. of Pile', indata: ' (nos)', field: 'noOfPile' },
                  { label: 'No. of vertical bars', indata: ' (nos)', field: 'noofverticalbars' },
                  { label: 'Diameter of verticalbars', indata: ' (mm)', field: 'diameterofverticalbars' },
                  { label: 'Diameter of Stirrups', indata: ' (mm)', field: 'diameterStirrups' },
                  { label: 'Spacing of Stirrups', indata: ' (m)', field: 'spacingStirrups' },
                ].map(({ label, field, indata }) => (
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
                      className="w-full bg-emerald-50 sm:flex-1 sm:max-w-32 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-3 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-sm font-medium"
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-xs">{errors[field]}</span>
                    )}
                    <span className="text-xs sm:text-sm">{indata}</span>
                  </div>
                ))}

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
          {/* Image slider (images changed for beam context) */}
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
            <div className="p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">

                {/* Steel 16mm */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-orange-500 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                      <GiSteelClaws className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">Steel Quantity</h3>
                  </div>

                  {/* Steel rows */}
                  <div className="space-y-2 md:space-y-3">
                    {/* 16mm */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Steel Quantity 16mm (Main Bars)</span>
                      <span className="font-bold text-orange-600">{results.steel16mm} kg</span>
                    </div>

                    {/* 8mm */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Steel Quantity 8mm (Stirrups)</span>
                      <span className="font-bold text-orange-600">{results.steel8mm} kg</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-sm md:text-base border-t border-orange-200 pt-2 md:pt-3">
                      <span className="text-gray-900 font-semibold">Total Steel</span>
                      <span className="font-bold text-red-600">
                        {totalsteel} kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Concrete */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-gray-500 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                      <GiConcreteBag className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800">Concrete Quantity</h3>
                      <p className="text-xs md:text-sm text-gray-600">M-25 Grade Concrete</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-bold text-gray-600">{results.concrete}</div>
                    <div className="text-gray-500 font-semibold text-xs md:text-sm">cu.m</div>
                  </div>
                </div>
              </div>
              {/* Summary */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl md:rounded-2xl border border-emerald-200">
                <h4 className="text-base md:text-lg font-bold text-emerald-800 mb-2 md:mb-3">Project Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">

                  <div>
                    <span className="text-gray-600">Steel 16mm:</span>
                    <span className="font-semibold text-orange-600 ml-1 md:ml-2">{results.steel16mm} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">TotalSteel:</span>
                    <span className="font-semibold text-orange-600 ml-1 md:ml-2">{totalsteel} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Steel 8mm:</span>
                    <span className="font-semibold text-orange-600 ml-1 md:ml-2">{results.steel8mm} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Concrete:</span>
                    <span className="font-semibold text-gray-600 ml-1 md:ml-2">{results.concrete} cu.m</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons unchanged */}
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
      {/* Desktop layout also update the text and output as above, paralleling mobile */}
      {/* ... (repeat the same change logic for the lg:block desktop layout as above) ... */}
      <div className="hidden lg:block h-full">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2 p-2">
          {/* Calculator Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 flex-shrink-0">
              <div className="flex items-center">
                <FaCalculator className="w-6 h-6 text-white mr-2" />
                <h1 className="text-lg font-bold text-white">pile</h1>
              </div>
            </div>
            <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex-shrink-0">
              <p className="text-sm text-emerald-800 leading-relaxed">
                Providing and laying manually batched, machine-mixed M-25 grade design mix concrete for RCC works, including pumping, centering, shuttering, finishing, and approved admixtures as per IS:9103 to modify setting time and improve workability, including reinforcement, as directed by the Engineer-in-charge
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {[
                { label: 'Diameter of pile D', indata: ' (m)', field: 'D' },
                { label: 'Height of pile H', indata: ' (m)', field: 'H' },
                { label: 'No. of Pile', indata: ' (nos)', field: 'noOfPile' },
                { label: 'No. of vertical bars', indata: ' (nos)', field: 'noofverticalbars' },
                { label: 'Diameter of verticalbars', indata: ' (mm)', field: 'diameterofverticalbars' },
                { label: 'Diameter of Stirrups', indata: ' (mm)', field: 'diameterStirrups' },
                { label: 'Spacing of Stirrups', indata: ' (m)', field: 'spacingStirrups' },
              ].map(({ label, field, indata }) => (
                <div key={field} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center w-40 flex-shrink-0">
                      <GoDotFill className="w-6 h-3 mr-1 text-emerald-600" />
                      {label}
                    </label>
                    <input
                      type="text"
                      step="any"
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
                    <span className="text-[10px] text-red-500 ml-40">{errors[field]}</span>
                  )}
                </div>
              ))}
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
          </div>
          {/* Image Slider */}
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
          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg ml-12 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0">
              <h2 className="text-lg font-bold text-white flex items-center">
                <FaCalculator className="w-6 h-6 mr-2" />
                Results
              </h2>
              <p className="text-blue-100 text-xs mt-1">Material quantities required</p>
            </div>
            <div className="flex-1 p-4 space-y-4">

              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border  border-emerald-200">
                <h4 className="text-md font-bold text-black mb-2">Concrete</h4>
                <div className="grid grid-cols-1 gap-1 text-xs">


                  <div className="flex justify-between font-bold items-center bg-gray-300">
                    <span className="text-black">Concrete: </span>
                    <IoMdRemove className='ml-24' />
                    <span >{results.concrete} cu.m</span>
                  </div>
                  <div className="flex justify-between font-bold items-center bg-gray-300">
                    <span className="text-black">cement: </span>
                    <IoMdRemove className='ml-28' />
                    <span >{results.cement} bages</span>

                  </div>
                  <div className="flex justify-between font-bold items-center bg-gray-300">
                    <span className="text-black">fine aggregate (M sand):</span>
                                        <IoMdRemove  />

                    <span >{results.fineaggregate} m³</span>
                  </div>
                 <div className="flex justify-between font-bold items-center bg-gray-300">
                    <span className="text-black">coures aggregate(metal):</span>
                                        <IoMdRemove  />

                    <span >{results.couresaggregate} m³</span>
                  </div>


                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border  border-emerald-200">
                <h4 className="text-md font-bold text-black mb-2">Steel</h4>
                <div className="grid grid-cols-1 gap-1 text-xs">

                  <div className="flex justify-between items-center bg-gray-300 font-bold ">
                    <span className="text-black">Steel 16mm</span>
                    <IoMdRemove />
                    <span >{results.steel16mm} kg</span>
                  </div>
                  <div className="flex justify-between font-bold items-center bg-gray-300">
                    <span className="text-black">Steel 8mm  </span>
                    <IoMdRemove className='' />
                    <span >{results.steel8mm} kg</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-300 text-sm mt-6 font-bold">
                    <span className="text-black  ">Total Steel:</span>
                    <IoMdRemove />

                    <span >{totalsteel} kg</span>
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

export default Pile;
