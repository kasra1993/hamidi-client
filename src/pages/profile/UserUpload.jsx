import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  uploadFile,
  clearUploadStatus,
  refetchUser,
} from "../../redux/slices/userSlice";
import Loading from "../../components/Loading";
import { showToast } from "../../redux/slices/toastSlice";
const pdfDefault = "/pdf-default.png";

const UserUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { uploading, uploadError, uploadSuccess, user } = useSelector(
    (state) => state.user
  );
  const userId = user._id;
  const uploadedFiles = user.uploadedFiles;

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (
      (selectedFile && selectedFile.type === "application/pdf") ||
      selectedFile.type.startsWith("image/")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    "image/jpeg": [],
    "image/png": [],
    "application/pdf": [],
    maxSize: 2 * 1024 * 1024, // 10 MB
  });

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected. Please select a file first.");
      return;
    }
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = async () => {
        const base64data = reader.result;

        const originalFilename = file.name;

        await dispatch(
          uploadFile({
            base64File: base64data,
            userId,
            originalFilename,
          })
        ).unwrap();
      };
      setFile(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (uploadSuccess) {
      dispatch(
        showToast({
          message: "فایل با موفقیت ذخیره شد",
          type: "success",
        })
      );
      dispatch(refetchUser());
    }
    // Clear the upload status to prevent toasts on subsequent renders
    return () => {
      dispatch(clearUploadStatus());
    };
  }, [uploadSuccess, dispatch]);

  useEffect(() => {
    dispatch(clearUploadStatus());
    dispatch(refetchUser());
  }, []);

  const downloadFile = async (fileUrl, filename) => {
    try {
      // Fetch the file from the URL
      const response = await fetch(fileUrl);
      const blob = await response.blob(); // Convert to a Blob

      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob); // Create URL from Blob
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up URL object
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className=" p-4 flex flex-wrap justify-center items-center w-full h-screen  overflow-auto font-[sans-serif]">
        {uploading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[200]">
            <Loading />
          </div>
        )}
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 relative">
          <div className="flex items-center pb-3 border-b border-gray-200">
            <div className="flex-1">
              <h3 className="text-gray-800 text-3xl">بارگذاری</h3>
            </div>
          </div>

          <div
            className="rounded-lg border-2 border-gray-200 border-dashed "
            {...getRootProps()}
          >
            <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 mb-4 fill-gray-600 inline-block"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>

              <h4 className="text-sm text-gray-600">
                کشیدن و رها کردن یا
                <label
                  htmlFor="chooseFile"
                  className="text-blue-600 cursor-pointer"
                >
                  انتخاب فایل
                </label>{" "}
                برای بارگذاری
              </h4>
              <input
                {...getInputProps()}
                type="file"
                id="chooseFile"
                className="hidden"
              />
            </div>
          </div>
          <p className="text-red-600 text-md text-right mt-5">
            فرمت های قابل قبول میباشند (PDF , JPEG , JPG , PNG) تنها
          </p>
          <div className="flex flex-col bg-gray-50 p-4 rounded-lg mt-4">
            {file && (
              <div className="flex items-center justify-center">
                <p className="text-sm text-gray-600 flex-1 m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 mr-2 fill-current inline-block"
                  >
                    <path
                      d="m433.798 106.268-96.423-91.222C327.119 5.343 313.695 0 299.577 0H116C85.673 0 61 24.673 61 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55V146.222c0-15.049-6.27-29.612-17.202-39.954zM404.661 120H330c-2.757 0-5-2.243-5-5V44.636zM396 482H116c-13.785 0-25-11.215-25-25V55c0-13.785 11.215-25 25-25h179v85c0 19.299 15.701 35 35 35h91v307c0 13.785-11.215 25-25 25z"
                      data-original="#000000"
                    />
                    <path
                      d="M363 200H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm0 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm-147.28 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h72.72c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                      data-original="#000000"
                    />
                  </svg>
                  {file?.name} <span className="ml-2">{file?.size}</span>
                </p>
                <svg
                  onClick={() => setFile(null)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-between gap-4 mt-6">
            {/* <button
              type="button"
              className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            >
              Cancel
            </button> */}
            <button
              type="button"
              className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              disabled={uploading}
              onClick={() => handleUpload()}
            >
              {uploading ? "در حال ارسال" : "ارسال"}
            </button>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 ? (
        <div className="max-w-4xl mx-auto  px-4 border border-slate-300 rounded-2xl p-10">
          <h2 className="text-2xl  text-center text-gray-800 mb-6">
            فایل های بارگذاری شده شما
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 mt-20">
            {uploadedFiles.map((file) => {
              const fileType = file?.fileType?.toLowerCase();

              // Show only JPEG or PDF files
              if (
                fileType === "jpeg" ||
                fileType === "jpg" ||
                fileType === "png"
              ) {
                return (
                  <div
                    key={file._id}
                    className="bg-white shadow-2xl rounded-lg p-6 flex justify-between max-h-50"
                  >
                    <div className="">
                      <img src={file.url} alt="img" className="w-10 h-auto" />
                    </div>
                    <div className="text-center text-gray-700 font-semibold">
                      <p> {file.originalFilename}</p>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() =>
                          downloadFile(
                            file.url,
                            `${file.originalFilename}.${fileType}`
                          )
                        } // Trigger download
                        className="text-blue-500 hover:underline font-semibold"
                      >
                        دانلود عکس
                      </button>
                    </div>
                  </div>
                );
              } else if (fileType === "pdf") {
                return (
                  <div
                    key={file._id}
                    className="bg-white shadow-2xl  rounded-lg p-6 flex  justify-between max-h-50 "
                  >
                    <img src={pdfDefault} alt="" className="w-10 h-auto" />
                    <div className="text-center text-gray-700 font-semibold">
                      <p>{file.originalFilename}</p>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() =>
                          downloadFile(file.url, `${file.originalFilename}.pdf`)
                        } // Download PDF
                        className="text-blue-500 hover:underline font-semibold"
                      >
                        دانلود فایل
                      </button>
                    </div>
                  </div>
                );
              }

              // Skip files that are not JPEG or PDF
              return null;
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto  px-4 border border-slate-300 rounded-2xl p-10">
          <h2 className="text-xl  text-center text-red-800 mb-6">
            هیچ فایلی از سمت شما بارگذاری نشده است
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserUpload;
