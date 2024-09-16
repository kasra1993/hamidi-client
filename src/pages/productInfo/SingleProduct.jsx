// SingleProduct.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../redux/slices/productInfoSlice";
import Loading from "../../components/Loading";
import HomeIcon from "../../components/HomeIcon";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct, loading, error } = useSelector(
    (state) => state.productInfo
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (loading || !singleProduct) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const { image, title, description } = singleProduct;

  return (
    <section className="border border-slate-300 m-3 rounded-lg shadow-lg bg-slate-100">
      <HomeIcon color="black" />
      <button
        onClick={() => navigate(-1)}
        className=" z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded w-20 absolute left-[5rem] top-[2rem]"
      >
        بازگشت
      </button>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-16">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-md border border-slate-200">
              <img
                alt=""
                src={image?.url}
                className="object-contain mx-auto h-96 w-full"
              />
            </div>
            <a
              href="/vendors"
              className="mt-8 block rounded-2xl bg-[#152a54] px-12 py-3 text-xl font-medium text-white transition hover:bg-[#2e4a83] focus:outline-none focus:ring focus:ring-indigo-400"
            >
              تامین کنندگان
            </a>
          </div>
          <div className="lg:py-24">
            <h2 className="text-4xl font-bold font-sans sm:text-5xl text-gray-800">
              {title}
            </h2>
            <p className="mt-6 text-gray-600 text-left text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
