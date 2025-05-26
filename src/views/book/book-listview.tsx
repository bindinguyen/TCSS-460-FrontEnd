'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import BookCard from 'components/BookCard';
import SearchBar from 'components/SearchBar';


interface IBook {
  isbn13: number;
  authors: string;
  publication: number;
  original_title: string;
  title: string;
  ratings: IRatings;
  icons: IUrlIcon;
}

interface IUrlIcon {
  large: string;
  small: string;
}

interface IRatings {
  average: number;
  count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}
export default function BookListPage() {
  const mockData: IBook[] = [
    {
      isbn13: 9780452284240,
      authors: 'George Orwell',
      publication: 2016,
      original_title: 'Animal Farm: A Fairy Story',
      title: 'Animal Farm',
      ratings: {
        average: 3.87,
        count: 1881700,
        rating_1: 66854,
        rating_2: 135147,
        rating_3: 433432,
        rating_4: 698642,
        rating_5: 648912
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1424037542m/7613.jpg',
        small: 'https://images.gr-assets.com/books/1424037542s/7613.jpg'
      }
    },
    {
      isbn13: 9780553296980,
      authors: 'Anne Frank, Eleanor Roosevelt, B.M. Mooyaart-Doubleday',
      publication: 2016,
      original_title: 'Het Achterhuis: Dagboekbrieven 14 juni 1942 - 1 augustus 1944',
      title: 'The Diary of a Young Girl',
      ratings: {
        average: 4.1,
        count: 1972666,
        rating_1: 45225,
        rating_2: 91270,
        rating_3: 355756,
        rating_4: 656870,
        rating_5: 875372
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1358276407m/48855.jpg',
        small: 'https://images.gr-assets.com/books/1358276407s/48855.jpg'
      }
    },
    {
      isbn13: 9780307269750,
      authors: 'Stieg Larsson, Reg Keeland',
      publication: 2016,
      original_title: 'Män som hatar kvinnor',
      title: 'The Girl with the Dragon Tattoo (Millennium, #1)',
      ratings: {
        average: 4.11,
        count: 1808403,
        rating_1: 54835,
        rating_2: 86051,
        rating_3: 285413,
        rating_4: 667485,
        rating_5: 836050
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1327868566m/2429135.jpg',
        small: 'https://images.gr-assets.com/books/1327868566s/2429135.jpg'
      }
    },
    {
      isbn13: 9780439023500,
      authors: 'Suzanne Collins',
      publication: 2016,
      original_title: 'Catching Fire',
      title: 'Catching Fire (The Hunger Games, #2)',
      ratings: {
        average: 4.3,
        count: 1831039,
        rating_1: 10492,
        rating_2: 48030,
        rating_3: 262010,
        rating_4: 687238,
        rating_5: 980309
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1358273780m/6148028.jpg',
        small: 'https://images.gr-assets.com/books/1358273780s/6148028.jpg'
      }
    },
    {
      isbn13: 9780439655480,
      authors: 'J.K. Rowling, Mary GrandPré, Rufus Beck',
      publication: 2016,
      original_title: 'Harry Potter and the Prisoner of Azkaban',
      title: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
      ratings: {
        average: 4.53,
        count: 1832823,
        rating_1: 6716,
        rating_2: 20413,
        rating_3: 166129,
        rating_4: 509447,
        rating_5: 1266670
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1499277281m/5.jpg',
        small: 'https://images.gr-assets.com/books/1499277281s/5.jpg'
      }
    },
    {
      isbn13: 9780618349998,
      authors: 'J.R.R. Tolkien',
      publication: 2016,
      original_title: ' The Fellowship of the Ring',
      title: 'The Fellowship of the Ring (The Lord of the Rings, #1)',
      ratings: {
        average: 4.34,
        count: 1766803,
        rating_1: 38031,
        rating_2: 55862,
        rating_3: 202332,
        rating_4: 493922,
        rating_5: 1042394
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1298411339m/34.jpg',
        small: 'https://images.gr-assets.com/books/1298411339s/34.jpg'
      }
    },
    {
      isbn13: 9780439023510,
      authors: 'Suzanne Collins',
      publication: 2016,
      original_title: 'Mockingjay',
      title: 'Mockingjay (The Hunger Games, #3)',
      ratings: {
        average: 4.03,
        count: 1719760,
        rating_1: 30144,
        rating_2: 110498,
        rating_3: 373060,
        rating_4: 618271,
        rating_5: 738775
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1358275419m/7260188.jpg',
        small: 'https://images.gr-assets.com/books/1358275419s/7260188.jpg'
      }
    },
    {
      isbn13: 9780439358070,
      authors: 'J.K. Rowling, Mary GrandPré',
      publication: 2016,
      original_title: 'Harry Potter and the Order of the Phoenix',
      title: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)',
      ratings: {
        average: 4.46,
        count: 1735368,
        rating_1: 9528,
        rating_2: 31577,
        rating_3: 180210,
        rating_4: 494427,
        rating_5: 1124806
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1387141547m/2.jpg',
        small: 'https://images.gr-assets.com/books/1387141547s/2.jpg'
      }
    },
    {
      isbn13: 9780316166680,
      authors: 'Alice Sebold',
      publication: 2016,
      original_title: 'The Lovely Bones',
      title: 'The Lovely Bones',
      ratings: {
        average: 3.77,
        count: 1605173,
        rating_1: 62777,
        rating_2: 131188,
        rating_3: 404699,
        rating_4: 583575,
        rating_5: 479323
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1457810586m/12232938.jpg',
        small: 'https://images.gr-assets.com/books/1457810586s/12232938.jpg'
      }
    },
    {
      isbn13: 9780439064870,
      authors: 'J.K. Rowling, Mary GrandPré',
      publication: 2016,
      original_title: 'Harry Potter and the Chamber of Secrets',
      title: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      ratings: {
        average: 4.37,
        count: 1779331,
        rating_1: 8253,
        rating_2: 42251,
        rating_3: 242345,
        rating_4: 548266,
        rating_5: 1065084
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1474169725m/15881.jpg',
        small: 'https://images.gr-assets.com/books/1474169725s/15881.jpg'
      }
    },
    {
      isbn13: 9780439139600,
      authors: 'J.K. Rowling, Mary GrandPré',
      publication: 2016,
      original_title: 'Harry Potter and the Goblet of Fire',
      title: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
      ratings: {
        average: 4.53,
        count: 1753043,
        rating_1: 6676,
        rating_2: 20210,
        rating_3: 151785,
        rating_4: 494926,
        rating_5: 1195045
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1361482611m/6.jpg',
        small: 'https://images.gr-assets.com/books/1361482611s/6.jpg'
      }
    },
    {
      isbn13: 9780545010220,
      authors: 'J.K. Rowling, Mary GrandPré',
      publication: 2016,
      original_title: 'Harry Potter and the Deathly Hallows',
      title: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)',
      ratings: {
        average: 4.61,
        count: 1746574,
        rating_1: 9363,
        rating_2: 22245,
        rating_3: 113646,
        rating_4: 383914,
        rating_5: 1318227
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1474171184m/136251.jpg',
        small: 'https://images.gr-assets.com/books/1474171184s/136251.jpg'
      }
    },
    {
      isbn13: 9780307277670,
      authors: 'Dan Brown',
      publication: 2016,
      original_title: 'The Da Vinci Code',
      title: 'The Da Vinci Code (Robert Langdon, #2)',
      ratings: {
        average: 3.79,
        count: 1447148,
        rating_1: 71345,
        rating_2: 126493,
        rating_3: 340790,
        rating_4: 539277,
        rating_5: 479387
      },
      icons: {
        large: 'https://images.gr-assets.com/books/1303252999m/968.jpg',
        small: 'https://images.gr-assets.com/books/1303252999s/968.jpg'
      }
    }
  ];

  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
    console.log(event.target.value.toLowerCase());
  };

  return (
    <Container>
      <SearchBar onUpdate={handleSearchChange} />
      <Grid container columns={3} spacing={2} sx={{ justifyContent: 'spaceAround', display: 'flex' }}>
        {mockData.map((data) => (
          <Grid item key={data.title} xs={1}>
            {BookCard(data)}
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} sx={{ justifyContent: 'center', display: 'flex', mt: 4 }} />
    </Container>
  );
}
