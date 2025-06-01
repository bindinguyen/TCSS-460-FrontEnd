import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';

import { IBook } from 'types/book';

export default function BookCard(data: IBook) {
  // insert path to viewing 1 book here
  const path = `viewbookdetails`;
  return (
    <Card sx={{ height: '100%', alignItems: 'center' }}>
      <CardActionArea href={path}>
        <CardContent sx={{ justifyContent: 'center' }}>
          <CardMedia component="img" image={data.image_url} sx={{ width: 1 / 3, height: 1 / 3 }}></CardMedia>
          <Typography>{data.title}</Typography>
          <Typography>By: {data.authors}</Typography>
          <Rating defaultValue={data.rating_avg} precision={0.1} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
