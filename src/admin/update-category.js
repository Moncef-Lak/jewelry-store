import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from "../images/undraw_Maintenance_re_59vn.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { MdCancel, MdDoNotDisturbOn } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../contexts/adminContext";

const UpdateCategory = () => {
  const [isListBeforShowing, setIsListBeforShowing] = useState(false);
  const [msgShowing, setMsgShowing] = useState(false);
  const { id } = useParams();
  const { push } = useHistory();
  const { categoryItems, setIsCategoryItems } = useGlobalContext();
  const CategoryItem = categoryItems.filter((item) => item.id === id);
  // console.log(adminUserItem);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // chek we have an item
  useEffect(() => {
    if (CategoryItem.length < 1) {
      push("../categories");
    }
  }, [CategoryItem.length, push]);

  const handleSubmit2 = (data) => {
    if (!data.imageName[0] && !data.active && !data.name) {
      push("../categories");
    }
    // const myObj={name:data.name,username:data.username,id:CategoryItem[0].id,type:'update-admin'}
    const myObj = new FormData();
    myObj.append(
      "image",
      data.imageName[0] ? data.imageName[0] : CategoryItem[0].image_name
    );
    myObj.append("image_before", CategoryItem[0].image_name);
    myObj.append("active", data.active ? data.active : CategoryItem[0].active);
    myObj.append("name", data.name ? data.name : CategoryItem[0].name);
    myObj.append("id", CategoryItem[0].id);
    myObj.append("type", "update-category");

    try {
      axios
        .post(process.env.REACT_APP_API_PASSWORD + "update.php", myObj)
        .then((data) => {
          if (data.data === "ok") {
            setIsCategoryItems(Math.random() * 100);
            push("../categories");
          }
          if (data.data === "faild to upload image") {
            setMsgShowing(true);
            console.log("faild to upload image");
          } else {
            setMsgShowing(true);
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

  const image_name = CategoryItem[0] ? CategoryItem[0].image_name : "a";

  return (
    <>
      <AdminNavbar />
      <section className="add-admin-page">
        <div className={`add-msg ${msgShowing && "inshowing"}`}>
          <h1>
            <MdDoNotDisturbOn />
          </h1>
          <h2>Fail To Update Category</h2>
        </div>
        <div className="in-add-admin">
          <section className="left-side">
            <img src={img2} alt="img" style={{ width: "80%" }} />
          </section>
          <section className="right-side">
            <h3
              className="update-title update-title2"
              onClick={() => setIsListBeforShowing(true)}
            >
              <HiOutlineClipboardList />
            </h3>
            <h3 className="update-title">Update-Category </h3>

            {/* List Before */}
            <div
              className={` list-before ${
                isListBeforShowing && "showing-list-before"
              }`}
            >
              <h6 onClick={() => setIsListBeforShowing(false)}>
                <MdCancel />
              </h6>
              <h2>
                <HiOutlineClipboardList className="list-items-logo" />{" "}
              </h2>
              <div className="list-before-box">
                <h2>ID:</h2>
                <h4>{CategoryItem[0] && CategoryItem[0].id}</h4>
              </div>
              <div className="list-before-box">
                <h2>Name Before:</h2>
                <h4>{CategoryItem[0] && CategoryItem[0].name} </h4>
              </div>
              <div className="list-before-box">
                <h2>Active :</h2>
                <h4>{CategoryItem[0] && CategoryItem[0].active}</h4>
              </div>
              <div className="list-before-box">
                <h2>Image :</h2>
                <h4>
                  {CategoryItem[0] && (
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_FILE_PATH +
                        "category-image/" +
                        image_name
                      }
                      onError={(e) =>
                        (e.target.src =
                          process.env.REACT_APP_IMAGE_FILE_PATH +
                          "008_-_404_error_4x.webp")
                      }
                      alt="img"
                    />
                  )}
                </h4>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmit2)}>
              <input
                type="text"
                placeholder="name"
                {...register("name", { minLength: 3 })}
              />
              {/* <ErrorMessage errors={errors} name='name' as={<p> <BiError/> This is Required</p>} /> */}
              {errors.name && errors.name.type === "minLength" && (
                <p>
                  <BiError /> Min Length Should Be 3
                </p>
              )}

              <div className="radio-box">
                <h3>Active</h3>
                <div className="radio-in">
                  <input
                    type="radio"
                    {...register("active", { required: false })}
                    value="Yes"
                  ></input>{" "}
                  Yes{" "}
                </div>
                <div className="radio-in">
                  <input
                    type="radio"
                    {...register("active", { required: false })}
                    value="No"
                  />{" "}
                  No
                </div>
              </div>

              <input
                type="file"
                onChange={(e) => setValue("imageName", e.target.value.files)}
                placeholder="image"
                {...register("imageName", {
                  required: false,
                  validate: (value) => {
                    if (value[0]) {
                      return (
                        value[0].size / 1024 < 500 ||
                        "Size must Be at the most 0.5 Mo"
                      );
                    }
                  },
                })}
              />
              {errors.imageName && errors.imageName.type === "validate" && (
                <p>
                  <BiError /> Size must Be at the most 0.5 Mo
                </p>
              )}

              <input type="submit" value="Update" className="btn-add" />
            </form>
            <Link to="/categories">
              <h2>
                Return to Categories{" "}
                <AiOutlineArrowRight className="aroow-right" />
              </h2>
            </Link>
          </section>
        </div>
      </section>
    </>
  );
};

export default UpdateCategory;
