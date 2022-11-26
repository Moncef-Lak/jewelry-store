import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from "../images/undraw_Photograph_re_up3b (1).svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useForm } from "react-hook-form";

const AddPicture = () => {
  const { push } = useHistory();

  const [msgShowing, setMsgShowing] = useState(false);
  const [msg, setMsg] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmit2 = (data) => {
    const myObj = new FormData();
    myObj.append("image", data.imageName[0], data.imageName[0].name);
    myObj.append("active", data.active);
    myObj.append("favorit", data.favorit);
    myObj.append("type", "add-picture");

    try {
      axios
        .post(process.env.REACT_APP_API_PASSWORD + "add.php", myObj)
        .then((data) => {
          // console.log(data.data)
          if (data.data === "ok") {
            push("./gallery");
          }
          if (data.data === "faild") {
            setMsgShowing(true);
            setMsg("Fail To Add Gallery");
          }
          if (data.data === "faild to upload image") {
            setMsgShowing(true);
            setMsg("Fail to upload image");
          }
        });
    } catch (error) {
      console.log(error);
      setMsgShowing(true);
    }
  };

  useEffect(() => {
    let hiddenMsg = setTimeout(() => {
      setMsgShowing(false);
    }, 3000);
    return () => clearTimeout(hiddenMsg);
  }, [msgShowing]);

  return (
    <>
      <AdminNavbar />
      <section className="add-admin-page">
        <div className={`add-msg ${msgShowing && "inshowing"}`}>
          <h1>
            <MdDoNotDisturbOn />
          </h1>
          <h2>{msg}</h2>
        </div>
        <div className="in-add-admin">
          <section className="left-side">
            <img src={img2} alt="img" style={{ width: "80%" }} />
          </section>
          <section className="right-side">
            <form onSubmit={handleSubmit(handleSubmit2)}>
              <div className="radio-box">
                <h3>Active</h3>
                <div className="radio-in">
                  <input
                    type="radio"
                    required
                    {...register("active", { required: true })}
                    value="Yes"
                  ></input>{" "}
                  Yes{" "}
                </div>
                <div className="radio-in">
                  <input
                    type="radio"
                    required
                    {...register("active", { required: true })}
                    value="No"
                  />{" "}
                  No
                </div>
              </div>
              {errors.active && errors.active.type === "required" && (
                <p>
                  <BiError /> This is Required
                </p>
              )}

              <div className="radio-box">
                <h3>favourite</h3>
                <div className="radio-in">
                  <input
                    type="radio"
                    required
                    {...register("favorit", { required: true })}
                    value="Yes"
                  ></input>{" "}
                  Yes{" "}
                </div>
                <div className="radio-in">
                  <input
                    type="radio"
                    required
                    {...register("favorit", { required: true })}
                    value="No"
                  />{" "}
                  No
                </div>
              </div>
              {errors.favorit && errors.favorit.type === "required" && (
                <p>
                  <BiError /> This is Required
                </p>
              )}

              <input
                type="file"
                onChange={(e) => setValue("imageName", e.target.value.files)}
                placeholder="image"
                {...register("imageName", {
                  required: true,
                  validate: (value) =>
                    value[0].size / 1024 < 500 ||
                    "Size must Be at the most 0.5 Mo",
                })}
              />
              {errors.imageName && errors.imageName.type === "required" && (
                <p>
                  <BiError /> This is Required
                </p>
              )}
              {errors.imageName && errors.imageName.type === "validate" && (
                <p>
                  <BiError /> Size must Be at the most 0.5 Mo
                </p>
              )}

              <input type="submit" value="Add" className="btn-add" />
            </form>
            <Link to="/gallery">
              <h2>
                Return to Gallery{" "}
                <AiOutlineArrowRight className="aroow-right" />
              </h2>
            </Link>
          </section>
        </div>
      </section>
    </>
  );
};

export default AddPicture;
