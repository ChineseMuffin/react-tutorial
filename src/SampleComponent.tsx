import React, {useState} from 'react';
import styled from 'styled-components';
import axios, {AxiosResponse} from 'axios';

interface SearchResult{
  kind: string,
  items?: {
    kind: string,
    id: string,
    etag: string,
    // can not use interface Url?
    selfLink: string,
    volumeInfo: {
      title: string,
      authors: string[],
    },
  }[],
  totalItems: number,
};

// TODO: move this to another module
// 関数にasyncキーワードを付けると、関数がPromiseを返すようになる
const searchGoogleBooks = async (searchString: string) => {
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const params = {q: searchString};
  try {
    const response: AxiosResponse<SearchResult> =
      await axios.get(url, {params});
    return response;
  } catch (error) {
    // TODO: いい感じにエラーハンドリングする
    throw error;
  }
};

export const SampleComponent: React.FC = () => {
  const [searchString, changeSearchString] = useState<string>('');
  const [searchResult, changeSearchResult] =
    useState<SearchResult | null>(null);

  const handleOnSearchButton =
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // buttonのsubmitを止める
      event.preventDefault();

      try {
        const result = await searchGoogleBooks(searchString);
        changeSearchResult(result.data);
      } catch (error) {
        window.alert(String(error));
      }
    };

  return (
    <Wrapper>
      <Body>
        <Title>Google Books 検索</Title>
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

        {searchResult?.items && (
          <ResultContent>
            {searchResult.items.map((item: any) => {
              return (
                <ResultTitle key={item.id}>
                  {item.volumeInfo.title}
                </ResultTitle>
              );
            })}
          </ResultContent>
        )}
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
  /* disabledが切り替わり、background-colorが変わり切るまでの時間 */
  transition: 0.4s;
  cursor: pointer;
  /* button:disabledと同様に扱われる */
  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
`;

const ResultContent = styled.div`
  margin-top: 20px;
`;

const ResultTitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid;
  &:first-of-type {
    border-top: 1px solid;
  }
`;
