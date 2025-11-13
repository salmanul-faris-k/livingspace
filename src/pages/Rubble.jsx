import React, { useState } from "react";
import { FaCalculator, FaPlusCircle, FaInfoCircle } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import footings1 from "../assets/footings1.jpg";
import footings2 from "../assets/footings2.jpg";
import footings3 from "../assets/footings3.jpg";
import footings4 from "../assets/footings4.jpg";
import { GoDotFill } from "react-icons/go";

function RubbleCalculator() {
  const [currentImage, setCurrentImage] = useState(0);

  // Form state with rubble inputs and ratio
  const [formData, setFormData] = useState({
    L: "",
    W: "",
    H: "",
    w: "",
    h: "",
    R1: "",
    R2: "",
    voidpers: "",
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState({
    volumeRubbleFoundation: "0",
    volumeMortarFoundation: "0",
    volumeRubblePlinth: "0",
    volumeMortarPlinth: "0"
  });

  const blockImages = [footings1, footings2, footings3, footings4];
  const decimalFields = ["L", "W", "H", "w", "h"];
  const [showVoidInfo, setShowVoidInfo] = useState(false);
  const [showVoidInfo1, setShowVoidInfo1] = useState(false);
  const [showVoidInfo2, setShowVoidInfo2] = useState(false);

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    decimalFields.forEach((field) => {
      if (!formData[field] || parseFloat(formData[field]) <= 0) {
        newErrors[field] = `Enter valid ${field}`;
      }
    });
    if (!formData.R1 || !formData.R2) {
      newErrors.R2 = "Select Ratio";
    }
    if (!formData.voidpers) {
      newErrors.voidpers = "Select void persentage";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setFormData((prev) => ({ ...prev, [field]: formatted }));
  };

  // Key down validation
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

  // Calculate results based on rubble formulas and mortar ratio
  const calculateResults = () => {
    if (!validateForm()) return;

    const { L, W, H, w, h, R1, R2, voidpers } = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
    );

    const wastage = 0.05; // 5% wastage allowance
    const mortarProportion = 0.35; // 35% of rubble volume is mortar volume

    // Foundation rubble volume including wastage
    const volumeFoundation = L * W * H;
    const volumeFoundationWastage = volumeFoundation * (1 + wastage);

    // Mortar volume for foundation
    const volumeMortarFoundation = volumeFoundationWastage * mortarProportion;

    // Plinth rubble volume including wastage
    const volumePlinth = L * w * h;
    const volumePlinthWastage = volumePlinth * (1 + wastage);

    // Mortar volume for plinth
    const volumeMortarPlinth = volumePlinthWastage * mortarProportion;

    // Total mortar volume
    const totalMortarVolume = volumeMortarFoundation + volumeMortarPlinth;
    
    const totalMortarper = totalMortarVolume * (voidpers / 100)

    // Cement and sand volumes from ratio
    const totalRatio = R1 + R2;
    const cementVolume = (totalMortarper * R1) / totalRatio;
    const sandVolume = (totalMortarper * R2) / totalRatio;
    const cementbag = (cementVolume * 1440) / 50
    // Store results rounded
    setResults({
      volumeRubbleFoundation:( volumeFoundationWastage*(80/100)).toFixed(2),
      volumeMortarFoundation: volumeMortarFoundation.toFixed(2),
      volumeRubblePlinth:( volumePlinthWastage*(80/100)).toFixed(2),
      volumeMortarPlinth: volumeMortarPlinth.toFixed(2),
      cementVolume: cementVolume.toFixed(2),
      sandVolume: sandVolume.toFixed(2),
      cementbag: cementbag.toFixed(2),
    });
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
        {/* Mobile Layout */}
       <div className="lg:hidden">
  <div className="flex flex-col">
    {/* Calculator Section */}
    <div className="w-full p-3 xs:p-4 sm:p-5 md:p-6">
      <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="flex items-center">
            <FaCalculator className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white mr-1.5 xs:mr-2 sm:mr-3" />
            <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white">Rubble Calculator</h1>
          </div>
        </div>
        {/* Description */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 bg-emerald-50 border-b border-emerald-100">
          <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-emerald-800 leading-relaxed">
            Calculate rubble and mortar volumes for foundation and plinth courses including wastage and mortar ratio.
          </p>
        </div>
        {/* Input Fields */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 space-y-2.5 xs:space-y-3 sm:space-y-4">
          {[{ label: "Total Length (L)", field: "L", unit: "m" },
          { label: "Width foundation (W)", field: "W", unit: "m" },
          { label: "Height foundation (H)", field: "H", unit: "m" },
          { label: "Width plinth (w)", field: "w", unit: "m" },
          { label: "Height plinth (h)", field: "h", unit: "m" }].map(({ label, field, unit }) => (
            <div key={field} className="space-y-1">
              <label className="text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold text-gray-700 flex items-center">
                <GoDotFill className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 xs:mr-1.5 sm:mr-2 text-emerald-600 flex-shrink-0" />
                <span>{label}</span>
              </label>
              <div className="flex items-center space-x-1.5 xs:space-x-2">
                <input
                  type="text"
                  step="any"
                  onKeyDown={(e) => handleKeyDown(e, field)}
                  onWheel={(e) => e.target.blur()}
                  placeholder="0"
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  onBlur={(e) => handleBlur(field, e.target.value)}
                  className={`flex-1 bg-emerald-50 px-2.5 xs:px-3 sm:px-3.5 md:px-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 border xs:border-2 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-1 xs:focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-[11px] xs:text-xs sm:text-sm md:text-base font-medium ${
                    errors[field] ? "border-red-500" : "border-gray-200"
                  }`}
                />
                <span className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-600 w-6 xs:w-7 sm:w-8">{unit}</span>
              </div>
              {errors[field] && <span className="text-red-500 text-[10px] xs:text-[11px] sm:text-xs block ml-1">{errors[field]}</span>}
            </div>
          ))}
          
          {/* Ratio Input */}
          <div className="space-y-1">
            <label label className="text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold text-gray-700 flex items-center">
              <GoDotFill  className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 xs:mr-1.5 sm:mr-2 text-emerald-600 flex-shrink-0" />
              <span>Mortar Ratio</span>
            </label>
            <div className="flex items-center space-x-1.5 xs:space-x-2">

           
            <select
              onChange={(e) => {
                const [r1, r2] = e.target.value.split(":").map(Number);
                setFormData((prev) => ({ ...prev, R1: r1, R2: r2 }));
              }}
              className={` flex-1 bg-emerald-50 px-2.5 xs:px-3 sm:px-3.5 md:px-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 border xs:border-2 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-1 xs:focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-[11px] xs:text-xs sm:text-sm md:text-base font-medium ${
                errors.R2 ? "border-red-500" : "border-gray-200"
              }`}
              value={formData.R1 && formData.R2 ? `${formData.R1}:${formData.R2}` : ""}
            >
              <option hidden>select</option>
              <option value="1:3">1:3</option>
              <option value="1:4">1:4</option>
              <option value="1:5">1:5</option>
              <option value="1:6">1:6</option>
            </select>
            </div>
            {errors.R2 && <span className="text-red-500 text-[10px] xs:text-[11px] sm:text-xs block ml-1">{errors.R2}</span>}
          </div>
          
          {/* Void Percentage */}
          <div className="space-y-1">
            <label className="text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold text-gray-700 flex items-center">
              <GoDotFill className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 xs:mr-1.5 sm:mr-2 text-emerald-600 flex-shrink-0" />
              <span>Voids filled with mortar</span>
            </label>
            <div className="relative flex items-center space-x-1.5 xs:space-x-2">
              <select 
                onChange={(e) => handleInputChange("voidpers", e.target.value)}
                className={`flex-1 bg-emerald-50 px-2.5 xs:px-3 sm:px-3.5 md:px-4 py-1.5 xs:py-2 sm:py-2.5 md:py-3 border xs:border-2 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-1 xs:focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all text-[11px] xs:text-xs sm:text-sm md:text-base font-medium ${
                  errors.voidpers ? "border-red-500" : "border-gray-200"
                }`}
                value={formData.voidpers || ''}
              >
                <option hidden>select</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
              </select>
              <span className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-600 w-6 xs:w-7 sm:w-8">%</span>
              <div className="relative">
                <button 
                  type="button"
                  className="text-gray-400 hover:text-emerald-600 active:text-emerald-700 transition-colors p-0.5 xs:p-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowVoidInfo(!showVoidInfo);
                  }}
                >
                  <FaInfoCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                </button>
              
              </div>
            </div>
              {showVoidInfo && (
                <div className="mt-2 p-2 xs:p-2.5 bg-white border border-emerald-200 rounded-md xs:rounded-lg text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-gray-700">
                 <p className="font-semibold text-emerald-700 mb-0.5"> Info:</p>
                  <p>In rubble masonry, the total void space between stones is considered as 100%.
Selecting 60% means 60% of these voids are filled with mortar, while the remaining 40% remain unfilled (air voids) between the stones.</p>
                </div>
              )}
            {errors.voidpers && <span className="text-red-500 text-[10px] xs:text-[11px] sm:text-xs block ml-1">{errors.voidpers}</span>}
          </div>
          
          {/* Calculate Button */}
          <button
            onClick={calculateResults}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:from-emerald-800 active:to-teal-800 text-white font-bold py-2 xs:py-2.5 sm:py-3 md:py-4 px-3 xs:px-4 rounded-lg xs:rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl text-[11px] xs:text-xs sm:text-sm md:text-base mt-3 xs:mt-4"
          >
            <FaCalculator className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 mr-1.5 xs:mr-2 inline" />
            Calculate Quantities
          </button>
        </div>
      </div>
    </div>

    {/* Image Slider Section */}
    <div className="p-3 xs:p-4">
      <div className="bg-white rounded-lg xs:rounded-xl shadow-lg overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {blockImages.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Rubble foundation ${index + 1}`} 
              className="w-full h-36 xs:h-40 sm:h-48 md:h-56 object-contain flex-shrink-0 bg-gray-50" 
            />
          ))}
        </div>
        <button 
          onClick={previousImage} 
          className="absolute left-1.5 xs:left-2 top-1/2 -translate-y-1/2 bg-white/80 xs:bg-white/90 hover:bg-white p-1.5 xs:p-2 rounded-full shadow-md xs:shadow-lg transition-all active:scale-95"
        >
          <MdChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-1.5 xs:right-2 top-1/2 -translate-y-1/2 bg-white/80 xs:bg-white/90 hover:bg-white p-1.5 xs:p-2 rounded-full shadow-md xs:shadow-lg transition-all active:scale-95"
        >
          <MdChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </button>
        {/* Dots indicator */}
        <div className="absolute bottom-2 xs:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 xs:gap-1.5">
          {blockImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 xs:h-2 rounded-full transition-all ${
                currentImage === index 
                  ? 'bg-white w-4 xs:w-5 sm:w-6' 
                  : 'bg-white/60 w-1.5 xs:w-2 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Results Section */}
  <div className="p-3 xs:p-4 sm:p-5 md:p-6">
    <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
      {/* Results Header */}
      <div className="p-3 xs:p-4 sm:p-5 md:p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center">
          <FaCalculator className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-1.5 xs:mr-2 sm:mr-3" />
          Calculation Results
        </h2>
        <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-blue-100 mt-0.5 xs:mt-1">
          Material quantities required for your rubble project
        </p>
      </div>
      
      {/* Results Content */}
      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
        {/* Project Summary */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg xs:rounded-xl border border-emerald-200">
          <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-emerald-800 mb-2 xs:mb-3">Project Summary</h4>
          
          <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
            {/* Rubble Volume Foundation */}
            <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
              <div className="flex items-start justify-between gap-1.5 xs:gap-2">
                <div className="flex items-start gap-0.5 xs:gap-1 flex-1">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Rubble volume foundation:</span>
                  <button 
                    type="button"
                    className="text-gray-400 hover:text-emerald-600 active:text-emerald-700 transition-colors mt-[-2px]"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVoidInfo1(!showVoidInfo1);
                    }}
                  >
                    <FaInfoCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
                <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                  {results.volumeRubbleFoundation} m³
                </span>
              </div>
              {showVoidInfo1 && (
                <div className="mt-2 p-2 xs:p-2.5 bg-white border border-emerald-200 rounded-md xs:rounded-lg text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-gray-700">
                  <p className="font-semibold text-emerald-700 mb-0.5">Rubble Volume Info:</p>
                  <p>In rubble foundation, 80% of the total volume is considered as rubble stones, and the remaining 20% is assumed as voids (spaces filled with mortar).</p>
                </div>
              )}
            </div>
            
            {/* Mortar Volume Foundation */}
            <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
              <div className="flex items-center justify-between gap-1.5 xs:gap-2">
                <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Mortar volume foundation:</span>
                <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                  {results.volumeMortarFoundation} m³
                </span>
              </div>
            </div>
            
            {/* Rubble Volume Plinth */}
            <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
              <div className="flex items-start justify-between gap-1.5 xs:gap-2">
                <div className="flex items-start gap-0.5 xs:gap-1 flex-1">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Rubble volume plinth:</span>
                  <button 
                    type="button"
                    className="text-gray-400 hover:text-emerald-600 active:text-emerald-700 transition-colors mt-[-2px]"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVoidInfo2(!showVoidInfo2);
                    }}
                  >
                    <FaInfoCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
                <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                  {results.volumeRubblePlinth} m³
                </span>
              </div>
              {showVoidInfo2 && (
                <div className="mt-2 p-2 xs:p-2.5 bg-white border border-emerald-200 rounded-md xs:rounded-lg text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-gray-700">
                  <p className="font-semibold text-emerald-700 mb-0.5">Rubble Volume Info:</p>
                  <p>In rubble plinth, 80% of the total volume is considered as rubble stones, and the remaining 20% is assumed as voids (spaces filled with mortar).</p>
                </div>
              )}
            </div>
            
            {/* Other Results - Grid Layout for larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3">
              {/* Mortar Volume Plinth */}
              <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
                <div className="flex items-center justify-between gap-1.5 xs:gap-2">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Mortar volume plinth:</span>
                  <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                    {results.volumeMortarPlinth} m³
                  </span>
                </div>
              </div>
              
              {/* Cement Volume */}
              <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
                <div className="flex items-center justify-between gap-1.5 xs:gap-2">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Cement volume:</span>
                  <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                    {results.cementVolume} m³
                  </span>
                </div>
              </div>
              
              {/* Sand Volume */}
              <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
                <div className="flex items-center justify-between gap-1.5 xs:gap-2">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Sand volume:</span>
                  <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                    {results.sandVolume} m³
                  </span>
                </div>
              </div>
              
              {/* Cement Bags */}
              <div className="bg-white/70 p-2 xs:p-2.5 sm:p-3 rounded-md xs:rounded-lg">
                <div className="flex items-center justify-between gap-1.5 xs:gap-2">
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-600">Cement:</span>
                  <span className="font-semibold text-gray-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                    {results.cementbag} bags
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 p-3 xs:p-4 bg-gray-50 rounded-lg xs:rounded-xl">
          <div className="flex flex-col xs:flex-row justify-center gap-2 xs:gap-2.5 sm:gap-3">
            <button className="flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:from-emerald-800 active:to-teal-800 text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold text-[11px] xs:text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98] transform">
              <FaPlusCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
              Add
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold text-[11px] xs:text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98] transform">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Desktop Layout */}
        <div className="hidden lg:block h-full">
          <div className="h-full grid grid-cols-3 gap-2 p-2">
            {/* Calculator Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 flex-shrink-0">
                <div className="flex items-center">
                  <FaCalculator className="w-6 h-6 text-white mr-2" />
                  <h1 className="text-lg font-bold text-white">Rubble Calculator</h1>
                </div>
              </div>
              
              {/* Description */}
              <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex-shrink-0">
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Calculate rubble and mortar volumes for foundation and plinth courses including wastage and mortar ratio.
                </p>
              </div>
              
              {/* Input Fields */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {[{ label: "Total Length (L)", field: "L", unit: "m" },
                { label: "Width foundation (W)", field: "W", unit: "m" },
                { label: "Height foundation (H)", field: "H", unit: "m" },
                { label: "Width plinth (w)", field: "w", unit: "m" },
                { label: "Height plinth (h)", field: "h", unit: "m" }].map(({ label, field, unit }) => (
                  <div key={field} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                        <GoDotFill className="w-3 h-3 mr-1 text-emerald-600" />
                        {label}
                      </label>
                      <input
                        type="text"
                        step="any"
                        placeholder="0"
                        value={formData[field]}
                        onKeyDown={(e) => handleKeyDown(e, field)}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={(e) => handleBlur(field, e.target.value)}
                        className={`w-20 bg-emerald-50 px-2 py-1.5 border rounded text-xs focus:ring-1 ${
                          errors[field] ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-emerald-400 focus:border-emerald-500"
                        }`}
                      />
                      <span className="text-xs text-gray-600 w-8">{unit}</span>
                    </div>
                    {errors[field] && <span className="text-[10px] text-red-500 ml-32">{errors[field]}</span>}
                  </div>
                ))}
                
                {/* Ratio Input */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                      <GoDotFill className="w-3 h-3 mr-1 text-emerald-600" />
                      Mortar Ratio
                    </label>
                    <select
                      onChange={(e) => {
                        const [r1, r2] = e.target.value.split(":").map(Number);
                        setFormData((prev) => ({ ...prev, R1: r1, R2: r2 }));
                      }}
                      className="w-20 bg-emerald-50 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                      value={formData.R1 && formData.R2 ? `${formData.R1}:${formData.R2}` : ""}
                    >
                      <option hidden>select</option>
                      <option value="1:3">1:3</option>
                      <option value="1:4">1:4</option>
                      <option value="1:5">1:5</option>
                      <option value="1:6">1:6</option>
                    </select>
                  </div>
                  {errors.R2 && <span className="text-[10px] text-red-500 ml-32">{errors.R2}</span>}
                </div>
                
                {/* Void Percentage */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center w-32 flex-shrink-0">
                      <GoDotFill className="w-3 h-3 mr-1 text-emerald-600" />
                      Voids filled
                    </label>
                    <div className="relative flex items-center space-x-1">
                      <select 
                        onChange={(e) => handleInputChange("voidpers", e.target.value)}
                        className="w-20 bg-emerald-50 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-emerald-400 focus:border-emerald-500 text-xs"
                        value={formData.voidpers || ''}
                      >
                        <option hidden>select</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                      </select>
                      <span className="text-xs text-gray-600">%</span>
                      <div className="relative">
                        <button 
                          type="button"
                          className="text-gray-400 hover:text-emerald-600 transition-colors ml-1"
                          onMouseEnter={() => setShowVoidInfo(true)}
                          onMouseLeave={() => setShowVoidInfo(false)}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowVoidInfo(!showVoidInfo);
                          }}
                        >
                          <FaInfoCircle className="w-3 h-3" />
                        </button>
                       
                      </div>
                    </div>
                  </div>
                     {showVoidInfo && (
                <div className="mt-2 p-2 xs:p-2.5 bg-white border border-emerald-200 rounded-md xs:rounded-lg text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-gray-700">
                  <p className="font-semibold text-emerald-700 mb-0.5"> Info:</p>
                  <p>In rubble masonry, the total void space between stones is considered as 100%.
Selecting 60% means 60% of these voids are filled with mortar, while the remaining 40% remain unfilled (air voids) between the stones.</p>
                </div>
             )} 
                  {errors.voidpers && <span className="text-[10px] text-red-500 ml-32">{errors.voidpers}</span>}
                </div>
                  {/* Calculate Button */}
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

            {/* Image Slider Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
              <div
                className="flex transition-transform duration-500 ease-in-out flex-1"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {blockImages.map((image, index) => (
                  <img key={index} src={image} alt="" className="w-full h-full object-contain flex-shrink-0" />
                ))}
              </div>
              <button onClick={previousImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                <MdChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                <MdChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Results Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <FaCalculator className="w-6 h-6 mr-2" />
                  Results
                </h2>
                <p className="text-blue-100 text-xs mt-1">Material quantities required</p>
              </div>
              
              {/* Results Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h4 className="text-sm font-bold text-emerald-800 mb-3">Summary</h4>
                  <div className="space-y-2 text-xs">
                    {/* Rubble Volume Foundation */}
                    <div className="flex items-start justify-between gap-2 bg-white/50 p-2 rounded">
                      <div className="flex items-start gap-1 flex-1">
                        <span className="text-gray-600">Rubble vol. foundation:</span>
                        <div className="relative">
                          <button 
                            type="button"
                            className="text-gray-400 hover:text-emerald-600 transition-colors"
                            onMouseEnter={() => setShowVoidInfo1(true)}
                            onMouseLeave={() => setShowVoidInfo1(false)}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowVoidInfo1(!showVoidInfo1);
                            }}
                          >
                            <FaInfoCircle className="w-3 h-3" />
                          </button>
                          {showVoidInfo1 && (
                            <div className="absolute z-20 left-0 mt-1 w-48 p-2 bg-white border border-gray-200 rounded shadow-lg text-xs text-gray-600">
                              <p className="font-semibold mb-1">Info:</p>
                              <p>In rubble foundation, 80% of the total volume is considered as rubble stones, and the remaining 20% is assumed as voids (spaces filled with mortar)..</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">{results.volumeRubbleFoundation} m³</span>
                    </div>
                    
                    <div className="flex justify-between bg-white/50 p-2 rounded">
                      <span className="text-gray-600">Mortar vol. foundation:</span>
                      <span className="font-semibold text-gray-800">{results.volumeMortarFoundation} m³</span>
                    </div>
                    
                    {/* Rubble Volume Plinth */}
                    <div className="flex items-start justify-between gap-2 bg-white/50 p-2 rounded">
                      <div className="flex items-start gap-1 flex-1">
                        <span className="text-gray-600">Rubble vol. plinth:</span>
                        <div className="relative">
                          <button 
                            type="button"
                            className="text-gray-400 hover:text-emerald-600 transition-colors"
                            onMouseEnter={() => setShowVoidInfo2(true)}
                            onMouseLeave={() => setShowVoidInfo2(false)}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowVoidInfo2(!showVoidInfo2);
                            }}
                          >
                            <FaInfoCircle className="w-3 h-3" />
                          </button>
                          {showVoidInfo2 && (
                            <div className="absolute z-20 left-0 mt-1 w-48 p-2 bg-white border border-gray-200 rounded shadow-lg text-xs text-gray-600">
                              <p className="font-semibold mb-1">Info:</p>
                              <p>In rubble foundation, 80% of the total volume is considered as rubble stones, and the remaining 20% is assumed as voids (spaces filled with mortar).</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">{results.volumeRubblePlinth} m³</span>
                    </div>
                    
                    <div className="flex justify-between bg-white/50 p-2 rounded">
                      <span className="text-gray-600">Mortar vol. plinth:</span>
                      <span className="font-semibold text-gray-800">{results.volumeMortarPlinth} m³</span>
                    </div>
                    
                    <div className="flex justify-between bg-white/50 p-2 rounded">
                      <span className="text-gray-600">Cement volume:</span>
                      <span className="font-semibold text-gray-800">{results.cementVolume} m³</span>
                    </div>
                    
                    <div className="flex justify-between bg-white/50 p-2 rounded">
                      <span className="text-gray-600">Sand volume:</span>
                      <span className="font-semibold text-gray-800">{results.sandVolume} m³</span>
                    </div>
                    
                    <div className="flex justify-between bg-white/50 p-2 rounded">
                      <span className="text-gray-600">Cement:</span>
                      <span className="font-semibold text-gray-800">{results.cementbag} bags</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 flex justify-center space-x-2 flex-shrink-0 mt-4 rounded-lg">
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

export default RubbleCalculator;