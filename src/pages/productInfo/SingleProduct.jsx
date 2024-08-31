import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { main_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import HomeIcon from "../../components/HomeIcon";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${main_url}/product/${id}`);
        const providers = response.data;
        setProduct(providers);
      } catch (error) {}
    };
    fetchData();
  }, []);

  if (!product) {
    return (
      <div className="mx-auto  h-screen w-full absolute -left-28">
        <Loading />;
      </div>
    );
  }

  const { image, title, description } = product;

  return (
    <section className="border border-slate-300 m-3 rounded-lg shadow-lg bg-slate-100">
      <HomeIcon color="black" />

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
