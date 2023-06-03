import { Button } from "antd";
import React, { FC } from "react";

const TestingStudent: FC = () => {
  const url = "https://localhost:44311/api/services/app/ChatBackground/GetAll";
  const getAllBooks = async () => {
    await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((res) => {
          if (res.success) {
            console.log(res.result[0].id);
            // download(res.result[0].id);
          } else {
            console.log(res.error.details);
            return res.details;
          }
        });
      })
      .catch((error) => error.response);
  };

  const download = async () => {
    await fetch(
      `https://localhost:44311/api/services/app/ChatBackground/Download?id=a083b3a0-c0f4-4ea0-61e2-08da55522acb`,
      {
        method: "POST",
        cache: "no-cache",
      }
    )
      .then((response) => response.blob()).then(imageBlob => {
          console.log(imageBlob)
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL)
        var anchor = document.createElement('div');
        anchor.className = 'testingBlob'
        anchor.style.backgroundImage = `url(${imageObjectURL})`
        document.querySelector('body').appendChild(anchor);
        console.log(imageObjectURL);
    });
  };




  const handleOnClick = async () => {
    await download();
  };
  return (
    <div style={{ width: "100px", margin: "50px auto" }}>
      <Button onClick={handleOnClick}>Test</Button>
    </div>
  );
};

export default TestingStudent;