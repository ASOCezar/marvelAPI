import P from 'prop-types';
import { Input } from './style';
import image from '../../icons/Vector_search_icon.svg';
import cancelIcon from '../../icons/clearIcon.png';
import { useRef, useState } from 'react';
import { SearchedCharsWrapper } from '../SearchedCharsWrapper';
import { Card } from '../Card';

export const InputSearch = ({ onFocus, onBlur }) => {
  const inputValue = useRef();
  const [isSearching, setIsSearching] = useState(false);
  const [searchedChars, setSearchedChars] = useState([]);

  const handleClick = () => {
    const searchValue = inputValue.current.value;
    setIsSearching(true);
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&ts=1627160343&apikey=bcc7616374e3d240e7270653f1b2b599&hash=8238c0c73920dc83cfe09aec0b169d26`,
    )
      .then((res) => res.json())
      .then((res) => setSearchedChars(res.data?.results));
  };

  const handleConfirm = ({ char }) => {
    //eslint-disable-next-line
    const result = window.confirm(`Gostaria de Favoritar ${char?.name}?`);
    if (result) {
      const isSaved = window.localStorage.getItem(`${char.id}`);
      isSaved
        ? window.alert(`${char.name} já está salvo em seus favoritos`)
        : window.localStorage.setItem(`${char.id}`, JSON.stringify(char));
    }
  };
  console.log(isSearching);

  return (
    <>
      <Input>
        <div
          className="image"
          onClick={() => {
            inputValue.current.value = '';
            setSearchedChars([]);
            setIsSearching(false);
          }}
        >
          <img src={cancelIcon} style={{ maxWidth: '20px', cursor: 'pointer' }} />
        </div>
        <input onFocus={onFocus} onBlur={onBlur} ref={inputValue} type="text" placeholder="Search..." />
        <div className="image" onClick={() => handleClick()}>
          <img src={image} style={{ cursor: 'pointer' }} />
        </div>
      </Input>
      <SearchedCharsWrapper isSearching={isSearching}>
        <div>
          <h2> Clique no personagem que deseja salvar como favorito!! </h2>
        </div>
        {searchedChars?.map((char) => {
          return <Card key={char.id} char={char} onClick={() => handleConfirm({ char })} />;
        })}
      </SearchedCharsWrapper>
    </>
  );
};

InputSearch.propTypes = {
  onFocus: P.func.isRequired,
  onBlur: P.func.isRequired,
};

// TODO: Fazer o resto da requisição
