/* eslint-disable react/jsx-no-undef */

import { TextField, Button, Typography, Paper } from "@mui/material";
import React, { useState, useRef } from "react";
import Slide from "@mui/material/Slide";
import CreateID from "./GenCourseID";
import { useMsal } from "@azure/msal-react";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getStorage,
} from "@firebase/storage";
import createID from "./GenCourseID";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Firstpanel({ handletab, setCourse }) {
  const [showimageupload, setshowimageupload] = useState(false);
  const [images, setImages] = useState([]);
  const { instance, accounts } = useMsal();

  const onclick = () => {
    setshowimageupload(!showimageupload);
  };

  const handletabChange = (event, num) => {
    let temp = {
      name: document.getElementById("courseName").value,
      courseID: createID(
        accounts[0].username.split("@")[0],
        document.getElementById("courseName").value
      ),
      description: document.getElementById("courseDes").value,
      images: images,
    };
    setCourse(temp);

    handletab(event, num);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    let temp = document.getElementById("chowed").value;
    if (temp === "") {
      document.getElementById("faith").click();
    } else {
      setImages([...images, { id: images.length, url: temp }]);
      document.getElementById("chowed").value = "";
    }
    // setshowimageupload(false); ggggggg
  };

  const picsRef = useRef();
  const upAnddown = async (file1) => {
    const storage = getStorage();
    const storageRef1 = ref(storage, `/Courses/${file1.name}`);
    await uploadBytes(storageRef1, file1);
    picsRef.current.value = null;
    let g = await getDownloadURL(ref(storage, `/Courses/${file1.name}`));
    console.log(g);
    return g;
  };

  const pictureshandler = async (e) => {
    e.preventDefault();
    const file1 = e.target[0].files[0];

    console.log(file1);

    const pictureURL = await upAnddown(file1);
    console.log(pictureURL);
    setImages([...images, { id: images.length, url: pictureURL }]);
  };

  return (
    <div
      style={{
        backgroundColor: "#003b5c",
        margin: "0px",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <Paper
      elevation={20}
        style={{
          backgroundColor: "#ffffff",
          width: "50%",
          height: "80%",
          border: "5px",
          borderRadius: "15px",
          borderColor: "#000000",
          margin: "auto",
          borderRadius: "4",
          pading: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id="courseName"
          label="Course name"
          variant="outlined"
          size="small"
          style={{ marginTop: "25px", padding: "10px" }}
        />

        <TextField
          id="courseDes"
          label="Course description"
          variant="outlined"
          size="small"
          style={{ marginTop: "5px", padding: "10px" }}
        />
        <div>
          <Button
            variant="contained"
            style={{ margin: "10px 5px 30px 50px" }}
            onClick={onclick}
          >
            Add Image{" "}
          </Button>
        </div>

        {showimageupload && (
          <>
            <TextField
              varient="outlined"
              id="chowed"
              label="Image url"
              size="small"
              style={{ margin: "0px 60px 2px 50px" }}
            />
            <form onSubmit={pictureshandler}>
              <div className="Imageupload">
                <input
                  style={{ margin: "0px 5px 0px 50px" }}
                  type="file"
                  id="image"
                  name="file "
                  multiple
                  ref={picsRef}
                  onChange={(e) => this.handlefile(e)}
                />
              </div>
              <Button
                variant="contained"
                id="faith"
                type="submit"
                style={{ margin: "2px 10px 30px 90px", display: "none" }}
              >
                upload
              </Button>
            </form>
            <Button
              variant="contained"
              onClick={handleBtn}
              style={{ margin: "2px 10px 30px 90px" }}
            >
              upload
            </Button>
          </>
        )}

        <div style={container}>
          {images.length === 0 ? (
            <Typography>No photos</Typography>
          ) : (
            <>
              {images.map((image) => {
                // eslint-disable-next-line jsx-a11y/alt-text
                return (
                  <img
                    src={image.url}
                    key={image.id}
                    style={{ width: "50px", height: "50px" }}
                  />
                );
              })}
            </>
          )}
        </div>
        <div>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#ffffff",
              margin: "10px 50px 50px 500px ",
              marginBottom: "10px",
            }}
            onClick={(event) => handletabChange(event, 1)}
          >
            Next{" "}
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const container = {
  width: "350px",
  margin: "30px auto",
  overflow: "auto",
  height: "100px",
  border: "1px solid steelblue",
  padding: "30px",
  borderRadius: "5px",
};

export default Firstpanel;
