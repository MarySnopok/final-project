// import { Map } from "./components/Map";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Consent } from "./components/Consent";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { EntryPage } from "./components/EntryPage";

import { PressTag } from "./ui_fractions/Tags";

export default function App() {
  const [text, onChangeText] = useState("Useless Text");
  const handleChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    onChangeText(processedData);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Consent />} />
          <Route path="/entrypage" element={<EntryPage />} />
          <Route path="*" element={<PressTag children={"Search more"} />} />
          <Route path="/input" element={<PressTag children={"Near me"} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          {/* <Card> */}
          {/* <Heading children={"LogIn"} /> */}
          {/* <Box> */}
          {/* <Input onChangeText={(text) => onChangeText(text)} placeholder={"username"} value={text} defaultValue={text}></Input> */}
          {/* <Input name="username" type="text" value={text} onChange={handleChange} /> */}
          {/* <Paragraph children={"This is the text that will be represented as a paragrapth"} /> */}
          {/* <PressTag children={"Near me"} /> */}
          {/* </Box> */}
          {/* <Box> */}
          {/* <Paragraph children={"This is the text that will be represented as a paragrapth"} /> */}

          {/* <PressTag children={"Near me"} /> */}
          {/* </Box> */}

          {/* <Subtext children={"Yes, I do agree with the Terms and conditions of use."} />
        <GeneralButton children={"submit"} />
      </Card> */}
        </Routes>
      </BrowserRouter>

      {/* <Map /> */}
    </>
  );
}
