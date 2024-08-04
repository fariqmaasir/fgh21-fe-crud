import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

function EditUsers() {
  const { id } = useParams();
  const url = "http://localhost:8888/users";
  const navigate = useNavigate();
  const [data, setData] = React.useState([
    {
      name: "",
      email: "",
    },
  ]);
  React.useEffect(() => {
    async function usersData() {
      try {
        const response = await fetch(url + "/" + id);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const datas = json.results;
        setData(datas);
      } catch (err) {
        console.error(err.message);
      }
    }
    usersData();
  }, []);
  const onSubmit = async (values, actions) => {
    const name = values.name;
    const email = values.email;
    const password = values.name;
    const body = new URLSearchParams({
      name,
      email,
      password,
    });
    try {
      const response = await fetch(url + "/" + id, {
        method: "PATCH",
        body,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      actions.resetForm();
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  console.log(errors);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-60">
        <Link to="/">
          <div className="justify-self-start flex items-center gap-2 hover:text-blue-500">
            <FaArrowLeft />
            Back to List Data
          </div>
        </Link>
        <div className="flex flex-col">
          <label htmlFor="">Fullname</label>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className={
              errors.name && touched.name
                ? "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                : "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
            onBlur={handleBlur}
            defaultValue={data[0].name}
          />
          {errors.name && touched.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={
              errors.email && touched.email
                ? "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                : "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
            onBlur={handleBlur}
            defaultValue={data[0].email}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={
              errors.password && touched.password
                ? "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                : "mt-1 block w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-5 rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUsers;
