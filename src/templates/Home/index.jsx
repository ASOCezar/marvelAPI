import { useContext, useState } from 'react';

import { CardsGrid } from '../../components/CardsGrid';
import { HeaderMenu } from '../../components/HeaderMenu';
import { Modal } from '../../components/Modal';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { CharsContext } from '../../contexts/CharsProvider/context';
import { LoadMoreChars } from '../../components/LoadMoreChars';
import contactImage from '../../icons/contact.svg';
import favoriteImage from '../../icons/favorites.svg';
import { Option } from '../../components/Option';

const Home = () => {
  const charsContext = useContext(CharsContext);
  const { characters } = charsContext;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clickedChar, setClickedChar] = useState([]);

  return (
    <FavoritesProvider>
      <HeaderMenu
        childrenOne={<Option name={'Favorites'} goto={'/favorites'} image={favoriteImage} />}
        childrenTwo={<Option name={'Dev Contact'} goto={'https://github.com/asocezar'} image={contactImage} />}
      />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        clickedChar={clickedChar}
        setClickedChar={setClickedChar}
      />
      <CardsGrid
        array={characters}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setClickedChar={setClickedChar}
      />
      <LoadMoreChars />
    </FavoritesProvider>
  );
};

export default Home;
