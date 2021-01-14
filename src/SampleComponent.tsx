import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const searchGoogleBooks = async (searchString: string) => {
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const params = {q: searchString};
  try {
    const reponse = await axios.get(url, {params});
    return {isSuccess: true, data: reponse.data, error: null};
  } catch (error) {
    return {isScucess: false, data: null};
  }
};

export const SampleComponent: React.FC = () => {
  const [searchString, changeSearchString] = useState('');

  const handleOnSearchButton =
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // buttonのsubmitを止める
      event.preventDefault();
      return await searchGoogleBooks(searchString);
    };

  return (
    <Wrapper>
      <Body>
        <Title>Sample Component</Title>
        <SearchForm>

          <Input
            placeholder='検索ワードを入力してください'
            onChange={(event) => changeSearchString(event.target.value)}
          />
          <SearchButton
            onClick={(event) => handleOnSearchButton(event)}
            disabled={!searchString}>
            検索
          </SearchButton>
        </SearchForm>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Body = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 250px;
  font-size: 18px;
  padding: 10px;
  outline: none;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SearchButton = styled.button`
  color: #fff;
  background-color: #09d3ac;
  border-radius: 3px;
  margin-left: 10px;
  padding: 10px;
  font-size: 18px;
  border: none;
  outline: none;
  transition: 0.4s;
  cursor: pointer;
  /* button:disabledと同様に扱われる */
  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
`;
