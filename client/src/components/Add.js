import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { QUERY_ALL_SKILLS } from "../query/gqlQuery";
import axios from "axios";
import { CREATE_JOB } from "../query/gqlQuery";
import { useMutation } from "@apollo/client";
const Container = styled.section`
  margin: 3rem 1rem;
  max-width: 1200px;
  @media (min-width: 1440px) {
    margin: 3rem auto;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  background-color: white;
  padding: 3rem 1rem;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (min-width: 1440px) {
    flex-direction: row;
  }
`;

const ColLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1440px) {
    width: 50%;
  }
`;

const Preview = styled.div`
  width: 12rem;
  height: 12rem;
  margin: 1rem 0;
  img {
    height: 100%;
    display: block;
    margin: 0 auto;
    border-radius: 15px;
  }
`;

const PreviewTitle = styled.h5`
  font-size: 1.3rem;
  border-bottom: 1px solid hsl(180, 29%, 50%);
`;

const SelectImage = styled.label`
  padding: 0.7rem 1rem;
  margin-top: 1rem;
  text-align: center;
  box-shadow: 0px 8px 20px -3px rgba(192, 194, 215, 1);
  border-radius: 15px;
  cursor: pointer;
  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  &:hover {
    box-shadow: inset 0px 1px 11px -3px rgba(192, 194, 215, 1);
  }
`;

const ColRight = styled.div`
  margin: 0 0.5rem;
  @media (min-width: 1440px) {
    width: 50%;
  }
`;

const FormGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  input {
    border: none;
    padding: 0.2rem;
    margin-top: 0.5rem;
    outline: none;
    border-bottom: 1px solid hsl(180, 29%, 50%);
    color: hsl(180, 29%, 50%);
  }
  label {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const SkillsList = styled.ul`
  margin-top: 0.7rem;
  padding: 0.7rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  @media (min-width: 1440px) {
    margin: 0 4rem 0 auto;
    border: none;
  }
`;

const Skill = styled.li`
  color: ${({ isSelect }) => (isSelect ? "white" : "hsl(180, 8%, 52%)")};
  font-weight: 700;
  font-size: 1.1rem;
  background-color: ${({ isSelect }) => (isSelect ? "#ef5350" : "#e4e8e8")};
  padding: 0.4rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ isSelect }) => (isSelect ? "#e57373" : "#e2e2e2")};
  }
`;

const SubmitButton = styled.button`
  border: none;
  background-color: white;
  margin: 1rem auto;
  display: block;
  padding: 0.7rem 1rem;
  color: hsl(180, 8%, 52%);
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  box-shadow: 0px 8px 20px -3px rgba(192, 194, 215, 1);
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0px 1px 9px -3px rgba(192, 194, 215, 1);
  }
`;

const Add = () => {
  const { data, loading } = useQuery(QUERY_ALL_SKILLS);
  //File state
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  //Form states
  const [company, setComapny] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [skills, setSkills] = useState([]);

  //Mutation
  const [createJob] = useMutation(CREATE_JOB);

  const selectSkillHandler = (skillName) => {
    if (skills.some((x) => x === skillName)) {
      const filtred = skills.filter((x) => x !== skillName);
      setSkills(filtred);
    } else {
      setSkills((prev) => [...prev, skillName]);
    }
  };

  const isFormValid = () => {
    if (company && title && location && workType && skills.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleImageChange = (e) => {
    const targetFile = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const { result } = e.target;
      setImageSrc(result);
    };

    fileReader.readAsDataURL(targetFile);
    setFile(targetFile);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (file !== null && isFormValid()) {
      const bodyForm = new FormData();
      bodyForm.append("avatar", file);
      try {
        const res = await axios({
          method: "POST",
          url: "https://job-graphql.herokuapp.com/upload-avatar",
          data: bodyForm,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === true) {
          createJob({
            variables: {
              input: {
                company,
                title,
                image: res.data.imageUrl,
                location,
                workType,
                skills,
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <ColLeft>
          <PreviewTitle>Preview</PreviewTitle>
          <Preview>
            {file !== null && <img src={imageSrc} alt="preview" />}
          </Preview>
          <SelectImage htmlFor="image">
            Select file
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </SelectImage>
        </ColLeft>
        <ColRight>
          <FormGroup>
            <label htmlFor="company">Company name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setComapny(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="title">Job name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="workType">Work type</label>
            <input
              type="text"
              id="workType"
              name="workType"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            />
          </FormGroup>
          {!loading && (
            <SkillsList>
              {data.getSkills.map(({ id, name }) => {
                return (
                  <Skill
                    key={id}
                    onClick={() => selectSkillHandler(name)}
                    isSelect={skills.some((x) => x === name)}
                  >
                    {name}
                  </Skill>
                );
              })}
            </SkillsList>
          )}

          <SubmitButton type="submit">Send</SubmitButton>
        </ColRight>
      </Form>
    </Container>
  );
};

export default Add;
