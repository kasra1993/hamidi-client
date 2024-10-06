import React, { useState, useEffect } from "react";
import VerificationModal from "./VerificationModal"; // Import the custom modal component
import { providerBg } from "../../images";
import HomeIcon from "../../components/HomeIcon";
import { providerRegister } from "../../redux/slices/providerSlice";
import { showToast } from "../../redux/slices/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import {
  fetchMaterialGrades,
  fetchMaterialNames,
  fetchMaterialGroups,
} from "../../redux/slices/materialProvidersSlice";
import {
  fetchPartGroups,
  fetchPartGeneralIds,
  fetchPartNames,
} from "../../redux/slices/partProvidersSlice";
import { calculateRemainingTime } from "../../utils/helpers";

const ProviderRegistration = () => {
  const [step, setStep] = useState(1);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({});
  const [selection, setSelection] = useState("materials");
  const [records, setRecords] = useState([]);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null); // Preview image state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { loading, error } = useSelector((state) => state.provider);

  console.log("errors", errors);
  const handleRequest = () => {
    dispatch(
      showToast({
        message: "نتیجه درخواست برای شما ارسال خواهد شد",
        type: "success",
      })
    );
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [recordData, setRecordData] = useState({
    materialgroup: { id: "", title: "" },
    materialname: { id: "", title: "" },
    materialgrade: { id: "", title: "" },
    partgroup: { id: "", title: "" },
    partname: { id: "", title: "" },
    partgeneralid: { id: "", title: "" },
  });
  const [formData, setFormData] = useState({
    company_name: "",
    phone: "",
    cellphone: "",
    id_number: "",
    ceo_cellphone: "",
    foundation_year: "",
    postal_code: "",
    fax_number: "",
    economical_number: "",
    email: "",
    ceo_name: "",
    website_address: "",
    country: "",
    city: "",
    form_filler_name: "",
    form_filler_position: "",
    address: "",
    password: "",
    username: "",
    records: [],
    isVerified: true,
  });
  const dispatch = useDispatch();

  const {
    materialGroups: material_groups,
    materialNames: material_names,
    materialGrades: material_grades,
  } = useSelector((state) => state.materialProviders);

  const {
    partGroups: part_groups,
    partNames: part_names,
    partGeneralIds: part_generalids,
  } = useSelector((state) => state.partProviders);

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
    setRecordData({
      materialgroup: { id: "", title: "" },
      materialname: { id: "", title: "" },
      materialgrade: { id: "", title: "" },
      partgroup: { id: "", title: "" },
      partname: { id: "", title: "" },
      partgeneralid: { id: "", title: "" },
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    let selectedOption;

    if (selection === "materials") {
      if (name === "materialgroup") {
        selectedOption = material_groups.find((item) => item._id === value);
      } else if (name === "materialname") {
        selectedOption = material_names.find((item) => item._id === value);
      } else if (name === "materialgrade") {
        selectedOption = material_grades.find((item) => item._id === value);
      }
    } else {
      if (name === "partgroup") {
        selectedOption = part_groups.find((item) => item._id === value);
      } else if (name === "partname") {
        selectedOption = part_names.find((item) => item._id === value);
      } else if (name === "partgeneralid") {
        selectedOption = part_generalids.find((item) => item._id === value);
      }
    }

    setRecordData({
      ...recordData,
      [name]: {
        id: selectedOption._id,
        title: selectedOption.title,
      },
    });
  };

  const handleAddRecord = () => {
    const newRecord = {};

    if (selection === "materials") {
      newRecord.materialgroup = recordData.materialgroup;
      newRecord.materialname = recordData.materialname;
      newRecord.materialgrade = recordData.materialgrade;
    } else {
      newRecord.partgroup = recordData.partgroup;
      newRecord.partname = recordData.partname;
      newRecord.partgeneralid = recordData.partgeneralid;
    }

    setRecords([...records, newRecord]);
    setRecordData({
      materialgroup: { id: "", title: "" },
      materialname: { id: "", title: "" },
      materialgrade: { id: "", title: "" },
      partgroup: { id: "", title: "" },
      partname: { id: "", title: "" },
      partgeneralid: { id: "", title: "" },
    });
  };

  const handleRemoveRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleSubmitStep3 = () => {
    setFormData({
      ...formData,
      records,
    });
    dispatch(
      showToast({
        message: "موارد با موفقیت ثبت شدند",
        type: "success",
      })
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const time = calculateRemainingTime();

    setShowVerification(true);

    const { repeat_password, ...dataToSubmit } = formData;
    dataToSubmit.role = "provider";
    dataToSubmit.username = formData.email;
    dataToSubmit.records = records;
    dataToSubmit.isVerified = true;

    if (image) {
      dataToSubmit.image = image;
    }
    if (time) return;
    dispatch(providerRegister(dataToSubmit));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company_name)
      newErrors.company_name = "نام کمپانی مورد نیاز است";
    if (!formData.phone) newErrors.phone = " شماره تماس ثابت مورد نیاز است";
    if (!formData.cellphone)
      newErrors.cellphone = " شماره تماس همراه مورد نیاز است";
    if (!formData.id_number) newErrors.id_number = " کد ملی مورد نیاز است";
    if (!formData.ceo_cellphone)
      newErrors.ceo_cellphone = " شماره تماس همراه مدیر شرکت مورد نیاز است";
    if (!formData.foundation_year)
      newErrors.foundation_year = " سال تاسیس مورد نیاز است";
    if (!formData.postal_code) newErrors.postal_code = " کد پستی مورد نیاز است";
    if (!formData.fax_number)
      newErrors.fax_number = "شماره فکس مدیر مورد نیاز است";
    if (!formData.economical_number)
      newErrors.economical_number = " شماره اقتصادی مورد نیاز است";
    if (!formData.ceo_name) newErrors.ceo_name = "نام مدیر مورد نیاز است";
    if (!formData.website_address)
      newErrors.website_address = "نام مدیر مورد نیاز است";
    if (!formData.country) newErrors.country = " نام کشور مورد نیاز است";
    if (!formData.city) newErrors.city = "نام شهر مورد نیاز است";
    if (!formData.form_filler_name)
      newErrors.form_filler_name = "نام تکمیل کننده این فرم مورد نیاز است";
    if (!formData.form_filler_position)
      newErrors.form_filler_position =
        " موقعینت شغلی تکمیل کننده این فرم مورد نیاز است";
    if (!formData.address) newErrors.address = " آدرس مورد نیاز است";
    if (!formData.email) {
      newErrors.email = "ایمیل مورد نیاز است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    if (!formData.password) {
      newErrors.password = "رمز عبور مورد نیاز است";
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل 8 کاراکتر باشد";
    }
    if (formData.password !== formData.repeat_password) {
      newErrors.repeat_password = "رمزهای عبور مطابقت ندارند";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    dispatch(fetchMaterialGroups());
    dispatch(fetchMaterialNames());
    dispatch(fetchMaterialGrades());
    dispatch(fetchPartGeneralIds());
    dispatch(fetchPartGroups());
    dispatch(fetchPartNames());
  }, [dispatch]);

  return (
    <div
      className="flex items-center justify-center p-12 bg-slate-200 h-screen relative"
      style={{
        backgroundImage: `url(${providerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HomeIcon />
      <form
        className={`${
          step === 3 ? "w-3/4 h-1/2 mt-[15%]" : "w-3/4 h-3/4"
        } mx-auto bg-white p-10 rounded-2xl`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-5 pt-3">
          <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
            ثبت نام تامین کننده
          </label>
          {step === 3 && (
            <p>
              مواد یا قطعات مرتبط با صنعت خود را پیدا نکردید ؟{" "}
              <button className="text-blue-600 mx-2" onClick={handleOpenModal}>
                {" "}
                اینجا
              </button>
              را کلیک کنید
            </p>
          )}
          <div className="-mx-3 flex flex-wrap px-10 py-5">
            {step === 1 && (
              <>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="company_name"
                      id="company_name"
                      placeholder="نام کمپانی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.company_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="ceo_name"
                      id="ceo_name"
                      placeholder="نام مدیر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.ceo_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ceo_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="website_address"
                      id="website_address"
                      placeholder="آدرس وبسایت"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.website_address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.website_address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="آدرس "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="کشور"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="شهر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="form_filler_name"
                      id="form_filler_name"
                      placeholder="نام پر کننده فرم"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.form_filler_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.form_filler_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="form_filler_position"
                      id="form_filler_position"
                      placeholder="سمت پر کننده فرم"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.form_filler_position && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.form_filler_position}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="id_number"
                      id="id_number"
                      placeholder="کد ملی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.id_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.id_number}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="cellphone"
                      id="cellphone"
                      placeholder="شماره تماس"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.cellphone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cellphone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="ceo_cellphone"
                      id="ceo_cellphone"
                      placeholder=" شماره تماس مدیر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.ceo_cellphone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ceo_cellphone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="تلفن ثابت"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="foundation_year"
                      id="foundation_year"
                      placeholder=" سال تاسیس"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.foundation_year && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.foundation_year}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="postal_code"
                      id="postal_code"
                      placeholder="کد پستی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.postal_code && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.postal_code}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="fax_number"
                      id="fax_number"
                      placeholder="شماره فکس "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.fax_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fax_number}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="economical_number"
                      id="economical_number"
                      placeholder="شماره اقتصادی  "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.economical_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.economical_number}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="w-1/2 px-3 absolute top-5">
                    <div className="mb-5">
                      <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                        تولید
                      </label>
                      <select
                        value={selection}
                        onChange={handleSelectionChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="materials">ماده</option>
                        <option value="parts">قطعه</option>
                      </select>
                    </div>
                  </div>

                  {selection === "materials" ? (
                    <div className="w-full flex  items-center top-[15%] absolute">
                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          گروه ماده
                        </label>
                        <select
                          name="materialgroup"
                          value={recordData.materialgroup.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {material_groups.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          نام ماده{" "}
                        </label>
                        <select
                          name="materialname"
                          value={recordData.materialname.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {material_names.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          درجه ماده
                        </label>
                        <select
                          name="materialgrade"
                          value={recordData.materialgrade.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {material_grades.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex  items-center top-[15%] absolute">
                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          گروه قطعه
                        </label>
                        <select
                          name="partgroup"
                          value={recordData.partgroup.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {part_groups.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          نام قطعه
                        </label>
                        <select
                          name="partname"
                          value={recordData.partname.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {part_names.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-1/2 px-3 mb-5">
                        <label className="block text-base font-semibold text-white sm:text-xl mb-2">
                          شناسه قطعه
                        </label>
                        <select
                          name="partgeneralid"
                          value={recordData.partgeneralid.id}
                          onChange={handleDropdownChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        >
                          {part_generalids.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-[30%] flex w-full justify-center gap-5">
                    <button
                      type="button"
                      onClick={handleAddRecord}
                      className="hover:shadow-form w-auto max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none "
                    >
                      ثبت موقت
                    </button>

                    {step === 3 && (
                      <button
                        type="button"
                        onClick={handleSubmitStep3}
                        className=" hover:shadow-form w-auto max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base  font-semibold text-white outline-none "
                      >
                        ثبت نهایی موارد
                      </button>
                    )}
                  </div>

                  <div className="w-full max-h-[180px] overflow-y-auto">
                    <table className="table-auto w-full text-left border-collapse border border-gray-400">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-4 py-2">
                            گروه
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            نام
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            شناسه / درجه
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            کنش
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">
                              {record.materialgroup?.title ||
                                record.partgroup?.title ||
                                "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {record.materialname?.title ||
                                record.partname?.title ||
                                "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {record.materialgrade?.title ||
                                record.partgeneralid?.title ||
                                "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                onClick={() => handleRemoveRecord(index)}
                                className="text-red-500"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <div className="flex w-full justify-center items-center">
                <div className="w-1/2">
                  <div className="w-full px-3 ">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="پست الکترونیک"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-3">
                    <div className="mb-5">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="رمز عبور"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-3 ">
                    <div className="mb-5">
                      <input
                        type="password"
                        name="repeat_password"
                        id="repeat-password"
                        placeholder="تکرار رمز عبور"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                      {errors.repeat_password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.repeat_password}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-1/2 px-3 mb-5">
                  <label className="block text-base font-semibold text-gray-700 sm:text-xl mb-2">
                    بارگزاری لوگو/ تصویر تامین کننده
                  </label>
                  <div className="flex items-center">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 7.59l-3.3-3.3c-.56-.56-1.4-.56-1.96 0l-3.3 3.3c-.56.56-.56 1.4 0 1.96L10 11l1.88-1.88 4.12-4.12zM10 12l1.88-1.88 4.12 4.12L14.12 16H5v-2h3l2-2zm5-10c.55 0 1 .45 1 1v3h-2V3H3v14h4v2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h14z" />
                      </svg>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="">
                      <img
                        src={imagePreview}
                        alt="Company logo preview"
                        className="w-[100%] max-h-28 rounded-md object-contain pt-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className=" flex justify-between gap-10 w-full  px-5 z-1">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="absolute left-10 bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              مرحله قبل
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="absolute right-10 bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base  font-semibold text-white outline-none"
            >
              مرحله بعد
            </button>
          )}

          {step === 4 && (
            <button
              type="submit"
              className="absolute right-[2rem] bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              ثبت نام
            </button>
          )}
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 h-1/2">
            <p className="text-center text-2xl py-5">ثبت ماده یا قطعه</p>
            <input
              type="text"
              placeholder="اطلاعات ماده یا قطعه را با جزییات کامل بنویسید"
              className="border border-slate-300 p-5 rounded-xl w-full text-right"
            />
            <button
              onClick={handleCloseModal}
              className="absolute right-10 top-0 mt-4 bg-red-500 text-white py-2 px-4 rounded mx-auto block"
            >
              <GrClose />
            </button>

            <button
              onClick={handleRequest}
              className="mt-4 bg-green-500 text-white py-2 px-10 rounded mx-auto block"
            >
              ثبت
            </button>
          </div>
        </div>
      )}
      {showVerification && (
        <VerificationModal
          email={formData.email}
          onClose={() => setShowVerification(false)}
          mode="register"
        />
      )}
    </div>
  );
};

export default ProviderRegistration;
