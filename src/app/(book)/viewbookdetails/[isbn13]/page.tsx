import BookDetails from 'views/book/book-details';
import DeleteBook from 'components/DeleteButton';

// ==============================|| PAGE ||============================== //

export default function BookPage() {
  return (
    <>
      <BookDetails />
      <DeleteBook />
    </>
  );
}
