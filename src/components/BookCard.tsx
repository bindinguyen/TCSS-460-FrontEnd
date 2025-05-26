import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';

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

export default function BookCard(data: IBook) {
  // insert path to viewing 1 book here
  const path = `viewbookdetails`;
  return (
    <Card sx={{ height: '100%', alignItems: 'center' }}>
      <CardActionArea href={path}>
        <CardContent sx={{ justifyContent: 'center' }}>
          <CardMedia component="img" image={data.icons.large} sx={{ width: 1 / 3, height: 1 / 3 }}></CardMedia>
          <Typography>{data.title}</Typography>
          <Typography>By: {data.authors}</Typography>
          <Rating defaultValue={data.ratings.average} precision={0.1} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
